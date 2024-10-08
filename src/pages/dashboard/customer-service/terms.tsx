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
    const { dictionary, isKorean, isPcOnly } = useAuth();
    const { setPageTitle } = useIcarusContext()
    const { privacy } = useTranslations();

    const onBack = () => {
        router.back();
    };

    useEffect(() => {
        setPageTitle(dictionary?.pageTitle['top_bar_policies_and_terms']);
    }, [isKorean])

    const handleScrollToSection = (index) => {
        const element = document.getElementById(`${index}`);
        const navbarHeight = isPcOnly ? 125 : 69; // Set this to the actual height of your navbar

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
                            <ArrowBack handleAction={onBack}/>
                            <div className={'header'}>
                                {dictionary.sidebar.termsAndPolicies}
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <Tabs
                        defaultActiveKey='결제/환불'
                        className='!mb-[16px] lg:!mb-[30px] tab-section'>
                        <Tab
                            eventKey='개인정보처리방침'
                            title={dictionary.terms.privacy_policy} onEnter={() => router.push(PageRouting.privacy)}>

                        </Tab>
                        <Tab eventKey='결제/환불' title={dictionary.terms.terms_of_use}>
                            <Accordion className='accordion-section terms-section'>
                                <div className='content-terms'>
                                    <div className='content-table !bg-advertiser-light mx-[-30px] px-[30px] mt-[-30px] pt-[28px]  mb-[-20px] pb-[28px]'>
                                        <div className='row row-cols-1 row-cols-md-3 g-0'>
                                            {
                                                privacy.map((term, index) => (
                                                    <div className='col cursor-pointer' key={index} onClick={() => handleScrollToSection(index)}>
                                                        <div className='card h-100'>
                                                            <div className='card-body'>
                                                                <h5 className='card-title'>
                                                                    <a>{term.title}</a>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>))
                                            }

                                        </div>
                                    </div>

                                    <div className='card border-0 mt-[20px] rounded-0 terms-details '>
                                        {
                                            privacy.map((term, index) => (
                                                <div className='card-body' id={`${index}`} key={index}>
                                                    <h5 className='card-title'>
                                                        <strong>{term.title}</strong>
                                                    </h5>
                                                    <ul>
                                                        <li> {term.content} </li>
                                                    </ul>
                                                </div>))
                                        }
                                    </div>
                                </div>
                            </Accordion>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
