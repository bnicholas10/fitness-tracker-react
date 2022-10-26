import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Routines from "./components/Routines";
import { fetchRoutines } from "./api";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [routines, setRoutines] = useState([]);

  // const checkToken = () => {
  //   if (token === "" && localStorage.getItem("token")) {
  //     setToken(localStorage.getItem("token"));
  //     console.log(`fetched token from local`);
  //   }
  // };
  // checkToken();

  const handleFetchRoutines = async (token) => {
    const routinesList = await fetchRoutines(token);
    setRoutines(routinesList);
  };

  useEffect(() => {
    handleFetchRoutines(token);
  }, [token]);

  return (
    <div className="App">
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route
          path={"/routines"}
          element={<Routines routines={routines} setRoutines={setRoutines} />}
        />
        <Route path={"/activities"} element={<Home />} />
        <Route path={"/account/login"} element={<Home />} />
        <Route path={"/account/register"} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
