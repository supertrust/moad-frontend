import Link from "next/link";
import React, { useState } from "react";
import { Step1, Step2, Step3, Step4 } from "@src/sections/signup";
import { RegisterPropsType } from "@src/types/auth";
import { File } from "buffer";
import Head from "next/head";
import useAuth from "@src/hooks/useAuth";

export default function SignUpModulePage() {
  const [formStep, setFormStep] = useState(1);
  const { dictionary:{ signup } } = useAuth();
  const [membershipInformation, setMembershipInformation] =
  useState<RegisterPropsType>({
      email: "",
      password: "",
      confirm_password: "",
      company_name: "",
      company_phone_number: "",
      business_registration_number: "",
      employee_name: "",
      employee_phone_number: "",
      employee_email: "",
      sector: "",
      contact_position: "",
      business_license: File,
      verify_business_registration_number: false,
    });

  const nextFormStep = () => setFormStep((formStep) => formStep + 1);
  const prevFormStep = () => setFormStep((formStep) => formStep - 1);

  return (
    <>
    <Head>
      <title>{signup.title}</title>
      <meta property="og:title" content={signup.title} key="title" />
    </Head>
    <main className="min-h-screen">
      <div id="sign_up">
        {formStep === 1 ? (
          <Step1 onNextStep={nextFormStep} />
        ) : formStep === 2 ? (
          <Step2
            setMembershipInformation={setMembershipInformation}
            onNextStep={nextFormStep}
            onPrevStep={prevFormStep}
          />
        ) : formStep === 3 ? (
          <Step3
            onPrevStep={prevFormStep}
            onNextStep={nextFormStep}
            membershipInformation={membershipInformation}
            setMembershipInformation={setMembershipInformation}
          />
        ) : formStep === 4 ? (
          <Step4 />
        ) : null}
      </div>
    </main>
    </>
  );
}
