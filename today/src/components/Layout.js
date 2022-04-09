import React from "react";
import styled from "styled-components";

function Layout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  padding-top: 70px;
`;

Layout.Main = styled.div`
  margin: 0 auto;
  margin-top: 2rem;
  width: 60%;
  position: relative;
  background: gray;
`;

export default Layout;
