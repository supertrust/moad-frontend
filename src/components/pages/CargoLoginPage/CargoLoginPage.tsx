import MobileLogo from "@src/components/icons/MobileLogo";
import React from 'react';
import {LoginForm} from "./LoginForm";
import styles from "./styles.module.scss"
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

function CargoLoginPage() {
    // const [findId, SetFindId] = useState(false);
    // const [findPass, SetFindPass] = useState(false);
    // const router = useRouter();
    // const handleSignup = () => {
    //     router.push("/signup");
    // }

    return (
        <main className="min-h-screen">
            <div id="login" className="login">
                <div className="left">
                    <div className="left-wrap">
                        <h1 className="logo-pc">
                            <Image src="/images/logo-pc.svg" alt='logo-pc' width={150} height={50}/>

                        </h1>
                    </div>
                </div>
                <div className="right">
                    <div className="right-wrap">
                        <div className={`${styles.logo} title-wrap-login`}>
                            <div className={`${styles.title} title`}>
                               <MobileLogo/>
                            </div>
                            <div className="text text-center">
                                <span className={styles['logo-text']}>이카루스 차주전용</span>
                            </div>
                        </div>
                        <LoginForm/>

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


export default CargoLoginPage;