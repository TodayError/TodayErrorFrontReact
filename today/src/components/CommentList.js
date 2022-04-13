import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import CommentItem from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import CommentWrite from "./CommentWrite";
import { RES } from "../redux/modules/response";

const CommentList = (props) => {
  // const dispatch = useDispatch();
  // const comment_list = useSelector((state) => state.comments); // 어떤 데이터가 오는지 확인 필요
  // console.log(comment_list);
  // const { post_id } = props;

  //mockApi
  const { post_id } = props; //디테일 페이지에서 가지고 와야하는 프롭스
  console.log(post_id); // 아이디
  const comment_list = RES;
  const comments = comment_list[post_id].comments;
  console.log(comments); //코멘트 배열이 들어온다.
  const check = { ...comments };
  console.log(check);
  //mockApi

  // React.useEffect(() => {
  //   if (!comment_list[post_id]) {
  //     //코멘트 정보 없으면 불러오기
  //     dispatch(commentActions.getCommentDB(post_id));
  //   }
  // });
  // //코멘트 없거나, postId 없으면 아무것도 안 넘겨준다.
  // if (!comment_list[post_id] || !post_id) {
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
