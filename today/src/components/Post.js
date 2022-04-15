import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Post = (props) => {
  console.log(props);
  const history = useHistory();
  return (
    <>
      <Wrap
        completed={props.completed}
        onClick={() => {
          history.push(`/PostDetail/${props.postId}`);
        }}
      >
        <Grid is_flex width="auto">
          <Text bold color="black" margin="16px" size="20px">
            {props.title}
          </Text>
          <Grid is_flex width="auto">
            <Text bold color="black" margin="16px">
              {props.category}
            </Text>
            <Text color="black">{props.nickName}</Text>
            <Text bold color="black" margin="16px">
              {props.modifiedAt}
            </Text>
          </Grid>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.imageUrl} />
        </Grid>
      </Wrap>
    </>
  );
};

const Wrap = styled.div` 
  border: ${(props) => (props.completed ? "5px solid #89c2d9" : #orange")};
  background-color: white;
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 0 10px 5px 5px rgba(0, 0, 0, 0.7);
`;

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
