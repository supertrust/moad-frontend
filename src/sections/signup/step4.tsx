import useAuth from "@src/hooks/useAuth";
import { logoMobileSize } from "@src/utils/values";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Step4 = () => {

    const { isPcOnly  } = useAuth()

    return (
        <div className="step04 step-section">
            <div className="left">
                <div className="left-wrap">
                    <h1 className="logo-pc">
                        <Image src="/images/logo-pc.svg" alt='logo-pc' width={150} height={50} />

                    </h1>
                </div>
            </div>
            <div className="right">
                {
                    !isPcOnly &&
                    <div>
                        <Image src="/images/logo-mb.svg" alt='logo-mb' width={logoMobileSize.width} height={
                            logoMobileSize.height
                        }/>
                    </div>
                }
                <div className="right-wrap">
                    <div className="right-content">
                        <div className="step-title">회원가입이 완료되었습니다.</div>
                        <div className="step-text">
                            로그인 버튼을 클릭 후 로그인 해주세요.
                        </div>
                        <Link href="/login" className="link link-step01">
                            로그인
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step4;
