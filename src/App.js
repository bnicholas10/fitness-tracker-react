import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Routines from "./components/Routines";
import Routine from "./components/Routine";
import {
  fetchRoutines,
  fetchActivities,
  fetchUser,
  fetchUserRoutines,
} from "./api";
import Activities from "./components/Activities";
import Login from "./components/Login";
import Register from "./components/Register";
import MyRoutines from "./components/MyRoutines";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);

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

  const handleFetchMyRoutines = async (token, user) => {
    if (!user) {
      return;
    }
    const routines = await fetchUserRoutines(token, user.username);
    setMyRoutines(routines);
  };

  const handleFetchUser = async (token) => {
    if (token) {
      const user = await fetchUser(token);
      setUser(user);
      // console.log("FETCHED: ", user);
    } else {
      setUser(null);
      // console.log("NO USER");
    }
  };

  useEffect(() => {
    handleFetchRoutines(token);
    handleFetchMyRoutines(token, user);
    handleFetchActivities(token);
    handleFetchUser(token);
  }, [token]);

  return (
    <div className="App">
      <Navbar token={token} setToken={setToken} setUser={setUser} />
      <Routes>
        <Route path={"/"} element={<Home user={user} />} />
        <Route path={"/routines"} element={<Routines routines={routines} />} />
        <Route
          path={"/routines/:routineId/*"}
          element={
            <Routine
              routines={routines}
              user={user}
              myRoutines={myRoutines}
              token={token}
              setRoutines={setRoutines}
              setMyRoutines={setMyRoutines}
              activities={activities}
            />
          }
        />
        <Route
          path={"/activities"}
          element={
            <Activities
              activities={activities}
              setActivities={setActivities}
              token={token}
            />
          }
        />
        <Route
          path={"/account/login"}
          element={
            <Login token={token} setToken={setToken} setUser={setUser} />
          }
        />
        <Route
          path={"/account/register"}
          element={<Register setToken={setToken} setUser={setUser} />}
        />
        <Route
          path={"/account/routines"}
          element={
            <MyRoutines
              setRoutines={setRoutines}
              token={token}
              user={user}
              myRoutines={myRoutines}
              setMyRoutines={setMyRoutines}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
