import { useParams } from "react-router-dom";
import "./Routine.css"

const Routine = (props) => {
    const {routines} = props
    const params = useParams()
    // console.log("ROUTINES: ", routines)
    const selectedRoutine = routines.filter((routine) => routine.id === +params.routineId)[0];
    // console.log("SELECTED ROUTINE: ", selectedRoutine)
    return (
        <div id="routineMain">
            <h1>{selectedRoutine.name}</h1>
            <div id="routineWrapper">
                <h2>{selectedRoutine.name}</h2>
                <p>{selectedRoutine.goal}</p>
                <p>Creator: {selectedRoutine.creatorName}</p>
                <h2>Activities: </h2>
              {selectedRoutine.activities.map((activity, i) => (
                <div className="card" key={i}>
                  <h3>Name: {activity.name}</h3>
                  <p>Description: {activity.description}</p>
                  <p>Duration: {activity.duration}</p>
                  <p>Count: {activity.count}</p>
                </div>
              ))}
            </div>
        </div>
    )   
}

export default Routine;