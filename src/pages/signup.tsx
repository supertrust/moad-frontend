import Link from "next/link";
import React, { useState } from "react";
import {Step1, Step2, Step3} from "@src/sections/signup";

export interface MembershipInformation {
  email: string;
  password: string;
  confirm_password: string;
}

export default function SignUpModulePage() {
  const [formStep, setFormStep] = useState(1);
  const [membershipInformation, setMembershipInformation] = useState<MembershipInformation>(null)
  const nextFormStep = () => setFormStep((formStep) => formStep + 1);
  const prevFormStep = () => setFormStep((formStep) => formStep - 1);

  return (
    <main className="min-h-screen">
        <div id="sign_up">
          {formStep === 1 ? (
              <Step1 onNextStep={nextFormStep} />
          ) : formStep === 2 ? (
              <Step2 setMembershipInformation={setMembershipInformation}  onNextStep={nextFormStep} onPrevStep={prevFormStep} />
          ) : formStep === 3 ? (
              <Step3 onPrevStep={prevFormStep} onNextStep={nextFormStep} membershipInformation={membershipInformation} />
          ) : formStep === 4 ? (
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
          ) : null}
        </div>
    </main >
  );
}
