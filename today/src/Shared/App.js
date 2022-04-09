import { Grid, Text, Button, Input } from "../elements";
import { Route, useHistory } from "react-router-dom";
import styled from "styled-components";
import "../App.css";
import PostList from "../pages/PostList";
import PostWrite from "../pages/PostWrite";
import Header from "../elements/Header";

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <Header />
      <Grid bg="white" width="700px" margin="auto">
        <Route path="/" exact>
          <PostList />
          <Write
            onClick={() => {
              history.push("/PostWrite");
            }}
          >
            +
          </Write>
        </Route>
        <Route path="/PostWrite">
          <PostWrite />
        </Route>
      </Grid>
    </div>
  );
}

const Write = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #adb5bd;
  color: black;
  border-color: transparent;
  border-radius: 50%;
  padding: 15px;
  font-size: 30px;
  cursor: pointer;
`;
export default App;
