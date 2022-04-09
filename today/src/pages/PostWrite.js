import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

const PostWrite = () => {
  return (
    <div>
      <Grid padding="16px">
        <Upload />
      </Grid>
      <Grid padding="16px">
        <Text margin="0px" size="24px" bold color="black">
          미리보기
        </Text>
        <Image shape="rectangle" />
      </Grid>

      <Grid padding="16px">
        <Input label="게시글 내용" placeholder="게시글 작성" multiLine />
      </Grid>
    </div>
  );
};

export default PostWrite;
