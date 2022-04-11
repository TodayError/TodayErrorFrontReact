import React from "react";
import { Grid, Image, Text } from "../elements";
import { RESP } from "../redux/modules/response";

import { useDispatch, useSelector } from "react-redux";
// import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentList = (props) => {
  // const dispatch = useDispatch();
  // const comment_list = useSelector((state) => state.comment.list);

  // const { postId } = props;

  // React.useEffect(() => {
  //   if (!RESP[post_id]) {
  //     dispatch(comm?entActions.getCommentFB(post_id));
  //   }
  // });

  // if (!comment_list[post_id] || !post_id) {
  //   return null;
  // }

  return (
    <React.Fragment>
      <Grid padding=" 16px">
        {RESP.map((c) => {
          return <CommentItem key={c.postId} {...c} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  post_id: null,
};

export default CommentList;

const CommentItem = (props) => {
  const { nickname, postId, content, createdAt } = props;
  return (
    <Grid is_flex>
      <Grid is_flex width="100px">
        <Text color="black" bold>
          {nickname}
        </Text>
      </Grid>
      <Grid is_flex margin="0px 30px">
        <Text color="black" margin="0px">
          {content}
        </Text>
        <Text color="black" margin="0px">
          {createdAt}
        </Text>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  nickname: "인절미짱",
  postId: 1,
  content: "귀여운 스티치에요",
  createdAt: "2022-04-04 19:00:00",
};
