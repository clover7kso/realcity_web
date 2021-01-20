import React, { useState } from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Auth from "../Routes/Auth";
import Home from "../Routes/Home";
import Writer from "../Routes/Writer";
import Board from "../Routes/Board";
import Post from "../Routes/Post";
import Search from "../Routes/Search";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ReactGA from "react-ga";

ReactGA.initialize("UA-187715263-1");

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
        onEnter={() => {
          var pathName = location.pathname;
          ReactGA.set({ page: pathName });
          ReactGA.pageview(pathName);
          setToggle(false);
        }}
        onExited={() => setToggle(true)}
      >
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Route path="/health" component={Home}>
            <h3>Hey There!!! The App is Healthy</h3>
          </Route>
          <Route path="/Writer" component={Writer} />
          <Route path="/Board" component={Board} />
          <Route path="/Post" component={Post} />
          <Route path="/Search" component={Search} />
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
