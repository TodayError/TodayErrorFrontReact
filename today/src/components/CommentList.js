import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import CommentItem from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionCreators as commentActions } from "../redux/modules/comment";
import CommentWrite from "./CommentWrite";
import { RES } from "../redux/modules/response";

const CommentList = (props) => {
  const { post_id } = props; //디테일 페이지에서 가지고 와야하는 프롭스
  const dispatch = useDispatch();
  const data = useSelector((state) => state.comment);
  console.log(data);
  const comment_list = data.comments;

  useEffect(() => {
    dispatch(commentActions.getCommentDB(props.post_id));
  }, []);

  return (
    <React.Fragment>
      <Grid padding=" 16px">
        {comment_list.map((comment, idx) => {
          return <CommentItem key={idx} {...comment} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  // post_id: null,
};

export default CommentList;
