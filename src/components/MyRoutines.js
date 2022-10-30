import { useState } from "react";
import { createRoutine, fetchRoutines } from "../api";
import "./MyRoutines.css";

const MyRoutines = (props) => {
  const { setRoutines, token } = props;
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState("");
  const box = document.querySelector("#checkbox");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const routine = await createRoutine(token, name, goal, isPublic);
    console.log("NEW ROUTINE: ", routine);
    if (routine.error) {
      setError(routine.error);
    } else {
      const newRoutines = await fetchRoutines();
      setRoutines(newRoutines);
      setName("");
      setGoal("");
      box.checked = false;
      setIsPublic(false);
      setError("");
    }
  };

  return (
    <div id="myRoutinesMain">
      <div>
        <form id="addForm" onSubmit={handleSubmit}>
          <h1>Create New Routine</h1>
          <input
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Goal *"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <div id="public">
            <input
              type="checkbox"
              id="checkbox"
              value={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            <span>Public</span>
          </div>
          <button>Create</button>
          <p className="error">{error}</p>
        </form>
      </div>
    </div>
  );
};

export default MyRoutines;
