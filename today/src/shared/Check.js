export const nicknameCheck = (id) => {
  let _reg = /^[ㄱ-ㅎ|가-힣|0-9|]+.{2,11}/;

  return _reg.test(id);
};

export const pwdCheck = (pwd, nickname) => {
  if (!/^.{6,12}$/.test(pwd)) {
    alert("6-12자리 이내의 조합으로 사용해야 합니다.");
  } else if (pwd.search(nickname) > -1) {
    alert("비밀번호에 닉네임이 포함되었습니다.");

    return false;
  }
  return true;
};
