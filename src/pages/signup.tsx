import { useVerifyInput } from "@src/apis/auth";
import { FormProvider, RHFInput, useForm, yupResolver } from "@src/components/Form";
import useAuth from "@src/hooks/useAuth";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import MyButton from '@src/components/Button';
import { toast } from "react-toastify";
import * as Yup from "yup";

const defaultValues = {
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
  business_license: null,
}

const RegisterSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
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

export default function SignUpModulePage() {
  const { mutateAsync: verifyInput } = useVerifyInput();
  const { register } = useAuth();
  const [formStep, setFormStep] = useState(1);
  const nextFormStep = () => setFormStep((formStep) => formStep + 1);
  const prevFormStep = () => setFormStep((formStep) => formStep - 1);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);

  const ModalhandleClose = () => setShowModal(false);
  const ModalhandleShow = () => setShowModal(true);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(RegisterSchema)
  });
  const { handleSubmit, formState: { isSubmitting, errors }, getValues, setValue } = methods;

  //will verify input using server-side validation
  const _verifyInput = async (key: string, value: string) => {
    await verifyInput({ key, value }, {
      onSuccess: () => {
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
      await register(props);
      nextFormStep();
      toast("User registered successfully", { type: "success" });
    } catch (error: any) {
      toast(error?.message || "Something went wrong Please try again later", {
        type: "error",
      });
    }
  })

  return (
    <main className="min-h-screen">
      <FormProvider methods={methods}>
        <div id="sign_up">
          {formStep === 1 ? (
            <div className="step01 step-section">
              <div className="left">
                <div className="left-wrap">
                  <h1 className="logo-pc">
                    <img src="assets/images/icons/logo-pc.svg" alt="" />
                  </h1>
                </div>
              </div>
              <div className="right">
                <h1 className="logo-mb">
                  <img src="/images/logo-mb.svg" alt="" />
                </h1>
                <div className="right-wrap">
                  <div className="right-content">
                    <div className="back-btn"></div>
                    <div className="step-title">
                      서비스 이용약관 및<br />
                      개인정보 이용약관 동의
                    </div>
                    <div className="step-text">
                      필수항목 및 선택항목 약관에 동의주해주세요
                    </div>
                    <div className="agree-content">
                      <ul className="agree-wrap">
                        <li className="agree-list">
                          <label htmlFor="chk_1" className="chk-wrap">
                            <input
                              type="checkbox"
                              id="chk_1"
                              className="terms-chk"
                            />
                            <div className="chk-text">
                              (필수) 개인정보처리방침
                            </div>
                          </label>
                          <div className="terms-content">
                            <button
                              onClick={handleShow}
                              type="button"
                              className="more-btn"
                            >
                              보기
                            </button>
                          </div>
                        </li>
                        <li className="agree-list">
                          <label htmlFor="chk_2" className="chk-wrap">
                            <input
                              type="checkbox"
                              id="chk_2"
                              className="terms-chk"
                            />
                            <div className="chk-text">
                              (필수) 이카루스 이용약관
                            </div>
                          </label>
                          <div className="terms-content">
                            <button
                              type="button"
                              className="more-btn"
                              onClick={handleClose}
                            >
                              보기
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="#"
                      className="link link-step01"
                      onClick={nextFormStep}
                    >
                      다음
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : formStep === 2 ? (
            <div className="step02 step-section">
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
                    <div onClick={prevFormStep} className="back-btn"></div>
                    <div className="step-title">
                      회원가입 정보를
                      <br />
                      입력해주세요
                    </div>
                    <div className="step-text">
                      회원여부 확인 및 가입을 진행합니다
                    </div>
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
                      <a
                        href="#"
                        className="link link-step01"
                        onClick={() => {
                          if (
                            errors.email === undefined &&
                            errors.confirm_password === undefined &&
                            errors.password === undefined
                          ) {
                            nextFormStep();
                          }
                        }}
                      >
                        다음
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : formStep === 3 ? (
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
                    <div onClick={prevFormStep} className="back-btn"></div>
                    <div className="step-title">회사 정보를 입력해주세요</div>
                    <div className="step-text">
                      기입정보를 입력 후 완료버튼을 눌러주세요
                    </div>
                    <div className="user-info">
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
                        type="number"
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
                              setValue(
                                "business_license",
                                // @ts-ignore
                                event.target?.files?.[0]
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
                      {/* <a
                      href="#"
                      className="link link-step01"
                      onClick={nextFormStep}
                    >
                      다음
                    </a> */}
                      <MyButton
                        loading={isSubmitting}
                        className="link link-step01"
                        onClick={onSubmit}
                      >
                        다음
                      </MyButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
          <Modal className="more-content-modal" show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title className="text-center">개인정보처리방침</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="terms-text">
                <div className="inner-title">개인정보처리방침</div>
                <div className="text">
                  이카루스 관련 제반 서비스의 이용과 관련하여 필요한 사항을
                  규정합니다.
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-primary" onClick={handleClose}>
                취소
              </Button>
              <Button variant="primary" onClick={handleClose}>
                동의
              </Button>
            </Modal.Footer>
          </Modal>
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
      </FormProvider>
    </main >
  );
}
