import {FormProvider, RHFInput, useForm, yupResolver} from "@src/components/Form";
import MyButton from "@src/components/Button";
import React, {useState} from "react";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {useVerifyInput} from "@src/apis/auth";
import useAuth from "@src/hooks/useAuth";
import {Button, Modal} from "react-bootstrap";
import {MembershipInformation} from "@src/pages/signup";

interface Step3Props {
    onPrevStep: () => void;
    onNextStep: () => void;
    membershipInformation: MembershipInformation;
}

const Step3 = ({onPrevStep, onNextStep, membershipInformation}: Step3Props) => {
    const { mutateAsync: verifyInput } = useVerifyInput();
    const { register } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const ModalhandleClose = () => setShowModal(false);
    const ModalhandleShow = () => setShowModal(true);

    const defaultValues = {
        company_name: "",
        company_phone_number: "",
        business_registration_number: "",
        employee_name: "",
        employee_phone_number: "",
        employee_email: "",
        sector: "",
        business_license: null,
        verify_business_registration_number: null,
    }

    const RegisterSchema = Yup.object({
        company_name: Yup.string().required("Company Name is required"),
        employee_name: Yup.string()
            .required("Employee Name is required")
            .max(10, "The employee name must not be greater than 10 characters."),
        company_phone_number: Yup.string()
            .required("Company Phone is required")
            .matches(/^[0-9]{11}$/, "Should be 11 digits"),
        employee_phone_number: Yup.string()
            .required("Employee Phone is required")
            .matches(/^[0-9]{11}$/, "Should be 11 digits"),
        business_registration_number: Yup.string()
            .required("Business Registration Number is required")
            .matches(/^[0-9]{10}$/, "Should be 10 digits"),
        verify_business_registration_number: Yup.boolean().required('Please verify business registration number'),
        employee_email: Yup.string()
            .email("Invalid email")
            .required("Employee Email is required"),
        business_license: Yup.mixed()
            .required("Please upload your business license.")
            .test(
                "fileFormat",
                "Only .doc, .docx, .pdf, .jpg, .jpeg, .png files are allowed",
                (value: any) => {
                    if (value) {
                        return [
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            "application/pdf",
                            "image/jpeg",
                            "image/png",
                        ].includes(value.type);
                    }
                    return true;
                }
            )
            .test("fileSize", "File size should be less than 10MB", (value: any) => {
                if (value) {
                    return value.size <= 10 * 1024 * 1024;
                }
                return true;
            }),
    })
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(RegisterSchema)
    });
    const { handleSubmit, formState: { isSubmitting, errors }, getValues, setValue } = methods;

    const _verifyInput = async (key: string, value: string) => {
        await verifyInput({ key, value }, {
            onSuccess: () => {
                setValue('verify_business_registration_number', true);
                toast.success("국세청에 등록된 사업자등록번호입니다.");
            },
            onError: (error) => {
                console.log(error);
                ModalhandleShow();
            }
        });
    };

    const onSubmit = handleSubmit(async (props) => {
        try {
            console.log('{...membershipInformation, ...props}', {...props.business_license} )
            await register({
                ...membershipInformation,
                ...props,
                business_license: {
                    lastModified: props.business_license.lastModified,
                    name: props.business_license.name,
                    size: props.business_license.size,
                    type: props.business_license.type,
                    webkitRelativePath: props.business_license.webkitRelativePath,
                }
            });
            // onNextStep();
            // toast("User registered successfully", { type: "success" });
        } catch (error: any) {
            toast(error?.message || "Something went wrong Please try again later", {
                type: "error",
            });
        }
    })

    return (
        <div className="step03 step-section">
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
                        <div onClick={onPrevStep} className="back-btn"></div>
                        <div className="step-title">회사 정보를 입력해주세요</div>
                        <div className="step-text">
                            기입정보를 입력 후 완료버튼을 눌러주세요
                        </div>
                        <div className="user-info">
                            <FormProvider methods={methods}>
                                <RHFInput
                                    wrapperClassName="company-name"
                                    label="회사명"
                                    required
                                    type="text"
                                    id="company_name"
                                    name="company_name"
                                    className="company-input"
                                    placeholder="회사명 입력"
                                    spellCheck="false"
                                    data-ms-editor="true"
                                    caption={
                                        <div className="error-text">
                                            이미 사용중인 회사명입니다
                                        </div>
                                    }
                                />
                                <RHFInput
                                    wrapperClassName="company-tel"
                                    label="회사 전화번호"
                                    required
                                    type="text"
                                    id="company_phone_number"
                                    name="company_phone_number"
                                    className="company-input"
                                    placeholder="회사 전화번호 입력"
                                    spellCheck="false"
                                    data-ms-editor="true"
                                    caption={
                                        <div className="error-text">
                                            이미 사용중인 전화번호입니다
                                        </div>
                                    }
                                />
                                <RHFInput
                                    wrapperClassName="manager-name"
                                    label="담당자 성함"
                                    required
                                    type="text"
                                    id="employee_name"
                                    name="employee_name"
                                    className="company-input"
                                    placeholder="담당자 성함 / 직위 입력"
                                    spellCheck="false"
                                    data-ms-editor="true"
                                />
                                <RHFInput
                                    wrapperClassName="manager-tel"
                                    label="담당자 전화번호"
                                    required
                                    type="number"
                                    minLength={11}
                                    maxLength={11}
                                    id="employee_phone_number"
                                    name="employee_phone_number"
                                    className="company-input"
                                    placeholder="01012345678"
                                    spellCheck={false}
                                    data-ms-editor="true"
                                    caption={
                                        <div className="error-text">
                                            핸드폰번호를 입력해주세요
                                        </div>
                                    }
                                />

                                <RHFInput
                                    wrapperClassName="manager-email"
                                    label="담당자 이메일(계산서 발행)"
                                    required
                                    type="text"
                                    id="employee_email"
                                    name="employee_email"
                                    className="company-input"
                                    placeholder="담당자 이메일 입력"
                                    spellCheck="false"
                                    data-ms-editor="true"
                                    caption={
                                        <div className="error-text">
                                            이메일 형식을 확인해주세요.
                                        </div>
                                    }
                                />
                                <div className="input-wrap business-type">
                                    <div className="input-text">업종</div>
                                    <input
                                        type="text"
                                        id="business_type"
                                        name="business_type"
                                        className="company-input"
                                        placeholder="업태/업종 입력"
                                        spellCheck="false"
                                        data-ms-editor="true"
                                    />
                                </div>
                                <div className="business-num-wrap">
                                    <RHFInput
                                        wrapperClassName="business-num"
                                        required
                                        label="사업자 등록번호 (10자리)"
                                        type="number"
                                        minLength={10}
                                        maxLength={10}
                                        id="business_registration_number"
                                        name="business_registration_number"
                                        className="company-input"
                                        placeholder="사업자 번호 입력 (-없이 입력)"
                                        spellCheck={false}
                                        data-ms-editor="true"
                                        caption={
                                            <div className="error-text">
                                                이미 사용중인 사업자 번호입니다.
                                            </div>
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="business-num-btn"
                                        onClick={() =>
                                            _verifyInput(
                                                "business_registration_number",
                                                getValues().business_registration_number
                                            )
                                        }
                                    >
                                        확인
                                    </button>
                                    {errors.verify_business_registration_number && (
                                        <span className="text-danger">
                                            {errors.verify_business_registration_number.message}
                                        </span>
                                    )}
                                </div>
                                <div className="input-wrap business-license">
                                    <div className="input-text">
                                        사업자 등록증 첨부<span className="essential">*</span>
                                    </div>
                                    <div className="file-wrap">
                                        <div className="error-text">
                                            사업자 등록증을 첨부해주세요
                                        </div>
                                        <div className="file-name">
                                            png, pdf, jpeg, jpg 확장자 가능
                                        </div>
                                        <label
                                            htmlFor="business_license"
                                            className="file-label"
                                        >
                                            찾아보기
                                        </label>
                                        <input
                                            type="file"
                                            id="business_license"
                                            className="company-file company-input"
                                            name="business_license"
                                            onChange={(event) => {
                                                console.log('asdsad', event.target?.files[0]);
                                                setValue(
                                                    "business_license",
                                                    event.target?.files[0]
                                                );
                                            }}
                                        />
                                    </div>
                                    {errors.business_license && (
                                        <span className="text-danger">
                                {errors.business_license.message}
                              </span>
                                    )}
                                    <div className="file-info">
                                        추가 서류 필요시 추가 요청이 있을 수 있습니다.
                                    </div>
                                </div>
                                <MyButton
                                    loading={isSubmitting}
                                    className="link link-step01"
                                    onClick={onSubmit}
                                >
                                    다음
                                </MyButton>
                            </FormProvider>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                onHide={ModalhandleClose}
                centered
                className="bussiness-modal"
            >
                <Modal.Header>
                    <Modal.Title>확인사항</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    국세청에 등록되지 않은 사업자등록번호입니다.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={ModalhandleClose}>
                        닫다
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Step3;
