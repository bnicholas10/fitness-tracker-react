import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import "./Login.css";

const Login = (props) => {
  const { token, setToken, setUser } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await loginUser(username, password);
    console.log(result);
    if (result.error) {
      setError(result.error);
    } else {
      localStorage.setItem("token", result.token);
      setToken(result.token);
      setUser(result.user)
      console.log(`fetched token from server`);
      setUsername("");
      setPassword("");
      navigate("/");
    }
  };

  return (
    <div id="loginField">
      <h1>Log In</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username *"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password *"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">LOG IN</button>
        <Link to={"/account/register"}>Sign up</Link>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Login;