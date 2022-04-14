import { createAction, handleActions } from "redux-actions";
import { actionCreators as postActions } from "./post";
import { produce } from "immer";

import axios from "axios";
import { apis } from "../../shared/apis";
import { useSelector } from "react-redux";

//Action
const ADD = "comment/ADD";
const LOAD = "comment/LOAD";
const DELETE = "comment/DELETE";
const EDIT = "comment/EDIT";
const SET_EDIT = "comment/SET_EDIT";

//Action Creators
const getComment = createAction(LOAD, (comments) => ({
  comments,
}));
const addComment = createAction(ADD, (comment) => ({
  comment,
}));
const editComment = createAction(EDIT, (commentId, newContent) => ({
  commentId,
  newContent,
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

const getCommentDB = (post_id) => {
  return function (dispatch, getState, { history }) {
    try {
      apis.getComment(post_id).then((res) => {
        console.log("로드", res);
        let commentList = res.data.body;
        console.log(commentList);
        const comment_list = [];
        commentList.forEach((c) => {
          comment_list.push({ is_edit: false, ...c });
        });
        console.log(comment_list);
        dispatch(getComment(comment_list));
      });
    } catch (err) {
      console.log(err);
      window.alert("댓글정보를 가져올 수 없습니다.");
    }
  };
};

const addCommentDB = (post_id, NewComment) => {
  return function (dispatch, getState, { history }) {
    console.log("댓글추가한다!", post_id, NewComment);
    try {
      apis.addComment(post_id, NewComment).then((res) => {
        console.log("추가", res);
        const data = res.data;
        const _data = getState((state) => state.user.user);
        const __newComment = {
          commentId: data.commentId,
          userName: _data.user.user,
          comment: NewComment,
          createdAt: data.createdAt,
        };

        dispatch(addComment(__newComment)); // newComment가 객체여야 unshift 가능함
      });
    } catch (err) {
      console.log(err);
      window.alert("댓글 추가 실패, 다시 시도해 주세요.");
    }
  };
};

const editCommentDB = (commentId, comment, setIsEdit) => {
  //post_id 삭제함!
  return function (dispatch, getState, { history }) {
    console.log("댓글 수정한다!", commentId);
    try {
      apis.editComment(commentId, comment).then((res) => {
        console.log("추가", res);
        const data = res.data;
        const _data = getState((state) => state.user.user);
        setIsEdit(false);
        const __editComment = {
          commentId: commentId,
          nickname: _data.user.user,
          comment: comment,
          createdAt: data.modifiedAt,
        };
        dispatch(editComment(commentId, __editComment)); // 시간정보도 받아야 될것 같은데..?
      });
    } catch (err) {
      console.log(err);
      window.alert("다시 시도해 주세요.");
    }
  };
};

const delCommentDB = (commentId) => (dispatch) => {
  console.log("댓글 삭제한다!", commentId);
  try {
    apis.delComment(commentId).then((res) => {
      console.log(res);
      dispatch(delComment(commentId));
    });
  } catch (err) {
    console.log(err);
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
        console.log(action.payload);
        draft.comments = [];
        draft.comments.push(...action.payload.comments);

        draft.comments = draft.comments.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.commentId === cur.commentId) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.commentId === cur.commentId)] = cur;
            return acc;
          }
        }, []);
        // console.log("리듀서 로드", draft.comments);
        // // // 댓글리스트를 매번 스토어에서 받아오는 것은 비효율적. 리덕스에 딕셔너리로 넣고 사용하자. let data = {[post_id]: com_list, ...}
        // //각각 게시글 방을 만들어준다고 생각
        // draft.comments[action.payload.post_id] = action.payload.comments;
        // // 콘솔찍기 위해 추가
      }),

    [ADD]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.comments.unshift(action.payload.comment);

        // console.log(draft.comments);
        // draft.comment[action.payload.post_id].unshift(
        //   action.payload.__newComment
        // );
      }),
    [EDIT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        let idx = draft.comments.findIndex((c) => {
          return parseInt(c.commentId) === parseInt(action.payload.commentId);
        });
        console.log("인덱스", idx);
        draft.comments[idx] = {
          ...draft.comments[idx],
          comment: action.payload.newContent.comment,
        };
        //------------------------------------------
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
        console.log(new_comment_list);
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
