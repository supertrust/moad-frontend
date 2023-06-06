import React, { ChangeEvent, useMemo, useState } from "react";
import Image from "next/image";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { styles } from './index';

const PageTwo = ({ onButtonClick }: { onButtonClick: any }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function BankModel({ name, ...props }: { name: any, placement: any }) {
    return (
      <>
        <Offcanvas show={show} onHide={handleClose} {...props} className={styles.Offcanvas}>
          <Offcanvas.Header closeButton className={styles.offcanvasheader}>
            <Offcanvas.Title className={styles.offcanvastitle} onClick={() => setShow(false)}>확인</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className={styles.offcanvasbody}>
            <h4>입금은행</h4>
            <div className={styles.iconwrap}>
              <div className={`${styles.iconwrapli} ${styles.active}`} >
                <div className={styles.iconwrapimage}>
                  {/* <img src={'/images/cargo/ic-01.svg'} /> */}
                  <Image
                    src="/images/cargo/ic-01.svg"
                    alt="logo-pc"
                    width={30}
                    height={30}
                  />
                </div>
                <div className={styles.iconwraptext}>
                  국민은행
                </div>
              </div>
              <div className={styles.iconwrapli}>
                <div className={styles.iconwrapimage}>
                  <Image
                    src="/images/cargo/ic-01.svg"
                    alt="logo-pc"
                    width={30}
                    height={30}
                />
                </div>
                <div className={styles.iconwraptext}>
                  국민은행
                </div>
              </div>
              <div className={styles.iconwrapli}>
                <div className={styles.iconwrapimage}>
                  <Image
                    src="/images/cargo/ic-01.svg"
                    alt="logo-pc"
                    width={30}
                    height={30}
                />
                </div>
                <div className={styles.iconwraptext}>
                  국민은행
                </div>
              </div>
              <div className={styles.iconwrapli}>
                <div className={styles.iconwrapimage}>
                  <Image
                    src="/images/cargo/ic-01.svg"
                    alt="logo-pc"
                    width={30}
                    height={30}
                />
                </div>
                <div className={styles.iconwraptext}>
                  국민은행
                </div>
              </div>
              <div className={styles.iconwrapli}>
                <div className={styles.iconwrapimage}>
                  <Image
                    src="/images/cargo/ic-01.svg"
                    alt="logo-pc"
                    width={30}
                    height={30}
                />
                </div>
                <div className={styles.iconwraptext}>
                  국민은행
                </div>
              </div>
              <div className={styles.iconwrapli}>
                <div className={styles.iconwrapimage}>
                  <Image
                    src="/images/cargo/ic-01.svg"
                    alt="logo-pc"
                    width={30}
                    height={30}
                />
                </div>
                <div className={styles.iconwraptext}>
                  국민은행
                </div>
              </div>
              <div className={styles.iconwrapli}>
                <div className={styles.iconwrapimage}>
                  <Image
                    src="/images/cargo/ic-01.svg"
                    alt="logo-pc"
                    width={30}
                    height={30}
                />
                </div>
                <div className={styles.iconwraptext}>
                  국민은행
                </div>
              </div><div className={styles.iconwrapli}>
                <div className={styles.iconwrapimage}>
                  <Image
                    src="/images/cargo/ic-01.svg"
                    alt="logo-pc"
                    width={30}
                    height={30}
                />
                </div>
                <div className={styles.iconwraptext}>
                  국민은행
                </div>
              </div><div className={styles.iconwrapli}>
                <div className={styles.iconwrapimage}>
                  <Image
                    src="/images/cargo/ic-01.svg"
                    alt="logo-pc"
                    width={30}
                    height={30}
                />
                </div>
                <div className={styles.iconwraptext}>
                  국민은행
                </div>
              </div><div className={styles.iconwrapli}>
                <div className={styles.iconwrapimage}>
                  <Image
                    src="/images/cargo/ic-01.svg"
                    alt="logo-pc"
                    width={30}
                    height={30}
                />
                </div>
                <div className={styles.iconwraptext}>
                  국민은행
                </div>
              </div>
            </div>
            {/* <div className={styles.bluebutton}>
              <button>확인</button>
            </div> */}
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
  const [modelImages, setModelImages] = useState({
    first: "",
    second: "",
    three: "",
    four: "",
  });

  const handleModelImageChange =
    (key: any) => (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        setModelImages((old) => ({ ...old, [key]: URL.createObjectURL(file) }));
      }
    };
  return (
    <Container>
      <main className="pt5 black-80 center">
        <div className={styles.titleheading}>기사 정보 입력</div>
        <Form className={styles.formall}>
          <Row className={styles.mbcustom}>
            <Form.Group controlId="name">
              <Form.Label>이름 <span>*</span></Form.Label>
              <Form.Control type="text" placeholder="이름 입력" />
            </Form.Group>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Group controlId="bank" className={styles.customarrow}>
              <Form.Label>이름 <span>*</span></Form.Label>
              <Form.Control type="text" placeholder="이름 입력" onClick={handleShow} />
            </Form.Group>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Label>입금 계좌번호 <span>*</span></Form.Label>
            <div className={styles.phonewrap}>
              <Form.Group controlId="phone" className={styles.leftphone}>
                <Form.Control
                  required
                  type="text"
                  placeholder="12345678910"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={`${styles.verificationButton} w-25`} controlId="validationCustom02">
                {/* <Button type="button" className={styles.button}>계좌확인</Button> */}
                <button type="button" className={`${styles.button} btn btn-primary w-100 justify-content-center`}>확인</button>
              </Form.Group>
            </div>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Group controlId="carNumber">
              <Form.Label>이름 <span>*</span></Form.Label>
              <Form.Control type="text" placeholder="이름 입력" />
            </Form.Group>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Group controlId="carType">
              <Form.Label>이름 <span>*</span></Form.Label>
              <Form.Select aria-label="Default select example">
                <option>선택</option>
                <option value="1">윙바디 1t</option>
                <option value="2">윙바디 1.5t</option>
                <option value="3">윙바디 2t</option>
                <option value="4">윙바디 2.5t</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Group controlId="average">
              <Form.Label>월 평균 운행거리 <span>*</span></Form.Label>
              <Form.Control type="text" placeholder="예) 2000km" />
            </Form.Group>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Group controlId="averageDays">
              <Form.Label>월 평균 운행일수 <span>*</span></Form.Label>
              <Form.Control type="text" placeholder="예) 20일" />
            </Form.Group>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Group controlId="averageDriving">
              <Form.Label>일 평균 운행시간 <span>*</span></Form.Label>
              <Form.Control type="text" placeholder="예) 09시~18시 경우 9시간" />
            </Form.Group>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Group controlId="averageDriving" className={styles.twocolumnbtn}>
              {/* <Button type="button" className={styles.button}>있음</Button> */}
              <button type="button" className={styles.button}>확인</button>
              {/* <Button type="button" className={styles.buttonwhite}>없음</Button> */}
              <button type="button" className={styles.buttonwhite}>확인</button>
            </Form.Group>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Group controlId="averageDriving">
              <Form.Label>출발지 <span>*</span></Form.Label>
              <Form.Control type="text" placeholder="예) 서울시 강남구" />
            </Form.Group>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Group controlId="averageDriving">
              <Form.Label>도착지 <span>*</span></Form.Label>
              <Form.Control type="text" placeholder="예) 서울시 강남구" />
            </Form.Group>
          </Row>
          <Row className={`${styles.mbcustom} ${modelImages.first ? styles.fileUploaded : ''}`}>
            <Form.Group controlId="formFile" className={styles.fileupload}>
              {
                modelImages.first ?
                  <>
                    {/* <img className={styles.fitimage} src={modelImages.first} /> */}
                    <Image
                      className={styles.fitimage}
                      src={modelImages.first}
                      alt="logo-pc"
                      width={30}
                      height={30}
                    />
                    <Form.Control className={styles.fileuploadmain} type="file" onChange={handleModelImageChange("first")} />
                  </>
                  :
                  <>
                    {/* <img src={'/images/cargo/camera_alt.svg'} /> */}
                    <Image
                      src="/images/cargo/camera_alt.svg"
                      alt="logo-pc"
                      width={30}
                      height={30}
                    />
                    <Form.Label>차량 옆면 (운전석) 사진을<br />
                      등록해주세요.</Form.Label>
                    <Form.Control className={styles.fileuploadmain} type="file" onChange={handleModelImageChange("first")} />
                  </>
              }
            </Form.Group>
          </Row>
          <Row className={`${styles.mbcustom} ${modelImages.second ? styles.fileUploaded : ''}`}>
            <Form.Group controlId="formFile" className={styles.fileupload}>
              {
                modelImages.second ?
                  <>
                    {/* <img className={styles.fitimage} src={modelImages.second} /> */}
                    <Image
                      className={styles.fitimage}
                      src={modelImages.second}
                      alt="logo-pc"
                      width={30}
                      height={30}
                    />
                    <Form.Control className={styles.fileuploadmain} type="file" onChange={handleModelImageChange("second")} />
                  </>
                  :
                  <>
                    {/* <img src={'/images/cargo/camera_alt.svg'} /> */}
                    <Image
                      src="/images/cargo/camera_alt.svg"
                      alt="logo-pc"
                      width={30}
                      height={30}
                    />
                    <Form.Label>차량 옆면 (조수석) 사진을<br />
                      등록해주세요.</Form.Label>
                    <Form.Control className={styles.fileuploadmain} type="file" onChange={handleModelImageChange("second")} />
                  </>
              }

            </Form.Group>
          </Row>
          <Row className={styles.mbcustom}>
            <div className="d-flex gap-4">
              <Form.Group controlId="formFile" className={styles.fileupload}>
                {
                  modelImages.three ?
                    <>
                      {/* <img className={styles.fitimage} src={modelImages.three} /> */}
                      <Image
                        className={styles.fitimage}
                        src={modelImages.three}
                        alt="logo-pc"
                        width={30}
                        height={30}
                      />
                      <Form.Control className={styles.fileuploadmain} type="file" onChange={handleModelImageChange("three")} />
                    </>
                    :
                    <>
                      {/* <img src={'/images/cargo/camera_alt.svg'} /> */}
                      <Image
                        src="/images/cargo/camera_alt.svg"
                        alt="logo-pc"
                        width={30}
                        height={30}
                      />
                      <Form.Label>차량 옆면 (조수석) 사진을<br />
                        등록해주세요.</Form.Label>
                      <Form.Control className={styles.fileuploadmain} type="file" onChange={handleModelImageChange("three")} />
                    </>
                }
              </Form.Group>
              <Form.Group controlId="formFile" className={styles.fileupload}>
                {
                  modelImages.four ?
                    <>
                      {/* <img className={styles.fitimage} src={modelImages.four} /> */}
                      <Image
                        className={styles.fitimage}
                        src={modelImages.four}
                        alt="logo-pc"
                        width={30}
                        height={30}
                      />
                      <Form.Control className={styles.fileuploadmain} type="file" onChange={handleModelImageChange("four")} />
                    </>
                    :
                    <>
                      {/* <img src={'/images/cargo/camera_alt.svg'} /> */}
                      <Image
                        src="/images/cargo/camera_alt.svg"
                        alt="logo-pc"
                        width={30}
                        height={30}
                      />
                      <Form.Label>차량 옆면 (조수석) 사진을<br />
                        등록해주세요.</Form.Label>
                      <Form.Control className={styles.fileuploadmain} type="file" onChange={handleModelImageChange("four")} />
                    </>
                }
              </Form.Group>
            </div>
          </Row>
          <Row className={styles.mbcustom}>
            <div className={styles.heading_preview}>인증 예시</div>
            <Form.Label className={styles.lable_preview}>차량 옆면 (운전석)</Form.Label>
            <div className={styles.desc}>
              {/* <img src={'/images/cargo/truck.png'} /> */}
              <Image
                src="/images/cargo/truck.png"
                alt="logo-pc"
                width={240}
                height={100}
              />
            </div>
          </Row>
          <Row className={styles.mbcustom}>
            <Form.Label className={styles.lable_preview}>차량 옆면 (조수석)</Form.Label>
            <div className={styles.desc}>
              {/* <img src={'/images/cargo/truck.png'} /> */}
              <Image
                src="/images/cargo/truck.png"
                alt="logo-pc"
                width={240}
                height={100}
              />
            </div>
          </Row>
          <Row className={styles.mbcustom}>
            <div className='col-12'>
              <div className={styles.twocolumn}>
                <div className={styles.twocolumninner}>
                  <Form.Label className={styles.lable_preview}>뒷면 사진</Form.Label>
                  <div className={styles.desc}>
                    {/* <img src={'/images/cargo/truck.png'} /> */}
                    <Image
                      src="/images/cargo/truck.png"
                      alt="logo-pc"
                      width={150}
                      height={60}
                    />
                  </div>
                </div>
                <div className={styles.twocolumninner}>
                  <Form.Label className={styles.lable_preview}>뒷면 사진</Form.Label>
                  <div className={styles.desc}>
                    {/* <img src={'/images/cargo/truck.png'} /> */}
                    <Image
                      src="/images/cargo/truck.png"
                      alt="logo-pc"
                      width={150}
                      height={60}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Row>

          <div className={styles.bluebuttonnew}>
            {/* <Button type="button" className={styles.buttonfull} onClick={() => onButtonClick("stepthree")}>확인</Button> */}
            <button type="button" className={styles.buttonfull} onClick={() => onButtonClick("stepthree")}>확인</button>
          </div>
        </Form>
        {['bottom'].map((placement, idx) => (
          <BankModel key={idx} placement={placement} name={placement} />
        ))}
      </main>
    </Container>
  );
}

export default PageTwo;