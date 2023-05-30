import React from "react";
import { Col, Row } from "react-bootstrap";
import { AdList, Advertising, NotificationCentre } from '@src/sections/dashboard';
import RoleBasedGuard from "@src/guards/RoleBasedGuard";

const AdManagementScreen = () => {
  return (
    <main className="p-10">
      <Row className="ad-page">
        <Col md="12">
          <AdList />
        </Col>
      </Row>
    </main>
  );
}

const WithRoles=()=>(
    <RoleBasedGuard roles={['Advertiser']}>
      <AdManagementScreen />
    </RoleBasedGuard>
)

export default WithRoles;
