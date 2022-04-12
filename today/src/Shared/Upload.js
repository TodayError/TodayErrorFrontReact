import React from "react";
import { Button, Grid } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/post";

const Upload = (props) => {
  const dispatch = useDispatch();
  const fileInput = React.useRef();

  const selectFile = (e) => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.files[0]);
    console.log(fileInput.current.files[0]);
    const file = fileInput.current.files[0];
    const reader = new FileReader();
    console.log(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(actionCreators.setPreview(reader.result));
    };
  };

  // const fileInput = React.useRef();
  // // const selectFile = (e) => {
  //   //const file = is_edit? "http://3.35.233.188/"+_post.thumbnail:fileInput.current.files[0];
  //   const file = fileInput.current.files[0];
  //   const reader = new FileReader();

  //   console.log(file);
  //   reader.readAsDataURL(file);s

  //   reader.onloadend = () => {
  //     dispatch(actionCreators.setPreview(reader.result));
  //   };
  // };

  // const onChange = (e) => {
  //   const img = e.target.files[0];
  //   console.log(img);
  //   const formData = new FormData();
  //   console.log(formData);
  //   formData.append("file", img);
  //   for (const keyValue of formData) console.log(keyValue);
  // };

  // const UploadDB = () => {
  //   let image = fileInput.current.files[0];
  // };
  return (
    <>
      <Grid is_flex>
        <input type="file" onChange={selectFile} ref={fileInput} />
        {/* <Button width="50px" margin="0px 2px 0px 2px" >
          업로드
        </Button> */}
      </Grid>
    </>
  );
};

export default Upload;
