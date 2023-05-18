import React from "react";
import { Col, Row } from "react-bootstrap";
import { AdList, Advertising, NotificationCentre } from '@src/sections/dashboard';
import RoleBasedGuard from "@src/guards/RoleBasedGuard";

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
        <Col md="12">
          <AdList />
        </Col>
      </Row>
    </main>
  );
}

//if user role is 'Advertiser'
const WithRoles=()=>(
    <RoleBasedGuard roles={['Advertise']}>
      <DashboardScreen/>
    </RoleBasedGuard>
)

export default WithRoles
