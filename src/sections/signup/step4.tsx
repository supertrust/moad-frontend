import Link from "next/link";
import React from "react";

const Step4 = () => {
    return (
        <div className="step04 step-section">
            <div className="left">
                <div className="left-wrap">
                    <h1 className="logo-pc">
                        <img src="assets/images/icons/logo-pc.svg" alt="" />
                    </h1>
                </div>
            </div>
            <div className="right">
                <div className="right-wrap">
                    <div className="right-content">
                        <div className="step-title">회원가입이 완료되었습니다</div>
                        <div className="step-text">
                            로그인 버튼을 클릭 후 로그인 해주세요
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
