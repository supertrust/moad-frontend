import Image from "next/image";
import React from "react";

const LoginModule = () => {
  return (
    <>
      <div id="login" class="login">
        <div class="left">
          <div class="left-wrap">
            <h1 class="logo-pc">
            <image
            src="/assets/images/icons/logo-pc.svg"
            alt="Logo"
          />
            </h1>
          </div>
        </div>
        <div class="right">
          <h1 class="logo-mb noly-mb">
          <image
            src="/assets/images/icons/logo-mb.svg"
            alt="Logo"
          />
          </h1>
          <div class="right-wrap">
            <div class="title-wrap">
              <div class="title">
                WELCOME TO <strong>ICARUS</strong>
              </div>
              <div class="text">이카루스 광고주 페이지에 오신걸 환영합니다</div>
            </div>
            <form action="" class="login-form" onsubmit="return Form_check();">
              <div class="input-wrap">
                <div class="desc">아이디 (이메일)</div>
                <input
                  type="text"
                  placeholder="이메일 입력"
                  name="email"
                  id="email"
                  class="user-input"
                />
              </div>
              <div class="input-wrap">
                <div class="desc">비밀번호</div>
                <i class="icon pw-show"></i>
                <input
                  type="password"
                  placeholder="비밀번호 입력"
                  name="password"
                  id="password"
                  class="user-input"
                />
              </div>
              <div class="login-utile-wrap">
                <div class="login-keep-wrap">
                  <label for="login_keep">
                    <input type="checkbox" id="login_keep" class="login-keep" />
                    <div class="chk-text">아이디기억하기</div>
                  </label>
                </div>
                <div class="login-error">
                  {/* <!--TODO 오류시 클래스에 active를 넣어주면 그에 맞는 오류 메세지가 활성화 됩니다.--> */}
                  <div class="error-text">아이디/비밀번호를 확인하세요</div>
                </div>
              </div>
              <button id="login_btn" class="login-btn disabled">
                로그인
              </button>
            </form>
            <div class="link-wrap">
              <a href="sign-up" class="link text">
                회원가입
              </a>
              <span class="bar text">|</span>
              <div id="find_id_btn" class="link text">
                아이디 찾기
              </div>
              <span class="bar text">|</span>
              <div id="find_pw_btn" class="link text">
                비밀번호 찾기
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModule;
