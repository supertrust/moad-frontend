import FormProvider from "@/pages/context/formContext";
import { verifyInputApi } from "@/store/api/authApi";
import { signup } from "@/store/slices/authSlice";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function SignUpModulePage() {
  const [formStep, setFormStep] = useState(1);
  const nextFormStep = () => setFormStep((formStep) => formStep + 1);
  const prevFormStep = () => setFormStep((formStep) => formStep - 1);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);

  const ModalhandleClose = () => setShowModal(false);
  const ModalhandleShow = () => setShowModal(true);

  //will verify input using server-side validation
  const verifyInput = async (key, value) => {
    try {
      await verifyInputApi({ key, value });
      toast.success("국세청에 등록된 사업자등록번호입니다.");
    } catch (error) {
      console.log(error);
      ModalhandleShow();
    }
  };

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: Yup.object({
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
          (value) => {
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
        .test("fileSize", "File size should be less than 10MB", (value) => {
          if (value) {
            return value.size <= 10 * 1024 * 1024;
          }
          return true;
        }),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      dispatch(signup(values))
        .unwrap()
        .then((result) => {
          nextFormStep();
          toast("User registered successfully", { type: "success" });
          setLoading(false);
        })
        .catch((err) => {
          toast(err?.message || "Something went wrong Please try again later", {
            type: "error",
          });
          setLoading(false);
          // }
        });
    },
  });

  return (
    <div id="sign_up">
      <FormProvider>
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
                    <div className="input-wrap">
                      <div className="text-wrap">
                        <div className="input-text">아이디 (이메일)</div>
                      </div>
                      <input
                        type="text"
                        className="user-input"
                        placeholder="아이디"
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <span className="text-danger">{formik.errors.email}</span>
                    )}
                    <div className="input-wrap">
                      <div className="input-text">비밀번호</div>
                      <i className="icon pw-show"></i>
                      <input
                        type="password"
                        className="user-input"
                        name="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className="pw-info-text">
                        문자, 숫자, 기호를 조합하여 8자 이상을 사용하세요
                      </p>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <span className="text-danger">
                        {formik.errors.password}
                      </span>
                    )}
                    <div className="input-wrap">
                      <div className="text-wrap">
                        <div className="input-text">비밀번호 확인</div>
                      </div>
                      <input
                        type="password"
                        id="confirm_password"
                        className="user-input"
                        name="confirm_password"
                        placeholder="비밀번호 확인"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <i className="icon pw-show"></i>
                    </div>
                    {formik.touched.confirm_password &&
                      formik.errors.confirm_password && (
                        <span className="text-danger">
                          {formik.errors.confirm_password}
                        </span>
                      )}
                    <a
                      href="#"
                      className="link link-step01"
                      onClick={() => {
                        if (
                          formik.errors.email === undefined &&
                          formik.errors.confirm_password === undefined &&
                          formik.errors.password === undefined
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
                    <div className="input-wrap company-name">
                      <div className="input-text">
                        회사명<span className="essential">*</span>
                      </div>
                      <input
                        type="text"
                        id="company_name"
                        name="company_name"
                        className="company-input"
                        placeholder="회사명 입력"
                        spellCheck="false"
                        data-ms-editor="true"
                        value={formik.values.company_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div className="error-text">
                        이미 사용중인 회사명입니다
                      </div>
                    </div>
                    {formik.touched.company_name &&
                      formik.errors.company_name && (
                        <span className="text-danger">
                          {formik.errors.company_name}
                        </span>
                      )}
                    <div className="input-wrap company-tel">
                      <div className="input-text">
                        회사 전화번호<span className="essential">*</span>
                      </div>
                      <input
                        type="text"
                        id="company_phone_number"
                        name="company_phone_number"
                        className="company-input"
                        placeholder="회사 전화번호 입력"
                        onkeyUp="onlyNumber(this)"
                        spellCheck="false"
                        data-ms-editor="true"
                        value={formik.values.company_phone_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.company_phone_number &&
                        formik.errors.company_phone_number && (
                          <span className="text-danger">
                            {formik.errors.company_phone_number}
                          </span>
                        )}
                      <div className="error-text">
                        이미 사용중인 전화번호입니다
                      </div>
                    </div>
                    <div className="input-wrap manager-name">
                      <div className="input-text">
                        담당자 성함<span className="essential">*</span>
                      </div>
                      <input
                        type="text"
                        id="employee_name"
                        name="employee_name"
                        className="company-input"
                        placeholder="담당자 성함 / 직위 입력"
                        spellCheck="false"
                        data-ms-editor="true"
                        value={formik.values.employee_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.employee_name &&
                      formik.errors.employee_name && (
                        <span className="text-danger">
                          {formik.errors.employee_name}
                        </span>
                      )}
                    <div className="input-wrap manager-tel">
                      <div className="input-text">
                        담당자 전화번호<span className="essential">*</span>
                      </div>
                      <input
                        type="text"
                        minLength="11"
                        maxLength="11"
                        id="employee_phone_number"
                        name="employee_phone_number"
                        className="company-input"
                        placeholder="01012345678"
                        onkeyUp="onlyNumber(this)"
                        spellCheck="false"
                        data-ms-editor="true"
                        value={formik.values.employee_phone_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.employee_phone_number &&
                        formik.errors.employee_phone_number && (
                          <span className="text-danger">
                            {formik.errors.employee_phone_number}
                          </span>
                        )}
                      <div className="error-text">
                        핸드폰번호를 입력해주세요
                      </div>
                    </div>
                    <div className="input-wrap manager-email">
                      <div className="input-text">
                        담당자 이메일(계산서 발행)
                        <span className="essential">*</span>
                      </div>
                      <input
                        type="text"
                        id="employee_email"
                        name="employee_email"
                        className="company-input"
                        placeholder="담당자 이메일 입력"
                        spellCheck="false"
                        data-ms-editor="true"
                        value={formik.values.employee_email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.employee_email &&
                        formik.errors.employee_email && (
                          <span className="text-danger">
                            {formik.errors.employee_email}
                          </span>
                        )}
                      <div className="error-text">
                        이메일 형식을 확인해주세요.
                      </div>
                    </div>
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
                    <div className="input-wrap business-num">
                      <div className="input-text">
                        사업자 등록번호 (10자리)
                        <span className="essential">*</span>
                      </div>
                      <div className="business-num-wrap">
                        <input
                          type="text"
                          minLength="10"
                          maxLength="10"
                          id="business_registration_number"
                          name="business_registration_number"
                          className="company-input"
                          placeholder="사업자 번호 입력 (-없이 입력)"
                          onkeyUp="onlyNumber(this)"
                          spellCheck="false"
                          data-ms-editor="true"
                          value={formik.values.business_registration_number}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.business_registration_number &&
                          formik.errors.business_registration_number && (
                            <span className="text-danger">
                              {formik.errors.business_registration_number}
                            </span>
                          )}
                        <div className="error-text">
                          이미 사용중인 사업자 번호입니다.
                        </div>
                        <button
                          type="button"
                          className="business-num-btn"
                          onClick={() =>
                            verifyInput(
                              "business_registration_number",
                              formik.values.business_registration_number
                            )
                          }
                        >
                          확인
                        </button>
                      </div>
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
                            formik.setFieldValue(
                              "business_license",
                              event.target.files[0]
                            );
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      {formik.touched.business_license &&
                        formik.errors.business_license && (
                          <span className="text-danger">
                            {formik.errors.business_license}
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
                    <button
                      type="submit"
                      className="link link-step01"
                      onClick={formik.handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="d-flex justify-content-center">
                          <ThreeDots
                            height="20"
                            width="40"
                            radius="9"
                            color="#FFFFFF"
                            ariaLabel="three-dots-loading"
                            visible
                          />
                        </div>
                      ) : (
                        "다음"
                      )}
                    </button>
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
      </FormProvider>
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
  );
}
