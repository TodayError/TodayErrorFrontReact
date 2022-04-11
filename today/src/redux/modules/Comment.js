import { createAction, handleActions } from "redux-actions";
import { actionCreators as postActions } from "./post";
import { produce } from "immer";

import axios from "axios";

//Action
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

//Action Crators
const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//초기값
const initialState = {
  list: {},
  is_loading: false,
};

//Middlewares
const addCommentDB = (postId, content) => {
  return function (dispatch, getState, { history }) {
    console.log("댓글추가한다!", postId);
    try {
      axios
        .post("http://localhost:8080/comment", {
          postId: postId,
          content: content,
        })
        .then(function (res) {
          if (res.data.result == true) {
            return window.alert("댓글등록이 완료되었습니다.");
          } else {
            window.alert("댓글등록을 다시 시도해 주세요.");
          }
        });
    } catch (err) {
      console.log(err);
      window.alert("다시 시도해 주세요.");
    }
  };
};

//   const post = getState().post.list.find((l) => l.id === postId);
//   comment = { ...comment, id: postId };
//firestore 의 갯수 +1하기

// 리덕스에는 post있을 때, +1하기
// if (post) {
//   dispatch(
//     postActions.editPost(post_id, {
//       comment_cnt: parseInt(post.comment_cnt) + 1,
//     })
//   );
//댓글추가되면 배지 알림
//post 가 있어야, post에 있는 user_id에 붙여줄 수 있으니 여기에 위치!
//실제로는 댓글의 id와 post의 id를 비교해서 같을 경우에는 바뀌지 않도록 처리해야함.
//           const _noti_item = ref(
//             realtime,
//             `noti/${post.user_info.user_id}/list`
//           );

//           console.log(_noti_item);
//           const add_db = {
//             post_id: post.id,
//             user_name: comment.user_name,
//             image_url: post.image_url,
//             insert_dt: comment.insert_dt,
//           };
//           set(_noti_item, add_db)
//             .then(() => {
//               const notiDB = ref(realtime, `noti/${post.user_info.user_id}`);
//               update(notiDB, { read: false });
//             })
//             .catch((err) => {
//               console.log("알림 저장에 실패했어요!");
//             });
//         }
//       });
//     });
//     // update(notiDB, { read: false });
//   };
//   // dispatch()
// };

// const getCommentFB = (post_id = null) => {
//   return function (dispatch, getState, { history }) {
//     if (!post_id) {
//       return;
//     }
//     const docRef = collection(db, "comment");
//     const q = query(
//       docRef,
//       where("post_id", "==", post_id),
//       orderBy("insert_dt", "desc")
//     );

//     getDocs(q)
//       .then((doc) => {
//         let list = [];
//         doc.forEach((doc) => {
//           let _post = doc.data();
//           list.push({ ..._post, id: doc.id });
//         });
//         dispatch(setComment(post_id, list));
//       })
//       .catch((err) => {
//         console.log("댓글정보를 가져올 수 없습니다.");
//         console.log(err);
//       });
//   };
// };

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // 댓글리스트를 매번 스토어에서 받아오는 것은 비효율적. 리덕스에 딕셔너리로 넣고 사용하자. let data = {[post_id]: com_list, ...}
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId].unshift(action.payload.comment);
      }),
  },
  initialState
);

const actionCreators = {
  //   getCommentFB,
  setComment,
  addComment,
  addCommentDB,
};

export { actionCreators };
