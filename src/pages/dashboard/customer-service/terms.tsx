import React from 'react'
import { Accordion, Pagination, Tab, Tabs } from "react-bootstrap";
import ArrowBack from "@src/components/icons/ArrowBack";
import { useRouter } from "next/router";
export default function PolicyModulePage() {
  const router = useRouter();

    const onBack = ()=>
    {
        router.back();
    }
  return (
    <>
      <div className="policy-container">
        <div className="privacy-content">
        <div className={`only-mb mt-[15px]`}>
                                    <div className={`mobile-top-header !mb-[14px]`}>
                                        <ArrowBack handleAction={onBack}/>
                                        <div className={'header'}>
                                        정책 및 약관
                                        </div>
                                        <div></div>
                                    </div>

                                </div>
          <Tabs defaultActiveKey="개인정보처리방침" className="!mb-[16px] lg:!mb-[30px] tab-section">
            <Tab eventKey="개인정보처리방침" title="개인정보처리방침">
              <Accordion className="accordion-section">
                <div className="content-terms">
                  <div className='content'>
                  ㈜이카루스(이하 “회사”)는 회사가 운영하는<br className=' block lg:hidden'/> 인터넷 사이트(홈페이지 URL이하 “이카루스”)를 이용하는 이용자님들의 개인정보를 매우 중요하게 생각하며<br className=' block lg:hidden'/> 아래와 같은 개인정보처리방침을 가지고 있습니다.<br className=' block lg:hidden'/> 이 개인정보처리방침은 개인정보와 관련한 법령 또는 지침의 변경이 있는 경우 갱신되고,
정책의 변화에 따라 달라질 수 있으니 이용자께서는 이카루스 마케팅 플랫폼 사이트를 방문 시 수시로 확인하여 주시기 바랍니다.<br/>
이카루스 마케팅 플랫폼의 개인정보처리방침은 다음과 같은 내용을 담고 있습니다.
                  </div>
                  <div className='content-table px-[0px] py-[20px] lg:px-[20px] lg:py-[30px]'>
                    <div className="row row-cols-1 row-cols-md-3 g-0">
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제1조">제1조. 개인정보의 수집•이용</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"> <a href="#제2조">제2조. 개인정보 제3자 제공</a> </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제3조">제3조. 개인정보 처리 위탁</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제4조">제4조. 이용자 개인정보의 보유: 이용기간 및 파기</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제5조">제5조. 쿠키(Cookie)의 운용 및 거부</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="제6조">제6조. 이용자 권리</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제7조">제7조. 이용자의 의무</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제8조">제8조. 링크 사이트에 대한 책임</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제9조">제9조. 개인정보의 기술적/관리적 보호 대책</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제10조">제10조. 개인정보보호책임자</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제11조">제11조. 고지의 의무</a></h5>
                          </div>
                        </div>
                      </div>  
                    </div>  
                  </div>
                  <div className="card border-0 rounded-0 card-details">
                    <div className="card-body" id="제1조">
                      <h5 className="card-title"><strong>제1조. 개인정보의 수집•이용</strong></h5>
                      <ul>
                        <li><div>가.</div>회사가 개인정보를 수집하는 목적은 이용자의 신분과 서비스 이용의사를 확인하여 최적화되고 맞춤화된 서비스를 제공하기 위함입니다.  회사는 최초 회원가입 시 서비스의 본질적 기능을 수행
      하기 위해 반드시 필요한 최소한의 정보만을 수집하고 있으며 회사가 제공하는 서비스 이용에 따른 대금결제, 물품배송 및 환불 등에 필요한 정보를 추가로 수집할 수 있습니다.</li>
                        <li><div>나.</div> 회사는 개인정보를 수집·이용목적 이외에 다른 용도로 이를 이용하거나 이용자의 동의 없이 제3자에게 이를 제공하지 않습니다.</li>
                        <li><div>다.</div> 회사는 다음과 같은 목적으로 개인정보를 수집하여 이용할 수 있습니다. 다만, 국세기본법, 전자금융거래법 등 관계법령에 따라 동의 받은 정보 이외에도 수집•보관이 불가피한 경우에는 이용자
       에게 고지하여 해당 정보를 수집할 수 있습니다.</li>
                      </ul>
                      <div className="table-cont">
                        <p className="card-text table-cont-text"> 1)회원 </p>
                        <p className="card-text">목적. 회원 본인 여부 확인 또는 불만처리 및 문의응대기록, 새로운 상품/서비스 정보와 고지, 사항의 안내, 광고집행 정산 등 커뮤니케이션<br/> 항목. 아이디(이메일주소), 비밀번호, 이름, 전화번호, 소속회사<br/> 보유기간. 사용자 탈퇴 시 6개월 / 반려 시 1개월 단, 거래가 있는 경우에는 관련 법령에 따른 보존기간</p>
                        <div className="table-responsive hidden">
                          <table className='table'>
                            <tr>
                              <th>목적</th>
                              <th>항목</th>
                              <th>보유기간</th>
                            </tr>
                            <tr>
                              <td>회원 본인 여부 확인</td>
                              <td>회원 본인 여부 확인</td>
                              <td rowSpan={2}>사용자 탈퇴 시 6개월 / 반려 시 1개월 단,
                                거래가 있는 경우에는 관련 법령에 따른 보존기간</td>
                            </tr>
                            <tr>
                              <td>사용자 탈퇴 시 6개월 / 반려 시 1개월 단,
                                거래가 있는 경우에는 관련 법령에 따른 보존기간</td>
                              <td>아이디(이메일주소), 비밀번호,
                                이름, 전화번호, 소속회사</td>
                            </tr>
                          </table>
                        </div>
                        <p className="card-text table-cont-second-text"> 2)기타 </p>
                        <p className="card-text">서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집•저장•조합•분석 될 수 있습니다.<br/>
