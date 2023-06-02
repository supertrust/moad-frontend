import React from "react";
import Image from "next/image";
import { styles } from './index';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PageOne = ({ onButtonClick }:{onButtonClick: any}) => {
  const [otpSend, setOtpStatus] = useState(false);

  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const verifyClose = () => setShow(false);
  const verifyShow = () => {
    setShow(true);
    setOtpStatus(true)
  };
  const errorClose = () => setError(false);
  const errorShow = () => setError(true);

  function ShowHidePassword({ name,label,placeholder }:{name: any,label: any,placeholder: any}) {
    const [isVisible, setVisible] = useState(false);
  
    const toggle = () => {
      setVisible(!isVisible);
    };
  
    return (
      <div className={styles.inputlable}>
            <label>{label} *</label>
            <div className={styles.emailtag}>
              <input type={!isVisible ? "password" : "text"} placeholder={placeholder} name={name}></input>
              <div className={styles.eyeicon} onClick={toggle}>
                {/* <img  src={isVisible ? '/images/ic-show.png' : '/images/ic-hide.png'} /> */}
                <Image
                    src={isVisible ? '/images/ic-show.png' : '/images/ic-hide.png'}
                    alt="logo-pc"
                    width={24}
                    height={24}
                />
              </div>
            </div>
          </div>
    );
  }
  return (

    <main
      className="pt5 black-80 center"
      style={{ maxWidth: "100%", maxHeight: "auto", margin: "15px" }}
    >
      <Modal className={styles.modalcheck} show={show} onHide={verifyClose}>
        <div className={styles.modalicon}>
            {/* <img src={'/images/cargo/checkwhite.svg'}/> */}
            <Image
                    src="/images/cargo/checkwhite.svg"
                    alt="logo-pc"
                    width={20}
                    height={20}
                />
        </div>
        <Modal.Body className={styles.modal_content}>
          <div className={styles.modalheading}>인증번호 발송</div>
          <div className={styles.modalparagraph}>인증번호가 발송되었습니다.</div>
        </Modal.Body>
        <Modal.Footer className={styles.modal_footer}>
          {/* <Button variant="primary" onClick={verifyClose}>
            확인
          </Button> */}
          <button type="button" onClick={verifyClose}>확인</button>
        </Modal.Footer>
      </Modal>
      <Modal className={styles.modalcheck} show={error} onHide={errorClose}>
        <div className={styles.modaliconred}>
            {/* <img src={'/images/cargo/close.svg'}/> */}
            <Image
                    src="/images/cargo/close.svg"
                    alt="logo-pc"
                    width={20}
                    height={20}
                />
        </div>
        <Modal.Body className={styles.modal_content}>
          <div className={styles.modalheading}>휴대폰 번호 오류</div>
          <div className={styles.modalparagraph}>형식에 맞지 않는 번호입니다.</div>
        </Modal.Body>
        <Modal.Footer className={styles.modal_footer}>
          {/* <Button variant="primary" onClick={errorClose}>
          확인
          </Button> */}
          <button type="button" onClick={errorClose}>확인</button>
        </Modal.Footer>
      </Modal>
      <form className="measure">

        <div>
        </div>
      </form>
      <div className={styles.stepsform}>
        <div className={styles.maindiv}>
          <h2>이카루스 가입 전 안내사항</h2>
        </div>
        <form>
          <div className={styles.inputlable}>
            <label>휴대폰 번호 *</label>
            <div className={styles.emailtag}>
              <input type="number" placeholder="“-”없이 입력"></input>
              <button type="button" onClick={verifyShow}>인증요청</button>
            </div>
            {/* Add active class when OTP send */}
            <div className={`${styles.emailtag} ${styles.grayemailtag} ${otpSend ? styles.active : ''}` } > 
              <input type="number" placeholder="인증번호 4자리 입력"></input>
              <div className={styles.numbermode}>05:00</div>
              <button type="button" onClick={errorShow}>인증확인</button>
            </div>
            <p>원활한 서비스 이용을 위채 최초 1회 인증이 필요합니다.</p>
          </div>

          <ShowHidePassword name="password" label="비밀번호 입력" placeholder="비밀번호 입력" />
          <ShowHidePassword name="confirmpassword" label="비밀번호 재입력" placeholder="비밀번호 재입력" />
        </form>
      </div>
      <div className={styles.bluebutton}>
        <button onClick={() => onButtonClick("steptwo")}>확인</button>
      </div>
    </main>
  );
};

export default PageOne;
