import Link from "next/link";
import React, { useState } from "react";
import {Step1, Step2, Step3, Step4} from "@src/sections/signup";

export type MembershipInformation = {
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
              <Step2
                  setMembershipInformation={setMembershipInformation}
                  onNextStep={nextFormStep} onPrevStep={prevFormStep} />
          ) : formStep === 3 ? (
              <Step3
                  onPrevStep={prevFormStep}
                  onNextStep={nextFormStep}
                  membershipInformation={membershipInformation} />
          ) : formStep === 4 ? (
              <Step4 />
          ) : null}
        </div>
    </main >
  );
}