IP Address, 방문 일시, 서비스 이용 기록 등 이용내역정보 : 부정 이용 방지, 비인가 사용 방지, 신규 서비스 개발 및 맞춤서비스 제공 등</p>
                      </div>
                      <ul className='!mt-[5px]'>
                        <li><div>라.</div>회사는 이용자의 개인정보를 수집할 경우 법령상 근거가 없는 한 반드시 이용자의 동의를 얻어 수집하며, 이용자의 기본적 인권을 침해할 우려가 있는 인종, 출신지, 본적지, 사상, 정치적 성향
      범죄기록, 건강상태 등의 정보는 이용자의 동의 또는 법령의 규정에 의한 경우 이외에는 수집하지 않습니다.</li>
                        <li>
                          <div>마.</div>
                          <div>
                          회사는 회원 가입을 만 14세 이상인 경우에 가능하도록 하며 개인정보의 수집•이용에 법정대리인의 동의가 필요한 만 14세 미만 아동의 개인정보는 원칙적으로 수집하지 않습니다. 
      단, 법정대리인의 동의를 얻은 경우에는 만 14세 미만 이용자의 개인정보를 수집•이용할 수 있습니다.
                            </div>
                        </li>
                        <li>
                          <div>바.</div>
                          <div>
                          회사는 다음과 같은 방법으로 개인정보를 수집할 수 있습니다.
                          <ol>
                            <li> 1) 홈페이지, 모바일 어플리케이션, 모바일 웹 페이지 서면, 팩스, 전화, 고객센터 문의하기, 이벤트 응</li>
                            <li> 2) 생성정보 수집 툴을 통한 자동 수집</li>
                          </ol>
                          </div>
                        </li>
                        <li><div>사.</div> 회사는 개인정보를 수집함에 있어, 서비스 제공에 필요한 최소한의 개인정보를 ‘필수동의 항목’으로, 그 외 개인정보는 ‘선택동의 항목’으로 구분하여 이에 대해 개별적으로 동의할 수 있는 절차를
      마련합니다. 회사는 이용자가 필요한 최소한의 개인정보 이외의 개인정보를 제공하지 아니한다는 이유로 그 서비스의 제공을 거부하지 않습니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제2조">
                      <h5 className="card-title"><strong>제2조. 개인정보 제3자 제공</strong></h5>
                      <ul>
                        <li><div>가.</div>
                        <div>
                        회사는 이용자들의 개인정보를 「개인정보의 수집·이용」에서 고지한 범위 내에서 사용하며, 이용자의 사전 동의 없이 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
                          <ol>
                            <li> 1) 이용자들이 사전에 공개 또는 제3자 제공에 동의한 경우</li>
                            <li> 2) 법령의 규정에 의거하거나, 수사, 조사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관 및 감독당국의 요구가 있는 경우</li>
                            <li> 3) 요금 정산을 위하여 필요한 경우</li>
                          </ol>
                          </div>
                        </li>
                        <li>
                          <div>나.</div> 이용자는 개인정보의 제3자 제공에 대하여 동의를 하지 않을 수 있고, 언제든지 제3자 제공 동의를 철회할 수 있습니다. 동의를 거부하시는 경우에도 회원가입서비스는 이용하실 수 있으나,
                          제 3자 제공에 기반한 관련 서비스의 이용/제공이 제한될 수 있습니다. 기타 개인정보 제3자 제공에 대한 변동사항은 공지 및 별도 통지를 할 예정입니다.
                        </li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제3조">
                      <h5 className="card-title"><strong>제3조. 개인정보 처리 위탁</strong></h5>
                      <ul>
                        <li> <div> 가.</div> <div> 회사는 원활하고 향상된 서비스를 제공하기 위해 개인정보 처리를 타인에게 위탁할 수 있습니다. 이 경우 회사는 사전에 다음 각 호의 사항 모두를 이용자에게 미리 알리고 동의를 받습니다. 다음 각 호의 어느 하나의 사항이 변경되는 경우에도 같습니다..
                          <ol>
                            <li> 1) 개인정보 처리 위탁을 받는 자</li>
                            <li> 2) 개인정보 처리 위탁을 하는 업무의 내용</li>
                          </ol>
                          </div>
                        </li>
                        <li><div>나.</div>  회사는 정보통신서비스의 제공에 관한 계약을 이행하고 이용자 편의 증진 등을 위하여 필요한 경우 개인정보처리방침에 따라 가항 각 호의 사항을 공개함으로써 고지절차와 동의절차를 거치지 아니하고 개인정보 처리를 타인에게 위탁할 수 있습니다.
                        </li>
                        <li> <div>다.</div> 회사는 개인정보의 처리와 관련하여 업무를 위탁하는 경우에는 관계법령에 따라 위탁 계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 조치를 합니다. 회사는 위탁 계약 시 수탁자의 개인정보 보호조치 능력을 고려하고, 개인정보의 안전한 관리 및 파기 등 수탁자의 의무 이행 여부를 주기적으로 확인합니다. 또한 위탁처리하는 정보는 원활한 서비스를 제공하기 위하여 필요한 최소한의 정보에 국한됩니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제4조">
                      <h5 className="card-title"><strong>제4조. 이용자 개인정보의 보유: 이용기간 및 파기</strong></h5>
                      <ul>
                        <li>회사는 이용자의 개인정보를 원칙적으로 고지 및 약정한 기간 동안 보유 및 이용하며 개인정보의 수집 및 이용목적이 달성되거나 이용자의 파기 요청이 있는 경우 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.</li>
                        <li>가. 관계법령 및 회사 방침에 의한 정보보유 사유
                          관계법령의 규정에 의하여 보존할 필요가 있는 경우 법령에서 규정한 바에 따라 이용자의 개인정보를 보관하며 마케팅 등 다른 목적으로 이용하지 않습니다.</li>
                      </ul>
                      <div className="table-cont">
                        <p className="card-text mt-3"> 1) 관계법령에 따른 정보보유 사유</p>
                        <ul className='!mt-0 !mb-[10px]'>
                          <li><div>나.</div> 수집된 개인정보의 보유·이용기간은 서비스이용계약체결(회원가입)시부터 서비스이용계약해지(탈퇴신청, 직권탈퇴 포함)입니다. 또한 동의 해지 시 회사는 이용자의 개인정보를 상기 명시한
                            정보보유 사유에 따라 일정 기간 저장하는 자료를 제외하고는 지체 없이 파기하며 개인정보처리가 제3자에게 위탁된 경우에는 수탁자에게도 파기하도록 지시합니다.</li>
                          <li>
                            <div>다.</div> 회사는 1년 동안 회사의 서비스를 이용하지 않은 이용자의 개인정보는 ‘정보통신망 이용촉진 및 정보보호등에 관한 법률 제29조’ 에 근거하여 이용자에게 사전통지하고 개인정보를 파기하거나
                            별도로 분리하여 저장 관리합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 관계법령에서 규정한 일정한 기간 동안 이용자 개인정보를 보관합니다.
                          </li>
                          <li>
                            <div>라.</div> 회사는 다항 기간 만료 30일 전까지 개인정보가 파기되거나 분리되어 저장•관리되는 사실과 기간 만료일 및 해당 개인정보의 항목을 공지사항, 전자우편 등의 방법으로 이용자에게 알립니다.
                            이를 위해 이용자는 회사에 정확한 연락처 정보를 제공/수정하여야 합니다.
                          </li>
                          <li>
                            <div>바.</div> <div>회사는 다항 기간 만료 30일 전까지 개인정보가 파기되거나 분리되어 저장•관리되는 사실과 기간 만료일 및 해당 개인정보의 항목을 공지사항, 전자우편 등의 방법으로 이용자에게 알립니다.
      이를 위해 이용자는 회사에 정확한 연락처 정보를 제공/수정하여야 합니다.
                            </div>
                          </li> 
                          <li>
                            <div>마.</div> <div>파기방법
                            <ol>
                              <li> 이용자의 개인정보는 수집 및 이용목적이 달성된 후에는 지체 없이 파기됩니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각 등을 통하여 파기하고, 전자적 파일형태로 저장된
      개인정보는 기록을 재생할 수 없는 기술적 방법 또는 물리적 방법을 사용하여 파기합니다.</li>
                            </ol>
                            </div>
                          </li> 
                        </ul> 
                        <div className="table-responsive hidden">
                          <table className='table inner-table'>
                            <tr>
                              <th>관계법령</th>
                              <th>목적</th>
                              <th>수집항목</th>
                              <th>보유기간</th>
                            </tr>
                            <tr>
                              <td>통신비밀보호법</td>
                              <td>법원의 영장을 받아 수사기관이 요청 시 제공</td>
                              <td>로그기록, IP 등</td>
                              <td>3개월</td>
                            </tr>
                            <tr>
                              <td>국세기본법</td>
                              <td style={{ paddingLeft: '0', paddingRight: '0' }}>
                                <table>
                                  <tr>
                                    <td style={{ borderBottom: 'solid 1px #999' }}>국세부과 제척기간 계산</td>
                                  </tr>
                                  <tr>
                                    <td>국세징수권 등 소명시효 계산</td>
                                  </tr>
                                </table>
                              </td>
                              <td style={{ paddingLeft: '0', paddingRight: '0' }}>
                                <table>
                                  <tr>
                                    <td style={{ borderBottom: 'solid 1px #999' }}>국세증빙자료 등</td>
                                  </tr>
                                  <tr>
                                    <td>과세표준과 세액의 신고자료 등</td>
                                  </tr>
                                </table>
                              </td>
                              <td style={{ paddingLeft: '0', paddingRight: '0' }}>
                                <table>
                                  <tr>
                                    <td style={{ borderBottom: 'solid 1px #999' }}>10년</td>
                                  </tr>
                                  <tr>
                                    <td>５년</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td>부가가치세법</td>
                              <td>장부, 세금계산서,
                                수입세금계산서, 영수증 등</td>
                              <td>부가가치세의 과세표준과
                                세액의 신교자료 등</td>
                              <td>５년</td>
                            </tr>
                            <tr>
                              <td>전자금융거래법</td>
                              <td>전자금융거래기록확인</td>
                              <td>전자금융거래에 관한 기록,
                                상대방에 대한 정도 등</td>
                              <td>５년</td>
                            </tr>
                          </table>
                        </div>
                        <p className="card-text mt-3">2) 회사 방침에 의한 정보보유 사유 회원 본인확인을 위해 가입 시 수집한 정보는 탈퇴하는 경우 6개월 이후, 반려된 경우에는 1개월 이후 개인정보를 삭제합니다.</p>
                        
                      </div> 
                    </div>
                    
                    <div className="card-body" id="제5조">
                      <h5 className="card-title"><strong>제5조. 쿠키(Cookie)의 운용 및 거부</strong></h5>
                      <ul>
                        <li> <div>가.</div> <div> 쿠키의 사용 목적
                          <ol>
                            <li>1) 회사는 회사가 운영하는 인터넷 사이트에서 개인 맞춤 서비스를 제공하기 위해 이용 정보를 저장하는 ‘쿠키(cookie)’를 사용합니다. 쿠키는 웹사이트 서버가 이용자의 브라우저에게 전송하는 소량의 정보로서 이용자 컴퓨터의 하드디스크에 저장됩니다.</li>
                            <li>2) 회사는 쿠키의 사용을 통해서만 가능한 특정된 맞춤형 서비스를 제공할 수 있습니다.</li>
                            <li>3) 회사는 회원을 식별하고 회원의 로그인 상태를 유지하기 위해 쿠키를 사용할 수 있습니다.</li>
                          </ol>
                          </div>
                        </li>
                        <li>
                          <div>나.</div><div> 쿠키의 설치/운용 및 거부<br />
                          1) 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 이용자는 웹브라우저에서 옵션을 조정함으로써 모든 쿠키를 허용/거부하거나, 쿠키가 저장될 때마다 확인을 거치도록 할 수 있습니다.
                          <p className='pl-2 mt-[20px]'>-[도구] 메뉴에서 [인터넷 옵션]을 선택합니다.</p>
                          <p className='pl-2 !m-0'>-[개인정보 탭]을 클릭합니다.</p>
                          <p className='pl-2 !m-0'>-[개인정보처리 수준]을 설정하시면 됩니다.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제6조">
                      <h5 className="card-title"><strong>제6조. 이용자의 권리</strong></h5>
                      <ul>
                        <li><div>가.</div> 이용자는 언제든지 개인정보고객센터를 통하여 회원님의 개인정보를 열람, 정정 처리하실 수 있으며 전자우편 또는 서면으로 요청하신 경우 열람, 정정, 삭제 처리해드리겠습니다. 이용자의 개인
      정보가 제3자에게 제공되거나 처리 위탁된 경우 이용자는 회사 또는 ‘제3자’/’수탁자’에게 파기를 요청할 수 있습니다. 단, 회원 아이디(ID), 성명은 정정이 불가능하며, 개명으로 인한 성명 변경
      및 행정상의 문제로 인한 사업자등록번호 변경은 예외적으로 허용 될 수 있습니다. 기타 법률에 따라 정정 또는 삭제가 금지되거나 제한되어 있는 경우에는 해당 처리가 제한될 수 있습니다.
      또한 개인 정보 오류에 대한 정정 요청한 경우에는 다른 법률에 따라 개인정보의 제공을 요청 받는 경우가 아닌 한 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다,
      만약 잘못된 개인정보를 이미 제공한 경우에는 정정 처리 결과를 제 3자에게 통지하여 정정이 이루어지도록 하겠습니다.
                        </li>
                        <li>
                          <div>나.</div><div> 이용자는 언제든지 이카루스 마케팅 플랫폼 사이트의 개인정보에 대하여 처리의 정지를 요구 할 수 있습니다. 다만 아래의 경우에 해당하는 경우 처리정지 요구를 거절할 수 있습니다.
                          <ol>
                            <li>1) 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우</li>
                            <li>2) 다른 사람의 생명·신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우</li>
                            <li>3) 개인정보를 처리하지 아니하면 정보주체와 약정한 서비스를 제공하지 못하는 등 계약의 이행이 곤란한 경우로서 정보주체가 그 계약의 해지 의사를 명확하게 밝히지 아니한 경우</li>
                          </ol>
                          </div>
                        </li>
                        <li><div>다.</div> 회원가입 등을 통해 개인정보의 수집·이용·제공에 대해 회원님께서 동의하신 내용을 언제든지 철회할 수 있습니다. 동의철회는 회사 사이트 내 “회원 탈퇴 신청”을 클릭하거나 서면, 이메일 
      으로 연락하시면 지체 없이 개인정보의 삭제 등 필요한 조치를 하겠습니다. 다만 법률 또는 약관의 규정에 따라 회사가 회원님의 개인정보를 보존하여야 하는 경우에는 해당 처리가 있습니다.
      이 경우 회원님은 본인 식별을 위하여 반드시 회원아이디(ID)와 본인확인 식별정보를 밝히셔야 하며, 철회로 인해 서비스에 다소 제약이 있거나 일부 서비스를 이용하지 못하실 수 있습니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제7조">
                      <h5 className="card-title"><strong>제7조. 이용자의 의무</strong></h5>
                      <ul>
                        <li>
                        이용자는 자신의 개인정보를 보호할 의무가 있으며, 회사의 귀책사유가 없이 ID, 비밀번호, 접근매체 등의 양도•대여•분실이나 로그인 상태에서 이석 등 이용자 본인의 부주의나 관계법령에 의한
                        보안조치로 차단할 수 없는 방법이나 기술을 사용한 해킹 등 회사가 상당한 주의에도 불구하고 통제할 수 없는 인터넷 상의 문제 등으로 개인정보가 유출되어 발생한 문제에 대해 회사는
                        책임을 지지 않습니다.
                        </li>
                        <li><div>가. </div>이용자는 자신의 개인정보를 최신의 상태로 유지해야 하며, 이용한 정보 입력으로 발생하는 문제의 책임은 이용자 자신에게 있습니다.</li>
                        <li><div> 나.</div> 타인의 개인정보를 도용한 회원가입 또는 ID등을 도용하여 결제 처리 시 이용자자격 상실과 함께 관계법령에 의거하여 처벌될 수 있습니다. </li>
                        <li><div>다. </div>이용자는 아이디, 비밀번호 등에 대해 보안을 유지할 책임이 있으며 제3자에게 이를 양도하거나 대여할 수 없습니다.
      이용자는 회사의 개인정보보호정책에 따라 보안을 위해 비밀번호의 주기적 변경에 협조할 의무가 있습니다.</li>
                        <li><div>라. </div>이용자는 회사의 서비스를 이용한 후에는 반드시 로그인 계정을 종료하고 웹 브라우저 프로그램을 종료해야 합니다.</li>
                        <li><div>마. </div>이용자는 "정보 통신망 이용촉진 및 정보보호 등에 관한 법률", “개인정보보호법&#34;, 등 기타 개인정보에 관한 법률을 준수하여야 합니다.</li>
                        <li><div>다. </div>이용자는 "정보 통신망 이용촉진 및 정보보호 등에 관한 법률", “개인정보보호법”, 등 기타 개인정보에 관한 법률을 준수하여야 합니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제8조">
                      <h5 className="card-title"><strong>제8조. 이용자의 의무</strong></h5>
                      <ul>
                        <li>회사는 이용자에게 다른 웹사이트에 대한 링크를 제공할 수 있습니다. 다만, 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본 "개인정보처리방침"이 적용되지 않습니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제9조">
                      <h5 className="card-title"><strong>제9조. 개인정보의 기술적/관리적 보호 대책</strong></h5>
                      <ul>
                        <li>
                        회사는 이용자들의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적 보호대책을 강구하고 있습니다.
                        </li>
                        <li>
                          <div>가.</div> 
                          <div>
                            개인정보의 암호화
                          <ol>
                            <li>이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고 있으며, 개인정보의 확인 및 변경은 비밀번호를 알고 있는 본인에 의해서만 가능합니다. 비밀번호는 이용자의 생일, 전화번호 등 타인
      이 추측하기 쉬운 숫자 등을 이용하지 않도록 비밀번호 생성규칙을 수립하여 적용하고 있습니다. 비밀번호 등의 개인정보는 안전한 암호 알고리즘으로 암호화되어 저장 및 관리되고 있습니다.
                            </li>
                          </ol>
                            </div>
                        </li>
                        <li>
                          <div>나.</div> 
                          <div>
                            해킹 등에 대비한 대책
                            <ol>
                              <li>회사는 해킹 등 회사 정보통신망 침입에 의해 이용자의 개인정보가 유출되는 것을 방지하기 위해 침입탐지 및 침입차단 시스템을 24시간 가동하고 있습니다. 만일의 사태에 대비하여 모든
      침입탐지 시스템과 침입차단 시스템은 이중화로 구성하여 운영하고 있으며, 민감한 개인정보는 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다.</li>
                            </ol>
                            </div>
                        </li>
                        <li><div>다.</div>  개인정보 취급자의 최소화 및 교육<br />
                        회사는 회사의 개인정보 취급자를 최소한으로 제한하며, 개인정보 취급자에 대한 교육 등 관리적 조치를 통해 개인정보보호의 중요성을 인식시키고 있습니다.</li>
                        <li>
                          <div>라.</div> 개인정보보호 전담부서의 운영<br />
                          회사는 개인정보의 효율적 보호를 위해 개인정보보호전담부서를 운영하고 있으며, 개인정보처리방침의 이행사항 및 개인정보 취급자의 준수여부를 확인하여 문제가 발견될 경우 즉시 수정할 
      있도록 노력하고 있습니다.
                        </li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제10조">
                      <h5 className="card-title"><strong>제10조. 개인정보 보호책임자</strong></h5>
                      <p className="card-text mt-[20px] mb-[10px]">회사는 이용자가 회사의 서비스를 안전하게 이용할 수 있도록 최선을 다하고 있습니다. 이용자는 회사의 서비스 이용과 관련한 모든 개인정보보호 민원을 전담부서로 신고하실 수 있으며,
                        회사는 이용자의 신고사항에 대해 신속하고 성실하게 답변해드리고 있습니다.</p>
                      <p className="card-text">
                        [개인정보 보호책임자]<br />
                        성명: 이진희<br />
                        소속부서: 개인정보 보호팀<br />
                        전자우편: lubme520@naver.com<br />
                        전화번호: 044-864-9984<br />
                        ※ 상기 연락처 등은 “개인정보보호 전담 고객센터&#34;로 연결됩니다.
                      </p>
                      <p className="card-text mt-[20px]">
                        기타 개인정보침해에 대한 신고 또는 상담이 필요하신 경우에는 아래 기관으로 문의하시기 바랍니다.<br />
                        개인정보분쟁조정위원회 / www.kopico.go.kr / 1833-6972<br />
                        개인정보침해신고센터 / privacy.kisa.or.kr / (국번없이) 118<br />
                        대검찰청 첨단범죄수사센터 / www.spo.go.kr / (국번없이) 1301<br />
                        경찰청 사이버안전국 / cyberbureau.police.go.kr / (국번없이) 182<br />
                      </p>
                    </div>
                    
                    <div className="card-body" id="제11조">
                      <h5 className="card-title"><strong>제11조. 고지의 의무</strong></h5>
                      <p className="card-text mt-[20px]">본 개인정보처리방침은 관계법령 및 지침의 변경 또는 회사의 필요 등에 의하여 내용의 추가, 삭제 및 수정이 생길 수 있습니다. 이 경우 최소 7일 전에 홈페이지 또는 이메일을 통해 사전 공지하고
                        사전 공지가 곤란한 경우 지체 없이 공지하며, 별도 공지가 없는 한 7일이 경과된 후에 시행됩니다. 다만, 중대한 내용이 변경되는 경우에는 최소 30일 전에 공지하고, 별도 공지가 없는 한 30일이
                        경과된 후에 시행됩니다. 또한 당사는 관계법령에 따라 필요한 경우 고객의 별도 동의를 받을 수 있습니다.</p>
                    </div>
                    
                    <div className="card-body card-body-bottom-text border-bottom-0">
                      <p className="card-text text-end">공고 일자: 0000년 00월 00일</p>
                      <p className="card-text text-end">시행 일자: 0000년 00월 00일s</p>
                    </div>
                  </div>
                </div>
              </Accordion>
            </Tab>
            <Tab eventKey="결제/환불" title="이용약관">
              <Accordion className="accordion-section terms-section">
              <div className="content-terms"> 
                  <div className='content-table'>
                    <div className="row row-cols-1 row-cols-md-3 g-0">
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"> <a href="#제1조.">제1조. 개인정보의 수집•이용</a> </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"> <a href="#제2조.">제2조. 개인정보 제3자 제공</a> </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제3조.">제3조. 개인정보 처리 위탁</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제4조.">제4조. 이용자 개인정보의 보유: 이용기간 및 파기</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제5조.">제5조. 쿠키(Cookie)의 운용 및 거부</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="제6조.">제6조. 이용자 권리</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제7조.">제7조. 이용자의 의무</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제8조.">제8조. 링크 사이트에 대한 책임</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제9조.">제9조. 개인정보의 기술적/관리적 보호 대책</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제10조.">제10조. 개인정보보호책임자</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제11조.">제11조. 고지의 의무</a></h5>
                          </div>
                        </div>
                      </div> 
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제12조.">제12조. "회사"의 면책</a></h5>
                          </div>
                        </div>
                      </div> 
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제13조.">제13조. 개인정보보호의무 및 비밀유지</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제14조.">제14조. 분쟁의 해결</a></h5>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title"><a href="#제15조.">제15조. 개인정보보호의무 및 비밀유지</a></h5>
                          </div>
                        </div>
                      </div>
                    </div>  
                  </div>
                  <div className="card border-0 mt-[20px] rounded-0 terms-details ">
                    <div className="card-body" id="제1조."> 
                    <h5 className="card-title"><strong>제1조. 목적</strong></h5>
                      <ul>
                        <li> 본 약관은 ㈜이카루스(이하 "회사")가 제공하는 광고 서비스(아래 정의)를 "광고주"(아래 정의)에게 제공함에 있어 "회사"와 "광고주"의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다. </li>
                      </ul>
                     </div>
                    
                    <div className="card-body" id="제2조.">
                      <h5 className="card-title"><strong>본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</strong></h5>
                      <ul>
                        <li><div>①</div> "광고" (이하 "광고"라고 함)라 함은 "회사"가 "광고주"가 신청한 광고 상품(아래 정의)의 내용과 절차에 따라 "광고주"의 "광고 소재"(아래 정의)를 "광고매체"에 노출하는 것을 말합니다.</li>
                        <li> <div>②</div> "광고소재"라 함은 "광고주"가 제작하여 광고매체에 등록한 상품 설명, 상품 사진, 텍스트 또는 이미지 등 형태의 제작물을 말합니다. </li>
                        <li><div>③</div> "광고 상품"이라 함은 "광고주"의 "광고 소재"를 "광고매체"에 게재하기 위하여 "회사"가 "광고주"에게 판매하는 것으로 광고 상품의 종류, 노출 형태, 위치 등 구체적 내용은 광고 상품 및 광고
                        서비스 이용료 과금 기준( 별첨1. )과 같습니다.</li>
                        <li><div>④</div> "광고 서비스" 라 함은 "광고주"가 구매한 광고 상품의 내용대로 "광고주"의 "광고 소재"를 "광고매체"에 노출하고 광고 등록, 광고 관리, 리포트 등 제반 서비스를 말합니다.</li>
                        <li><div>⑤</div> "광고주"라 함은 본 약관에서 정한 절차에 따라 "서비스"를 신청 및 이용하는 자를 말합니다.</li>
                        <li><div>⑥</div> "이카루스 광고센터"라 함은 "광고주"의 광고 신청, 게재, 관리, 취소 등을 위해 "회사"가 "광고주"에게 제공하는 서비스 페이지(홈페이지 URL)를 말합니다.</li>
                        <li><div>⑦</div> "서비스 이용료"라 함은 서비스 이용대가로 "광고주"가 "회사"에 지급하는 금액을 말합니다.</li>
                        <li><div>⑧</div> "외부플랫폼광고" 라 함은 "회사" 에서 지정한 인터넷 및 모바일 광고 플랫폼을 통해 "광고매체"를 제공하는 "광고 서비스" 입니다.</li>
                        <li><div>⑬</div> &#34;광고성 이머니&#34;라 함은 “회사&#34;가 프로모션 혜택으로 또는 보상 및 환불을 위하여 “광고주&#34;에게 발급하는 전자적 지급수단을 말합니다. “광고성 이머니&#34;는 별도 정함이 없는 한 발급일부터 3개월 간 유효하며, “광고 상품&#34;의 결제시에만 사용할 수 있습니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제3조.">
                      <h5 className="card-title"><strong>제3조. 약관의 게시 및 구성</strong></h5>
                      <ul>
                        <li><div>①</div> "회사"는 본 약관의 내용을 "광고주"가 쉽게 알 수 있도록 "이카루스(홈페이지 URL)"에 게시합니다. </li>
                        <li><div>②</div> "회사"가 본 약관을 개정하는 경우에는 적용 일자 및 개정 사유를 명시하여 현행 약관과 함께 제1항의 방식에 따라 그 적용일자 칠(7)일 이전부터 적용일자 전일까지 공지합니다.
                        다만 "광고주"에게 불리하게 약관을 변경하는 경우에는 최소한 삼십(30)일 이상의 사전 유예기간을 두고 공지합니다.</li>
                        <li><div>③</div> 회사가 전항에 따라 개정약관을 공지 또는 통지하면서 "광고주"에게 전항의 기간 내에 의사표시를 하지 않으면 동의한 것으로 본다는 뜻을 명확하게 공지 또는 통지하였음에도
                        "광고주"가 명시적으로 거부의 의사표시를 하지 아니한 경우 "광고주"가 개정약관에 동의한 것으로 봅니다</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제4조.">
                      <h5 className="card-title"><strong>제4조. 이용 계약 성립 등</strong></h5>
                      <ul>
                        <li><div>① </div>
                        <div>
                        "광고주"는 "회사"가 제공하는 다음의 "약관"의 내용에 동의를 한 다음 "회사"가 정한 절차에 따라 이용 신청을 하고 "회사"가 이러한 신청에 대하여 승낙함으로써 체결됩니다.
                          <ol className='mt-[4px]'>
                            <li>1) "기본 약관"에 대한 동의</li>
                            <li>2) "본 약관"에 대한 동의</li>
                            <li>3) "광고주" 가입 완료 확인</li>
                          </ol>
                        </div>
                        </li>
                        <li>
                          <div>②</div> 
                          <div>
                          "회사"는 "광고주"가 다음의 각 호의 하나의 사유가 있을 경우 광고 서비스 이용을 제한할 수 있습니다
                          <ol className='mt-[4px]'>
                            <li>1) 허위 정보를 기재하거나 "회사"가 제시한 내용을 기재하지 않은 경우</li>
                            <li>2) 기본 약관 위반 등의 이유로 "광고주" 자격을 상실할 경우</li>
                            <li>3) 기타 "회사"가 합리적인 판단에 의하여 광고 서비스 이용제한이 필요하다고 인정되는 경우</li>
                          </ol>
                            </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제5조.">
                      <h5 className="card-title"><strong>제5조. 광고의 등록, 제한 및 관리</strong></h5>
                      <ul>
                        <li> <div>①</div> "회사"는 광고 상품의 종류, 광고 영역, 등록 절차, 과금 방법 등을 광고 상품 및 광고 서비스 이용료 과금 기준( 별첨1. ) 및 "이카루스 광고센터" 에 공지하며 "광고주"는 광고 신청 전에
                        이를 신중히 확인하여야 합니다. </li>
                        <li><div>②</div> "회사"는 "광고주"가 전항에 따라 "광고주"가 신청한 "광고" 및 "광고소재"에 대하여 "회사"에서 정한 절차, 기준 및 방식에 부합하는지 형식적인 여부만을 검수하는 것에 그치며 "광고"와 
                        "광고 소재"간의 실질적 권리 유효성, 범위 및 권리의 주체, 관련 계약 등 실질적 관계에 대한 심사를 하지 않습니다. "회사"는 권리주장자의 신고 또는 요청에 의한 "광고" 또는 "광고소재"의 취소,
                        삭제 또는 일시 중지에 대해 일체의 책임을 지지 않으며 이는 권리주장자와 "광고주"간에 해결되어야 합니다."회사"는 "회사"의 검수 승인을 득한 광고를 "광고주"의 "광고소재"를 
                        "광고매체"에 게재합니다. </li>
                        <li><div>③</div> "광고주"는 광고 게재 전에 판매예치금을 예치하여야 합니다. "광고주"가 사전에 충분히 판매예치금을 예치하지 않은 경우 "광고"의 게재가 중단될 수 있으며 이로 인해 발생하는 문제에 대한
                        책임은 "광고주"에게 있습니다.</li>
                        <li><div>④</div> 
                        <div>
                        "회사"는 "광고주"의 "광고" 및 "광고 소재"가 아래 각 호 중 하나에 해당하는 경우 "광고"의 게재를 제한 또는 중단할 수 있으며 광고 중단과 관련하여 회사는 책임을 지지 않습니다.
                          <ol>
                            <li>1) "광고주"가 "회사"가 제공하지 않는 방식으로 "광고 서비스"에 접속하는 행위</li>
                            <li>2) 클릭 수, 노출 수 등을 임의로 또는 부정하게 변경(생성, 감소, 증가)하는 행위</li>
                            <li>3) "회사"에 법률적 또는 재산적 위험을 발생시키거나 발생시킬 우려가 있는 행위</li>
                            <li>4) "회사"의 광고매체, 서버 및 설비 등 시스템 부하를 야기하는 행위</li>
                            <li>5) "회사"의 광고 운영 가이드(별첨2)를 위반하는 행위</li>
                            <li>6) 기타 "광고 서비스"의 정상적인 운영을 방해하는 행위</li>
                          </ol>
                        </div>
                        </li>
                        <li>6) 기타 "광고 서비스"의 정상적인 운영을 방해하는 행위</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제6조.">
                      <h5 className="card-title"><strong>제6조. 광고 서비스의 변경 및 중단</strong></h5>
                      <ul>
                        <li><div>①</div> "회사"는 광고가 게재되는 광고매체의 범위 및 광고매체에서의 게재 영역, 게재 순서, 게재 정보, UI 등 (이하 "광고 영역 등"이라고 함)에 대한 결정 권한을 가지며, 변경 또는 추가할 수 있습니다. </li>
                        <li> <div>②</div> "광고 영역 등"의 내용에 변경이 있을 경우 "회사"는 변경 전에 "이카루스"내 게시판에 공지합니다. "광고주"는 "광고 서비스"의 변경 내용에 동의하지 않을 경우 언제든지 "이카루스"내에서 "광고"의 노출을 중단할 수 있습니다.</li>
                        <li><div>③</div> 
                        <div>
                        "회사"는 수시로 "광고 서비스"의 품질 향상 및 "광고"의 효과 증대 등을 위해 일부 키워드와 일부 트래픽을 대상으로 하는 테스트를 별도의 공지 없이 진행할 수 있습니다. 단, 테스트가 아래 각 호 중 하나에 해당하는 경우, 최소 7일 전에 이카루스 공지사항란을 통해 테스트 진행 내용을 별도 공지합니다.
                          <ol>
                            <li>1) 게재된 광고의 노출 순위가 입찰 결과에 불구하고 일부 변경되는 경우</li>
                            <li>2) 게재된 광고가 입찰 결과에 불구하고 일부 미노출 되는 경우</li>
                            <li>3) 게재된 광고의 UI가 일부 변경되는 경우</li>
                          </ol>
                        </div>
                        </li>
                        <li><div>④</div> "회사"는 정보통신설비의 보수 점검 및 교체와 통신, 시스템의 장애 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다. 서비스 중단의 경우 "회사"는 이카루스 광고센
                        터 메인, 공지사항 게시판이나 전자우편, 전화 등의 방법으로 즉시 중단 사실을 "광고주"에게 통지합니다. 단, "회사"가 미리 예측할 수 없는 사정에 의한 서비스의 중단의 경우에는 예외로 합니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제7조.">
                      <h5 className="card-title"><strong>제7조. 광고 서비스 이용료 정산 등</strong></h5>
                      <ul>
                        <li><div>①</div> "광고주"가 본 광고 서비스를 이용하는 대가로 "회사"에 지급해야 할 비용은 "광고 서비스 이용료 과금 기준"( 별첨1. )과 같습니다. 단, Cost per Click (CPC) 광고 상품의 경우 광고소재을 클릭한 "광고매체"의 이용자가 광고 소재의 내용을 확인하지 않았다고 하더라도 서비스 이용료는 부과됩니다.</li>
                        <li><div>②</div> "회사"는 전항의 광고 서비스 이용료를 "광고주"가 광고매체에 예치한 판매예치금에서 매일 수시로 자동 차감합니다. 단, “광고성 이머니&#34;를 보유한 경우 우선하여 차감합니다.</li>
                        <li><div>③</div> "회사"는 "광고주"가 실제 집행한 광고 서비스 이용료에 대하여 세금계산서를 발행하며 "광고주"는 해당 세금계산서를 "이카루스"를 통하여 출력할 수 있습니다.</li>
                        <li><div>④</div> 본 조 제1항의 광고 서비스 이용료는 변동될 수 있으며, 이러한 경우 "회사"는 "이카루스 광고센터" 초기 화면에 게시합니다.</li>
                        <li><div>⑤</div> “광고 서비스&#34; 이용 중 보상 또는 환불 사유가 발생하는 경우 “회사&#34;는 “광고성 이머니&#34;로 지급할 수 있습니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제8조.">
                      <h5 className="card-title"><strong>제8조. "광고주"에 대한 통지</strong></h5>
                      <ul>
                        <li><div>①</div> "회사"가 "광고주"에 대하여 통지를 하는 경우 "기본 약관" 및 "본 약관"에 별도의 규정이 없는 한 "광고주"가 "이카루스 광고센터"에 제공한 전자우편주소, (휴대)전화번호, 주소 중 하나로 통지하거나, 통지에 갈음하여 "광고주"의 "이카루스 광고센터" 로그인시 알림창 등의 수단으로 할 수 있습니다.</li>
                        <li><div>②</div> "광고주"는 "회사"에 실제로 연락이 가능한 전자우편,(휴대)전화번호, 주소 등의 정보를 제공하고 해당 정보들을 최신으로 유지하여야 하며,"회사"의 통지를 확인하여야 합니다.</li>
                        <li><div>③</div> "회사"는 "광고주"가 전항의 의무를 소홀히 하여 발생한 불이익에 대한 책임을 지지 않습니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제9조.">
                      <h5 className="card-title"><strong>제9조. 이용 계약 해지, 종료 및 환불</strong></h5>
                      <ul>
                        <li> <div>①</div> "광고주"는 언제든지 "이카루스 광고센터"에 접속하여 "광고" 이용계약을 해지할 수 있습니다. </li>
                        <li> <div>②</div>
                        <div>
                         "회사"는 다음 각 호의 하나의 사유가 발생한 경우 이용계약을 해지할 수 있습니다. 이 경우 "회사"는 "광고주"에게 이메일(e-mail), 전화, 팩스 기타의 방법을 통하여 해지사유를 밝혀 해지의사를
                        통지합니다. 다만, "회사"는 해당 "광고주"에게 사전에 해지사유에 대한 의견진술의 기회를 부여할 수 있습니다. 
                          <ol>
                            <li>1) "광고주"가 이카루스 회원 자격을 상실하거나 정지된 경우</li>
                            <li>2) "광고주"가 "판매예치금"을 예치하지 못하여 "회사"가 광고를 집행할 수 없는 경우</li>
                            <li>3) "광고주"가 허위신청, 관련 법령 또는 "기본 약관" 및 본 약관을 위반한 경우</li>
                            <li>4) 기타 "광고주"가 본 계약을 이행할 수 없다고 객관적으로 판단된 경우</li>
                          </ol>
                        </div>
                        </li>
                        <li><div>③</div> "회사"가 이용계약을 해지하는 경우 "광고주"가 신청한 서비스 이용신청은 자동으로 취소되고,"회사"는 광고 해지 이후 광고성 이머니(무상으로 발급한 경우를 제외합니다)를 포함한 잔여 금액은 판매예치금 형태로 "광고주"에게 환급합니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제10조.">
                      <h5 className="card-title"><strong>제10조. "회사"의 의무</strong></h5>
                      <ul>
                        <li><div>①</div> "회사"는 관련 법령과 "본 약관"을 준수하며, 계속적이고 안정적으로 "광고 서비스"를 제공하기 위하여 최선을 다하여 노력합니다.</li>
                        <li><div>②</div> "회사"는 "광고주"가 안정하게 "광고 서비스"를 이용할 수 있도록 개인정보(신용정보 포함) 보호를 위하여 보안시스템을 갖추어야 개인정보취급방침을 공시하고 준수합니다.</li>
                        <li><div>③</div> "회사"는 관련 법령과 관련하여 "광고주"로부터 제기된 의견이나 불만이 정당하다고 인정될 경우 이를 처리하여야 하며 "이카루스 광고센터" 내 게시판, 전자우편 등을 통하여 "광고주"에게 처리과정 및 결과를 전달할 수 있습니다.</li>
                        <li><div>④</div> "회사"는 광고 효과 향상을 위해 "광고주"에게 광고 설정기능을 제공할 수 있으며, "광고주"가 설정한 조건에 따라 광고가 노출될 수 있도록 최선을 다합니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제11조.">
                      <h5 className="card-title"><strong>제11조. "광고주"의 의무</strong></h5>
                      <ul>
                        <li><div>①</div> "광고주"는 광고매체에 키워드와 함께 등록한 광고 소재를 전자상거래법, 정통망법, 표시광고의공정화에관한법률, 소비자기본법 등 관련법령 및 본 약관, 개별약정, 판매자 운영정책을 비롯하여
      고객 보호 및 서비스 신뢰도 제고 등을 위해 회사가 제정하여 공개한 기타 정책을 준수하여야 합니다</li>
      <li><div>②</div> "회사"의 원활한 서비스 제공을 위하여 "광고주"는 이카루스 광고센터에 게시되거나 회사에 통보한 자신의 이메일로 전달되는 공지사항 등을 수시로 확인하여야 합니다.</li>
      <li><div>③</div> "광고주"는 광고 이용 목적에 한하여 서비스를 이용할 수 있으며, 서비스에 의하여 제공된 정보를 제3자에게 제공 또는 유출하여서는 안됩니다.</li>
                        <li><div>④</div> "광고주"는 자신의 귀책 사유로 인해 "회사"와 "광고주", 고객 또는 제3자와의 사이에 분쟁이 발생한 경우 즉시 자신의 비용과 책임으로 회사를 면책시켜야 하고 회사, 고객 또는 제3자 등에게
      손해가 발생한 경우 이를 즉시 배상하여야 합니다.</li>
                        <li><div>⑤</div> "광고주"는 본 약관에 따른 서비스 이용권한을 본인 외에 타인에게 대여 하거나 양도 하여서는 안됩니다. 단, "회사"는 "광고주"가 동의한 경우에 한해 "이카루스 광고센터"에 게시된 대행사 중
     "광고주"가 지정한 대행사("광고대행사")에게 "이카루스 광고센터" 및 관련 시스템 이용 권한을 부여할 수 있으며 "광고대행사"에 대한 감독책임은 "광고주"에게 귀속됩니다. "광고주"가
     "광고대행사"를 지정하면 해당 지정의 효과는 "회사"가 "이카루스 광고센터"에 공지한 기간동안 (이하 "최소 유지기간") 유지되며, "광고주"는 "최소 유지기간" 내에는 다른 "광고대행사"를
     다시 지정할 수 없습니다. “최소 유지기간&#34;은 확인은 가능합니다.
