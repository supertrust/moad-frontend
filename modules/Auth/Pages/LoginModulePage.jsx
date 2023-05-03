import React from "react";
import LoginFormModule from "../Components/LoginFormModule";

export default function LoginModulePage() {

  return (
    <div id="login" className="login">
    <div className="left">
        <div className="left-wrap">
            <h1 className="logo-pc">
                <img src="assets/images/icons/logo-pc.svg" alt=""/>
            </h1>
        </div>
    </div>
    <div className="right">
        <h1 className="logo-mb noly-mb">
            <img src="assets/images/icons/logo-mb.svg" alt=""/>
        </h1>
        <div className="right-wrap">
            <div className="title-wrap">
                <div className="title">
                    WELCOME TO <strong>ICARUS</strong>
                </div>
                <div className="text">
                    이카루스 광고주 페이지에 오신걸 환영합니다
                </div>
            </div>
            <LoginFormModule
          />
            <div className="link-wrap">
                <a className="link text">회원가입</a>
                <span className="bar text">|</span>
                <div id="find_id_btn" className="link text">아이디 찾기</div>
                <span className="bar text">|</span>
                <div id="find_pw_btn" className="link text">비밀번호 찾기</div>
            </div>
        </div>
    </div>
    </div>
  );
}