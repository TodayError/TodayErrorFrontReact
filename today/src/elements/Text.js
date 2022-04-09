import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, children, margin, font } = props;
  const styles = { bold: bold, color: color, size: size, margin, font };
  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#FEFEFE",
  size: "14px",
  margin: false,
  font: "inherit",
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  font-family: "DungGeunMo";
`;

export default Text;
