import "./App.css";
import { BrowserRouter, Route, NavLink, Link, Switch } from "react-router-dom";
import {
  NavBar,
  Footer,
  BoardPage,
  HomePage,
  PostCreatingPage,
  PostPage,
  SearchPage,
} from "./components/Page";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>

      <NavLink to="/BoardPage"></NavLink>
      <NavLink to="/PostPage"></NavLink>
      <NavLink to="/SearchPage"></NavLink>

      <Switch>
        <Route path="/BoardPage">
          <BoardPage />
        </Route>
        <Route path="/PostCreatingPage">
          <PostCreatingPage />
        </Route>
        <Route path="/PostPage">
          <PostPage />
        </Route>
        <Route path="/SearchPage">
          <SearchPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>

      <Footer></Footer>
    </div>
  );
}

export default App;
