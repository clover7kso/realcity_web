import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div>
      <div className="NavBar">
        <h1 className="Logo">
          <span className="LogoColorRed">CAR</span>MUNITY
        </h1>
        <div className="LogoExplain">
          그들만의 <span className="LogoColorRed">커뮤니티</span>
        </div>
        <button className="WriteButton">글쓰기</button>
      </div>
      <hr></hr>
    </div>
  );
}

export default NavBar;
