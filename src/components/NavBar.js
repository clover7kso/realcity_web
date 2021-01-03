import React from "react";
import { BrowserRouter, Route, NavLink, Link, Switch } from "react-router-dom";
import "./NavBar.css";
import { PostCreatingPage } from "./Page";

function NavBar() {
  return (
    <div>
      <div className="NavBar">
        <h1 className="Logo">
          <NavLink to="/" activeClassName="LogoLink">
            <span className="LogoColorRed">CAR</span>MUNITY
          </NavLink>
        </h1>
        <div className="LogoExplain">
          그들만의 <span className="LogoColorRed">커뮤니티</span>
        </div>
        <NavLink to="/PostCreatingPage" activeClassName="WriteLink">
          <button type="button">글쓰기</button>
        </NavLink>
      </div>
      <hr></hr>
    </div>
  );
}

export default NavBar;
