import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const CHECK_ID = "CHECK_ID";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators]
const checkId = createAction(CHECK_ID, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions
// const loginFB = (id, pwd) => {
//   return function (dispatch, getState, { history }) {
//     console.log("로그인 한다!");
//   };
// };

const __checkId = (id) => {
  return function (dispatch, getState, { history }) {
    try {
      axios
        .post("http://localhost:8080/user/idCheck", { nickname: id })
        .then(function (res) {
          if (res.data.result == 1) {
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
    // [SET_USER]: (state, action) =>
    //   produce(state, (draft) => {
    //     setCookie("is_login", "success");
    //     draft.user = action.payload.user;
    //     draft.is_login = true;
    //   }),
    // [LOG_OUT]: (state, action) =>
    //   produce(state, (draft) => {
    //     deleteCookie("is_login");
    //     draft.user = null;
    //     draft.is_login = false;
    //   }),
    // [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  logOut,
  getUser,
  __checkId,
  //   signupFB,
  //   loginFB,
  //   loginCheckFB,
  //   logoutFB,
};

export { actionCreators };
