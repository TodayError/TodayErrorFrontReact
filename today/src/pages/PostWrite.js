import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators } from "../redux/modules/post";

const PostWrite = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.post.preview);
  console.log(preview);
  const [contents, setContents] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [completed, setCompleted] = React.useState(false);
  const [category, setCategory] = React.useState("React");
  const [imgBase64, setImgBase64] = React.useState([]);
  const [file, setFile] = React.useState([]);

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

  const addPost = () => {
    if (title == "" || contents == "" || category == "" || file == null) {
      window.alert("게시물을 다 넣어주세요!");
      return;
    }
    dispatch(
      actionCreators.addPostDB({
        information: {
          title: title,
          content: contents,
          completed,
          category,
        },
        file: fileInput.current.files[0].name,
      })
    );
  };
  // file: fileInput.current.files[0] ? fileInput.current.files[0] : null,
  const fileInput = React.useRef();
  const selectFile = (e) => {
    // console.log(e);
    // console.log(e.target);
    // console.log(e.target.files[0]);
    // console.log(fileInput.current.files[0]);
    // const formData = new FormData();
    // formData.append(
    //   "photo",
    //   fileInput.current.length && fileInput.current.files[0].uploadedFile
    // );
    // setFile(e.target.files);
    // setImgBase64([]);
    // for (var i = 0; i < e.target.files.length; i++) {
    //   if (e.target.files[i]) {
    //     let reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
    //     // 파일 상태 업데이트
    //     reader.onloadend = () => {
    //       // 2. 읽기가 완료되면 아래코드가 실행됩니다.
    //       const base64 = reader.result;
    //       console.log(base64);
    //       // dispatch(actionCreators.setFile(reader.result));
    //       if (base64) {
    //         //  images.push(base64.toString())
    //         var base64Sub = base64.toString();
    //         setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
    //         //  setImgBase64(newObj);
    //         // 파일 base64 상태 업데이트
    //         //  console.log(images)
    //       }
    //     };
    //   }
    // }

    const file = fileInput.current.files[0];
    const reader = new FileReader();
    console.log(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(actionCreators.setPreview(reader.result));
    };
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
        <Grid is_flex>
          <form name="photo" encType="multipart/form-data">
            <input
              type="file"
              name="photo"
              onChange={selectFile}
              ref={fileInput}
            />
            {/* <Button width="50px" margin="0px 2px 0px 2px" _onClick={() => {}}>
            업로드
          </Button> */}
          </form>
        </Grid>
      </Grid>
      {/* {imgBase64.map((item, i) => {
        return (
          <img
            key={i}
            className="d-block w-100"
            src={item}
            alt="First slide"
            style={{ width: "100%", height: "550px" }}
          />
        );
      })} */}
      <Image src={preview} shape="rectangle" />
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
