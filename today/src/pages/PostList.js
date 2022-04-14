import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postAcions } from "../redux/modules/post";

import Post from "../components/Post";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);

  React.useEffect(() => {
    dispatch(postAcions.getPostDB());
  }, []);
  return (
    <>
      {post_list.map((p, ix) => {
        return <Post key={ix} {...p} ix={ix} post_id={p.postId} />;
      })}
    </>
  );
};

export default PostList;
