import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Text from "./Text";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit,
    margin,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextArea
          value={value}
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
          margin={margin}
        />
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <p margin="0px">{label}</p>}
        {is_submit ? (
          <ElInput
            margin={margin}
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
          />
        ) : (
          <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
        )}
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  is_submit: false,
  margin: false,
  onSubmit: () => {},
  _onChange: () => {},
};

const ElTextArea = styled.textarea`
  border: 1px solid #212121;
  border-radius: 10px;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const ElInput = styled.input`
  border: 1px solid #212121;
  border-radius: 10px;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

export default Input;
