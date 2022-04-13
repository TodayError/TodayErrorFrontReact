import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    bold,
    color,
    size,
    children,
    margin,
    font,
    _onClick,
    cursor,
    deco,
    textAlign,
    textShadow,
  } = props;

  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin,
    font,
    cursor,
    deco: deco,
    textAlign: textAlign,
    textShadow: textShadow,
  };
  return (
    <P onClick={_onClick} {...styles}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#FEFEFE",
  size: "14px",
  margin: false,
  font: "inherit",
  _onClick: () => {},
  cursor: "default",
  deco: "none",
  textAlign: "center",
  textShadow: "none",
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  font-family: "DungGeunMo";
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
`;

export default Text;
