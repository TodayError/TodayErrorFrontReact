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
  const nickname = useSelector((state) => state.user.user);

  const is_token = localStorage.getItem("Authorization");

  // 로그인 유저일 경우
  if (is_login && is_token) {
    return (
      <>
        <Grid is_flex>
          <hr style={{ margin: "5px 0px" }} />
          <Grid padding="0px 4px" display="flex">
            <img
              height={"80px"}
              src="https://teamsparta.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fed0b6657-da0d-48a1-9e4e-4489520bd09e%2FSpartaIconScale10.png?table=block&id=ab0901fe-459a-4cac-b2ef-d889c708ff7b&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=290&userId=&cache=v2"
              alt=""
            />
            <Text
              textShadow="4px 4px 4px black"
              margin="30px 20px"
              size="40px"
              bold
              cursor="pointer"
              _onClick={() => {
                history.push("/");
              }}
            >
              항해 통신
            </Text>
          </Grid>
          <Text
            deco="underline"
            size="35px"
            margin="0px 20px 15px 20px"
            textShadow="2px 2px 2px black"
            cursor="pointer"
            _onClick={() => {
              history.push("/React");
            }}
          >
            React
          </Text>

          <Text
            deco="underline"
            size="35px"
            margin="0px 20px 15px 20px"
            textShadow="2px 2px 2px black"
            cursor="pointer"
            _onClick={() => {
              history.push("/Spring");
            }}
          >
            Spring
          </Text>
          <Text
            deco="underline"
            size="35px"
            margin="0px 20px 15px 20px"
            textShadow="2px 2px 2px black"
            cursor="pointer"
            _onClick={() => {
              history.push("/Node.js");
            }}
          >
            Node.js
          </Text>
          <Grid width="800px">
            <Text color="yellow" size="20px">
              {nickname} 님 환영합니다!
            </Text>
          </Grid>
          <Button
            cursor="pointer"
            margin="0px 2px"
            width="30%"
            text="로그아웃"
            _onClick={() => {
              dispatch(userActions.logoutDB());
            }}
          ></Button>
        </Grid>
        <hr style={{ height: "2px", backgroundColor: "white" }} />
        <Grid
          borderRadius="10px"
          width="550px"
          padding="10px 30px"
          bg="#7f0080"
          margin="40px auto"
          boxShadow="0 2px 3px 2px rgba(0,0,0,0.7)"
        >
          <Text
            bold
            textAlign="center"
            color="yellow"
            size="60px"
            margin="10px auto"
            textShadow="4px 4px 4px black"
          >
            ★ 오늘의 에러 ★
          </Text>
        </Grid>
      </>
    );
  }
  return (
    <>
      <Grid is_flex>
        <hr style={{ margin: "5px 0px" }} />
        <Grid padding="0px 4px" display="flex">
          <img
            height={"80px"}
            src="https://teamsparta.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fed0b6657-da0d-48a1-9e4e-4489520bd09e%2FSpartaIconScale10.png?table=block&id=ab0901fe-459a-4cac-b2ef-d889c708ff7b&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=290&userId=&cache=v2"
            alt=""
          />
          <Text
            textShadow="4px 4px 4px black"
            margin="30px 20px"
            size="40px"
            bold
            _onClick={() => {
              history.push("/");
            }}
            cursor="pointer"
          >
            항해 통신
          </Text>
        </Grid>
        <Text
          deco="underline"
          size="35px"
          margin="0px 20px 15px 20px"
          cursor="pointer"
          textShadow="2px 2px 2px black"
          _onClick={() => {
            history.push("/React");
          }}
        >
          React
        </Text>

        <Text
          deco="underline"
          size="35px"
          margin="0px 20px 15px 20px"
          textShadow="2px 2px 2px black"
          cursor="pointer"
          _onClick={() => {
            history.push("/Spring");
          }}
        >
          Spring
        </Text>
        <Text
          deco="underline"
          size="35px"
          margin="0px 20px 15px 20px"
          textShadow="2px 2px 2px black"
          cursor="pointer"
          _onClick={() => {
            history.push("/Node");
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
      <hr style={{ height: "2px", backgroundColor: "white" }} />
      <Grid
        borderRadius="10px"
        width="550px"
        padding="10px 30px"
        bg="#7f0080"
        margin="40px auto"
        boxShadow="0 2px 3px 2px rgba(0,0,0,0.7)"
      >
        <Text
          bold
          textAlign="center"
          color="yellow"
          size="60px"
          margin="10px auto"
          textShadow="4px 4px 4px black"
        >
          ★ 오늘의 에러 ★
        </Text>
      </Grid>
    </>
    //로그인 유저일 경우
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