</li>
                        <li><div>⑥</div> "회사"와 "광고대행사간"의 계약 관계가 종료 또는 해지되는 경우 "광고주"는 자신의 선택에 따라 직접 광고 업무를 수행하거나 회사와 계약관계에 있는 다른 광고대행사로 지정할 수 있습니다.
     "광고주"의 선택이 없을 경우, 자동으로 직접 광고 업무를 수행하는 것으로 변경됩니다.
</li>
                        <li><div>⑦</div> "회사"는 "광고대행사"가 "광고주"가 "광고대행사"를 지정한 날 또는 "광고대행사"가 "서비스 이용료"를 집행한 날부터 365일까지 로그인 과 "서비스 이용료"를 지급한 이력이 없을 경우
     "광고주"가 "광고대행사"에게 지정한 "광고대행사"의 이카루스 ID 계정 이용을 취소하며 "광고주"가 직접 광고 업무를 수행하는 것으로 변경합니다. 단, 이카루스 ID 계정 이용 해지 예고 후 7일
     이내에 "광고주"가 해당 "광고대행사"를 통해서 "로그인"과 "서비스 이용료"를 지급한 이력이 있을 경우 재이용이 가능합니다.</li> 
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제12조.">
                      <h5 className="card-title"><strong>제12조. "회사"의 면책</strong></h5>
                      <ul>
                        <li> <div>①</div> "회사"는 천재지변, DDoS 등 서비스 이용에 대한 외부 공격, IDC 장애, 기간 통신사업자의 회선 장애 등 회사가 예측 및 통제할 수 없는 사유로 서비스를 정상적으로 제공할 수 없는 경우 서비스 제공에 대한 책임이 면제됩니다. </li>  
                        <li><div>②</div> 전항의 서비스 중단으로 인하여 발생한 "광고주"의 손해에 대하여 "회사"는 고의 또는 중대한 과실이 없는 한 책임을 부담하지 않으며 영업손실, 특별 손해 등은 배상하지 않습니다.</li>
                        <li><div>③</div> "회사"가 "광고주"에게 제공하는 서비스는 "회사"가 광고를 노출할 수 있도록 광고 플랫폼을 제공하는 것에 국한합니다. "회사"는 어떠한 경우에도 "광고주"나 "광고주"의 대행사 등 어느 누구도
                        대리하거나 대행하지 않으며, 재화 등의 판매에 있어서 어떠한 책임도 부담하지 않습니다.</li>
                        <li><div>④</div> "회사"는 "광고주"의 귀책사유로 인한 서비스 이용의 장애 등에 대하여 책임을 지지 않습니다.</li>
                        <li><div>⑤</div> "회사"는 "광고주"가 광고한 상품의 신뢰도, 정확성, 적법성 등에 관하여는 책임을 지지 않으며, 이를 신뢰함으로써 "광고주", 고객 기타 제3자가 입은 손해에 대하여 책임을 지지 않습니다. 다만,
                        "광고주"가 관련 법령 또는 회사의 광고정책을 위반하는 경우 "회사"는 광고를 게재하지 않을 수 있으며, 광고 게재 또는 중단과 관련하여 "회사"는 책임을 지지 않습니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제13조.">
                      <h5 className="card-title"><strong>제13 조. 개인정보보호의무 및 비밀유지</strong></h5>
                      <ul>
                        <li><div>①</div> 각 당사자는 "정보통신망 이용촉진 및 정보보호 등에 관한 법률" 등 관계 법령이 정하는 바에 따라 "광고주"의 개인정보를 보호하기 위해 노력합니다. "광고주"의 개인정보의 보호 및 사용에
                        대해서는 "회사"의 적용됩니다.</li>
                        <li><div>②</div> 각 당사자는 법령상 요구되는 경우를 제외하고는 상대방으로부터 취득한 제1항의 개인정보, 기술정보, 경영 정보 등 비밀로 관리되는 정보를 제3자에게 누설하여서는 안되며 그 정보를
                        이용계약의 이행 이외의 목적으로 이용하지 않습니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제14조.">
                      <h5 className="card-title"><strong>제14조. 분쟁의 해결</strong></h5>
                      <ul>
                        <li>본 약관은 대한민국법령에 의하여 규정되고 이행되며, 본 서비스 이용과 관련하여 발생한 분쟁에 대해서는 민사소송법상의 주소지를 관할하는 법원을 합의관할로 합니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body" id="제15조.">
                      <h5 className="card-title"><strong>제15조. 개인정보보호의무 및 비밀유지</strong></h5>
                      <ul>
                        <li><div>①</div> "회사"는 "외부플랫폼광고"의 "광고소재"가 "외부플랫폼광고" 네트워크상에 게시됨에 있어서 "광고소재"가 어디에서, 얼마나 자주 게시되는지, 서로 다른 "광고주" 간에 우선순위가 정해지는
                        방식에 관하여 보증하지 않습니다.</li>
                        <li><div>②</div> "회사"는 "광고주"에 대한 통지 또는 보상 없이, "외부플랫폼광고 " 기술을 변경하거나 "광고소재"의 게시를 중단하거나 그러한 게시를 시작하지 않을 수 있습니다.</li>
                        <li><div>③</div> "회사"는 "회사"가 선택한 외부플랫폼 광고업체의 서버를 통해서, 클릭수 및/또는 "광고주"가 부담할 광고요금을 산정하는데 필요한 기타 지표를 측정하고, 측정결과를 "광고주"에게 제공합니다.</li>
                        <li><div>④</div> "외부플랫폼광고"는 제3자가 기망적이거나 부적절한 목적으로 클릭수 또는 기타 본 계약상 요금에 영향을 미칠 수 있는 행위를 할 위험이 있습니다. "회사"는 위와 같은 제3자의 부정클릭 또는
                        기타 발생할 수 있는 부적절한 행위와 관련하여 "광고주" 에 대해 어떠한 책임도 부담하지 않습니다.</li>
                        <li><div>⑤</div> "광고주"는 "외부플랫폼광고"를 시행함에 있어 "회사"가 제공하는 측정결과를 성실하게 검토하여 "외부플랫폼광고"의 계속 여부를 결정하여야 합니다.
                        "광고주"는 위 (3)항의 측정결과에 대하여 "회사"에 대하여 이의를 제기할 수 없습니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body">
                      <h5 className="card-title"><strong>부칙 제1조. 적용일자</strong></h5>
                      <ul>
                        <li>본 약관은 0000년 00월 00일 부터 적용됩니다.</li>
                      </ul>
                    </div>
                    
                    <div className="card-body border-bottom-0 last-section"> 
                      <ul>
                        <li className='!text-[#CE1717] justify-end text-end'>별첨1. 광고 상품 및 서비스 이용료 과금 기준<br />
                        별첨2. 광고 운영 가이드</li>
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
  )
}
