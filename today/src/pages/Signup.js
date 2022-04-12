import React from "react";
import { Grid, Input, Text, Button } from "../elements";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { nicknameCheck, pwdCheck } from "../shared/Check";

const Signup = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");

  const dupCheck = (id) => {
    if (!nicknameCheck(id)) {
      window.alert("닉네임이 형식에 맞지 않습니다. 한글/숫자 포함 3-10자");
      return;
    }
    dispatch(userActions.checkIdDB(id));
  };

  const signup = () => {
    if (id === "" || pwd === "") {
      window.alert("닉네임, 패스워드를 모두 입력해주세요!");
      return;
    }

    if (!pwdCheck(pwd, id)) {
      window.alert("패스워드 형식이 맞지 않습니다!");
      return;
    }

    if (pwd !== pwd_check) {
      window.alert("패스워드가 일치하지 않습니다!");
      return;
    }

    dispatch(userActions.signupDB(id, pwd, pwd_check));
  };
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="50px" bold color="black" margin="10px 0px 0px 0px">
          회원가입 하기
        </Text>
        <Text size="20px" color="black">
          오늘의 에러를 공유하고, Trouble Shooting의 달인이 됩시다!
        </Text>
      </Grid>

      <Grid padding="16px">
        <Grid>
          <Grid is_flex>
            <Input
              label="닉네임"
              placeholder="닉네임을 입력해주세요.(3자이상 10자 이내 한글, 숫자)"
              _onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <Button
              margin="50px 0px 0px 20px"
              width="200px"
              _onClick={() => {
                dupCheck(id);
              }}
            >
              중복확인
            </Button>
          </Grid>
        </Grid>

        <Grid>
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요.(6자이상 12자 이내)"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          />
        </Grid>

        <Button
          text="회원가입하기"
          _onClick={signup}
          margin="20px 0px 0px 0px"
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;
