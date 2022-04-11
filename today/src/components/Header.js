import React from "react";
import styled from "styled-components";
// import Permit from "../shared/Permit";

import { Grid, Text, Button } from "../elements";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

// import { getCookie, deleteCookie } from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
// import NotiBadge from "./NotiBadge";

const Header = (props) => {
  //   const dispatch = useDispatch();
  //   const is_login = useSelector((state) => state.user.is_login);

  //   const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

  //   const is_session = sessionStorage.getItem(_session_key) ? true : false;
  //   console.log(is_session);

  //   if (is_login && is_session) {
  //     return (
  //       <React.Fragment>
  //         <Grid is_flex padding="4px">
  //           <Grid>
  //             <Text margin="0px" size="24px" bold>
  //               Hello Stranger :D
  //             </Text>
  //           </Grid>
  //           <Grid is_flex>
  //             <Button margin="0px 4px" width="100%" text="내정보"></Button>
  //             {/* <Button
  //               _onClick={() => {
  //                 history.push("/noti");
  //               }}
  //               width="100%"
  //               text="알림"
  //             ></Button> */}
  //             {/* <NotiBadge
  //               _onClick={() => {
  //                 history.push("/noti");
  //               }}
  //             /> */}
  //             <Button
  //               margin="0px 4px"
  //               width="100%"
  //               text="로그아웃"
  //               _onClick={() => {
  //                 dispatch(userActions.logoutFB());
  //               }}
  //             ></Button>
  //           </Grid>
  //         </Grid>
  //       </React.Fragment>
  //     );
  //   }

  //   // <Permit>
  //   //   <React.Fragment>
  //   //     <Grid is_flex padding="4px">
  //   //       <Grid>
  //   //         <Text margin="0px" size="24px" bold>
  //   //           헬로
  //   //         </Text>
  //   //       </Grid>
  //   //       <Grid is_flex>
  //   //         <Button text="내정보"></Button>
  //   //         <Button text="알림"></Button>
  //   //         <Button
  //   //           text="로그아웃"
  //   //           _onClick={() => {
  //   //             dispatch(userActions.logoutFB());
  //   //           }}
  //   //         ></Button>
  //   //       </Grid>
  //   //     </Grid>
  //   //   </React.Fragment>
  //   // </Permit>;

  return (
    <>
      <Grid is_flex>
        <hr style={{ margin: "5px 0px" }} />
        <Grid padding="20px 4px" is_flex>
          <Text margin="0px" size="40px" bold>
            항해 통신
          </Text>
        </Grid>
        <Menu to={"/post/React"}>React</Menu>
        <Menu to={"/post/Spring"}>Spring</Menu>
        <Menu to={"/post/Nodejs"}>Node.js</Menu>
        <Button
          style={{ cursor: "pointer" }}
          margin="0px 2px"
          width="30%"
          text="로그인"
          _onClick={() => {
            history.push("/login");
          }}
        ></Button>
        <Button
          style={{ cursor: "pointer" }}
          margin="0px 2px"
          width="30%"
          text="회원가입"
          _onClick={() => {
            history.push("/signup");
          }}
        ></Button>
      </Grid>
      <hr />
      <Grid margin="5px auto">
        <Text color="yellow" size="60px" margin="20px 0px">
          [오늘의 에러]
        </Text>
      </Grid>
    </>
  );
};

const Menu = styled(Link)`
  font-size: 30px;
  color: white;
  box-sizing: border-box;
  display: block;
  padding: 8px 8px;
  margin: 0px 20px;
  text-align: center;
`;

Header.defaultProps = {};

export default Header;
