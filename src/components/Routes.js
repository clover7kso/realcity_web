import React, { useState } from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Auth from "../Routes/Auth";
import Home from "../Routes/Home";
import Writer from "../Routes/Writer";
import Board from "../Routes/Board";
import Post from "../Routes/Post";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const LoggedInRoutes = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        classNames="fade"
        in={toggle}
        timeout={300}
        onEnter={() => setToggle(false)}
        onExited={() => setToggle(true)}
      >
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Route path="/Writer" component={Writer} />
          <Route path="/Board" component={Board} />
          <Route path="/Post" component={Post} />
          <Redirect from="*" to="/" />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
