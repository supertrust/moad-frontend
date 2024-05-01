import { FindIdModel, FindPassModel, LoginForm } from "@src/sections/login";
import { logoMobileSize } from "@src/utils/values";
import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import useAuth from "@src/hooks/useAuth";
import LanguageChange from "../components/common/LanguageChange/LanguageChange";

export default function Login() {

  const isPcOnly = useMediaQuery('(min-width:1025px)');
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
        <div className="right flex h-[100%] !flex-col" style={{justifyContent: "space-between"}}>
         <div className={'flex justify-end w-[100%] pt-4 pr-4 only-pc'}>
           <LanguageChange/>
         </div>
         <div className={clsx(isPcOnly? "" : 'flex w-[100%] h-[100%] !flex-col justify-between')}  style={{justifyContent: "space-between"}}>
           <div className={'logo-mb only-mb !flex justify-between w-[93%]'}>
             <h1 className="only-mb">
               <Image src="/images/logo-mb.svg" alt='logo-mb' width={logoMobileSize.width} height={logoMobileSize.height} />
             </h1>
             <LanguageChange/>
           </div>
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
          <div className={'invisible'}>.</div>
        </div>
      </div>
      {findId ? <FindIdModel SetFindId={SetFindId} /> : null}
      {findPass ? <FindPassModel setFindPass={SetFindPass} setFindId={SetFindId} /> : null}
    </main>
    </>
  );
}
