import { LoginForm, styles,FindIdModel,FindPassModel } from "@src/sections/login";
import { useState } from "react";

export default function Login() {
  const [findId, SetFindId] = useState(false);
  const [findPass, SetFindPass] = useState(false);
  return (
    <main className="min-h-screen">
      <div id="login" className="login">
        <div className="left">
          <div className="left-wrap">
            <h1 className="logo-pc">
              <img src="assets/images/icons/logo-pc.svg" alt="" />
            </h1>
          </div>
        </div>
        <div className="right">
          <h1 className="logo-mb noly-mb">
            <img src="assets/images/icons/logo-mb.svg" alt="" />
          </h1>
          <div className="right-wrap">
            <div className="title-wrap-login">
              <div className="title">
                WELCOME TO <strong>ICARUS</strong>
              </div>
              <div className="text">
                이카루스 광고주 페이지에 오신걸 환영합니다
              </div>
            </div>
            <LoginForm />
            <div className="link-wrap">
              <a className="link text">회원가입</a>
              <span className="bar text">|</span>
              <div onClick={() => SetFindId(true)} id="find_id_btn" className="link text">
                아이디 찾기
              </div>
              <span className="bar text">|</span>
              <div onClick={() => SetFindPass(true)} id="find_pw_btn" className="link text">
                비밀번호 찾기
              </div>
            </div>
          </div>
        </div>
      </div>
        {findId ? <FindIdModel SetFindId={SetFindId} /> : null}
        {findPass ? <FindPassModel SetFindPass={SetFindPass} /> : null}
    </main>
  );
}
