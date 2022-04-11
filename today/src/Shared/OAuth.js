const CLIENT_ID = "6d89438f86e9a064625095430b549a4c";
const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao"; //경로 필요함

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
