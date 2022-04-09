export const nicknameCheck = (nickname) => {
  let _reg = /^[0-9a-zA-Z]{3,10}/;

  return _reg.test(nickname);
};

export const pwdCheck = (pwd, nickname) => {
  if (!/^.{6,12}$/.test(pwd)) {
    alert("6-12자리 이내의 조합으로 사용해야 합니다.");
  } else if (pwd.search(nickname) > -1) {
    alert("비밀번호에 아이디가 포함되었습니다.");

    return false;
  }
  return true;
};
