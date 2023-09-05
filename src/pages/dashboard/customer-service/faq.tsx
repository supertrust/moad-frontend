import React from "react";
import { Accordion, Pagination, Tab, Tabs } from "react-bootstrap";
import { useGetFaq, useGetFaqUse } from "@src/apis/faq";

export default function FaqScreen() {
  const { data: faq } = useGetFaq();
  const { data: faqUse } = useGetFaqUse();

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
  const Types = {
    "service_use" : '서비스이용',
    "payment_refund" : '결제/환불',
    "etc" : '기타'
  }

  return (
    <div className="faq-content">
      <div className="faq">
        <Tabs defaultActiveKey="전체" className="mb-[30px] tab-section">
          <Tab eventKey="전체" title="전체">
            <Accordion className="accordion-section">
              {faq && faq? faq.map((item, i) => {
                return (
                  <Accordion.Item eventKey={`${i}`} key={i}>
                    <Accordion.Header>
                      <div className="list-title">
                        <div className="category font-semibold">{Types[item.type]}</div>
                        <div className="title">{item.question}</div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="bg-[rgba(225,236,255,0.25)]">{item.answer}</Accordion.Body>
                  </Accordion.Item>
                );
              }) : 
                <div className="!text-center !text-[#999] border-0 !p-[200px] bg-[#fff] rounded-[5px]">
                  등록된 FAQ가 없습니다.
                </div>
                }
            </Accordion>
            {faq?.length ? 
            <Pagination>
              <Pagination.Prev className="prev-btn" />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Next className="next-btn" />
            </Pagination> :
            null
            }
          </Tab>
          <Tab eventKey="서비스이용" title="서비스이용">
            {/* {faqServiceUse?.length} */}
            <Accordion className="accordion-section">
              {faqUse? faqUse.map((item, i) => {
                return (
                  <Accordion.Item eventKey={`${i}`} key={i}>
                    <Accordion.Header>
                      <div className="list-title">
                        {/* <div className="category">{item.category}</div> */}
                        <div className="title">{item.question}</div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="bg-[rgba(225,236,255,0.25)]">{item.answer}</Accordion.Body>
                  </Accordion.Item>
                );
              }) :
              <div className="!text-center !text-[#999] border-0 !p-[200px] bg-[#fff] rounded-[5px]">
                  등록된 FAQ가 없습니다.
                </div>
              }
            </Accordion>
            {faqUse?.length ?   
            <Pagination>
              <Pagination.Prev className="prev-btn" />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Next className="next-btn" />
            </Pagination>
            :
            null
          }
          </Tab>
          <Tab eventKey="결제/환불" title="결제/환불">
            <div className="!text-center !text-[#999] border-0 !p-[200px] bg-[#fff] rounded-[5px]">등록된 FAQ가 없습니다.</div>
          </Tab>
          <Tab eventKey="기타" title="기타">
            <div className="!text-center !text-[#999] border-0 !p-[200px] bg-[#fff] rounded-[5px]">등록된 FAQ가 없습니다.</div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
