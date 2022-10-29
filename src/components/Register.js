import "./Register.css";
import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const { setToken, setUser } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
//   console.log(username)
//   console.log(password)
//   const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await registerUser(username, password);
    if (result.error) {
      setError(result.error);
    } else {
      localStorage.setItem("token", result.token);
      setToken(result.token);
      setUser(result.user);
      navigate("/");
      setUsername("");
      setPassword("");
    }
    // console.log(result);
  };

  return (
    <div id="registrationField">
      <h1>Register</h1>
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
        <button>Register</button>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default Register;