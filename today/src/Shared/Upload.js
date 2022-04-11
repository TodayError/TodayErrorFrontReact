import React from "react";
import { Button, Grid } from "../elements";

const Upload = (props) => {
  const onChange = (e) => {
    const img = e.target.files[0];
    console.log(img);
    const formData = new FormData();
    console.log(formData);
    formData.append("file", img);
    for (const keyValue of formData) console.log(keyValue);
  };
  return (
    <>
      <Grid is_flex>
        <input type="file" onChange={onChange} />
        <Button width="150px">업로드</Button>
      </Grid>
    </>
  );
};

export default Upload;
