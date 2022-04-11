import React from "react";
import styled from "styled-components";
import { Grid, Text, Button, Image, Input } from "../elements";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "@material-ui/core";
import { actionCreators } from "../redux/modules/post";

import Upload from "../shared/Upload";

const PostModify = (props) => {
  const history = useHistory();
  const params = useParams();
  console.log(params);
  const index = params.index;
  console.log(index);
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actionCreators.getPostDB());
  }, []);
  //   const [color, setColor] = useState()
  //   const colorChange = () => {
  //     post_list[index].title.complited !== true
  //   }
  return (
    <>
      <Grid padding="16px" is_flex>
        <Text margin="0px" size="24px" bold color="black">
          수정 페이지
        </Text>
        <button style={{ border: "none", backgroundColor: "transparent" }}>
          ✔️
        </button>
      </Grid>
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
        <InputStyle defaultValue={post_list[index].title} />
        <TextStyle label="게시글 내용" placeholder="게시글 작성" />
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
