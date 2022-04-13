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
  const Id = props.match.params.postid;
  console.log(Id);
  const post = useSelector((state) => state.post.list);
  console.log(post);
  console.log(post[0]);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actionCreators.getPostDB());
  }, []);

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

  const fileInput = React.useRef();

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(actionCreators.setPreview(reader.result));
    };
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
      <Grid padding="16px">
        <Image shape="rectangle" src={post[0].imageUrl} />
      </Grid>
      <Grid padding="16px">
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

          <InputStyle defaultValue={post[0].title} _onChange={changeTitle} />
          <TextStyle onChange={changeContents} defaultValue={post[0].content} />
        </Grid>
        <Grid center></Grid>
      </Grid>

      <Grid center>
        <Button text="수정 완료" margin="0px 2px" width="30%" />
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
