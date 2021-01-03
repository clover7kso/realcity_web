import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import {
  NavBar,
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
    </div>
  );
}

export default App;
