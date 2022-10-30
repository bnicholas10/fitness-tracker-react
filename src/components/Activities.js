import "./Activities.css"
import { useState } from "react"
import { createActivity, fetchActivities } from "../api"

const Activities = (props) => {
    const {activities, setActivities, token} = props
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    // console.log(activities)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const activity = await createActivity(token, name, description)
        if(activity.error){
            setError(activity.error)
        } else {
            const activities = await fetchActivities();
            setActivities(activities)
            setName("")
            setDescription("")
            setError("")
        }
    }

    return (
        <div id="activitiesMain">
                {token && <div>
      <form id="addForm" onSubmit={handleSubmit}>
        <h1>Create New Activity</h1>
        <input
          placeholder="Name *"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          placeholder="Description *"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />        
        <button>Create</button>
        <p className="error">{error}</p>
      </form>
    </div>}
            <h1>Activities</h1>
            <div id="activitiesWrapper">
                {activities.map((activity, i) => {
                    return (
                        <div key={i} className="card">
                            <h2>Activity</h2>
                            <h3>{activity.name}</h3>
                            <p>{activity.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Activities;