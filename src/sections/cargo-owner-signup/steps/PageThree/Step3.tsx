import React from "react";
import Container from 'react-bootstrap/Container';
import { styles } from './index';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const PageThree = ({ onButtonClick }:{onButtonClick: any}) => {

  return (
    <Container>
      <main
        className="pt5 black-80 center"

      >
        <form className="measure">

          <div className={styles.titleheading}>기사 정보 입력</div>
          <Row className={styles.mbcustom}>
            <Form.Label>사업자 등록증 <span>*</span></Form.Label>
            <div className={styles.phonewrap}>
              <Form.Group controlId="phone" className={styles.leftphone}>
                <Form.Control
                  required
                  type="text"
                  placeholder="jpg, jpeg, png, pdf 파일"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={styles.buttonblue} controlId="validationCustom02">
                <Button type="button" className={styles.button}>첨부</Button>
              </Form.Group>
            </div>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Label>사업자 통장사본 <span>*</span></Form.Label>
            <div className={styles.phonewrap}>
              <Form.Group controlId="phone" className={styles.leftphone}>
                <Form.Control
                  required
                  type="text"
                  placeholder="jpg, jpeg, png, pdf 파일"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={styles.buttonblue} controlId="validationCustom02">
                <Button type="button" className={styles.button}>첨부</Button>
              </Form.Group>
            </div>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Label>운전면허증 <span>*</span></Form.Label>
            <div className={styles.phonewrap}>
              <Form.Group controlId="phone" className={styles.leftphone}>
                <Form.Control
                  required
                  type="text"
                  placeholder="jpg, jpeg, png, pdf 파일"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={styles.buttonblue} controlId="validationCustom02">
                <Button type="button" className={styles.button}>첨부</Button>
              </Form.Group>
            </div>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Label>화물 운송 종사자 자격증 <span>*</span></Form.Label>
            <div className={styles.phonewrap}>
              <Form.Group controlId="phone" className={styles.leftphone}>
                <Form.Control
                  required
                  type="text"
                  placeholder="jpg, jpeg, png, pdf 파일"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={styles.buttonblue} controlId="validationCustom02">
                <Button type="button" className={styles.button}>첨부</Button>
              </Form.Group>
            </div>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Label>차량 등록증 <span>*</span></Form.Label>
            <div className={styles.phonewrap}>
              <Form.Group controlId="phone" className={styles.leftphone}>
                <Form.Control
                  required
                  type="text"
                  placeholder="jpg, jpeg, png, pdf 파일"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={styles.buttonblue} controlId="validationCustom02">
                <Button type="button" className={styles.button}>첨부</Button>
              </Form.Group>
            </div>
            <Row className={styles.mbcustom}>
            <div className={styles.notes}>모든 서류를 첨부해야 가입신청이 정상적으로 진행됩니다.</div>
            </Row>
            <div className={styles.greywrap}>
              <Button  onClick={() => onButtonClick("final")} type="button" className={styles.greybutton}>확인</Button>

            </div>
          </Row>
          {/* Step 3
        <div>
          <input
            className="f6 grow br2 ph3 pv2 mb2 dib white"
            style={{
              borderStyle: "none",
              width: "100%",
              backgroundColor: "#664DE5",
            }}
            type="submit"
            value="Create Workspace"
            onClick={() => onButtonClick("pagethree")}
          />
        </div> */}


        </form>
      </main>
    </Container>
  );
};

export default PageThree;
