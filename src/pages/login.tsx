import { LoginForm, styles, FindIdModel, FindPassModel } from "@src/sections/login";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Login() {
  const [findId, SetFindId] = useState(false);
  const [findPass, SetFindPass] = useState(false);
  const router = useRouter();
  const handleSignup = () => {
    router.push("/signup");
  }

  return (
    <main className="min-h-screen">
      <div id="login" className="login">
        <div className="left">
          <div className="left-wrap">
            <h1 className="logo-pc">
              <Image src="/images/logo-pc.svg" alt='logo-pc' width={150} height={50} />

            </h1>
          </div>
        </div>
        <div className="right">
          <h1 className="logo-mb noly-mb">
            <Image src="/images/logo-mb.svg" alt='logo-mb' width={120} height={50} />
          </h1>
          <div className="right-wrap">
            <div className="title-wrap-login mb-[20px]">
              <div className="title">
                WELCOME TO <strong>ICARUS</strong>
              </div>
              <div className="text">
                이카루스 광고주 페이지에 오신걸 환영합니다
              </div>
              <div className="max-w-[380px] w-full h-[1px] bg-[#EEEEEE] mt-[16px]"></div>
            </div>
            <LoginForm />
            <div className="link-wrap gap-[10px]">
              <a href={'#'} className="link text" onClick={handleSignup}>회원가입</a>
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
      {findPass ? <FindPassModel setFindPass={SetFindPass} setFindId={SetFindId} /> : null}
    </main>
  );
}
