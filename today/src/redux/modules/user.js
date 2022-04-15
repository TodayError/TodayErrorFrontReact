import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/apis";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators]
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions
const signupDB = (id, pwd, pwd_check) => {
  return function (dispatch, getState, { history }) {
    console.log("회원가입을 합니다!", id, pwd, pwd_check);
    try {
      axios
        .post("http://3.38.116.203/user/signup", {
          nickname: id,
          password: pwd,
          passwordCheck: pwd_check,
        })
        .then(function (res) {
          console.log(res.data);
          if (res.data == true) {
            window.alert("회원가입이 완료되었습니다.");
            history.push("/login");
          } else {
            window.alert("다시 한번 시도해 주세요.");
          }
        });
    } catch (err) {
      var errorCode = err.code;
      var errorMessage = err.message;

      console.log(errorCode, errorMessage);
    }
  };
};

const loginDB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    console.log("로그인 한다!");
    try {
      axios
        .post("http://3.38.116.203/user/login", {
          nickname: id,
          password: pwd,
        })
        .then(function (res) {
          console.log(res);

          let data = res.headers.authorization;
          let accessToken = data.split("BEARER ")[1];
          console.log("토큰넘어왔어!", accessToken);

          localStorage.setItem("Authorization", accessToken);

          dispatch(setUser(id));
          localStorage.setItem("username", id);

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          // //요청할때 기본 모양새를 잡는 것 같은데..accessToken을 localStorage, cookie등에 저장하지 않는다!
          history.push("/");
        });
    } catch (err) {
      window.alert("로그인이 실패했습니다. 다시 시도해주세요.");
      console.log("로그인이 실패했습니다.");
      console.log(err);
    }
  };
};

const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    console.log(code);
    try {
      axios
        .get(`http://3.38.116.203/user/kakao/callback?code=${code}`)
        .then(function (res) {
          console.log(res); //토큰이 넘어올 것
          const jwtToken = res.data.jwtToken;
          const id = res.data.nickname;
          localStorage.setItem("Authorization", jwtToken); // 로컬에 저장
          //Setuser 어떻게?
          localStorage.setItem("username", id);
          dispatch(setUser(id));

          history.replace("/"); //토큰받아서 로그인 후 화면 전환(메인)
        });
    } catch (err) {
      console.log("소셜로그인 에러", err);
      window.alert("로그인에 실패하였습니다.");
      history.replace("/login");
    }
  };
};

//token Check 확인필요
const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    const nickname = localStorage.getItem("username");
    console.log(nickname);
    const tokenCheck = localStorage.Authorization;
    console.log(tokenCheck);
    if (tokenCheck) {
      dispatch(setUser(nickname));
    } else {
      console.log("로그아웃할거야");
      dispatch(logOut());
    }
  };
};

const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    console.log("로그아웃할래!");
    localStorage.removeItem("Authorization");
    localStorage.removeItem("username");
    dispatch(logOut());
    history.replace("/login");
  };
};
const dupCheckIdDB = (id) => {
  return function (dispatch, getState, { history }) {
    console.log("중복체크한다!", id);
    try {
      axios
        .post("http://3.38.116.203/user/idCheck", { nickname: id })
        .then(function (res) {
          if (res.data == false) {
            return window.alert("사용가능한 닉네임입니다.");
          } else {
            window.alert("중복된 닉네임이 있습니다.");
          }
        });
    } catch (err) {
      console.log(err);
      window.alert("다시 시도해 주세요.");
    }
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        console.log("리덕스 user에 담을 것", action.payload.user);
        //리덕스에 담는 것
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  logOut,
  loginDB,
  loginCheckDB,
  dupCheckIdDB,
  signupDB,
  logoutDB,
  kakaoLogin,
};

export { actionCreators };
