export const RESP = {
  POSTS: {
    ok: true,
    result: [
      {
        title: "항해 하세요!",
        content: "99일간 떠나는 개발 여행..",
        user_id: 35,
      },
      {
        title: "저는 초밥을 좋아해요",
        content: "특히 연어 초밥",
        user_id: 12,
      },
    ],
  },
  USERS: {
    ok: true,
    result: [
      {
        name: "김예지",
        email: "yj.kim@teamsparta.co",
        passwd: "MTIzNA==",
      },
      {
        name: "윤지용",
        email: "jy.yoon@teamsparta.co",
        passwd: "MTIzNDEyMzQxMjM0",
      },
    ],
  },
  LOGIN: {
    ok: true,
    result: {
      user: {
        token: "eyJ0eXAi...",
        name: "김항해",
      },
    },
  },
};
