import { useParams, Route, Routes, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Routines.css";

// const handleCollapse = () => {
//   var coll = document.getElementsByClassName("collapsible");
//   var i;

//   for (i = 0; i < coll.length; i++) {
//     coll[i].addEventListener("click", function () {
//       this.classList.toggle("active");
//       var content = this.nextElementSibling;
//       if (content.style.display === "block") {
//         content.style.display = "none";
//       } else {
//         content.style.display = "block";
//       }
//     });
//   }
// };

const Routines = (props) => {
  const { routines } = props;
  console.log(routines);
  return (
    <div id="routinesMain">
      <h1>Public Routines</h1>
      <div id="routinesWrapper">
        {routines.map((routine, i) => {
          let activities = [];
          if (routine.activities.length > 0) {
            activities = routine.activities;
            console.log(activities);
          }
          return (
            <div key={i} className="card">
              <h2>{routine.name}</h2>
              <p>{routine.goal}</p>
              <p>Creator: {routine.creatorName}</p>
              {/* <button
                type="button"
                className="collapsible"
                onClick={handleCollapse}
              >
                Open Activities
              </button>
              <div class="content">
                {activities.map((activity, i) => {
                  <div class="activityCard" key={i}>
                    <p>{activity.name}</p>
                    <p>{activity.description}</p>
                  </div>;
                })}
              </div> */}
              {activities.map((activity) => (
                <div></div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Routines;
