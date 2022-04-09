import { Grid, Text, Button, Input } from "../elements";
import { Route } from "react-router-dom";
import "../App.css";
import PostList from "../pages/PostList";
import Header from "../elements/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Route path="/">
        <PostList />
      </Route>
    </div>
  );
}

export default App;
