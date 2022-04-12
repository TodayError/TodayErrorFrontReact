import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, src, size } = props;
  const styles = { src: src, size: size };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === "rectangle") {
    return (
      <RectangleOuter>
        <RectangleInner {...styles}></RectangleInner>
      </RectangleOuter>
    );
  }

  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: "circle",
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
  size: 50,
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const RectangleOuter = styled.div`
  width: 100%;
  min-width: 250px;
`;
const RectangleInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  /* background-size: cover; */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

export default Image;
