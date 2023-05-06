import React from 'react'

export default function FormStep_2({prevFormStep, nextFormStep}) {
  return (
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
                id="email"
                className="user-input"
                name="email"
                placeholder="아이디"
              />
            </div>
            <div className="input-wrap">
              <div className="input-text">비밀번호</div>
              <i className="icon pw-show"></i>
              <input
                type="password"
                id="password"
                className="user-input"
                name="password"
                placeholder="비밀번호"
              />
              <p className="pw-info-text">
                문자, 숫자, 기호를 조합하여 8자 이상을 사용하세요
              </p>
            </div>
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
              />
              <i className="icon pw-show"></i>
            </div>
            <a href="#" className="link link-step01" onClick={nextFormStep}>
              다음
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
