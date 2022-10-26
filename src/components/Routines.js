import { useParams, Route, Routes, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Routines.css";

const Routines = (props) => {
  return (
    <div id="routinesMain">
      Public Routines
      <div id="routinesCard"></div>
    </div>
  );
};

export default Routines;
