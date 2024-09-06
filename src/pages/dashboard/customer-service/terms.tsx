import { useIcarusContext } from "@src/hooks";
import React, { useEffect } from 'react';
import { Accordion, Pagination, Tab, Tabs } from 'react-bootstrap';
import ArrowBack from '@src/components/icons/ArrowBack';
import { useRouter } from 'next/router';
import useAuth from '@src/hooks/useAuth';
export default function PolicyModulePage() {
  const router = useRouter();
  const { dictionary,isKorean } = useAuth();
  const { setPageTitle } = useIcarusContext()

  const onBack = () => {
    router.back();
  };

  useEffect(()=>
  {
    setPageTitle(dictionary?.pageTitle['top_bar_policies_and_terms']);
  },[isKorean])

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
                  <div className='content !bg-advertiser-light'>
                    {/* ㈜모드(이하 “회사”)는 회사가 운영하는
                    <br className=' block lg:hidden' /> 인터넷 사이트(홈페이지
                    URL이하 “모드”)를 이용하는 이용자님들의 개인정보를 매우
                    중요하게 생각하며
                    <br className=' block lg:hidden' /> 아래와 같은
                    개인정보처리방침을 가지고 있습니다.
                    <br className=' block lg:hidden' /> 이 개인정보처리방침은
                    개인정보와 관련한 법령 또는 지침의 변경이 있는 경우
                    갱신되고, 정책의 변화에 따라 달라질 수 있으니 이용자께서는
                    모드 마케팅 플랫폼 사이트를 방문 시 수시로 확인하여
                    주시기 바랍니다.
                    <br />
                    모드 마케팅 플랫폼의 개인정보처리방침은 다음과 같은
                    내용을 담고 있습니다. */}
                    {dictionary.privacy.section01InfoText}
                  </div>
                  <div className='content-table px-[0px] py-[20px] lg:px-[20px] lg:py-[30px]'>
                    <div className='row row-cols-1 row-cols-md-3 g-0'>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              {/* <a href='#제1조'>제1조. 개인정보의 수집•이용</a> */}
                              <a href='#제1조'>
                                {
                                  dictionary.privacy.policyList.policyItem01
                                    .title
                                }
                              </a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              {' '}
                              <a href='#제2조'>
                                {/* 제2조. 개인정보 제3자 제공 */}
                                {
                                  dictionary.privacy.policyList.policyItem02
                                    .title
                                }
                              </a>{' '}
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제3조'>
                                {/* 제3조. 개인정보 처리 위탁 */}
                                {
                                  dictionary.privacy.policyList.policyItem03
                                    .title
                                }
                              </a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제4조'>
                                {/* 제4조. 이용자 개인정보의 보유: 이용기간 및 파기 */}
                                {
                                  dictionary.privacy.policyList.policyItem04
                                    .title
                                }
                              </a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제5조'>
                                {/* 제5조. 쿠키(Cookie)의 운용 및 거부 */}
                                {
                                  dictionary.privacy.policyList.policyItem05
                                    .title
                                }
                              </a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='제6조'>
                                {/* 제6조. 이용자 권리 */}
                                {
                                  dictionary.privacy.policyList.policyItem06
                                    .title
                                }
                              </a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제7조'>
                                {/* 제7조. 이용자의 의무 */}
                                {
                                  dictionary.privacy.policyList.policyItem07
                                    .title
                                }
                              </a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제8조'>
                                {/* 제8조. 링크 사이트에 대한 책임 */}
                                {
                                  dictionary.privacy.policyList.policyItem08
                                    .title
                                }
                              </a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제9조'>
                                {/* 제9조. 개인정보의 기술적/관리적 보호 대책 */}
                                {
                                  dictionary.privacy.policyList.policyItem09
                                    .title
                                }
                              </a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제10조'>
                                {/* 제10조. 개인정보보호책임자 */}
                                {
                                  dictionary.privacy.policyList.policyItem10
                                    .title
                                }
                              </a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제11조'>
                                {/* 제11조. 고지의 의무 */}
                                {
                                  dictionary.privacy.policyList.policyItem11
                                    .title
                                }
                              </a>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card border-0 rounded-0 card-details'>
                    <div className='card-body' id='제1조'>
                      <h5 className='card-title'>
                        <strong>
                          {dictionary.privacy.policyList.policyItem01.title}
                        </strong>
                      </h5>
                      <ul>
                        <li>
                          <div>
                            {
                              dictionary.privacy.policyList.policyItem01
                                .description.items[0].subItem
                            }
                          </div>
                          {
                            dictionary.privacy.policyList.policyItem01
                              .description.items[0].text
                          }
                        </li>
                        <li>
                          <div>
                            {
                              dictionary.privacy.policyList.policyItem01
                                .description.items[1].subItem
                            }
                          </div>
                          {
                            dictionary.privacy.policyList.policyItem01
                              .description.items[1].text
                          }
                        </li>
                        <li>
                          <div>
                            {
                              dictionary.privacy.policyList.policyItem01
                                .description.items[2].subItem
                            }
                          </div>
                          {
                            dictionary.privacy.policyList.policyItem01
                              .description.items[2].text
                          }
                        </li>
                      </ul>
                      <div className='table-cont'>
                        <p className='card-text table-cont-text'>
                          {' '}
                          {
                            dictionary.privacy.policyList.policyItem01
                              .description.tableContent.title
                          }{' '}
                        </p>
                        <p className='card-text'>
                          {
                            dictionary.privacy.policyList.policyItem01
                              .description.tableContent.items[0].purpose
                          }
                          <br />
                          {
                            dictionary.privacy.policyList.policyItem01
                              .description.tableContent.items[0].items
                          }
                          <br />
                          {
                            dictionary.privacy.policyList.policyItem01
                              .description.tableContent.items[0].retentionPeriod
                          }
                        </p>
                        <div className='table-responsive hidden'>
                          <table className='table'>
                            <tr>
                              <th>목적</th>
                              <th>항목</th>
                              <th>보유기간</th>
                            </tr>
                            <tr>
                              <td>
                                {
                                  dictionary.privacy.policyList.policyItem01
                                    .description.tableContent.items[0].purpose
                                }
                              </td>
                              <td>
                                {
                                  dictionary.privacy.policyList.policyItem01
                                    .description.tableContent.items[0].purpose
                                }
                              </td>
                              <td rowSpan={2}>
                                {
                                  dictionary.privacy.policyList.policyItem01
                                    .description.tableContent.items[0]
                                    .retentionPeriod
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>
                                {
                                  dictionary.privacy.policyList.policyItem01
                                    .description.tableContent.items[0]
                                    .retentionPeriod
                                }
                              </td>
                              <td>
                                {
                                  dictionary.privacy.policyList.policyItem01
                                    .description.tableContent.items[0].items
                                }
                              </td>
                            </tr>
                          </table>
                        </div>
                        <p className='card-text table-cont-second-text'>
                          {
                            dictionary.privacy.policyList.policyItem01
                              .description.tableContent.secondTitle
                          }
                        </p>
                        <p className='card-text'>
                          {
                            dictionary.privacy.policyList.policyItem01
                              .description.tableContent.secondItem
                          }
                        </p>
                      </div>
                    </div>

                    <div className='card-body' id='제2조'>
                      <h5 className='card-title'>
                        <strong>
                          {dictionary.privacy.policyList.policyItem02.title}
                        </strong>
                      </h5>
                      <ul>
                        <li>
                          <div>{dictionary.common.a}.</div>
                          <div>
                            {
                              dictionary.privacy.policyList.policyItem02
                                .description.items[0].text
                            }
                            <ol>
                              <li>
                                {
                                  dictionary.privacy.policyList.policyItem02
                                    .description.items[1].text
                                }
                              </li>
                              <li>
                                {
                                  dictionary.privacy.policyList.policyItem02
                                    .description.items[2].text
                                }
                              </li>
                              <li>
                                {
                                  dictionary.privacy.policyList.policyItem02
                                    .description.items[3].text
                                }
                              </li>
                            </ol>
                          </div>
                        </li>
                        <li>
                          <div>{dictionary.common.b}.</div>
                          {
                            dictionary.privacy.policyList.policyItem02
                              .description.items[4].text
                          }
                        </li>
                      </ul>
                    </div>

                    <div className='card-body' id='제3조'>
                      <h5 className='card-title'>
                        <strong>
                          {dictionary.privacy.policyList.policyItem03.title}
                        </strong>
                      </h5>
                      <ul>
                        <li>
                          <div> {dictionary.common.a}.</div>
                          <div>
                            {
                              dictionary.privacy.policyList.policyItem03
                                .description.items[0].text
                            }
                            <ol>
                              <li>
                                {' '}
                                {
                                  dictionary.privacy.policyList.policyItem03
                                    .description.items[1].text
                                }
                              </li>
                              <li>
                                {' '}
                                {
                                  dictionary.privacy.policyList.policyItem03
                                    .description.items[2].text
                                }
                              </li>
                            </ol>
                          </div>
                        </li>
                        <li>
                          <div> {dictionary.common.b}.</div>
                          {
                            dictionary.privacy.policyList.policyItem03
                              .description.items[3].text
                          }
                        </li>
                        <li>
                          <div> {dictionary.common.c}.</div>
                          {
                            dictionary.privacy.policyList.policyItem03
                              .description.items[4].text
                          }
                        </li>
                      </ul>
                    </div>

                    <div className='card-body' id='제4조'>
                      <h5 className='card-title'>
                        <strong>
                          {dictionary.privacy.policyList.policyItem04.title}
                        </strong>
                      </h5>
                      <ul>
                        <li>
                          {
                            dictionary.privacy.policyList.policyItem04
                              .description.items[0].text
                          }
                        </li>
                        <li>
                          <strong>
                            {
                              dictionary.privacy.policyList.policyItem04
                                .description.items[1].subItem
                            }
                          </strong>
                          {
                            dictionary.privacy.policyList.policyItem04
                              .description.items[1].text
                          }
                        </li>
                        <li>
                          <strong>
                            {
                              dictionary.privacy.policyList.policyItem04
                                .description.items[2].subItem
                            }
                          </strong>
                          {
                            dictionary.privacy.policyList.policyItem04
                              .description.items[2].text
                          }
                        </li>
                      </ul>
                    </div>

                    <div className='card-body' id='제5조'>
                      <h5 className='card-title'>
                        <strong>
                          {dictionary.privacy.policyList.policyItem05.title}
                        </strong>
                      </h5>
                      <ul>
                        <li>
                          <div>
                            {
                              dictionary.privacy.policyList.policyItem05
                                .description.items[0].subItem
                            }
                          </div>
                          <div>
                            {dictionary.privacy.policyList.policyItem05.description.items[0].text
                              .split('\n')
                              .map((item, index) => (
                                <p key={index} className='m-0'>
                                  {item}
                                </p>
                              ))}
                          </div>
                        </li>
                        <li>
                          <div>
                            {
                              dictionary.privacy.policyList.policyItem05
                                .description.items[1].subItem
                            }
                          </div>
                          <div>
                            {dictionary.privacy.policyList.policyItem05.description.items[1].text
                              .split('\n')
                              .map((item, index) => (
                                <p key={index} className='m-0'>
                                  {item}
                                </p>
                              ))}
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className='card-body' id='제6조'>
                      <h5 className='card-title'>
                        <strong>
                          {dictionary.privacy.policyList.policyItem06.title}
                        </strong>
                      </h5>
                      <ul>
                        <li>
                          <div>{dictionary.common.a}.</div>
                          <div>
                            {dictionary.privacy.policyList.policyItem06.description.items[0].text
                              .split('\n')
                              .map((item, index) => (
                                <p key={index} className='m-0'>
                                  {item}
                                </p>
                              ))}
                          </div>
                        </li>
                        <li>
                          <div>{dictionary.common.b}.</div>
                          <div>
                            {dictionary.privacy.policyList.policyItem06.description.items[1].text
                              .split('\n')
                              .map((item, index) => (
                                <p key={index} className='m-0'>
                                  {item}
                                </p>
                              ))}
                          </div>
                        </li>
                        <li>
                          <div>{dictionary.common.c}.</div>
                          <div>
                            {dictionary.privacy.policyList.policyItem06.description.items[2].text
                              .split('\n')
                              .map((item, index) => (
                                <p key={index} className='m-0'>
                                  {item}
                                </p>
                              ))}
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className='card-body' id='제7조'>
                      <h5 className='card-title'>
                        <strong>
                          {dictionary.privacy.policyList.policyItem07.title}
                        </strong>
                      </h5>
                      <ul>
                        <li>
                          {
                            dictionary.privacy.policyList.policyItem07
                              .description.items[0]
                          }
                        </li>
                        <li>
                          {
                            dictionary.privacy.policyList.policyItem07
                              .description.items[1]
                          }
                        </li>
                        <li>
                          {
                            dictionary.privacy.policyList.policyItem07
                              .description.items[2]
                          }
                        </li>
                        <li>
                          {
                            dictionary.privacy.policyList.policyItem07
                              .description.items[3]
                          }
                        </li>
                        <li>
                          {
                            dictionary.privacy.policyList.policyItem07
                              .description.items[4]
                          }
                        </li>
                        <li>
                          {
                            dictionary.privacy.policyList.policyItem07
                              .description.items[5]
                          }
                        </li>
                      </ul>
                    </div>

                    <div className='card-body' id='제8조'>
                      <h5 className='card-title'>
                        <strong>
                          {dictionary.privacy.policyList.policyItem08.title}
                        </strong>
                      </h5>
                      <ul>
                        <li>
                          {
                            dictionary.privacy.policyList.policyItem08
                              .description.items[0]
                          }
                        </li>
                      </ul>
                    </div>

                    <div className='card-body' id='제9조'>
                      <h5 className='card-title'>
                        <strong>
                          {dictionary.privacy.policyList.policyItem09.title}
                        </strong>
                      </h5>
                      <ul>
                        <li>
                          {
                            dictionary.privacy.policyList.policyItem09
                              .description.items[0]
                          }
                        </li>
                        <li>
                          <div>
                            {
                              dictionary.privacy.policyList.policyItem09
                                .subItems.encryption.title
                            }
                            <ol>
                              <li>
                                {
                                  dictionary.privacy.policyList.policyItem09
                                    .subItems.encryption.description
                                }
                              </li>
                            </ol>
                          </div>
                        </li>
                        <li>
                          <div>
                            {
                              dictionary.privacy.policyList.policyItem09
                                .subItems.hacking.title
                            }
                            <ol>
                              <li>
                                {
                                  dictionary.privacy.policyList.policyItem09
                                    .subItems.hacking.description
                                }
                              </li>
                            </ol>
                          </div>
                        </li>
                        <li>
                          {
                            dictionary.privacy.policyList.policyItem09.subItems
                              .minimization.title
                          }
                          <br />
                          {
                            dictionary.privacy.policyList.policyItem09.subItems
                              .minimization.description
                          }
                        </li>
                        <li>
                          {
                            dictionary.privacy.policyList.policyItem09.subItems
                              .dedicatedDepartment.title
                          }
                          <br />
                          {
                            dictionary.privacy.policyList.policyItem09.subItems
                              .dedicatedDepartment.description
                          }
                        </li>
                      </ul>
                    </div>

                    <div className='card-body' id='제10조'>
                      <h5 className='card-title'>
                        <strong>
                          {dictionary.privacy.policyList.policyItem10.title}
                        </strong>
                      </h5>
                      <p className='card-text mt-[20px] mb-[10px]'>
                        {
                          dictionary.privacy.policyList.policyItem10.description
                            .items[0]
                        }
                      </p>
                      <p className='card-text'>
                        [Privacy Officer]
                        <br />
                        Name:{' '}
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .privacyOfficer.name
                        }
                        <br />
                        Department:{' '}
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .privacyOfficer.department
                        }
                        <br />
                        Email:{' '}
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .privacyOfficer.email
                        }
                        <br />
                        Phone Number:{' '}
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .privacyOfficer.phoneNumber
                        }
                        <br />
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .privacyOfficer.note
                        }
                      </p>
                      <p className='card-text mt-[20px]'>
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .otherContacts.title
                        }
                        <br />
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .otherContacts.agencies[0].name
                        }{' '}
                        /{' '}
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .otherContacts.agencies[0].website
                        }{' '}
                        /{' '}
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .otherContacts.agencies[0].phone
                        }
                        <br />
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .otherContacts.agencies[1].name
                        }{' '}
                        /{' '}
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .otherContacts.agencies[1].website
                        }{' '}
                        /{' '}
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .otherContacts.agencies[1].phone
                        }
                        <br />
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .otherContacts.agencies[2].name
                        }{' '}
                        /{' '}
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .otherContacts.agencies[2].website
                        }{' '}
                        /{' '}
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .otherContacts.agencies[2].phone
                        }
                        <br />
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .otherContacts.agencies[3].name
                        }{' '}
                        /{' '}
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .otherContacts.agencies[3].website
                        }{' '}
                        /{' '}
                        {
                          dictionary.privacy.policyList.policyItem10.contact
                            .otherContacts.agencies[3].phone
                        }
                        <br />
                      </p>
                    </div>

                    <div className='card-body' id='제11조'>
                      <h5 className='card-title'>
                        <strong>
                          {dictionary.privacy.policyList.policyItem11.title}
                        </strong>
                      </h5>
                      <p className='card-text mt-[20px]'>
                        {
                          dictionary.privacy.policyList.policyItem11.description
                            .items[0]
                        }
                      </p>
                    </div>

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
            <Tab eventKey='결제/환불' title={dictionary.terms.terms_of_use}>
              <Accordion className='accordion-section terms-section'>
                <div className='content-terms'>
                  <div className='content-table'>
                    <div className='row row-cols-1 row-cols-md-3 g-0'>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제1조.'>{dictionary.tou.section1}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제2조.'>{dictionary.tou.section2}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제3조.'>{dictionary.tou.section3}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제4조.'>{dictionary.tou.section4}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제5조.'>{dictionary.tou.section5}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제6조.'>{dictionary.tou.section6}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제7조.'>{dictionary.tou.section7}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제8조.'>{dictionary.tou.section8}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제9조.'>{dictionary.tou.section9}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제10조.'>{dictionary.tou.section10}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제11조.'>{dictionary.tou.section11}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제12조.'>{dictionary.tou.section12}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제13조.'>{dictionary.tou.section13}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제14조.'>{dictionary.tou.section14}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <a href='#제15조.'>{dictionary.tou.section15}</a>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='card border-0 mt-[20px] rounded-0 terms-details '>
                    <div className='card-body' id='제1조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou.det_section1}</strong>
                      </h5>
                      <ul>
                        <li> {dictionary.tou.section1Detail} </li>
                      </ul>
                    </div>

                    <div className='card-body' id='제2조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou.section1.title}</strong>
                      </h5>
                      <ul>
                        {dictionary.tou.det_section2.points.map(
                          (point, index) => (
                            <li key={index}>
                              {' '}
                              <div>{index + 1}</div> {point}{' '}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    <div className='card-body' id='제3조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou['3'].title}</strong>
                      </h5>
                      <ul>
                        {dictionary.tou['3'].points.map((point, index) => (
                          <li key={index}>
                            {' '}
                            <div>{index + 1}</div> {point}{' '}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className='card-body' id='제4조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou['4'].title}</strong>
                      </h5>
                      <ul>
                        <li>
                          <div>①</div>
                          <div>
                            {dictionary.tou['4'].points[0]}
                            <ol className='mt-[4px]'>
                              {dictionary.tou['4'].subpoints
                                .slice(0, 3)
                                .map((subpoint, index) => (
                                  <li key={index}>{subpoint}</li>
                                ))}
                            </ol>
                          </div>
                        </li>
                        <li>
                          <div>②</div>
                          <div>
                            {dictionary.tou['4'].points[1]}
                            <ol className='mt-[4px]'>
                              {dictionary.tou['4'].subpoints
                                .slice(3)
                                .map((subpoint, index) => (
                                  <li key={index}>{subpoint}</li>
                                ))}
                            </ol>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className='card-body' id='제5조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou['5'].title}</strong>
                      </h5>
                      <ul>
                        {dictionary.tou['5'].points.map((point, index) => (
                          <li key={index}>
                            {' '}
                            <div>{index + 1}</div> {point}{' '}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className='card-body' id='제6조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou['6'].title}</strong>
                      </h5>
                      <ul>
                        {dictionary.tou['6'].points.map((point, index) => (
                          <li key={index}>
                            {' '}
                            <div>{index + 1}</div> {point}{' '}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className='card-body' id='제7조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou['7'].title}</strong>
                      </h5>
                      <ul>
                        {dictionary.tou['7'].points.map((point, index) => (
                          <li key={index}>
                            {' '}
                            <div>{index + 1}</div> {point}{' '}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className='card-body' id='제8조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou['8'].title}</strong>
                      </h5>
                      <ul>
                        {dictionary.tou['8'].points.map((point, index) => (
                          <li key={index}>
                            {' '}
                            <div>{index + 1}</div> {point}{' '}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className='card-body' id='제9조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou['9'].title}</strong>
                      </h5>
                      <ul>
                        {dictionary.tou['9'].points.map((point, index) => (
                          <li key={index}>
                            {' '}
                            <div>{index + 1}</div> {point}{' '}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className='card-body' id='제10조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou['10'].title}</strong>
                      </h5>
                      <ul>
                        {dictionary.tou['10'].points.map((point, index) => (
                          <li key={index}>
                            {' '}
                            <div>{index + 1}</div> {point}{' '}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className='card-body' id='제11조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou['11'].title}</strong>
                      </h5>
                      <ul>
                        {dictionary.tou['11'].points.map((point, index) => (
                          <li key={index}>
                            {' '}
                            <div>{index + 1}</div> {point}{' '}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className='card-body' id='제12조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou['12'].title}</strong>
                      </h5>
                      <ul>
                        {dictionary.tou['12'].points.map((point, index) => (
                          <li key={index}>
                            {' '}
                            <div>{index + 1}</div> {point}{' '}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className='card-body' id='제13조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou['13'].title}</strong>
                      </h5>
                      <ul>
                        {dictionary.tou['13'].points.map((point, index) => (
                          <li key={index}>
                            {' '}
                            <div>{index + 1}</div> {point}{' '}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className='card-body' id='제14조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou['14'].title}</strong>
                      </h5>
                      <ul>
                        {dictionary.tou['14'].points.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>

                    <div className='card-body' id='제15조.'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou['15'].title}</strong>
                      </h5>
                      <ul>
                        {dictionary.tou['15'].points.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>

                    <div className='card-body'>
                      <h5 className='card-title'>
                        <strong>{dictionary.tou['appendix_1'].title}</strong>
                      </h5>
                      <ul>
                        <li>{dictionary.tou['appendix_1'].content}</li>
                      </ul>
                    </div>

                    <div className='card-body border-bottom-0 last-section'>
                      <ul>
                        <li className='!text-[#CE1717] justify-end text-end'>
                          {dictionary.tou['appendix_1'].title}
                          <br />
                          {dictionary.tou['appendix_2'].title}
                        </li>
                      </ul>
                    </div>
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
