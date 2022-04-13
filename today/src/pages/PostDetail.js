import React from "react";
import { Grid, Text, Button, Image } from "../elements";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/post";

import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

const PostDetail = (props) => {
  console.log(props);
  const history = useHistory();
  //아이디 값 찾아내기
  const params = useParams();

  // console.log(params);
  const Id = props.match.params.postid;
  console.log(Id);
  const post = useSelector((state) => state.post.list);
  console.log(post);
  console.log(post[0]);

  // let post_idx = post.findIndex((p) => p.id === post_Id);
  // // const post = post_list[post_idx];
  // console.log(post_idx);

  //코멘트 테스트 위해 추가함
  const is_login = useSelector((state) => state.user.is_login);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actionCreators.getDetailDB(Id));
  }, []);

  const delPost = () => {
    dispatch(actionCreators.deletePostDB(Id));
    // history.replace("/");
  };
  const onRemove = () => {
    if (window.confirm("정말 삭제합니까?")) {
      delPost();
    } else {
      alert("취소합니다.");
    }
  };
  return (
    <>
      <Text color="black" bold size="24px">
        상세페이지
      </Text>
      <Grid is_flex width="auto">
        <Text color="black" margin="16px" size="20px">
          {post[0].nickName}
        </Text>
        <Grid is_flex width="auto">
          <Text color="black">{post[0].category}</Text>
          <Text color="black" margin="16px">
            {post[0].createdAt}
          </Text>
        </Grid>
      </Grid>
      <Grid>
        <Image shape="rectangle" src={post[0].imageUrl} />
      </Grid>
      <Grid padding="16px">
        <Text color="black">제목: {post[0].title}</Text>
        <Text color="black">내용: {post[0].content}</Text>
      </Grid>
      <Grid>
        <CommentWrite post_id={props.postId} />
        <CommentList post_id={props.postId} />
      </Grid>
      <Grid center>
        <Button
          margin="0px 2px"
          width="30%"
          text="게시글 수정"
          _onClick={() => {
            history.push(`/PostModify/${props.Id}`);
          }}
        />

        <Button
          margin="0px 2px"
          width="30%"
          text="게시글 삭제"
          _onClick={onRemove}
        />
      </Grid>
    </>
  );
};

PostDetail.defaultProps = {
  postId: "1",
  nickname: "coooooodinnngg",
  title: "확장자명을 안적어서 생긴 오류",
  category: "리액트",
  createdAt: "2021-02-27 10:00:00",
  complited: false,
  imageUrl:
    "https://velog.velcdn.com/images/gagyeong/post/d1481a6f-0583-4610-b253-4a9c6efc03cf/image.png",
  content: "확장자 명을 꼭 적어주세요.. 1시간을 버렸답니다!",
};

export default PostDetail;
