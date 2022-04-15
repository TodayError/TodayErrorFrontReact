import React from "react";

import { Grid, Input, Button } from "../elements";

import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = React.useState();

  const { post_id } = props;
  const onChange = (e) => {
    setComment(e.target.value);
  };

  const write = () => {
    if (comment === "") {
      window.alert("댓글을 입력해주세요!");
      return;
    }
    dispatch(commentActions.addCommentDB(post_id, comment));
    setComment(""); //작성 누르면 인풋창 value 날리기
  };

  return (
    <React.Fragment>
      <Grid padding="16px" is_flex margin="20px">
        <Input
          placeholder="댓글내용을 입력해 주세요 :)"
          _onChange={onChange}
          value={comment} //value를 넣어주는 이유는, 작성버튼 누르면 텍스트를 인풋창에서 날려버리기 위함
          multiLine
        />
        <Button
          width="50px"
          margin="0px 2px 0px 2px"
          padding="20px 0px"
          _onClick={write}
        >
          작성
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default CommentWrite;
