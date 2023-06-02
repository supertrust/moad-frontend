import React,{useState} from "react";
import PageOne from "@src/sections/cargo-owner-signup/steps/PageOne/Step1";
import PageTwo from "@src/sections/cargo-owner-signup/steps/PageTwo/Step2";
import PageThree from "@src/sections/cargo-owner-signup/steps/PageThree/Step3";
import Final from "@src/sections/cargo-owner-signup/steps/Final/Final";
import MultiStepProgressBar from "@src/sections/cargo-owner-signup/MultiStepProgressBar/MultiStepProgressBar";
const Form = () => {
  const [step, setStep] = useState("stepone");
  const nextStep = (step: any) => {
    setStep(step);
  };
  var stepPercentage = 0;
  if (step === "stepone") {
    stepPercentage = 16;
  } else if (step === "steptwo") {
    stepPercentage = 49.5;
  } else if (step === "stepthree") {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }
  const nextstepNumber = (stepNumber:  any) => {
    switch (stepNumber) {
      case "1":
        setStep("stepone");
        break;
      case "2":
        setStep("steptwo");
        break;
      case "3":
        setStep("stepthree");
        break;
      case "4":
        setStep("final");
        break;
      default:
        setStep("1");
    }
  };;
  return (
    <>
     {step != 'final' ? <MultiStepProgressBar step={step} onPageNumberClick={nextstepNumber} /> : ''}
      {
        {
          stepone: <PageOne onButtonClick={nextStep} />,
          steptwo: <PageTwo onButtonClick={nextStep} />,
          stepthree: <PageThree onButtonClick={nextStep} />,
          final: <Final/>,
        }[step]
      } 
    </>
  );
};

export default Form;
