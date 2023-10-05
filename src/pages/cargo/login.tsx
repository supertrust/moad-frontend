import { LoginForm, styles } from "@src/sections/cargo-owner-login";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function CargOwnerLogin() {
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
          <div className="right-wrap">
            <div className={`${styles.logo} title-wrap-login`}>
              <div className={`${styles.title} title`}>
              <Image src="/images/logo-mb.svg" alt='logo-mb' width={200} height={50} />
              </div>
              <div className="text text-center">
              이카루스 차주전용
              </div>
            </div>
            <LoginForm />
            {/* <div className="link-wrap">
              <a href={'#'} className="link text" onClick={handleSignup}>회원가입</a>
              <span className="bar text">|</span>
              <div onClick={() => SetFindPass(true)} id="find_pw_btn" className="link text">
                비밀번호 찾기
              </div>
            </div> */}
            <div className={styles.join_section}>
              <p>회원가입</p>
              <span>|</span>
              <p>비밀번호 찾기</p>
            </div>

          </div>
        </div>
      </div>
      {/* {findId ? <FindIdModel SetFindId={SetFindId} /> : null}
      {findPass ? <FindPassModel setFindPass={SetFindPass} setFindId={SetFindId} /> : null} */}
    </main>
  );
}
