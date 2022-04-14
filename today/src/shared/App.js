import React from "react";
import { Grid } from "../elements";
import { Route } from "react-router-dom"; //useHistory 빼보기

import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
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

import KakaoAuthHandle from "../pages/KakaoAuthHandle";

import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import CommentWrite from "../components/CommentWrite";
import CommentItem from "../components/CommentItem";
import CommentList from "../components/CommentList";

function App() {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const username = useSelector((state) => state.user.user);
  const post_list = useSelector((state) => state.post.list);
  const nickName = post_list[0].nickName;
  console.log(nickName);
  const is_token = localStorage.getItem("Authorization");

  React.useEffect(() => {
    if (is_token) {
      dispatch(userActions.loginCheckDB());
    }
  });

  return (
    <div className="App">
      <Header />
      <Layout>
        <Grid
          borderRadius="10px"
          bg="white"
          width="700px"
          margin="10px auto"
          padding="16px"
          boxShadow="0 10px 5px 5px rgba(0,0,0,0.7)"
        >
          <ConnectedRouter history={history}>

            {/* <Route path="/" exact component={CommentTest} /> */}
            <Route path="/" exact component={PostList} />

            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/PostWrite" exact component={PostWrite} />
            <Route path="/PostWrite:postid" exact component={PostWrite} />
            <Route path="/PostDetail/:postid" exact component={PostDetail} />
            <Route path="/PostModify/:postid" exact component={PostModify} />
            <Route path="/user/kakao/callback" component={KakaoAuthHandle} />
          </ConnectedRouter>

          <Write
            onClick={() => {
              history.push("/PostWrite");
            }}
          >
            +
          </Write>
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
  font: bold;
  cursor: pointer;
  box-shadow: 0 10px 5px 5px rgba(0, 0, 0, 0.7);
`;
export default App;
