import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({
  post_id,
}));

const initialState = {
  list: [],
};

const initialPost = {
  postId: 1,
  nickname: "coooooodinnngg",
  title: "확장자명을 안적어서 생긴 오류입니다.",
  category: "리액트",
  createdAt: "2021-02-27 10:00:00",
  complited: false,
  imageUrl:
    "https://velog.velcdn.com/images/gagyeong/post/d1481a6f-0583-4610-b253-4a9c6efc03cf/image.png",
};

//미듈웨어
const getPostDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await axios.get("http://54.180.105.154/api/main");
      console.log(data);
      dispatch(setPost(data));
    } catch (error) {
      alert("에러발생");
      console.log(error);
    }
  };
};

// const deletePostDB = (postId) => {
//     return async function (dispatch, getState) {
//      try {
//          await axios.delete("유알엘주는거")
//          dispatch(deletePost(postId));
//           console.log(postId);
//      }

//         .catch((error) => {
//           console.error("Error removing document: ", error);
//         });
//     };
//   };

//리듀서
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(state);
        console.log(action);
        draft.list = action.payload.post_list;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log("리듀서 추가");
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log("안녕 난 리듀서 편집이얌 ");
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  editPost,
  getPostDB,
  //   deletePostDB
  //   addPostDB,
};

export { actionCreators };
