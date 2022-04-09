import React from "react";
import { Grid, Image, Text, Button } from "../elements";

const Post = (props) => {
  return (
    <>
      <Grid>
        <Grid is_flex width="auto">
          <Text bold color="black" margin="16px">
            {props.user_name}
          </Text>
          <Grid is_flex width="auto">
            <Text bold color="black" margin="16px">
              {props.insert_dt}
            </Text>
          </Grid>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>
        <Grid is_flex width="auto">
          <Text color="black" margin="16px">
            {props.complited}
          </Text>
        </Grid>
      </Grid>
    </>
  );
};

Post.defaultProps = {
  user_name: "coooooodinnngg",
  image_url:
    "https://velog.velcdn.com/images/gagyeong/post/d1481a6f-0583-4610-b253-4a9c6efc03cf/image.png",
  contents: "확장자명을 안적어서 생긴 오류입니다. 저처럼 덤벙대지 마세요!",
  insert_dt: "2021-02-27 10:00:00",
  complited: "해결완료",
  is_me: false,
};

export default Post;
