import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function GuideScreen() {
  return (
    <>
      <Container>
        <Row>
          <Col md="12">
          <div className="guide-content">
            <div className="title-wrap p-0">
              <div className="title">
             <span className="font-bold">광고 시작 가이드</span>
              </div>
              <div className="sub-text">
                <span>New to Icarus? </span>
                <span>이카루스가 처음이신가요? 시작하는 광고주분들에게 도움이 될 수 있는 내용을 정리해보았습니다.</span>
              </div>
            </div>
            <div className="guide-box-wrap">
              <ul className="box-wrap">
                <li className="box-list">
                  <div className="box-title font-semibold	">
                    <span>랩핑광고가 처음이신가요?</span>
                  </div>
                  <div className="box-sub-text">
                    <span>브랜드를 알릴 수 있는 최고의 기회! 랩핑광고 시작 전 확인하세요!</span>
                  </div>
                  <div className="box-link-wrap">
                    <a href="#" className="box-link">
                      <span className="box-text">
                        <span>랩핑 광고란?</span>
                      </span>
                      <ChevronRightIcon className="w-7 h-7 text-[#FFFFFF]" />
                    </a>
                    <a href="#" className="box-link">
                      <span className="box-text">
                        <span>광고 진행 프로세스 확인하기</span>
                      </span>
                      <ChevronRightIcon className="w-7 h-7 text-[#FFFFFF]" />
                    </a>
                  </div>
                </li>
                <li className="box-list">
                  <div className="box-title font-semibold">
                    <span>광고 시작 전 확인하세요!</span>
                  </div>
                  <div className="box-sub-text">
                    <span>나에게 알맞는 광고는 어떤것이 있는지 확인하세요!</span>
                  </div>
                  <div className="box-link-wrap">
                    <a href="#" className="box-link">
                      <span className="box-text">
                        <span>광고 유형 확인하기</span>
                      </span>
                      <ChevronRightIcon className="w-7 h-7 text-[#FFFFFF]" />
                    </a>
                 
                  </div>
                </li>
                <li className="box-list">
                  <div className="box-title font-semibold">
                    <span>이카루스 이렇게 활용하세요!</span>
                  </div>
                  <div className="box-sub-text">
                    <span>광고 등록부터 통계까지 한번에 이카루스에서 확인할 수 있습니다!</span>
                  </div>
                  <div className="box-link-wrap">
                    <a href="#" className="box-link">
                      <span className="box-text">
                        <span>이카루스 활용법 확인하기</span>
                      </span>
                      <ChevronRightIcon className="w-7 h-7 text-[#FFFFFF]" />
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
