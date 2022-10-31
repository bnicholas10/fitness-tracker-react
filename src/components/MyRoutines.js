import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createRoutine, fetchRoutines, fetchUserRoutines } from "../api";
import "./MyRoutines.css";

const MyRoutines = (props) => {
  const { setRoutines, token, user, myRoutines, setMyRoutines } = props;
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState("");

  const box = document.querySelector("#checkbox");

  const handleFetchMyRoutines = async (token, user) => {
    if (!user) {
      return;
    }
    const routines = await fetchUserRoutines(token, user.username);
    setMyRoutines(routines);
  };

  //   console.log("USER: ", user);
  //   console.log("MY ROUTINES: ", myRoutines);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const routine = await createRoutine(token, name, goal, isPublic);
    // console.log("NEW ROUTINE: ", routine);
    if (routine.error) {
      setError(routine.error);
    } else {
      const updatedRoutines = await fetchRoutines();
      const myUpdatedRoutines = await fetchUserRoutines(token, user.username);
      setRoutines(updatedRoutines);
      setMyRoutines(myUpdatedRoutines);
      setName("");
      setGoal("");
      box.checked = false;
      setIsPublic(false);
      setError("");
    }
  };

  useEffect(() => {
    handleFetchMyRoutines(token, user);
  }, [user, token]);

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

      <div id="routinesWrapper">
        {myRoutines.map((routine, i) => {
          let activities = [];
          if (routine.activities.length > 0) {
            activities = routine.activities;
            // console.log(activities);
          }
          return (
            <div key={i} className="card">
              <Link to={`/routines/${routine.id}`}>
                <h2>{routine.name}</h2>
              </Link>
              <p>{routine.goal}</p>
              <p>Creator: {routine.creatorName}</p>
              <h2>Activities: </h2>
              {activities.map((activity, i) => (
                <div id="activityCard" key={i}>
                  <h3>{activity.name}</h3>
                  <p>Description: {activity.description}</p>
                  <p>Duration: {activity.duration}</p>
                  <p>Count: {activity.count}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyRoutines;
