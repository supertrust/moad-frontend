import { FindIdModel, FindPassModel, LoginForm } from "@src/sections/login";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Logo  from '@images/logo-blue.png';

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
              <Image src={Logo} alt='logo-pc' width={150} height={50} />
            </h1>
          </div>
        </div>
        <div className="right">
          <h1 className="logo-mb noly-mb">
            <Image src="/images/logo-mb.svg" alt='logo-mb' width={120} height={50} />
          </h1>
          <div className="right-wrap">
            <div className="title-wrap-login">
              <div className="title mb-4">
                이카루스 광고주 Admin
              </div>
              <div className="text-[16px] text-[#535A65] mb-5">
                이카루스 광고 관리자 페이지에 오신 것을 환영합니다.<br/>
                로그인 후 서비스를 이용해 주세요.
              </div>
            </div>
            <LoginForm enabledSubmit = {!findPass && !findId}/>
            {/* <div className="link-wrap gap-[10px]">
              <a href={'#'} className="link text" onClick={handleSignup}>회원가입</a>
              <span className="bar text">|</span>
              <div onClick={() => SetFindId(true)} id="find_id_btn" className="link text">
                아이디 찾기
              </div>
              <span className="bar text">|</span>
              <div onClick={() => SetFindPass(true)} id="find_pw_btn" className="link text">
                비밀번호 찾기
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {findId ? <FindIdModel SetFindId={SetFindId} /> : null}
      {findPass ? <FindPassModel setFindPass={SetFindPass} setFindId={SetFindId} /> : null}
    </main>
  );
}
