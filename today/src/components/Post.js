import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { useHistory } from "react-router-dom";

const Post = (props) => {
  const history = useHistory();
  return (
    <>
      <div
        style={{ backgroundColor: "#ca6702", marginTop: "30px" }}
        onClick={() => {
          history.push("/PostDetail/" + props.ix);
        }}
      >
        <Grid is_flex width="auto">
          <Text bold color="black" margin="16px">
            {props.title}
          </Text>
          <Grid is_flex width="auto">
            <Text bold color="black" margin="16px">
              {props.category}
            </Text>
            <Text bold color="black" margin="16px">
              {props.createdAt}
            </Text>
          </Grid>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.imageUrl} />
        </Grid>
      </div>
    </>
  );
};

Post.defaultProps = {
  nickname: "coooooodinnngg",
  title: "확장자명을 안적어서 생긴 오류입니다.",
  category: "리액트",
  createdAt: "2021-02-27 10:00:00",
  imageUrl:
    "https://velog.velcdn.com/images/gagyeong/post/d1481a6f-0583-4610-b253-4a9c6efc03cf/image.png",
  complited: false,
  postId: "1",
};

export default Post;
