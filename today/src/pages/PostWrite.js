import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/post";
import { useHistory } from "react-router-dom";

const PostWrite = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.image.preview);
  const [contents, setContents] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [completed, setCompleted] = React.useState(false);
  const [category, setCategory] = React.useState("React");

  const changeColor = () => {
    setCompleted(!completed);
    console.log(completed);
  };
  const changeLang = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };
  const changeContents = (e) => {
    setContents(e.target.value);
    console.log(e.target.value);
  };
  const changeTitle = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };

  const is_uploading = useSelector((state) => state.image.uploading);
  const fileInput = React.useRef();

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(actionCreators.setPreview(reader.result));
    };
  };

  const uploadDB = (e) => {
    e.preventDefault();
    let file = fileInput.current.files[0];
    dispatch(
      actionCreators.uploadDB({
        information: { title: title, content: contents, completed, category },
        file,
      })
    );
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
      <form onSubmit={uploadDB}>
        <Grid is_flex>
          <Grid padding="16px">
            <Text margin="0px" size="24px" bold color="black">
              작성페이지
            </Text>
          </Grid>

          <Grid width="50%">
            <input
              type="radio"
              name="language"
              value="React"
              onChange={changeLang}
            />
            React
            <input
              type="radio"
              name="language"
              value="Spring"
              onChange={changeLang}
            />
            Spring
            <input
              type="radio"
              name="language"
              value="Node.js"
              onChange={changeLang}
            />
            Node.js
          </Grid>
        </Grid>

        <Grid padding="16px">
          <input
            type="file"
            onChange={selectFile}
            ref={fileInput}
            // disabled={is_uploading}
          />
        </Grid>

        <Image
          src={preview ? preview : "http://via.placeholder.com/400x300"}
          shape="rectangle"
        />

        <Grid padding="16px">
          <Grid margin="10px">
            <input
              type="checkbox"
              name="completed"
              value="{color}"
              onChange={changeColor}
            />
            해결 여부
          </Grid>

          <Input
            placeholder="제목을 작성해주세요!"
            margin="10px"
            _onChange={changeTitle}
          />
          <TextStyle
            onChange={changeContents}
            label="게시글 내용"
            placeholder="게시글 내용을 작성해주세요!"
          />
        </Grid>
        <Grid center>
          <Button
            text="게시글 작성"
            _onClick={uploadDB}
            margin="0px 2px"
            width="30%"
          />
        </Grid>
      </form>
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
