import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import { Pagination } from "antd";
import { useGetFaq } from "@src/apis/faq";

export default function FaqScreen() {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const { data: faq,isLoading : isFaqLoading } = useGetFaq(selectedTab !== 'all' ? selectedTab : '');

  const Types = {
    "all": '전체',
    "service_use": '서비스이용',
    "payment_refund": '결제/환불',
    "etc": '기타'
  }
  // Pagination
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const totalItems =  faq?.length || 0 ; //selectedTab == "all" ? faq?.length ?? 0 : (selectedTab == "service_use" ? faqUse?.length : selectedTab == "payment_refund" ? faqRefund?.length : (selectedTab == "etc" ? faqEtc?.length : 0)) ?? 0; // Total number of items
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages
  const prevItems = (currentPage - 1) * itemsPerPage;
  const currentItems = currentPage * itemsPerPage;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSelect = (key) => {
    setCurrentPage(1);
    setSelectedTab(key);
  }

  return (
    <div className="faq-content ">
      <div className="faq">
        <Tabs defaultActiveKey="all" onSelect={(e) => { handleSelect(e) }} className="mb-[30px] tab-section">
          {Types && Object.keys(Types).map((key,index) => (
            <Tab key={index} eventKey={key} title={Types[key]} />
          ))}
        </Tabs>

        <Accordion className="accordion-section min-h-[500px] sm:min-h-[600px] h-full">
          {isFaqLoading &&  <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
                <CircularProgress color="primary" />
              </div>
          }
          {!isFaqLoading && faq?.slice(prevItems, currentItems).map((item, i) => {
            return (
              <Accordion.Item eventKey={`${i}`} key={i}>
                <Accordion.Header>
                  <div className="list-title">
                    { selectedTab == "all"  && <div className="w-[80px] font-bold text-secondary">{Types[item.type]}</div> }
                    <div className="title">{item.question}</div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="bg-[rgba(225,236,255,0.25)]">{item.answer}</Accordion.Body>
              </Accordion.Item>
            );
          })}
          {!isFaqLoading && !faq?.length &&
            <div className="!text-center !text-[#999] border-0 !p-[200px] bg-[#fff] rounded-[5px]">
              등록된 FAQ가 없습니다.
            </div>
          }
        </Accordion>
        {!!faq &&
          <div className="flex justify-center py-[30px] notification_pagination">
            <Pagination
              current={currentPage}
              total={totalItems}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
            />
          </div>
        }
      </div>
    </div>
  );
}
