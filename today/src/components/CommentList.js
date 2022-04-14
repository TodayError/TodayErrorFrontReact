import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import CommentItem from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import CommentWrite from "./CommentWrite";
import { RES } from "../redux/modules/response";

const CommentList = (props) => {
  const dispatch = useDispatch();

  const { post_id } = props; //디테일 페이지에서 가지고 와야하는 프롭스
  console.log(post_id); // 아이디
  const data = useSelector((state) => state.comment);
  console.log(data);
  const comments = data.comments;
  console.log(comments[post_id]);

  // React.useEffect(() => {
  //   if (!comments[post_id]) {
  //     //코멘트 정보 없으면 불러오기
  //     dispatch(commentActions.getCommentDB(post_id));
  //   }
  // });
  // //코멘트 없거나, postId 없으면 아무것도 안 넘겨준다.
  // if (!comments[post_id] || !post_id) {
  //   return;
  // }

  return (
    <React.Fragment>
      <Grid padding=" 16px">
        {comments.map((comment) => {
          return (
            <CommentItem
              post_id={post_id}
              key={comment.commentId}
              id={comment.commentId}
              {...comment}
            />
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  // post_id: null,
};

export default CommentList;
