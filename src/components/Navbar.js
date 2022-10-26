import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  const { token, setToken } = props;
  return (
    <div id="navbar">
      FitnessTrac.kr
      <div id="links">
        <Link to={"/"}>Home</Link>
        <Link to={"/routines"}>Routines</Link>
        {token && <Link to={"/account/routines"}>My Routines</Link>}
        <Link to={"/activities"}>Activities</Link>
        {!token && <Link to={"/account/login"}>Log In</Link>}
        {token && <Link to={"/account/register"}>Register</Link>}
      </div>
    </div>
  );
};

export default Navbar;
