import React from "react";
import { Grid, Text, Button, Image } from "../elements";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/post";

const PostDetail = (props) => {
  const history = useHistory();
  const params = useParams();
  console.log(params);
  const index = params.index;
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list[index]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actionCreators.getPostDB());
  }, []);
  //   const delPost = () => {
  //     dispatch(actionCreators.deletePostDB(_post.id));
  //    history.replace("/")
  // };
  const onRemove = () => {
    if (window.confirm("정말 삭제합니까?")) {
      //  delPost();
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
          {post_list[index].nickname}
        </Text>
        <Grid is_flex width="auto">
          <Text color="black">{post_list[index].category}</Text>
          <Text color="black" margin="16px">
            {post_list[index].createdAt}
          </Text>
        </Grid>
      </Grid>
      <Grid>
        <Image shape="rectangle" src={post_list[index].imageUrl} />
      </Grid>
      <Grid padding="16px">
        <Text color="black">제목: {post_list[index].title}</Text>
        <Text color="black">내용: {post_list[index].content}</Text>
      </Grid>
      <Grid center>
        <Button
          margin="0px 2px"
          width="30%"
          text="게시글 수정"
          _onClick={() => {
            history.push("/PostModify/" + index);
          }}
        />
        <Button
          margin="0px 2px"
          width="30%"
          text="목록으로 가기"
          _onClick={() => {
            history.push("/");
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
