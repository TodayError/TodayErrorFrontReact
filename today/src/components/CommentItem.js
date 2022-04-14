import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Grid, Text, Button, Input } from "../elements";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { RES } from "../redux/modules/response";

import { AiOutlineCloseSquare, AiOutlineCheckSquare } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";

const CommentItem = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  const username = useSelector((state) => state.user.user); // state.user => {user: ~, is_login: false}

  const [is_edit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(props.comment);

  const onChange = (e) => {
    setEditValue(e.target.value);
  };

  //리덕스에 comment 값이 들어가나 봐야하고, 어떤 데이터 뽑을 수 있느냐에 따라 다르다
  const editComment = () => {
    console.log(props);
    if (!editValue) {
      window.alert("댓글을 입력해주세요.");
      return;
    }
    dispatch(
      commentActions.editCommentDB(props.commentId, editValue, setIsEdit)
    );
    setEditValue("");
    setIsEdit(false);
  };

  const editMode = () => {
    if (username !== props.userName) {
      window.alert("본인이 작성한 댓글이 아닙니다.");
      return;
    }
    setIsEdit(true);
    console.log(is_edit);
  };

  if (is_edit) {
    return (
      <Grid is_flex key={props.commentId}>
        <Grid is_flex width="100px">
          <Text color="black" bold>
            {props.userName}
          </Text>
        </Grid>
        <Grid is_flex margin="0px 30px">
          <Input defaultValue={props.comment} _onChange={onChange} />
        </Grid>
        <Button margin="5px" width="60px" text="완료" _onClick={editComment} />
        <Button
          width="60px"
          text="취소"
          _onClick={() => {
            setIsEdit(!is_edit);
            setEditValue(editValue);
          }}
        />
      </Grid>
    );
  }

  return (
    <Grid is_flex>
      <Grid is_flex width="100px">
        <Text color="black" bold>
          {props.userName}
        </Text>
      </Grid>
      <Grid is_flex margin="0px 30px">
        <Text color="black">{props.comment}</Text>
        <Text color="black">{props.createdAt}</Text>
      </Grid>
      {/* 유즈셀렉터로 들어오는 데이터가 뭔지 확인하고 바꿔야 될 듯 */}
      {is_login && username === props.userName ? (
        <Grid width="120px">
          <HiOutlinePencilAlt
            onClick={editMode}
            size="20"
            style={{
              margin: "4px 5px 0px 20px",
              cursor: "pointer",
            }}
          />
          <AiOutlineCloseSquare
            size="20"
            color="black"
            style={{ cursor: "pointer" }}
            onClick={() => {
              const result = window.confirm("댓글을 정말 삭제할까요?");
              if (result) {
                dispatch(commentActions.delCommentDB(props.commentId));
              }
            }}
          />
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
};

export default CommentItem;

// CommentItem.defaultProps = {
//   commentId: 0,
//   nickname: "인절미짱",
//   comment: "귀여운 스티치에요",
//   createdAt: "2022-04-04 19:00:00",
// };
