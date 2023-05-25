import {FormProvider, RHFInput, useForm, yupResolver} from "@src/components/Form";
import React from "react";
import * as Yup from "yup";
import {PASSWORD_REGEX} from "@src/constants";
import {Button} from "react-bootstrap";
import {MembershipInformation} from "@src/pages/signup";
import Image from "next/image";

interface Step2Props {
    onPrevStep: () => void;
    onNextStep: () => void;
    setMembershipInformation: (MembershipInformation: MembershipInformation) => void;
}

const defaultValues: MembershipInformation = {
    email: "",
    password: "",
    confirm_password: "",
}

const RegisterSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .matches(
            PASSWORD_REGEX,
            "Password must be at least 8 characters with a combination of letters, numbers, and symbols"
        )
        .min(8, "Password must be at least 8 characters"),
    confirm_password: Yup.string()
        .required("Confirm Password is required")
        .oneOf(
            // @ts-ignore
            [Yup.ref("password"), null],
            "Passwords and Confirm password must match"
        ),
})

const Step2 = ({onPrevStep, onNextStep, setMembershipInformation}: Step2Props) => {
    const methods = useForm<MembershipInformation>({
        defaultValues,
        resolver: yupResolver(RegisterSchema)
    });
    const { handleSubmit } = methods;

    const onSubmit = handleSubmit(async (props) => {
        setMembershipInformation(props);
        onNextStep();
    })

    return (
        <div className="step02 step-section">
            <div className="left">
                <div className="left-wrap">
                    <h1 className="logo-pc">
                        <Image src="assets/images/icons/logo-pc.svg" alt="" />
                    </h1>
                </div>
            </div>
            <div className="right">
                <div className="right-wrap">
                    <div className="right-content">
                        <div onClick={onPrevStep} className="back-btn"></div>
                        <div className="step-title">
                            회원가입 정보를
                            <br />
                            입력해주세요
                        </div>
                        <div className="step-text">
                            회원여부 확인 및 가입을 진행합니다
                        </div>
                        <FormProvider methods={methods}>
                            <div className="user-info">
                            <RHFInput
                                type="text"
                                className="user-input"
                                placeholder="아이디"
                                name="email"
                                id="email"
                                label="아이디 (이메일)"
                            />
                            <RHFInput
                                type="password"
                                className="user-input"
                                name="password"
                                id="password"
                                label="비밀번호"
                                caption={
                                    <p className="pw-info-text">
                                        문자, 숫자, 기호를 조합하여 8자 이상을 사용하세요
                                    </p>
                                }
                            />
                            <RHFInput
                                type="password"
                                id="confirm_password"
                                className="user-input"
                                name="confirm_password"
                                placeholder="비밀번호 확인"
                                label="비밀번호 확인"
                                caption={
                                    <i className="icon pw-show"></i>
                                }
                            />
                            <Button
                                className="link link-step01"
                                onClick={onSubmit}
                            >
                              다음
                            </Button>
                        </div>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step2;
