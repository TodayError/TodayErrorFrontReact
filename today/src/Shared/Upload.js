import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator as imageActions } from "../redux/modules/image";

const Upload = (props) => {
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.image.uploading);
  const fileInput = React.useRef();

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadDB = (e) => {
    e.preventDefault();
    let image = fileInput.current.files[0];
    dispatch(imageActions.uploadDB(image));
  };

  return (
    <>
      <form onSubmit={uploadDB}>
        <input
          type="file"
          onChange={selectFile}
          ref={fileInput}
          // disabled={is_uploading}
        />
        <button>업로드하기</button>
      </form>
    </>
  );
};

export default Upload;
