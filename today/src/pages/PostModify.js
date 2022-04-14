import React from "react";
import styled from "styled-components";
import { Grid, Text, Button, Image, Input } from "../elements";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/post";

const PostModify = (props) => {
  const history = useHistory();

  const params = useParams();
  console.log(params);
  const postId = params.postId;
  console.log(postId);
  const is_edit = postId ? true : false;

  const post = useSelector((state) => state.post.list);
  console.log(post);
  console.log(post[0]);

  //is_login 기능 구현 전 본인인지 확인하는 코드
  // let _post = is_edit ? post.find((p) => p.id === Id) : null;
  // console.log(_post);

  // React.useEffect(() => {
  //   if (is_edit && !_post) {
  //     alert("포스트 정보가 없어요!");
  //     history.push("/");
  //     return;
  //   }
  //   if (is_edit) {
  //     dispatch(actionCreators.setPreview(_post))
  //   }
  // });

  const preview = useSelector((state) => state.image.preview);

  const dispatch = useDispatch();

  const [contents, setContents] = React.useState("");
  const [title, setTitle] = React.useState("");
  console.log(title);
  const [completed, setCompleted] = React.useState(false);
  const [category, setCategory] = React.useState("React");

  const changeChk = () => {
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

  const fileInput = React.useRef();
  const is_uploading = useSelector((state) => state.image.uploading);

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(actionCreators.setPreview(reader.result));
    };
  };
  // React.useEffect(() => {
  //   let file = fileInput.current.files;
  //   // if (title == "" || contents == "" || completed == "" || category == "") {
  //   //   window.alert("게시물을 다 넣어주세요!");
  //   //   return;
  //   // }
  //   dispatch(
  //     actionCreators.editPost({
  //       information: { title: title, content: contents, completed, category },
  //       file,
  //       postId,
  //     })
  //   );
  // }, []);

  const editPostDB = (e) => {
    e.preventDefault();
    let file = fileInput.current.files[0];
    if (title == "" || contents == "" || category == "") {
      window.alert("게시물을 다 넣어주세요!");
      return;
    }
    dispatch(
      actionCreators.editPostDB({
        information: { title: title, content: contents, completed, category },
        file,
        postId,
      })
    );
  };

  return (
    <>
      <Grid is_flex>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold color="black">
            수정페이지
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
        src={preview && preview ? preview : post[0].imageUrl}
        shape="rectangle"
      />

      <Grid padding="16px">
        <Grid padding="16px">
          <Grid margin="10px">
            <input
              type="checkbox"
              name="completed"
              value="{color}"
              onChange={changeChk}
            />
            해결 여부
          </Grid>

          <InputStyle defaultValue={post[0].title} onChange={changeTitle} />
          <TextStyle onChange={changeContents} defaultValue={post[0].content} />
        </Grid>
      </Grid>

      <Grid center>
        <Button
          text="수정 완료"
          margin="0px 2px"
          width="30%"
          _onClick={editPostDB}
        />
      </Grid>
    </>
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

const InputStyle = styled.input`
  border: 1px solid #212121;
  border-radius: 10px;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

export default PostModify;
