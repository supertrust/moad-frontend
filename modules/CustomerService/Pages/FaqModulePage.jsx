import React from "react";
import { Accordion, Pagination, Tab, Tabs } from "react-bootstrap";

export default function FaqModulePage() {
  const AccordianContent = [
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
  ];
  return (
    <div className="faq-content">
      <div className="faq">
        <Tabs defaultActiveKey="전체" className="mb-4 tab-section">
          <Tab eventKey="전체" title="전체">
            <Accordion className="accordion-section">
              {AccordianContent.map((item, i) => {
                return (
                  <Accordion.Item eventKey={i} key={i}>
                    <Accordion.Header>
                      <div className="list-title">
                        <div className="category">{item.category}</div>
                        <div className="title">{item.title}</div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>{item.body}</Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
            <Pagination>
              <Pagination.Prev className="prev-btn" />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Next className="next-btn" />
            </Pagination>
          </Tab>
          <Tab eventKey="서비스이용" title="서비스이용">
            <Accordion className="accordion-section">
              {AccordianContent.map((item, i) => {
                return (
                  <Accordion.Item eventKey={i} key={i}>
                    <Accordion.Header>
                      <div className="list-title">
                        <div className="category">{item.category}</div>
                        <div className="title">{item.title}</div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>{item.body}</Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
            <Pagination>
              <Pagination.Prev className="prev-btn" />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Next className="next-btn" />
            </Pagination>
          </Tab>
          <Tab eventKey="결제/환불" title="결제/환불">
            <div class="none-list">등록된 FAQ가 없습니다.</div>
          </Tab>
          <Tab eventKey="기타" title="기타">
            <div class="none-list">등록된 FAQ가 없습니다.</div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
