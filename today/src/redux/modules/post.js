import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configureStore";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const UPLOAD_IMG = "UPLOAD_IMG";
const SET_PREVIEW = "SET_PREVIEW";
const GET_DETAIL = "GET_DETAIL";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const getDetail = createAction(GET_DETAIL, (post_list) => post_list);
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (postId, payload) => ({
  postId,
  payload,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const uploadImg = createAction(UPLOAD_IMG, (image) => ({ image }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  list: [],
};

const initialPost = {
  preview: null,
  postId: 1,
  nickname: "coooooodinnngg",
  title: "확장자명을 안적어서 생긴 오류입니다.",
  category: "리액트",
  createdAt: "2021-02-27 10:00:00",
  completed: false,
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

const getCateDB = (categoryId) => {
  console.log(categoryId);
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await axios.get(
        `http://54.180.105.154/api/main/category/${categoryId}`
      );
      console.log(data);
      const body_list = data.body;
      if (categoryId == "Home") {
        return dispatch(getPostDB());
      }
      dispatch(setPost(body_list));
    } catch (error) {
      alert("에러발생");
      console.log(error);
    }
  };
};

const getDetailDB = (postId) => {
  console.log(postId);

  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await axios.get(
        `http://54.180.105.154/api/details/${postId}`
      );
      console.log(data.body);
      let detail_data = [{ ...data.body }];
      dispatch(getDetail(detail_data));
    } catch (error) {
      alert("상세페이지 실패");
      console.log(error);
    }
  };
};

// const addPostDB = (post = {}) => {
//   return function (dispatch, getState, { history }) {
//     console.log(post);

//     axios
//       .post("http://54.180.105.154/api/posts/test", {
//         ...post,
//       })
//       .then((response) => {
//         console.log("안녕 나는 미들웨어 add", response);
//         history.push("/");
//         window.location.reload();
//       })
//       .catch((error) => {
//         window.alert("작성내용을 다시 확인해주세yo~!");
//         console.log(error);
//       });
//   };
// };

const uploadDB = (payload) => {
  console.log(payload);
  return async function (dispatch, getState, { history }) {
    console.log(payload.file, payload.information);
    const formData = new FormData();
    formData.append("file", payload.file);
    formData.append(
      "information",
      new Blob([JSON.stringify(payload.information)], {
        type: "application/json",
      })
    );
    console.log(payload);
    await axios({
      method: "post",
      url: "http://54.180.105.154/api/file",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        window.alert("포스트 업로드 성공!!!");
        dispatch(uploadImg(response.data.imageUrl));

        console.log(response.data.imageUrl);
        setPreview(`${response.data.imageUrl}`);
        window.location.href = "/";
      })
      .catch((err) => {
        window.alert("게시물을 다 넣어주세요!");
      });
  };
};

const editPostDB = (payload) => {
  return async function (dispatch, getState, { history }) {
    console.log(payload.information);
    console.log(payload.file);
    console.log(payload.postId);
    // if (!postId) {
    //   console.log("게시글 정보가 없어요");
    //   return;
    // }
    const _image = getState().post.list.imageUrl;
    console.log(_image);

    const _post_idx = getState().post.list.findIndex(
      (p) => p.postId + "" === payload.postId
    );
    console.log(_post_idx);
    const _post = getState().post.list[_post_idx];
    console.log(_post);

    if (_image === _post.imageUrl) {
      const formData = new FormData();
      formData.append(
        "information",
        new Blob([JSON.stringify(payload.information)], {
          type: "application/json",
        })
      );
      await axios({
        method: "put",
        url: `http://54.180.105.154/api/posts/${payload.postId}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          window.alert("수정 포스트 업로드 성공!!!");
          dispatch(
            editPost(
              payload.file,
              { information: payload.information },
              payload.postId
            )
          );
        })
        .catch((err) => {
          window.alert("수정오류!");
        });
    } else if (_image !== _post.imageUrl) {
      const formData = new FormData();
      formData.append("file", payload.file);
      formData.append(
        "information",
        new Blob([JSON.stringify(payload.information)], {
          type: "application/json",
        })
      );

      await axios({
        method: "put",
        url: `http://54.180.105.154/api/posts/${payload.postId}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          window.alert("수정 포스트 업로드 성공!!!");
          dispatch(
            editPost(
              payload.file,
              { information: payload.information },
              payload.postId
            )
          );

          console.log(response.data.imageUrl);
          setPreview(`${response.data.imageUrl}`);
          window.location.href = "/";
        })
        .catch((err) => {
          window.alert("수정오류!");
        });
    }
  };
};

const deletePostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const data = await axios.delete(
        `http://54.180.105.154/api/posts/${postId}`
      );
      const _post = getState().post.list;
      console.log(_post);
      const post_index = _post.findIndex((p) => {
        return parseInt(p.postId) === parseInt(postId);
      });
      dispatch(deletePost(post_index));
      window.alert("포스트 삭제 ...");
      window.location.href = "/";
    } catch {
      window.alert("포스트 삭제 성공 !!!");
    }
  };
};

//리듀서
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(state);
        console.log(action);
        draft.list = action.payload.post_list;
      }),
    // [GET_CATE]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.list = action.payload.post_list;
    //   }),
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        console.log(state);
        console.log(action);
        draft.list = action.payload;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action);
        console.log("리듀서 추가");
        draft.list.unshift(action.payload.post);
      }),
    [UPLOAD_IMG]: (state, action) =>
      produce(state, (draft) => {
        draft.imageUrl = action.payload.imageUrl;
        draft.uploading = false;
        console.log(state, action);
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(state.list);
        console.log(...draft.list);
        console.log(action);
        console.log("안녕 난 리듀서 편집이얌 ");
        let idx = draft.list.findIndex(
          (p) => parseInt(p.postId) === parseInt(action.payload.postId.postId)
        );
        console.log(idx);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action);
        draft.list = state.list.filter((p) => p.id !== action.payload.postid);
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  getDetailDB,
  addPost,
  editPost,
  getPostDB,
  deletePostDB,
  // addPostDB,
  editPostDB,
  uploadImg,
  uploadDB,
  setPreview,
  getCateDB,
};

export { actionCreators };
