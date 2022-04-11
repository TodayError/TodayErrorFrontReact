import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import styled from "styled-components";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators } from "../redux/modules/post";
import { Checkbox } from "@material-ui/core";

const PostWrite = (props) => {
  const history = useHistory();
  const [contents, setContents] = React.useState("");
  const [title, setTitle] = React.useState("");
  const fileInput = React.useRef();
  const chageContents = (e) => {
    setContents(e.target.value);
    console.log(e.target.value);
  };
  const changeTitle = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };
  // const selectFile = (e) => {
  //   //const file = is_edit? "http://3.35.233.188/"+_post.thumbnail:fileInput.current.files[0];
  //   const file = fileInput.current.files[0];
  //   const reader = new FileReader();

  //   console.log(file);
  //   reader.readAsDataURL(file);

  //   reader.onloadend = () => {
  //     dispatch(actionCreators.setPreview(reader.result));
  //   };
  // };
  const dispatch = useDispatch();
  const addPost = () => {
    if (title == "" || contents == "") {
      window.alert("게시물을 다 넣어주세요!");
      return;
    }
    dispatch(actionCreators.addPostDB({ title: title, content: contents }));
    // history.push("/");
  };
  // 로그인 기능 구현 시 활성화
  // const is_login = useSelector((state) => state.user.is_login);
  // const history = useHistory();
  // if (!is_login) {
  //   return (
  //     <Grid center>
  //       <Text color="#fb5607" size="32px" bold>
  //         잠깐!
  //       </Text>
  //       <Text color="black" size="16px">
  //         로그인 후에만 글을 쓸 수 있습니다.
  //       </Text>
  //       <Button
  //         _onClick={() => {
  //           history.replace("/");
  //         }}
  //       >
  //         로그인 하러가기
  //       </Button>
  //     </Grid>
  //   );
  // }

  return (
    <div>
      <Grid padding="16px">
        <Upload />
      </Grid>
      <Grid padding="16px" is_flex>
        <Text margin="0px" size="24px" bold color="black">
          미리보기
        </Text>
        <button style={{ border: "none", backgroundColor: "transparent" }}>
          ✔️
        </button>
      </Grid>
      <Image shape="rectangle" />
      <Grid padding="16px">
        <Input
          placeholder="제목을 작성해주세요!"
          margin="10px"
          _onChange={changeTitle}
        />
        <TextStyle
          onChange={chageContents}
          label="게시글 내용"
          placeholder="게시글 내용을 작성해주세요!"
        />
      </Grid>
      <Grid center>
        <Button
          text="게시글 작성"
          _onClick={addPost}
          margin="0px 2px"
          width="30%"
        />
      </Grid>
    </div>
  );
};

const TextStyle = styled.textarea`
  border: 1px solid #212121;
  border-radius: 10px;
  width: 100%;
  height: 300px;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default PostWrite;
