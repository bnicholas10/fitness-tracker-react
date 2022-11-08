import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editRoutine,
  fetchRoutines,
  fetchUserRoutines,
  deleteRoutine,
  updateActivity,
  deleteActivity,
  addActivity,
} from "../api";
import "./Routine.css";

const Routine = (props) => {
  const {
    routines,
    setRoutines,
    user,
    myRoutines,
    setMyRoutines,
    token,
    activities,
  } = props;
  const [editField, setEditField] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState("");
  const [attachActivityId, setAttachActivityId] = useState("");
  const [activityEditDuration, setActivityEditDuration] = useState("");
  const [activityEditCount, setActivityEditCount] = useState("");
  const [activityAddDuration, setActivityAddDuration] = useState("");
  const [activityAddCount, setActivityAddCount] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  // console.log("ROUTINES: ", routines)
  const box = document.querySelector("#checkbox");

  let selectedRoutine = routines.filter(
    (routine) => routine.id === +params.routineId
  )[0];

  if (!selectedRoutine) {
    selectedRoutine = myRoutines.filter(
      (routine) => routine.id === +params.routineId
    )[0];
  }

  const toggleEdit = async (e) => {
    e.preventDefault();
    setEditField(!editField);
  };

  const handleRoutineEdit = async (e) => {
    if (!user) {
      return;
    }
    e.preventDefault();
    const routine = await editRoutine(
      token,
      params.routineId,
      name,
      goal,
      isPublic
    );
    if (routine.error) {
      setError(routine.error);
    } else {
      console.log("PASSED");
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

  const handleRoutineDelete = async (e) => {
    if (!user) {
      return;
    }
    e.preventDefault();
    const routine = await deleteRoutine(token, params.routineId);
    console.log("DELETE RESPONSE: ", routine);
    navigate("../");
  };

  const handleActivityEdit = async (e, routineActivityId) => {
    e.preventDefault();
    const activity = await updateActivity(
      token,
      routineActivityId,
      activityEditCount,
      activityEditDuration
    );
    if (activity.error) {
      setError(activity.error);
    } else {
      const updatedRoutines = await fetchRoutines();
      const myUpdatedRoutines = await fetchUserRoutines(token, user.username);
      setRoutines(updatedRoutines);
      setMyRoutines(myUpdatedRoutines);
      setActivityEditDuration("");
      setActivityEditCount("");
      setError("");
    }
  };

  const handleActivityDelete = async (e, routineActivityId) => {
    e.preventDefault();
    const activity = await deleteActivity(token, routineActivityId);
    if (activity.error) {
      setError(activity.error);
    } else {
      const updatedRoutines = await fetchRoutines();
      const myUpdatedRoutines = await fetchUserRoutines(token, user.username);
      setRoutines(updatedRoutines);
      setMyRoutines(myUpdatedRoutines);
      setError("");
    }
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    const activity = await addActivity(
      token,
      params.routineId,
      attachActivityId,
      activityAddCount,
      activityAddDuration
    );
    if (activity.error) {
      setError(activity.error);
    } else {
      const updatedRoutines = await fetchRoutines();
      const myUpdatedRoutines = await fetchUserRoutines(token, user.username);
      setRoutines(updatedRoutines);
      setMyRoutines(myUpdatedRoutines);
      setActivityAddDuration("");
      setActivityAddCount("");
      setError("");
    }
  };
  // console.log("SELECTED ROUTINE: ", selectedRoutine);
  // console.log("ACTIVITIES: ", activities);

  return (
    selectedRoutine && (
      <div id="routineMain">
        <h1>{selectedRoutine.name}</h1>
        <div id="routineWrapper">
          <h2>{selectedRoutine.name}</h2>
          <p>{selectedRoutine.goal}</p>
          <p>Creator: {selectedRoutine.creatorName}</p>
          {user && selectedRoutine.creatorId === user.id ? (
            <div>
              <button onClick={toggleEdit}>Edit Routine</button>
              <button onClick={handleRoutineDelete}>Delete Routine</button>
            </div>
          ) : (
            <></>
          )}
          {user && !editField && selectedRoutine.creatorId === user.id ? (
            <div>
              <form id="editForm" onSubmit={handleRoutineEdit}>
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
                <button>Edit</button>
                <p className="error">{error}</p>
              </form>
            </div>
          ) : (
            <></>
          )}
          <h2>Activities: </h2>
          {selectedRoutine.activities.map((activity, i) => (
            <div className="card" key={i}>
              <h3>Name: {activity.name}</h3>
              <p>Description: {activity.description}</p>
              <p>Duration: {activity.duration}</p>
              <p>Count: {activity.count}</p>
              {user && selectedRoutine.creatorId === user.id ? (
                <div>
                  <form>
                    <button
                      onClick={(e) => {
                        handleActivityEdit(e, activity.routineActivityId);
                      }}
                    >
                      Edit
                    </button>
                    <input
                      placeholder="Duration *"
                      onChange={(e) => setActivityEditDuration(e.target.value)}
                    />
                    <input
                      placeholder="Count *"
                      onChange={(e) => setActivityEditCount(e.target.value)}
                    />
                  </form>
                  <button
                    onClick={(e) => {
                      handleActivityDelete(e, activity.routineActivityId);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
          <form id="addForm" onSubmit={handleAddActivity}>
            <select
              onChange={(event) => {
                setAttachActivityId(event.target.value);
              }}
            >
              {activities.map((activity, i) => (
                <option key={i} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
            <input
              placeholder="Duration *"
              value={activityAddDuration}
              onChange={(e) => setActivityAddDuration(e.target.value)}
            />
            <input
              placeholder="Count *"
              value={activityAddCount}
              onChange={(e) => setActivityAddCount(e.target.value)}
            />
            <button>Attach</button>
          </form>
        </div>
      </div>
    )
  );
};

export default Routine;
