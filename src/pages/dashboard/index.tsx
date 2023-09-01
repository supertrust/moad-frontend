import React from "react";
import { Col, Row } from "react-bootstrap";
import { AdList, Advertising, NotificationCentre } from '@src/sections/dashboard';

const DashboardScreen = () => {
  return (
    <main className="p-10">
      <Row className="ad-page">
        <Col md="6">
          <Advertising />
        </Col>
        <Col md="6">
          <NotificationCentre />
        </Col>
        </Row>
        <Row className="adlist">
        <Col md="12">
          <AdList />
        </Col>
      </Row>
    </main>
  );
}

export default DashboardScreen
