import { useIcarusContext } from "@src/hooks";
import useAuth from "@src/hooks/useAuth";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { AdList, Advertising, NotificationCentre } from '@src/sections/dashboard';

const DashboardScreen = () => {

    const { isKorean, dictionary } = useAuth();
    const {setPageTitle} = useIcarusContext();


    useEffect(()=>{
        setPageTitle(dictionary.pageTitle["top_bar_dashboard"]);
    },[isKorean])

  return (
    <main className="py-[30px] px-[20px] sm:py-[20px] sm:px-[30px]">
      <Row className="ad-page">
        <Col md="6" className="lg:pr-0 lg:w-[51%]">
          <Advertising />
        </Col>
        <Col md="6" className="lg:pl-[30px] lg:pr-0 lg:w-[49%]">
          <NotificationCentre />
        </Col>
      </Row>
      <Row className="">
        <Col md="12" className="lg:pr-0">
          <AdList />
        </Col>
      </Row>
    </main>
  );
}

export default DashboardScreen
