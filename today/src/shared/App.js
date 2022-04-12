import { Grid } from "../elements";
import { Route, useHistory } from "react-router-dom";
import styled from "styled-components";
import "./App.css";

import Header from "../components/Header";
import Layout from "../components/Layout";

import PostList from "../pages/PostList";
import PostWrite from "../pages/PostWrite";
import PostModify from "../pages/PostModify";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostDetail from "../pages/PostDetail";

import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <Header />
      <Layout>
        <Grid bg="white" width="700px" margin="30px auto" padding="16px">
          <Route path="/" exact component={PostList} />
          <CommentWrite />
          <CommentList />
          <Write
            onClick={() => {
              history.push("/PostWrite");
            }}
          >
            +
          </Write>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/PostWrite" exact component={PostWrite} />
          <Route path="/PostDetail/:index" exact component={PostDetail} />
          <Route path="/PostModify/:index" exact component={PostModify} />
        </Grid>
      </Layout>
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
