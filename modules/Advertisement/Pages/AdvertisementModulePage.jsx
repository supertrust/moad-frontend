import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import AdListModule from "../Components/AdListModule";
import NotificationCentreModule from "../Components/NotificationCentreModule";
import AdvertisingModule from "../Components/AdvertisingModule";

export default function AdvertisementModulePage() {
  return (
    <Row>
      {/* <Col md="6">
          <div className="ad-status">
            <div className="title-wrap">
              <div className="title">
                    Advertising status
              </div>
              <div className="line"></div>
             
              <div className="text">
                    As of 12:00 am on March 10, 2023
              </div>
            </div>
            <div className="ad-content">
              <div className="card">
                <div className="title">
                      registered advertisement
                </div>
                <div className="value">-</div>
              </div>
              <div className="card">
                <div className="title">total vehicle
                </div>
                <div className="value">20s
                </div>
              </div>
              <div className="card">
                <div className="title">running
                </div>
                <div className="value">15th
                </div>
              </div>
              <div className="card">
                <div className="title">Suspension
                </div>
                <div className="value">5 generations
                </div>
              </div>
              <div className="card">
                <div className="title">
                      total distance 
                </div>
                <div className="value">-
                </div>
              </div>
              <div className="card">
                <div className="title">
                      total running time
                </div>
                <div className="value">,460 hours
                </div>
              </div>
            </div>
          </div>
        </Col> */}
      <Col md="6">
        <AdvertisingModule />
      </Col>
      <Col md="6">
        <NotificationCentreModule />
      </Col>
      <Col md="12">
        <AdListModule />
      </Col>
    </Row>
  );
}
