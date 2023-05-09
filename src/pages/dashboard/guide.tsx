import React from "react";
import {Container, Row, Col} from 'react-bootstrap';

export default function GuideScreen() {
  return (
    <>
      <Container>
        <Row>
          <Col md="12">
          <div className="guide-content">
            <div className="title-wrap">
              <div className="title">
             <span>Advertising Startup Guide </span>
              </div>
              <div className="sub-text">
                <span>New to Icarus? </span>
                <span> We've compiled some helpful tips for advertisers just starting out.</span>
              </div>
            </div>
            <div className="guide-box-wrap">
              <ul className="box-wrap">
                <li className="box-list">
                  <div className="box-title">
                    <span>Are you new to wrapping ads?</span>
                  </div>
                  <div className="box-sub-text">
                    <span>Which advertisement is suitable for me, check the advertisement cost!</span>
                  </div>
                  <div className="box-link-wrap">
                    <a href="#" className="box-link">
                      <span className="box-text">
                        <span>What is a wrap ad?</span>
                      </span>
                      <i className="ic-arrow-right" id="arr"></i>
                    </a>
                    <a href="#" className="box-link">
                      <span className="box-text">
                        <span>Check the ad progress process</span>
                      </span>
                      <i className="ic-arrow-right" id="arr"></i>
                    </a>
                  </div>
                </li>
                <li className="box-list">
                  <div className="box-title">
                    <span>Check before the ad starts!</span>
                  </div>
                  <div className="box-sub-text">
                    <span>Check out which ads are right for you!</span>
                  </div>
                  <div className="box-link-wrap">
                    <a href="#" className="box-link">
                      <span className="box-text">
                        <span>Check your ad type</span>
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
