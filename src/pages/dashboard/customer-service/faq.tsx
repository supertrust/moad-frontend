import { PushPin } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useIcarusContext } from "@src/hooks";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import { Pagination } from "antd";
import { useGetCategories, useGetFaq } from "@src/apis/faq";
import ArrowBack from "@src/components/icons/ArrowBack";
import useAuth from '@src/hooks/useAuth';
import { useRouter } from "next/router";

export default function FaqScreen() {
    const router = useRouter();
    const { dictionary: { faqPage, pageTitle }, isKorean,isPcOnly } = useAuth();
    const [filter, setFilter] = useState<{ page : number,totalItems : number, per_page : number}>({
        page: 1,
        totalItems: 0,
        per_page: 10
    })
    const { setPageTitle } = useIcarusContext()
    const [selectedTab, setSelectedTab] = useState<string>('');
    const { data: res, isLoading: isFaqLoading } = useGetFaq(filter?.page || 1, selectedTab);
    const { data: category, isLoading, isFetching, refetch } = useGetCategories({ type: 'faq' })
    const faq = res?.data;
    const faqTypes = category?.data ? [{ name: faqPage.allTab }].concat(category?.data) : []


    // Pagination
    const itemsPerPage = 10;

     //selectedTab == "all" ? faq?.length ?? 0 : (selectedTab == "service_use" ? faqUse?.length : selectedTab == "payment_refund" ? faqRefund?.length : (selectedTab == "etc" ? faqEtc?.length : 0)) ?? 0; // Total number of items

    const handlePageChange = (page) => {
        setFilter({
            ...filter,
            page
        })
    };
    const handleSelect = (key) => {
        setFilter({
            ...filter,
            page : 1
        })
        setSelectedTab(key === faqPage.allTab ? '' : key);
    }


    const onBack = () => {
        router.back();
    }

    useEffect(() => {
        setPageTitle(pageTitle['top_bar_faq']);
    }, [isKorean])

    useEffect(() => {
        if(res && !isLoading){
            setFilter({
                ...filter,
                totalItems: res?.totalRecords,
            })
        }

    }, [isLoading])


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
                <Tabs defaultActiveKey={faqPage.allTab} onSelect={(e) => {
                    handleSelect(e)
                }} className="mb-[16px] lg:mb-[30px] px-[20px] lg:px-0 tab-section flex flex-wrap">
                    {faqTypes && faqTypes.map(({ name }, index) => (
                        <Tab key={index} eventKey={name} title={name}/>
                    ))}
                </Tabs>

                <Accordion className="accordion-section sm:overflow-auto min-h-[500px] sm:max-h-[500px] sm:min-h-[560px] h-full bg-[#fff]">
                    {isFaqLoading && <div className="sm:min-h-[460px] flex justify-center items-center w-full h-32 backdrop-blur-sm">
                        <CircularProgress color="primary"/>
                    </div>
                    }
                    {!isFaqLoading && Array.isArray(faq) && faq?.map((item, i) => {
                        return (
                            <Accordion.Item eventKey={`${i}`} key={i}>
                                <Accordion.Header
                                    className={clsx("border-b border-[#EBEDF4] lg:border-[#999999]", !item.sort_order ? "bg-[#f5f7fb] lg:bg-[#fff]" : "bg-[#FFF6E3]")}>
                                    <div className="list-title">
                                        {
                                            isPcOnly ?  <div className={'!w-4 shrink-0'}>
                                                {
                                                    item.sort_order? <PushPin className="!w-4"/> : <></>
                                                }
                                            </div> : <></>
                                        }
                                        <div
                                            className="min-w-[100px] w-[100px] font-bold text-secondary break-all break-words">{item.type?.name}</div>
                                        <div className="title text-justify pr-3 flex gap-1">
                                            {
                                                (!isPcOnly && item.sort_order) ?  <div className={'!w-4 shrink-0'}>
                                                    <PushPin className="!w-4"/>
                                                </div> : <></>
                                            }
                                            {item.question}</div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body
                                    className="bg-advertiser-light lg:bg-[rgba(225,236,255,0.25)] text-justify"
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
                {filter?.totalItems ?
                    <div className="flex justify-center py-[30px] notification_pagination bg-transparent lg:!bg-[#fff]">
                        <Pagination
                            current={filter?.page || 1}
                            total={filter?.totalItems || 0}
                            pageSize={itemsPerPage}
                            onChange={handlePageChange}
                        />
                    </div> : <></>
                }
            </div>
        </div>
    );
}
