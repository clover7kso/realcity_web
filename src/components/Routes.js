import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Home from "../Routes/Home";
import WritePost from "../Routes/WritePost";
import Search from "../Routes/Search";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/WritePost" component={WritePost} />
    <Route path="/Search" component={Search} />
    <Redirect from="*" to="/" />
  </Switch>
);

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
