import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Routines from "./components/Routines";
import Routine from "./components/Routine"
import { fetchRoutines, fetchActivities } from "./api";
import Activities from "./components/Activities";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([])

  const checkToken = () => {
    if (token === "" && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      console.log(`fetched token from local`);
    }
  };
  checkToken();

  const handleFetchRoutines = async (token) => {
    const routinesList = await fetchRoutines(token);
    setRoutines(routinesList);
  };

  const handleFetchActivities = async (token) => {
    const activitiesList = await fetchActivities(token);
    setActivities(activitiesList);
  };

  useEffect(() => {
    handleFetchRoutines(token);
    handleFetchActivities(token);
  }, [token]);

  return (
    <div className="App">
      <Navbar token={token} setToken={setToken} setUser={setUser}/>
      <Routes>
        <Route path={"/"} element={<Home user={user}/>} />
        <Route path={"/routines"} element={<Routines routines={routines} />} />
        <Route path={"/routines/:routineId/*"} element={<Routine routines={routines}/>} />
        <Route path={"/activities"} element={<Activities activities={activities}/>} />
        <Route path={"/account/login"} element={<Login token={token} setToken={setToken} setUser={setUser}/>} />
        <Route path={"/account/register"} element={<Register setToken={setToken} setUser={setUser}/>} />
      </Routes>
    </div>
  );
}

export default App;
