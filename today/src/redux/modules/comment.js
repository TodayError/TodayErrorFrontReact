import { createAction, handleActions } from "redux-actions";
import { actionCreators as postActions } from "./post";
import { produce } from "immer";
import { RES } from "./response";

import axios from "axios";

//Action
const ADD = "comment/ADD";
const LOAD = "comment/LOAD";
const DELETE = "comment/DELETE";
const EDIT = "comment/EDIT";
const SET_EDIT = "comment/SET_EDIT";

//Action Creators
const getComment = createAction(LOAD, (post_id, comments) => ({
  post_id,
  comments,
}));
const addComment = createAction(ADD, (post_id, comment) => ({
  post_id,
  comment,
}));
const editComment = createAction(EDIT, (post_id, commentId, newComment) => ({
  post_id,
  commentId,
  newComment,
}));
const delComment = createAction(DELETE, (commentId) => ({ commentId }));

const setEdit = createAction(SET_EDIT, (post_id, commentId) => ({
  post_id,
  commentId,
}));

// const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//초기값
const initialState = {
  comment: null,
  comments: [],
  is_edit: false,
};

//Middlewares

const getCommentDB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }

    try {
      // const { data } = axios
      //   .get(`http://3.38.116.203/comment/${post_id}`)
      //   .then((res) => {
      //     console.log(res);
      //     let comments = res.data;
      //     dispatch(getComment(post_id, comments));
      //   });

      //mockApi
      const comments = RES[post_id].comments;
      dispatch(getComment(post_id, comments));
      //mockApi
    } catch (err) {
      console.log(err);
      window.alert("댓글정보를 가져올 수 없습니다.");
    }
  };
};

const addCommentDB = (post_id, comment) => {
  return function (dispatch, getState, { history }) {
    console.log("댓글추가한다!", post_id, comment);
    try {
      const { data } = axios.post("http://3.38.116.203/comment", {
        postId: post_id,
        content: comment,
      });
      
      const comment_list = getState().comments
      console.log("스테이트의 리스트보자", comment_list)
      data.forEach((c)=>{
        comment_list.push({is_edit: false, ...c.})
      })
      dispatch(addComment(post_id, data));

      // //mock
      // const username = getState().user.user;
      // const comment_list = RES[post_id].comments;
      // const NewComment = {
      //   comnentId: 111,
      //   nickname: username,
      //   comment: comment,
      //   createdAt: "22-04-13",
      //   is_edit: false,
      // };

      // console.log(NewComment);
      // comment_list.unshift(NewComment);
      // console.log(comment_list); //추가는 되고 있는데.. 왜 unshift를 못읽는다고 구래?

      // dispatch(addComment(post_id, NewComment));
      // //mock
    } catch (err) {
      console.log(err);
      window.alert("다시 시도해 주세요.");
    }
  };
};

const editCommentDB = (post_id, commentId, newComment, setIsEdit) => {
  return function (dispatch, getState, { history }) {
    console.log("댓글 수정한다!", post_id, commentId);
    try {
      axios
        .post(`http://3.38.116.203/comment/${commentId}`, {
          content: newComment,
        })
        .then((res) => {
          setIsEdit(false);
          console.log(res);
          const data = res.data;

          dispatch(editComment(post_id, commentId, newComment));
        });
    } catch (err) {
      console.log(err);
      window.alert("다시 시도해 주세요.");
    }
  };
};

const delCommentDB = (post_id, commentId) => (dispatch) => {
  console.log("댓글 삭제한다!", post_id, commentId);
  try {
    axios.delete(`http://3.38.116.203/comment/${commentId}`).then((res) => {
      console.log(res);
      dispatch(delComment(commentId));
    });
  } catch (err) {
    console.log(err);
    window.alert("다시 시도해 주세요.");
  }
};
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
        //각각 게시글 방을 만들어준다고 생각
        draft.comments[action.payload.post_id] = action.payload.comments;
      }),

    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.comments[action.payload.post_id].unshift(action.payload.comment);
      }),
    [EDIT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.comments.findIndex((c) => {
          return parseInt(c.commentId) === parseInt(action.payload.commentId);
        });

        draft.comments[idx] = {
          ...draft.comments[idx],
          comment: action.payload.NewComment,
        };

        // console.log(action.payload); //post_id, commentId, newComment 확인해보기
        // const data = action.payload.newComment; //

        // draft.comments.map((comment, idx) => {
        //   if (comment.commentId === data.commentId) {
        //     return (draft.comments[idx] = data);
        //   } else {
        //     return comment;
        //   }
        // });
      }),
    [SET_EDIT]: (state, action) =>
      produce(state, (draft) => {
        const comment_list = draft.comments[action.payload.post_id];
      }),
    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        const new_comment_list = draft.comments.filter((c) => {
          return parseInt(action.payload.commentId) !== c.commentId;
        });
        draft.comments = new_comment_list;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentDB,
  getComment,
  addComment,
  addCommentDB,
  editCommentDB,
  delCommentDB,
};

export { actionCreators };
