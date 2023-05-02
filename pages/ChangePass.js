import React from "react";
import { Col, Container, Row } from "react-bootstrap";
export default function ChangePass() {
  return (
    <>
      <Container>
        <Row>
          <Col md="12">
            <div className="change-password-content">
              <form className="form-wraps">
                <div className="change-password-wrap">
                  <div className="title-wrapss">
                    <div className="title">
                      <font>Change Password</font>
                    </div>
                    <div className="sub-text">
                      <font>
                        8 or more characters with a combination of letters,
                        numbers and symbols
                      </font>
                    </div>
                  </div>
                  <ul className="list-wrap-11">
                    <li className="list-11">
                      <div className="desc">
                        <font>old password</font>
                      </div>
                      <input
                        type="password"
                        id="old_password"
                        name="old_password"
                        class="input-pass"
                        placeholder="Enter Password"
                      ></input>
                      <i class="icon pw-show" className="eyes"></i>
                    </li>
                    <li className="list-11">
                      <div className="desc">
                        <font>New password</font>
                      </div>
                      <input
                        type="password"
                        id="old_password"
                        name="old_password"
                        class="input-pass"
                        placeholder="Enter New Password"
                      ></input>
                      <i class="icon pw-show" className="eyes"></i>
                    </li>
                    <li className="list-11">
                      <div className="desc">
                        <font>Re-enter new password</font>
                      </div>
                      <input
                        type="password"
                        id="old_password"
                        name="old_password"
                        class="input-pass"
                        placeholder="Enter Re-enter new password"
                      ></input>
                      <i class="icon pw-show" className="eyes"></i>
                    </li>
                  </ul>
                </div>
                <div className="btn-wrap">
                    <a href="#" className="cancel-btn btns">cancellation </a>
                    <button className="modify-btn btnss">Modifications completed</button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
