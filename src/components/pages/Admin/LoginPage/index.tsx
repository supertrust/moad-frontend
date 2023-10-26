
import Image from "next/image";
import Logo  from '@images/logo-blue.png';
import LoginForm from "./component/LoginForm";
import clsx from "clsx";

export default function AdminLoginPage () {

  return (
    <main className="min-h-screen">
      <div id="login" className="login">
        <div className={clsx(
            // "left",
            "h-full w-[50%] bg-no-repeat",
            "bg-[url('/images/img-login-blue.png')] bg-center "
        )}>
          <div className="left-wrap">
            <h1 className="absolute top-16 left-12">
              <Image src={Logo} alt='logo-pc' width={150} height={50} />
            </h1>
          </div>
        </div>
        <div className="right">
          <h1 className="logo-mb noly-mb">
            <Image src={Logo} alt='logo-mb' width={120} height={50} />
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
            <LoginForm enabledSubmit = {true}/>
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
    </main>
  );
}
