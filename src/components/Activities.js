import "./Activities.css"

const Activities = (props) => {
    const {activities} = props
    // console.log(activities)
    return (
        <div id="activitiesMain">
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