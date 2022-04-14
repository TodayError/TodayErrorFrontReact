import React from "react";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

const CommentTest = (props) => {
  const post_id = "아이디";
  return (
    <>
      <CommentWrite post_id={post_id} />
      <CommentList post_id={post_id} />
    </>
  );
};

CommentTest.defaultProps = {
  post_id: "아이디",
};

export default CommentTest;
