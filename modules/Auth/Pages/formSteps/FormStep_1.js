import React from "react";
import { useFormData } from "@/pages/context/formContext";
export default function FormStep_1({handleShow,handleClose}) {

    const { formStep, setFormStep, data, handelFormSteps } = useFormData();

  return (
<div className="step01 step-section"  >
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
                  <label htmlhtmlFor"chk_1" className="chk-wrap">
                    <input type="checkbox" id="chk_1" className="terms-chk" />
                    <div className="chk-text">(필수) 개인정보처리방침</div>
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
                  <label htmlhtmlFor"chk_2" className="chk-wrap">
                    <input type="checkbox" id="chk_2" className="terms-chk" />
                    <div className="chk-text">(필수) 이카루스 이용약관</div>
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
            <button className="link link-step01" onClick={()=>{handelFormSteps(formStep +1)}}>
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
