import { Col, Container, Row } from "react-bootstrap";
import React from "react";
import Link from "next/link";

export default function MyPage() {
  return (
    <>
      <Container>
        <Row>
          <Col md="12">
            <div className="my-info-content">
              <form action="#" className="form-wrap">
                <div className="profile">
                  <div className="title-wraps-1">
                    <div className="title">
                      <font>Profile</font>
                    </div>
                    <a href="#">
                      <font>to withdraw</font>
                    </a>
                  </div>
                  <div className="profile-wrap">
                    <div className="profile-img">
                      <div className="user-photo">
                        <img
                          src="https://dev-icarus.mufin.lol/wp-content/themes/icarus/assets/images/my-info/img-default.png"
                          alt=""
                        />
                      </div>
                      <input type="file" id="input_file" class="input-file" />
                      <button type="button" id="photo_btn" class="photo-btn" />
                    </div>
                    <div className="profile-text">
                      <div className="company-name">
                        <font>Must Fintech</font>
                      </div>
                      <div class="email">must@mufin.co.kr</div>
                    </div>
                  </div>
                  <div className="change-password">
                    <div className="title">
                      <font>Change Password</font>
                    </div>
                    <font>
                      <Link href="/ChangePass" className="correction">
                        correction
                      </Link>
                    </font>
                  </div>
                  <div className="my-information">
                    <div className="title">
                      <font className="my-infos">My Info</font>
                    </div>
                    <div className="information-wrap">
                      <ul className="list-wrap">
                        <li className="lists">
                          <div className="desc">
                            <font>Company Name</font>
                          </div>
                          <div id="company_name" class="company-name text">
                            <font>Must Fintech</font>
                          </div>
                        </li>
                        <li className="lists">
                          <div className="desc">
                            <font>Company phone number </font>
                            <span class="point">
                              <font>*</font>
                            </span>
                          </div>
                          <input
                            type="number"
                            id="company_phone_number"
                            name="company_phone_number"
                            class="input"
                            onkeyup="onlyNumber(this)"
                            value="0212345678"
                          />
                        </li>
                        <li className="lists">
                          <div className="desc">
                            <font>Contact Email (Invoice Issuance) </font>
                            <span class="point">
                              <font>*</font>
                            </span>
                          </div>
                          <input
                            type="email"
                            id="employee_email"
                            name="employee_email"
                            class="input"
                            value="must@mufin.co.kr"
                          />
                        </li>
                        <li className="lists">
                          <div className="desc">
                            <font>Company Registration Number</font>
                          </div>
                          <div id="company_name" class="company-name text">
                            <font>1234567890</font>
                          </div>
                        </li>
                        <li className="lists">
                          <div className="desc">
                            <font>Sectors</font>
                          </div>
                          <input
                            type="text"
                            id="sector"
                            name="sector"
                            class="input"
                            value="통신판매"
                            spellcheck="false"
                            data-ms-editor="true"
                          />
                        </li>
                      </ul>
                      <button id="modify_btn">Modifications completed</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
