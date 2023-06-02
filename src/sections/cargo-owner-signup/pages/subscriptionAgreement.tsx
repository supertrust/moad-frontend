import React, { useState } from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { styles } from "@src/sections/cargo-owner-signup";
const SubscriptionAgreement = ({ onButtonClick }: { onButtonClick: any }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = event => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
  };
  const terms = [
    "[ 필수] 이카루스 서비스 이용 약관", 
    "[필수 ] 이카루스 서비스 이용 약관",
    "[필 수] 이카루스 서비스 이용 약관",
    "[ 필수 ] 이카루스 서비스 이용 약관",
  ];
  const use_of_marketing = [
    "[선택] 전체동의", 
  ];
  function TermsModel({ name, ...props }: { name: any, placement: any }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        {/* <Button  variant="primary" onClick={handleShow} className="me-2">
          {name}
        </Button> */}
        <button  onClick={handleShow} className="p-0">[선택] 광고성 정보 수신 동의</button>
        <Offcanvas show={show} onHide={handleClose} {...props} className={styles.Offcanvas}>
          <Offcanvas.Header closeButton className={styles.offcanvasheader}>
            <Offcanvas.Title>이카루스 서비스 이용약관</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className={styles.offcanvasbody}>
            <h4>제 1조</h4>
            <p>약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.약관 내용이 들어갑니다.</p>
            <div className={styles.bluebutton}>
              <button>확인</button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
  return (
    <div className={styles.accordionsPage}>
      <h2>이카루스 가입 약관동의</h2>
      <Accordion defaultActiveKey="0">
        {/* <Accordion.Item eventKey="0" className={styles.accordeionitem}>
          <Accordion.Header className={styles.accordionHeader}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>[필수] 전체동의</Accordion.Header>
        </Accordion.Item> */}
        <div className={styles.termsdetails}>
          <div className={styles.accordionHeader}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>[필수] 전체동의
          </div>
        </div>
        <Accordion.Item eventKey="1" className={styles.accordeionitem}>
          <Accordion.Header><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>[필수] 이카루스 서비스 이용 약관</Accordion.Header>
          <Accordion.Body className={styles.accordianbody}>
            {/* <ul>
              <li className={styles.active}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>[필수] 이카루스 서비스 이용 약관</li>
              <li> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>[필수] 이카루스 서비스 이용 약관</li>
              <li> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>[필수] 이카루스 서비스 이용 약관</li>
              <li> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>[필수] 이카루스 서비스 이용 약관</li>
            </ul> */}
            {terms.map(item => (
              <label key={item} className={`${checkedItems[item] ? styles.active : ''} ${styles.lablemain}`}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>{item}
                <input
                  type="checkbox"
                  name={item}
                  checked={checkedItems[item]}
                  onChange={handleChange}
                />
              </label>
            ))}
          </Accordion.Body>
        </Accordion.Item>

        {/* <Accordion.Item eventKey="2" className={styles.accordeionitem}>
          <Accordion.Header className={styles.accordionHeader}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>[선택] 전체동의</Accordion.Header>
          <Accordion.Body>
          </Accordion.Body>
        </Accordion.Item> */}
        <div className={styles.termsdetails}>
          <div className={styles.accordionHeader}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>[선택] 전체동의
          </div>
        </div>

        <Accordion.Item eventKey="3" className={styles.accordeionitem}>
          <Accordion.Header><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>[선택] 마케팅 활용 동의</Accordion.Header>
          <Accordion.Body className={styles.accordianbody}>
            {/* <ul>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>
                <a href="#">[선택] 마케팅 활용 동의</a>
              </li>
              <li className={styles.termsModel}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>
                {['[선택] 광고성 정보 수신 동의'].map((placement, idx) => (
                  <TermsModel key={idx} placement={placement} name={placement} />
                ))}

              </li>
            </ul> */}
            {use_of_marketing.map(item => (
              <label key={item} className={`${checkedItems[item] ? styles.active : ''} ${styles.lablemain}`}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>{item}
                <input
                  type="checkbox"
                  name={item}
                  checked={checkedItems[item]}
                  onChange={handleChange}
                />
              </label>
            ))}
            <label className={styles.lablemain}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>
            {['[선택] 광고성 정보 수신 동의'].map((placement, idx) => (
                  <TermsModel key={idx} placement={placement} name={placement} />
                ))}
              </label>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className={`${styles.bluebutton} ${styles.disable}`}>
        <button onClick={() => onButtonClick("pagethree")}>확인</button>
      </div>
    </div>
  );
};

export default SubscriptionAgreement;
