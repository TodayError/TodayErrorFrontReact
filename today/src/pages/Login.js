import React from "react";
import { Text, Input, Grid, Button } from "../elements";
// import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { nicknameCheck } from "../shared/Check";

import { KAKAO_AUTH_URL } from "../shared/OAuth";

const Login = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const login = () => {
    if (id === "" || pwd === "") {
      window.alert("닉네임 혹은 비밀번호가 공란입니다. 입력해주세요.");
      return;
    }

    if (!nicknameCheck(id)) {
      window.alert("닉네임 형식이 맞지 않습니다.");
      return;
    }

    dispatch(userActions.__login(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="50px" bold color="black" margin="10px 0px 0px 0px">
          로그인 하기
        </Text>
        <Text size="20px" color="black">
          오늘의 에러도 해결 할 수 있습니다!
        </Text>
      </Grid>

      <Grid padding="16px">
        <Grid padding="0px">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="패스워드"
            placeholder="패스워드를 입력해주세요."
            type="password"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>

        <Button
          margin="10px 0px"
          text="로그인하기"
          _onClick={() => {
            login();
          }}
        ></Button>
        <Button href={KAKAO_AUTH_URL}>카카오톡으로 로그인 하기</Button>
        <Grid is_flex>
          <Grid margin="30px 0px 0px 110px">
            <Text margin="20px 0px 0px 0px" size="15px" color="black">
              에러의 명사수가 되고 싶다면? ->
            </Text>
          </Grid>
          <Grid margin="50px 0px 0px 0px">
            <Link to={"/signup"}>회원가입</Link> 하러가기
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
