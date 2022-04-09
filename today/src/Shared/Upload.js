import React from "react";
import { Button, Grid } from "../elements";

const Upload = (props) => {
  return (
    <>
      <Grid is_flex>
        <input type="file" />
        <Button width="150px">업로드</Button>
      </Grid>
    </>
  );
};

export default Upload;
