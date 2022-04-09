import React from "react";
import { Grid, Text, Button } from "../elements";
import Post from "../components/Post";

const PostList = () => {
  return (
    <>
      <Grid>
        <Text>여기는 포스트 리스트 즉 메인페이지</Text>
        <Post />
        <Button>포스트 작성</Button>
      </Grid>
    </>
  );
};

export default PostList;
