import axios from "axios";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const KakaoAuthHandle = (props) => {
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    const kakaoLogin = async () => {
      await axios
        .get(`http://localhost:3000/user/kakao/callback?code=${code}`)
        .then((res) => {
          console.log(res);
          sessionStorage.setItem("x_auth", res.headers.authorization);
          props.history.replace("/");
        });
    };
    kakaoLogin();
  }, [props.history]);

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
