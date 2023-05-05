import React from "react";

export default function FormStep_3({
  prevFormStep,
  nextFormStep,
  ModalhandleShow,
}) {
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
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <div className="error-text">이미 사용중인 회사명입니다</div>
              </div>
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
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <div className="error-text">이미 사용중인 전화번호입니다</div>
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
                  spellcheck="false"
                  data-ms-editor="true"
                />
              </div>
              <div className="input-wrap manager-tel">
                <div className="input-text">
                  담당자 전화번호<span className="essential">*</span>
                </div>
                <input
                  type="text"
                  minlength="11"
                  maxLength="11"
                  id="employee_phone_number"
                  name="employee_phone_number"
                  className="company-input"
                  placeholder="01012345678"
                  onkeyUp="onlyNumber(this)"
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <div className="error-text">핸드폰번호를 입력해주세요</div>
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
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <div className="error-text">이메일 형식을 확인해주세요.</div>
              </div>
              <div className="input-wrap business-type">
                <div className="input-text">업종</div>
                <input
                  type="text"
                  id="business_type"
                  name="business_type"
                  className="company-input"
                  placeholder="업태/업종 입력"
                  spellcheck="false"
                  data-ms-editor="true"
                />
              </div>
              <div className="input-wrap business-num">
                <div className="input-text">
                  사업자 등록번호 (10자리)<span className="essential">*</span>
                </div>
                <div className="business-num-wrap">
                  <input
                    type="text"
                    minlength="10"
                    maxLength="10"
                    id="business_registration_number"
                    name="business_registration_number"
                    className="company-input"
                    placeholder="사업자 번호 입력 (-없이 입력)"
                    onkeyUp="onlyNumber(this)"
                    spellcheck="false"
                    data-ms-editor="true"
                  />
                  <div className="error-text">
                    이미 사용중인 사업자 번호입니다.
                  </div>
                  <button
                    type="button"
                    className="business-num-btn"
                    onClick={ModalhandleShow}
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
                  <div className="error-text">사업자 등록증을 첨부해주세요</div>
                  <div className="file-name">
                    png, pdf, jpeg, jpg 확장자 가능
                  </div>
                  <label htmlFor="business_license" className="file-label">
                    찾아보기
                  </label>
                  <input
                    type="file"
                    id="business_license"
                    className="company-file company-input"
                    name="business_license"
                  />
                </div>
                <div className="file-info">
                  추가 서류 필요시 추가 요청이 있을 수 있습니다.
                </div>
              </div>
              <a href="#" className="link link-step01" onClick={nextFormStep}>
                다음
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
