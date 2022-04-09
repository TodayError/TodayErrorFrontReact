import React from "react";
import { Text, Input, Grid, Button } from "../elements";
// import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

// import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
import { nicknameCheck } from "../shared/Check";

const Login = (props) => {
  //   const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const login = () => {
    console.log(id);

    if (id === "" || pwd === "") {
      window.alert("닉네임 혹은 비밀번호가 공란입니다! 입력해주세요!");
      return;
    }

    if (!nicknameCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    // dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="50px" bold color="black" margin="10px 0px 0px 0px">
          로그인 하기
        </Text>
        <Text size="20px" color="black">
          오늘의 에러도 해결하실 수 있습니다!
        </Text>
      </Grid>

      <Grid padding="16px">
        <Grid padding="0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
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
            console.log("로그인 했어!");
            login();
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
