import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
export default function GuideModulePage() {
  return (
    <>
      <Container>
        <Row>
          <Col md="12">
          <div className="guide-content">
            <div className="title-wrap">
              <div className="title">
             <font>Advertising Startup Guide </font>
              </div>
              <div className="sub-text">
                <font>New to Icarus? </font>
                <font> We've compiled some helpful tips for advertisers just starting out.</font>
              </div>
            </div>
            <div className="guide-box-wrap">
              <ul className="box-wrap">
                <li className="box-list">
                  <div className="box-title">
                    <font>Are you new to wrapping ads?</font>
                  </div>
                  <div className="box-sub-text">
                    <font>Which advertisement is suitable for me, check the advertisement cost!</font>
                  </div>
                  <div className="box-link-wrap">
                    <a href="#" className="box-link">
                      <span className="box-text">
                        <font>What is a wrap ad?</font>
                      </span>
                      <i className="ic-arrow-right" id="arr"></i>
                    </a>
                    <a href="#" className="box-link">
                      <span className="box-text">
                        <font>Check the ad progress process</font>
                      </span>
                      <i className="ic-arrow-right" id="arr"></i>
                    </a>
                  </div>
                </li>
                <li className="box-list">
                  <div className="box-title">
                    <font>Check before the ad starts!</font>
                  </div>
                  <div className="box-sub-text">
                    <font>Check out which ads are right for you!</font>
                  </div>
                  <div className="box-link-wrap">
                    <a href="#" className="box-link">
                      <span className="box-text">
                        <font>Check your ad type</font>
                      </span>
                      <i className="ic-arrow-right" id="arr"></i>
                    </a>
                 
                  </div>
                </li>
              </ul>
            </div>
          </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
