import { Link } from "react-router-dom";
// import { useState } from "react";
import "./Routines.css";


const Routines = (props) => {
  const { routines } = props;
  // console.log("ROUTINES: ", routines);
  return (
    <div id="routinesMain">
      <h1>Public Routines</h1>
      <div id="routinesWrapper">
        {routines.map((routine, i) => {
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

export default Routines;
