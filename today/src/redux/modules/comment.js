import { createAction, handleActions } from "redux-actions";
import { actionCreators as postActions } from "./post";
import { produce } from "immer";

import axios from "axios";

//Action
const ADD = "comment/ADD";
const LOAD = "comment/LOAD";
const DELETE = "comment/DELETE";
const EDIT = "comment/EDIT";

//Action Creators
const getComment = createAction(LOAD, (post_id, comment) => ({
  post_id,
  comment,
}));
const addComment = createAction(ADD, (post_id, comment) => ({
  post_id,
  comment,
}));
const editComment = createAction(EDIT, (post_id, coId, newContent) => ({
  post_id,
  coId,
  newContent,
}));
const delComment = createAction(DELETE, (coId) => ({ coId }));

// const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//초기값
const initialState = {
  comment: null,
  comments: [],
};

//Middlewares

const getCommentDB = (postId = null, content) => {
  return function (dispatch, getState, { history }) {
    if (!postId) {
      return;
    }

    try {
      const { data } = axios
        .get(`http://3.38.116.203/comment/${postId}`)
        .then((res) => {
          console.log(res);
          let commentList = res.data;
          dispatch(getComment(commentList));
        });
    } catch (err) {
      console.log(err);
      window.alert("댓글정보를 다시 가져올 수 없습니다.");
    }
  };
};

const addCommentDB = (postId, content) => {
  return function (dispatch, getState, { history }) {
    console.log("댓글추가한다!", postId);
    try {
      const { data } = axios.post("http://3.38.116.203/comment", {
        postId: postId,
        content: content,
      });
      dispatch(addComment(data));
    } catch (err) {
      console.log(err);
      window.alert("다시 시도해 주세요.");
    }
  };
};

const editCommentDB = (post_id, coId, newContent) => {
  return function (dispatch, getState, { history }) {
    console.log("댓글 수정한다!", post_id, coId);
    try {
      axios
        .post(`http://3.38.116.203/comment/${coId}`, { content: newContent })
        .then((res) => {
          console.log(res);
          const data = res.data;
          dispatch(editComment(coId, data));
        });
    } catch (err) {
      console.log(err);
      window.alert("다시 시도해 주세요.");
    }
  };
};

const delCommentDB = (post_id, coId)  => (dispatch)=>{
  console.log("댓글 삭제한다!", post_id, coId);
  try{
    axios.delete(`http://3.38.116.203/comment/${coId}`)
    .then ((res)=> {
      console.log(res)
      dispatch(delComment(coId))
    })
  }
}
// //   const post = getState().post.list.find((l) => l.id === postId);
// //   comment = { ...comment, id: postId };
// //firestore 의 갯수 +1하기

// // 리덕스에는 post있을 때, +1하기
// // if (post) {
// //   dispatch(
// //     postActions.editPost(post_id, {
// //       comment_cnt: parseInt(post.comment_cnt) + 1,
// //     })
// //   );
// //댓글추가되면 배지 알림
// //post 가 있어야, post에 있는 user_id에 붙여줄 수 있으니 여기에 위치!
// //실제로는 댓글의 id와 post의 id를 비교해서 같을 경우에는 바뀌지 않도록 처리해야함.
// //           const _noti_item = ref(
// //             realtime,
// //             `noti/${post.user_info.user_id}/list`
// //           );

// //           console.log(_noti_item);
// //           const add_db = {
// //             post_id: post.id,
// //             user_name: comment.user_name,
// //             image_url: post.image_url,
// //             insert_dt: comment.insert_dt,
// //           };
// //           set(_noti_item, add_db)
// //             .then(() => {
// //               const notiDB = ref(realtime, `noti/${post.user_info.user_id}`);
// //               update(notiDB, { read: false });
// //             })
// //             .catch((err) => {
// //               console.log("알림 저장에 실패했어요!");
// //             });
// //         }
// //       });
// //     });
// //     // update(notiDB, { read: false });
// //   };
// //   // dispatch()
// // };

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        // 댓글리스트를 매번 스토어에서 받아오는 것은 비효율적. 리덕스에 딕셔너리로 넣고 사용하자. let data = {[post_id]: com_list, ...}
        draft.comments[action.payload.post_id] = action.payload.comment;
      }),

    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.comments[action.payload.post_id].unshift(action.payload.comment);
      }),
    [EDIT]: (state, action) =>
      produce(state, (draft) => {
        const data = action.payload.content
        draft.comments.find((comment) => comment.postId === data.id);
      }),
  },
  initialState
);

const actionCreators = {
  getCommentDB,
  getComment,
  addComment,
  addCommentDB,
};

export { actionCreators };
