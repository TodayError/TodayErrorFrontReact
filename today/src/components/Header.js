import React from "react";
import styled from "styled-components";
// import Permit from "../shared/Permit";

import { Link } from "react-router-dom";
import { Grid, Text, Button } from "../elements";
import { history } from "../redux/configureStore";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const is_token = localStorage.getItem("Authorization") ? true : false;
  console.log(is_login);

  // 로그인 유저일 경우
  if (is_login && is_token) {
    return (
      <React.Fragment>
        <Grid is_flex>
          <hr style={{ margin: "5px 0px" }} />
          <Grid padding="20px 4px" is_flex>
            <Text margin="0px" size="40px" bold>
              항해 통신
            </Text>
          </Grid>
          <Button
            _onClick={() => {
              history.push("/login");
            }}
          >
            React
          </Button>
          <Menu to={"/post/Spring"}>Spring</Menu>
          <Menu to={"/post/Nodejs"}>Node.js</Menu>

          <Button
            cursor="pointer"
            margin="0px 2px"
            width="30%"
            text="로그아웃"
            _onClick={dispatch(userActions.logoutDB())}
          >
            로그아웃
          </Button>
        </Grid>
        <hr />
        <Grid margin="5px auto">
          <Text color="yellow" size="60px" margin="20px 0px">
            [오늘의 에러]
          </Text>
        </Grid>
      </React.Fragment>
    );
  }

  //로그인 유저가 아닐 경우
  return (
    <>
      <Grid is_flex>
        <hr style={{ margin: "5px 0px" }} />
        <Grid padding="20px 4px" is_flex>
          <Text margin="0px" size="40px" bold>
            항해 통신
          </Text>
        </Grid>
        <Text
          deco="underline"
          size="35px"
          margin="0px 20px 10px 20px"
          _onClick={() => {
            history.push("/");
          }}
        >
          React
        </Text>
        <Text
          deco="underline"
          size="35px"
          margin="0px 20px 10px 20px"
          cursor
          _onClick={() => {
            history.push("/login");
          }}
        >
          Spring
        </Text>
        <Text
          deco="underline"
          size="35px"
          margin="0px 20px 10px 20px"
          _onClick={() => {
            history.push("/signup");
          }}
        >
          Node.js
        </Text>
        <Button
          cursor="pointer"
          margin="0px 2px"
          width="30%"
          text="로그인"
          _onClick={() => {
            history.push("/login");
          }}
        ></Button>
        <Button
          cursor="pointer"
          margin="0px 2px"
          width="30%"
          text="회원가입"
          _onClick={() => {
            history.push("/signup");
          }}
        ></Button>
      </Grid>
      <hr />
      <Grid margin="5px auto">
        <Text color="yellow" size="60px" margin="20px 0px">
          [오늘의 에러]
        </Text>
      </Grid>
    </>
  );
};

const Menu = styled(Link)`
  font-size: 30px;
  color: white;
  box-sizing: border-box;
  display: block;
  padding: 8px 8px;
  margin: 0px 20px;
  text-align: center;
`;

Header.defaultProps = {};

export default Header;
