import React from "react";

const LoginFormModule = (props) => {
  const {
    passwordValue,
    setPasswordValue,
    inputValue,
    setInputValue,
    handleLoginSubmit,
  } = props;

  return (
    <>
      <form action="" className="login-form">
        <div className="input-wrap">
          <div className="desc">아이디 (이메일)</div>
          <input
            type="text"
            placeholder="이메일 입력"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="user-input active"
          />
        </div>
        <div className="input-wrap">
          <div className="desc">비밀번호</div>
          <i className="icon pw-show"></i>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
            className="user-input active"
          />
        </div>
        <div className="login-utile-wrap">
          <div className="login-keep-wrap">
            <label for="login_keep">
              <input type="checkbox" id="login_keep" className="login-keep" />
              <div className="chk-text">아이디기억하기</div>
            </label>
          </div>
          <div className="login-error">
            <div className="error-text">아이디/비밀번호를 확인하세요</div>
          </div>
        </div>
        <button
          id="login_btn"
          className="login-btn active"
          onClick={handleLoginSubmit}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginFormModule;
