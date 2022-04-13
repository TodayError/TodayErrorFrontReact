import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

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

          dispatch(setUser(id));
          localStorage.setItem("username", id);

          let data = res.headers.authorization;
          let accessToken = data.split("BEARER")[1];
          console.log(accessToken); // 어떤 모양이 뽑히려나??
          localStorage.setItem("Authorization", accessToken);
          setCookie("is_login", "success");

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          //요청할때 기본 모양새를 잡는 것 같은데..accessToken을 localStorage, cookie등에 저장하지 않는다!

          history.push("/");
        });
    } catch (err) {
      console.log("로그인이 실패했습니다.");
      console.log(err);
    }
  };
};

const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    const nickname = localStorage.getItem("username");
    const tokenCheck = localStorage.getItem("Authorization");
    if (tokenCheck) {
      dispatch(setUser({ user: nickname }));
      history.replace("/");
    } else {
      dispatch(logOut());
    }
  };
};

const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("is_login");
    localStorage.removeItem("username");
    dispatch(logOut());
    history.replace("/login");
  };
};
const checkIdDB = (id) => {
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
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    // [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  logOut,
  loginDB,
  loginCheckDB,
  checkIdDB,
  signupDB,
  logoutDB,
  //   loginCheckFB,
};

export { actionCreators };
