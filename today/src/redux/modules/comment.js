import { createAction, handleActions } from "redux-actions";
import { actionCreators as postActions } from "./post";
import { produce } from "immer";
import { RES } from "./response";

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
const getComment = createAction(LOAD, (post_id, comments) => ({
  post_id,
  comments,
}));
const addComment = createAction(ADD, (post_id, comment) => ({
  post_id,
  comment,
}));
const editComment = createAction(EDIT, (post_id, commentId, newContent) => ({
  post_id,
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

const getCommentDB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }

    try {
      apis.getComment(post_id).then((res) => {
        console.log("로드", res);
        let commentList = res.data;
        const comment_list = [];
        commentList.forEach((c) => {
          comment_list.push({ is_edit: false, ...c });
        });

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

        const user = useSelector((state) => state.user.user);
        const data = res.data;
        const __newComment = {
          commentId: data.commentId,
          nickname: user,
          comment: data.comment,
          createdAt: data.createdAt,
        };

        dispatch(addComment(post_id, __newComment)); // newComment가 객체여야 unshift 가능함
      });
    } catch (err) {
      console.log(err);
      window.alert("다시 시도해 주세요.");
    }
  };
};

const editCommentDB = (post_id, commentId, newContent, setIsEdit) => {
  return function (dispatch, getState, { history }) {
    console.log("댓글 수정한다!", post_id, commentId);
    try {
      apis.editComment(commentId, newContent).then((res) => {
        console.log("추가", res);
        setIsEdit(false);
        console.log(res);
        const data = res.data;

        dispatch(editComment(data.commentId, data.comment)); // 시간정보도 받아야 될것 같은데..?
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
        // 댓글리스트를 매번 스토어에서 받아오는 것은 비효율적. 리덕스에 딕셔너리로 넣고 사용하자. let data = {[post_id]: com_list, ...}
        //각각 게시글 방을 만들어준다고 생각
        draft.comments[action.payload.post_id] = action.payload.comments;
        // 콘솔찍기 위해 추가
        const list = useSelector((state) => state.comment.comments);
        console.log("코멘트 스테이트 확인", list);
      }),

    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.comments[action.payload.post_id].unshift(
          action.payload.__newComment
        );
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
