import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import { Pagination } from "antd";
import { useGetCategories, useGetFaq } from "@src/apis/faq";
import ArrowBack from "@src/components/icons/ArrowBack";
import useAuth from '@src/hooks/useAuth';
import { useRouter } from "next/router";

export default function FaqScreen() {
  const router = useRouter();
	const { dictionary:{ faqPage } } = useAuth();
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const { data: faq,isLoading : isFaqLoading } = useGetFaq(currentPage,selectedTab);
  const { data: category, isLoading, isFetching, refetch } = useGetCategories({ type:'faq' })
  const faqTypes = category?.data ? [{name:faqPage.allTab}].concat(category?.data) : []


  const Types = {
    "": faqPage.allTab,
    "service_use": '서비스이용',
    "payment_refund": '결제/환불',
    "etc": '기타'
  }
  // Pagination
  const itemsPerPage = 10;

  const totalItems =  faq?.length || 0 ; //selectedTab == "all" ? faq?.length ?? 0 : (selectedTab == "service_use" ? faqUse?.length : selectedTab == "payment_refund" ? faqRefund?.length : (selectedTab == "etc" ? faqEtc?.length : 0)) ?? 0; // Total number of items
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages
  const prevItems = (currentPage - 1) * itemsPerPage;
  const currentItems = currentPage * itemsPerPage;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSelect = (key) => {
    setCurrentPage(1);
    setSelectedTab(key===faqPage.allTab ? '' : key);
  }


    const onBack = ()=>
    {
        router.back();
    }

  return (
    <div className="faq-content ">
      <div className="faq">
      <div className={`block lg:hidden px-[20px]`}>
                                    <div className={`mobile-top-header`}>
                                        <ArrowBack handleAction={onBack}/>
                                        <div className={'header'}>
                                            FAQ
                                        </div>
                                        <div></div>
                                    </div>

                                </div>
        <Tabs defaultActiveKey={faqPage.allTab} onSelect={(e) => { handleSelect(e) }} className="mb-[16px] lg:mb-[30px] px-[20px] lg:px-0 tab-section">
          {faqTypes && faqTypes.map(({name},index) => (
            <Tab key={index} eventKey={name} title={name} />
          ))}
        </Tabs>

        <Accordion className="accordion-section min-h-[500px] sm:min-h-[560px] h-full bg-[#fff]">
          {isFaqLoading &&  <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
                <CircularProgress color="primary" />
              </div>
          }
          {!isFaqLoading && Array.isArray(faq) &&faq?.slice(prevItems, currentItems).map((item, i) => {
            return (
              <Accordion.Item eventKey={`${i}`} key={i}>
                <Accordion.Header className="border-b border-[#EBEDF4] lg:border-[#999999] bg-[#f5f7fb] lg:bg-[#fff]">
                  <div className="list-title">
                    { selectedTab == "all"  && <div className="w-[80px] font-bold text-secondary">{item.type}</div> }
                    <div className="title">{item.question}</div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="bg-advertiser-light lg:bg-[rgba(225,236,255,0.25)]"
                dangerouslySetInnerHTML={{ __html: item.answer || '' }}/>
              </Accordion.Item>
            );
          })}
          {!isFaqLoading && !faq?.length &&
            <div className="!text-center !text-[#999] border-0 !p-[200px] bg-[#fff] rounded-[5px]">
              {faqPage.noFaqsMsg}
            </div>
          }
        </Accordion>
        {!!faq &&
          <div className="flex justify-center py-[30px] notification_pagination bg-transparent lg:!bg-[#fff]">
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
