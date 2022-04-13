import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    width,
    margin,
    padding,
    bg,
    children,
    center,
    borderLine,
    borderRadius,
    boxShadow,
    display,
  } = props;
  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    borderLine: borderLine,
    borderRadius: borderRadius,
    boxShadow: boxShadow,
    display: display,
  };
  return (
    <React.Fragment>
      <GridBox {...styles}>{children}</GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  borderLine: false,
  borderRadius: false,
  boxShadow: false,
  display: "block",
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin : ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color : ${props.bg};` : "")}
  ${(props) => (props.display ? `display : ${props.display};` : "")}
  ${(props) =>
    props.is_flex
      ? `display : flex; align-items: center; justify-content: space-between`
      : ""}
      ${(props) => (props.center ? `text-align: center` : "")}
      ${(props) =>
    props.borderLine ? `border-Line: ${props.borderLine};` : ""}
      ${(props) =>
    props.borderRadius ? `border-Radius: ${props.borderRadius};` : ""}
    ${(props) => (props.boxShadow ? `box-shadow: ${props.boxShadow}` : "")}
`;

export default Grid;
