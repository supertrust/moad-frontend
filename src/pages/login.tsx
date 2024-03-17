import { FindIdModel, FindPassModel, LoginForm } from "@src/sections/login";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import useAuth from "@src/hooks/useAuth";

export default function Login() {
  const { dictionary:{ login } } = useAuth();
  const [findId, SetFindId] = useState(false);
  const [findPass, SetFindPass] = useState(false);
  const router = useRouter();
  const handleSignup = () => {
    router.push("/signup");
  }

  return (
    <>
    <Head>
      <title>{login.title}</title>
      <meta property="og:title" content={login.title} key="title" />
    </Head>
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
                {login.welcomeMsg}
              </div>
              <div className="max-w-[380px] w-full h-[1px] bg-[#EEEEEE] mt-[16px]"></div>
            </div>
            <LoginForm enabledSubmit = {!findPass && !findId}/>
            <button className='signup_btn' onClick={handleSignup} > {login.signupBtn} </button>
            <div className="link-wrap gap-[10px]">
              <div onClick={() => SetFindId(true)} id="find_id_btn" className="link text">
                {login.findIdBtn}
              </div>
              <span className="bar text">|</span>
              <div onClick={() => SetFindPass(true)} id="find_pw_btn" className="link text">
                {login.findPwBtn}
              </div>
            </div>
          </div>
        </div>
      </div>
      {findId ? <FindIdModel SetFindId={SetFindId} /> : null}
      {findPass ? <FindPassModel setFindPass={SetFindPass} setFindId={SetFindId} /> : null}
    </main>
    </>
  );
}
