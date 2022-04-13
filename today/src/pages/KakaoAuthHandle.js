import axios from "axios";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const KakaoAuthHandle = (props) => {
  console.log("여기들어왔어!");
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    dispatch(userActions.kakaoLogin(code));
  }, []);

  return (
    <>
      <Container>
        <CircularProgress />
      </Container>
    </>
  );
};

export default KakaoAuthHandle;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
