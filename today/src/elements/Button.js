import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    _onClick,
    is_float,
    children,
    margin,
    width,
    padding,
    font,
    border,
    borderRadius,
    cursor,
  } = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    font,
    border,
    borderRadius,
    cursor: cursor,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  padding: "12px 0px",
  font: "inherit",
  border: false,
  borderRadius: false,
  cursor: "pointer",
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: #adb5bd;
  color: black;
  border: 1px solid black;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  font-family: "DungGeunMo";
  border-radius: 10px;
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #adb5bd;
  color: black;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50px;
  font-family: "DungGeunMo";
  border-radius: 10px;
`;

export default Button;
