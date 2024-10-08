import ArrowBack from '@src/components/icons/ArrowBack';
import { useIcarusContext } from "@src/hooks";
import useAuth from '@src/hooks/useAuth';
import useTranslations from "@src/hooks/useTranslations";
import { PageRouting } from "@src/utils/values";
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Accordion, Tab, Tabs } from 'react-bootstrap';

export default function PolicyModulePage() {
    const router = useRouter();
    const { dictionary,isKorean,isPcOnly } = useAuth();
    const { setPageTitle } = useIcarusContext()
    const { policy} = useTranslations();

    const onBack = () => {
        router.back();
    };

    useEffect(()=>
    {
        setPageTitle(dictionary?.pageTitle['top_bar_policies_and_terms']);
    },[isKorean])

    const handleScrollToSection = (index) => {
        const element = document.getElementById(`${index}`);
        const navbarHeight = isPcOnly? 125 : 69; // Set this to the actual height of your navbar

        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;

            // Smoothly scroll to the element's position minus the navbar height
            window.scrollTo({
                top: elementPosition - navbarHeight,
                behavior: 'smooth',
            });
        }
    };




    return (
        <>
            <div className='policy-container'>
                <div className='privacy-content'>
                    <div className={`only-mb mt-[15px]`}>
                        <div className={`mobile-top-header !mb-[14px]`}>
                            <ArrowBack handleAction={onBack} />
                            <div className={'header'}>
                                {dictionary.sidebar.termsAndPolicies}
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <Tabs
                        defaultActiveKey='개인정보처리방침'
                        className='!mb-[16px] lg:!mb-[30px] tab-section'>
                        <Tab
                            eventKey='개인정보처리방침'
                            title={dictionary.terms.privacy_policy}>
                            <Accordion className='accordion-section'>
                                <div className='content-terms'>
                                    <div className='content !bg-table-header'>
                                        {dictionary.privacy.section01InfoText}
                                    </div>
                                    <div className='content-table px-[0px] py-[20px] lg:px-[20px] lg:py-[30px]'>
                                        <div className='row row-cols-1 row-cols-md-3 g-0'>
                                            {
                                                policy.map((item, index) => {
                                                    return  <div className='col cursor-pointer' key={index} onClick={() => handleScrollToSection(index)}>
                                                        <div className='card h-100'>
                                                            <div className='card-body'>
                                                                <h5 className='card-title'>
                                                                    <a>
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className='card border-0 rounded-0 card-details' >
                                        {
                                            policy.map((item, index) => {
                                                return    <div key={index} className='card-body'  id={`${index}`}>
                                                    <h5 className='card-title'>
                                                        <strong>
                                                            {item.title}
                                                        </strong>
                                                    </h5>
                                                    <div className='card-text mt-[20px]'>
                                                        {item.content}
                                                    </div>
                                                </div>
                                            })
                                        }

                                        <div className='card-body card-body-bottom-text border-bottom-0'>
                                            <p className='card-text text-end'>
                                                {dictionary.privacy.footer.announcementDate}
                                            </p>
                                            <p className='card-text text-end'>
                                                {dictionary.privacy.footer.enforcementDate}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Accordion>
                        </Tab>
                        <Tab eventKey='결제/환불' title={dictionary.terms.terms_of_use}  onEnter={()=>router.push(PageRouting.terms)}>

                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
