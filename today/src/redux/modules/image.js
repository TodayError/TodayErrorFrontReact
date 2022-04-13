import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// actions
const UPLOAD_IMG = "UPLOAD_IMG";
const SET_PREVIEW = "SET_PREVIEW";

// action creators
const uploadImg = createAction(UPLOAD_IMG, (image) => ({ image }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// initialState
const initialState = {
  image: false,
  uploading: false,
  preview: null,
};

const uploadDB = (files) => {
  return async function (dispatch, getState, { history }) {
    const formData = new FormData();
    formData.append("filetest", files);
    console.log(files);
    await axios({
      method: "post",
      url: "http://54.180.105.154/api/file/test",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        window.alert("사진이 업로드 되었습니다.");
        dispatch(uploadImg(response.data.imageUrl));
        console.log(response.data.imageUrl);
        setPreview(`${response.data.imageUrl}`);
      })
      .catch((err) => {
        window.alert("사진 업로드 실패");
      });
  };
};

//reducer
export default handleActions(
  {
    [UPLOAD_IMG]: (state, action) =>
      produce(state, (draft) => {
        draft.imageUrl = action.payload.imageUrl;
        draft.uploading = false;
        console.log(state, action);
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreator = {
  uploadImg,
  uploadDB,
  setPreview,
  //  deleteImgFB,
};

export { actionCreator };
