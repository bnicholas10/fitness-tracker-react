import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const checkToken = () => {
    if (token === "" && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      console.log(`fetched token from local`);
    }
  };
  checkToken();

  useEffect(() => {}, [token]);

  return (
    <div className="App">
      <p>TEST TEXT</p>
      <Navbar />
    </div>
  );
}

export default App;
