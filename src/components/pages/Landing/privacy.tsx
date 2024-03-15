import React from 'react';
import Footer from './component/footer/footer';
import HeaderComp from './component/header/header';

const PrivacyComp = () => {
  return (
    <div className='_privacy-page-root'>
      <HeaderComp />
      <main id='privacy_policy' className='page'>
        <div className='page-title-wrap'>
          <h1 className='page-title-text'>개인정보 처리방침</h1>
        </div>
        <section className='privacy-policy-section01'>
          <div className='section01-info-text'>
            ㈜이카루스(이하 “회사”)는 회사가 운영하는 인터넷 사이트(홈페이지
            URL이하 “이카루스”)를 이용하는
            <br />
            이용자님들의 개인정보를 매우 중요하게 생각하며 아래와 같은
            개인정보처리방침을 가지고 있습니다.
            <br />
            이 개인정보처리방침은 개인정보와 관련한 법령 또는 지침의 변경이 있는
            경우 갱신되고, 정책의 변화에 따라 달라질 수 있으니
            <br />
            이용자께서는 이카루스 마케팅 플랫폼 사이트를 방문 시 수시로 확인하여
            주시기 바랍니다.
            <br />
            이카루스 마케팅 플랫폼의 개인정보처리방침은 다음과 같은 내용을 담고
            있습니다.
          </div>
        </section>
        <section className='privacy-policy-section02'>
          <div className='policy-list-grid'>
            <ul className='policy-list-wrap'>
              <li className='policy-list'>
                <a href='#policy_item01' className='policy-box'>
                  제1조. 개인정보의 수집•이용
                </a>
              </li>
              <li className='policy-list'>
                <a href='#policy_item02' className='policy-box'>
                  제2조. 개인정보 제3자 제공
                </a>
              </li>
              <li className='policy-list'>
                <a href='#policy_item03' className='policy-box'>
                  제3조. 개인정보 처리 위탁
                </a>
              </li>
              <li className='policy-list'>
                <a href='#policy_item04' className='policy-box'>
                  제4조. 이용자 개인정보의 보유: 이용기간 및 파기
                </a>
              </li>
              <li className='policy-list'>
                <a href='#policy_item05' className='policy-box'>
                  제5조. 쿠키(Cookie)의 운용 및 거부
                </a>
              </li>
              <li className='policy-list'>
                <a href='#policy_item06' className='policy-box'>
                  제6조. 이용자 권리
                </a>
              </li>
              <li className='policy-list'>
                <a href='#policy_item07' className='policy-box'>
                  제7조. 이용자의 의무
                </a>
              </li>
              <li className='policy-list'>
                <a href='#policy_item08' className='policy-box'>
                  제8조. 링크 사이트에 대한 책임
                </a>
              </li>
              <li className='policy-list'>
                <a href='#policy_item09' className='policy-box'>
                  제9조. 개인정보의 기술적/관리적 보호 대책
                </a>
              </li>
              <li className='policy-list'>
                <a href='#policy_item10' className='policy-box'>
                  제10조. 개인정보보호책임자
                </a>
              </li>
              <li className='policy-list'>
                <a href='#policy_item11' className='policy-box'>
                  제11조. 고지의 의무
                </a>
              </li>
            </ul>
          </div>
        </section>
        <section className='privacy-policy-section03'>
          <div className='policy-content'>
            <div id='policy_item01' className='policy-items'>
              <div className='policy-items-tit'>
                제1조. 개인정보의 수집•이용
              </div>
              <div className='policy-main'>
                <div className='policy-main-wrap'>
                  <div className='policy-text'>가.</div>
                  <div className='policy-text'>
                    회사가 개인정보를 수집하는 목적은 이용자의 신분과 서비스
                    이용의사를 확인하여 최적화되고 맞춤화된 서비스를 제공하기
                    위함입니다. 회사는 최초 회원가입 시 서비스의 본질적 기능을
                    수행
                    <br />
                    하기 위해 반드시 필요한 최소한의 정보만을 수집하고 있으며
                    회사가 제공하는 서비스 이용에 따른 대금결제, 물품배송 및
                    환불 등에 필요한 정보를 추가로 수집할 수 있습니다.
                  </div>
                </div>
                <div className='policy-main-wrap'>
                  <div className='policy-text'>나.</div>
                  <div className='policy-text'>
                    회사는 개인정보를 수집·이용목적 이외에 다른 용도로 이를
                    이용하거나 이용자의 동의 없이 제3자에게 이를 제공하지
                    않습니다.
                  </div>
                </div>
                <div className='policy-main-wrap'>
                  <div className='policy-text'>다.</div>
                  <div className='policy-text'>
                    회사는 다음과 같은 목적으로 개인정보를 수집하여 이용할 수
                    있습니다. 다만, 국세기본법, 전자금융거래법 등 관계법령에
                    따라 동의 받은 정보 이외에도 수집•보관이 불가피한 경우에는
                    이용자
                    <br />
                    에게 고지하여 해당 정보를 수집할 수 있습니다.
                  </div>
                </div>
              </div>
              <div className='policy-sub-margin'>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>1&#41;</div>
                  <div className='policy-text'>회원</div>
                </div>
                <div className='policy-grid-1 policy-grid'>
                  <div className='policy-grid-hd'>목적</div>
                  <div className='policy-grid-hd'>항목</div>
                  <div className='policy-grid-hd'>보유기간</div>
                  <div className='policy-grid-text'>회원 본인 여부 확인</div>
                  <div className='policy-grid-text'>
                    아이디(이메일주소), 비밀번호,
                    <br />
                    이름, 전화번호, 소속회사
                  </div>
                  <div className='policy-grid-text policy-row-1'>
                    사용자 탈퇴 시 6개월 / 반려 시 1개월 단,
                    <br />
                    거래가 있는 경우에는 관련 법령에 따른 보존기간
                  </div>
                  <div className='policy-grid-text'>
                    불만처리 및 문의응대기록,
                    <br />
                    새로운 상품/서비스 정보와 고지,
                    <br />
                    사항의 안내, 광고집행 정산 등 커뮤니케이션
                  </div>
                  <div className='policy-grid-text'>
                    아이디(이메일주소), 비밀번호,
                    <br />
                    이름, 전화번호, 소속회사
                  </div>
                </div>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>2&#41;</div>
                  <div className='policy-text'>기타</div>
                </div>
                <div className='policy-sub-wrap'>
                  <div className='policy-sub-text policy-text'>
                    서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이
                    자동으로 생성되어 수집•저장•조합•분석 될 수 있습니다.
                    <br />
                    IP Address, 방문 일시, 서비스 이용 기록 등 이용내역정보:
                    부정 이용 방지, 비인가 사용 방지, 신규 서비스 개발 및
                    맞춤서비스 제공 등
                  </div>
                </div>
              </div>
              <div className='policy-main only-mb'>
                <div className='policy-main-wrap'>
                  <div className='policy-text'>1&#41;</div>
                  <div className='policy-text'>
                    회원
                    <br />
                    목적. 회원 본인 여부 확인 또는 불만처리 및 문의응대기록,
                    새로운 상품/서비스 정보와 고지, 사항의 안내, 광고집행 정산
                    등 커뮤니케이션 항목. 아이디(이메일주소), 비밀번호, 이름,
                    전화번호, 소속회사 보유기간. 사용자 탈퇴 시 6개월 / 반려 시
                    1개월 단, 거래가 있는 경우에는 관련 법령에 따른 보존기간
                  </div>
                </div>
                <div className='policy-main-wrap'>
                  <div className='policy-text'>2&#41;</div>
                  <div className='policy-text'>
                    기타 <br />
                    서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이
                    자동으로 생성되어 수집•저장•조합•분석 될 수 있습니다. IP
                    Address, 방문 일시, 서비스 이용 기록 등 이용내역정보 : 부정
                    이용 방지, 비인가 사용 방지, 신규 서비스 개발 및 맞춤서비스
                    제공 등
                  </div>
                </div>
              </div>
              <div className='policy-main'>
                <div className='policy-main-wrap'>
                  <div className='policy-text'>라.</div>
                  <div className='policy-text'>
                    회사는 이용자의 개인정보를 수집할 경우 법령상 근거가 없는 한
                    반드시 이용자의 동의를 얻어 수집하며, 이용자의 기본적 인권을
                    침해할 우려가 있는 인종, 출신지, 본적지, 사상, 정치적 성향
                    <br />
                    범죄기록, 건강상태 등의 정보는 이용자의 동의 또는 법령의
                    규정에 의한 경우 이외에는 수집하지 않습니다.
                  </div>
                </div>
                <div className='policy-main-wrap'>
                  <div className='policy-text'>마.</div>
                  <div className='policy-text'>
                    회사는 회원 가입을 만 14세 이상인 경우에 가능하도록 하며
                    개인정보의 수집•이용에 법정대리인의 동의가 필요한 만 14세
                    미만 아동의 개인정보는 원칙적으로 수집하지 않습니다.
                    <br />
                    단, 법정대리인의 동의를 얻은 경우에는 만 14세 미만 이용자의
                    개인정보를 수집•이용할 수 있습니다.
                  </div>
                </div>
                <div className='policy-main-wrap'>
                  <div className='policy-text'>바.</div>
                  <div className='policy-text'>
                    회사는 다음과 같은 방법으로 개인정보를 수집할 수 있습니다.
                  </div>
                </div>
                <div className='policy-sub'>
                  <div className='policy-sub-wrap'>
                    <div className='policy-text'>1&#41;</div>
                    <div className='policy-text'>
                      {' '}
                      홈페이지, 모바일 어플리케이션, 모바일 웹 페이지 서면,
                      팩스, 전화, 고객센터 문의하기, 이벤트 응
                    </div>
                  </div>
                  <div className='policy-sub-wrap'>
                    <div className='policy-text'>2&#41;</div>
                    <div className='policy-text'>
                      {' '}
                      생성정보 수집 툴을 통한 자동 수집
                    </div>
                  </div>
                </div>
                <div className='policy-main-wrap'>
                  <div className='policy-text'>사.</div>
                  <div className='policy-text'>
                    회사는 개인정보를 수집함에 있어, 서비스 제공에 필요한
                    최소한의 개인정보를 ‘필수동의 항목’으로, 그 외 개인정보는
                    ‘선택동의 항목’으로 구분하여 이에 대해 개별적으로 동의할 수
                    있는 절차를
                    <br />
                    마련합니다. 회사는 이용자가 필요한 최소한의 개인정보 이외의
                    개인정보를 제공하지 아니한다는 이유로 그 서비스의 제공을
                    거부하지 않습니다.
                  </div>
                </div>
              </div>
            </div>
            <div id='policy_item02' className='policy-items'>
              <div className='policy-items-tit'>제2조. 개인정보 제3자 제공</div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>가.</div>
                <div className='policy-text'>
                  회사는 이용자들의 개인정보를 「개인정보의 수집·이용」에서
                  고지한 범위 내에서 사용하며, 이용자의 사전 동의 없이 동 범위를
                  초과하여 이용하거나 원칙적으로 이용자의 개인정보를
                  <br />
                  제3자에게 제공하지 않습니다. 다만, 아래의 경우에는 예외로
                  합니다.
                </div>
              </div>
              <div className='policy-sub'>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>1&#41;</div>
                  <div className='policy-text'>
                    이용자들이 사전에 공개 또는 제3자 제공에 동의한 경우
                  </div>
                </div>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>2&#41;</div>
                  <div className='policy-text'>
                    법령의 규정에 의거하거나, 수사, 조사 목적으로 법령에 정해진
                    절차와 방법에 따라 수사기관 및 감독당국의 요구가 있는 경우
                  </div>
                </div>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>3&#41;</div>
                  <div className='policy-text'>
                    요금 정산을 위하여 필요한 경우
                  </div>
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>나.</div>
                <div className='policy-text'>
                  이용자는 개인정보의 제3자 제공에 대하여 동의를 하지 않을 수
                  있고, 언제든지 제3자 제공 동의를 철회할 수 있습니다. 동의를
                  거부하시는 경우에도 회원가입서비스는 이용하실 수 있으나,
                  <br />제 3자 제공에 기반한 관련 서비스의 이용/제공이 제한될 수
                  있습니다. 기타 개인정보 제3자 제공에 대한 변동사항은 공지 및
                  별도 통지를 할 예정입니다.
                </div>
              </div>
            </div>
            <div id='policy_item03' className='policy-items'>
              <div className='policy-items-tit'>제3조. 개인정보 처리 위탁</div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>가.</div>
                <div className='policy-text'>
                  회사는 원활하고 향상된 서비스를 제공하기 위해 개인정보 처리를
                  타인에게 위탁할 수 있습니다. 이 경우 회사는 사전에 다음 각
                  호의 사항 모두를 이용자에게 미리 알리고 동의를 받습니다. 다음
                  <br />각 호의 어느 하나의 사항이 변경되는 경우에도 같습니다.
                </div>
              </div>
              <div className='policy-sub'>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>1&#41;</div>
                  <div className='policy-text'>
                    개인정보 처리 위탁을 받는 자
                  </div>
                </div>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>2&#41;</div>
                  <div className='policy-text'>
                    개인정보 처리 위탁을 하는 업무의 내용
                  </div>
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>나.</div>
                <div className='policy-text'>
                  회사는 정보통신서비스의 제공에 관한 계약을 이행하고 이용자
                  편의 증진 등을 위하여 필요한 경우 개인정보처리방침에 따라 가항
                  각 호의 사항을 공개함으로써 고지절차와 동의절차를 거치지
                  <br />
                  아니하고 개인정보 처리를 타인에게 위탁할 수 있습니다.
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>다.</div>
                <div className='policy-text'>
                  회사는 개인정보의 처리와 관련하여 업무를 위탁하는 경우에는
                  관계법령에 따라 위탁 계약 시 개인정보가 안전하게 관리될 수
                  있도록 필요한 조치를 합니다. 회사는 위탁 계약 시 수탁자의
                  <br />
                  개인정보 보호조치 능력을 고려하고, 개인정보의 안전한 관리 및
                  파기 등 수탁자의 의무 이행 여부를 주기적으로 확인합니다. 또한
                  위탁처리하는 정보는 원활한 서비스를 제공하기 위하여 필요한
                  <br />
                  최소한의 정보에 국한됩니다.
                </div>
              </div>
            </div>
            <div id='policy_item04' className='policy-items'>
              <div className='policy-items-tit'>
                제4조. 이용자 개인정보의 보유: 이용기간 및 파기
              </div>
              <div className='policy-text-top policy-text'>
                회사는 이용자의 개인정보를 원칙적으로 고지 및 약정한 기간 동안
                보유 및 이용하며 개인정보의 수집 및 이용목적이 달성되거나
                이용자의 파기 요청이 있는 경우 지체 없이 파기합니다.
                <br />
                단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안
                보존합니다.
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>가.</div>
                <div className='policy-text'>
                  관계법령 및 회사 방침에 의한 정보보유 사유
                  <br />
                  관계법령의 규정에 의하여 보존할 필요가 있는 경우 법령에서
                  규정한 바에 따라 이용자의 개인정보를 보관하며 마케팅 등 다른
                  목적으로 이용하지 않습니다.
                </div>
              </div>
              <div className='policy-sub-margin'>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>1&#41;</div>
                  <div className='policy-text'>
                    관계법령에 따른 정보보유 사유
                  </div>
                </div>
                <div className='policy-grid-2 policy-grid'>
                  <div className='policy-grid-hd'>관계법령</div>
                  <div className='policy-grid-hd'>관계법령</div>
                  <div className='policy-grid-hd'>관계법령</div>
                  <div className='policy-grid-hd'>관계법령</div>

                  <div className='policy-grid-text'>통신비밀보호법</div>
                  <div className='policy-grid-text'>
                    법원의 영장을 받아 수사기관이 요청 시 제공
                  </div>
                  <div className='policy-grid-text'>로그기록, IP 등</div>
                  <div className='policy-grid-text'>3개월</div>
                  <div className='policy-grid-text policy-row-2'>
                    국세기본법
                  </div>
                  <div className='policy-grid-text policy-row-box'>
                    국세부과 제척기간 계산
                  </div>
                  <div className='policy-grid-text policy-row-box'>
                    국세증빙자료 등
                  </div>
                  <div className='policy-grid-text policy-row-box'>10년</div>
                  <div className='policy-grid-text policy-row-box'>
                    국세징수권 등 소명시효 계산
                  </div>
                  <div className='policy-grid-text policy-row-box'>
                    과세표준과 세액의 신고자료 등
                  </div>
                  <div className='policy-grid-text policy-row-box'>５년</div>
                  <div className='policy-grid-text'>부가가치세법</div>
                  <div className='policy-grid-text'>
                    장부, 세금계산서,
                    <br />
                    수입세금계산서, 영수증 등
                  </div>
                  <div className='policy-grid-text'>
                    부가가치세의 과세표준과
                    <br />
                    세액의 신교자료 등
                  </div>
                  <div className='policy-grid-text'>５년</div>
                  <div className='policy-grid-text'>전자금융거래법</div>
                  <div className='policy-grid-text'>전자금융거래기록확인</div>
                  <div className='policy-grid-text'>
                    전자금융거래에 관한 기록,
                    <br />
                    상대방에 대한 정도 등
                  </div>
                  <div className='policy-grid-text'>５년</div>
                </div>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>2&#41;</div>
                  <div className='policy-text'>
                    회사 방침에 의한 정보보유 사유 회원 본인확인을 위해 가입 시
                    수집한 정보는 탈퇴하는 경우 6개월 이후, 반려된 경우에는
                    1개월 이후 개인정보를 삭제합니다.
                  </div>
                </div>
              </div>
              <div className='policy-main only-mb'>
                <div className='policy-main-wrap'>
                  <div className='policy-text'>1&#41;</div>
                  <div className='policy-text'>
                    관계법령에 따른 정보보유 사유
                  </div>
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>나.</div>
                <div className='policy-text'>
                  수집된 개인정보의 보유·이용기간은
                  서비스이용계약체결(회원가입)시부터
                  서비스이용계약해지(탈퇴신청, 직권탈퇴 포함)입니다. 또한 동의
                  해지 시 회사는 이용자의 개인정보를 상기 명시한
                  <br />
                  정보보유 사유에 따라 일정 기간 저장하는 자료를 제외하고는 지체
                  없이 파기하며 개인정보처리가 제3자에게 위탁된 경우에는
                  수탁자에게도 파기하도록 지시합니다.
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>다.</div>
                <div className='policy-text'>
                  회사는 1년 동안 회사의 서비스를 이용하지 않은 이용자의
                  개인정보는 ‘정보통신망 이용촉진 및 정보보호등에 관한 법률
                  제29조’ 에 근거하여 이용자에게 사전통지하고 개인정보를
                  파기하거나
                  <br />
                  별도로 분리하여 저장 관리합니다. 단, 관계법령의 규정에 의하여
                  보존할 필요가 있는 경우 관계법령에서 규정한 일정한 기간 동안
                  이용자 개인정보를 보관합니다.
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>라.</div>
                <div className='policy-text'>
                  회사는 다항 기간 만료 30일 전까지 개인정보가 파기되거나
                  분리되어 저장•관리되는 사실과 기간 만료일 및 해당 개인정보의
                  항목을 공지사항, 전자우편 등의 방법으로 이용자에게 알립니다.
                  <br />
                  이를 위해 이용자는 회사에 정확한 연락처 정보를 제공/수정하여야
                  합니다.
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>마.</div>
                <div className='policy-text'>
                  파기방법
                  <br />
                  이용자의 개인정보는 수집 및 이용목적이 달성된 후에는 지체 없이
                  파기됩니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각
                  등을 통하여 파기하고, 전자적 파일형태로 저장된 개인정보는
                  기록을 재생할 수 없는 기술적 방법 또는 물리적 방법을 사용하여
                  파기합니다.
                </div>
              </div>
              <div className='policy-main only-mb'>
                <div className='policy-main-wrap'>
                  <div className='policy-text'>2&#41;</div>
                  <div className='policy-text'>
                    회사 방침에 의한 정보보유 사유 회원 본인확인을 위해 가입 시
                    수집한 정보는 탈퇴하는 경우 6개월 이후, 반려된 경우에는
                    1개월 이후 개인정보를 삭제합니다.
                  </div>
                </div>
              </div>
            </div>
            <div id='policy_item05' className='policy-items'>
              <div className='policy-items-tit'>
                제5조. 쿠키(Cookie)의 운용 및 거부
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>가.</div>
                <div className='policy-text'>쿠키의 사용 목적</div>
              </div>
              <div className='policy-sub'>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>1&#41;</div>
                  <div className='policy-text'>
                    회사는 회사가 운영하는 인터넷 사이트에서 개인 맞춤 서비스를
                    제공하기 위해 이용 정보를 저장하는 ‘쿠키(cookie)’를
                    사용합니다. 쿠키는 웹사이트 서버가 이용자의 브라우저에게
                    전송하는
                    <br />
                    소량의 정보로서 이용자 컴퓨터의 하드디스크에 저장됩니다.
                  </div>
                </div>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>2&#41;</div>
                  <div className='policy-text'>
                    회사는 쿠키의 사용을 통해서만 가능한 특정된 맞춤형 서비스를
                    제공할 수 있습니다.
                  </div>
                </div>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>3&#41;</div>
                  <div className='policy-text'>
                    회사는 회원을 식별하고 회원의 로그인 상태를 유지하기 위해
                    쿠키를 사용할 수 있습니다.
                  </div>
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>나.</div>
                <div className='policy-text'>쿠키의 설치/운용 및 거부</div>
              </div>
              <div className='policy-sub'>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>1&#41;</div>
                  <div className='policy-text'>
                    이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서
                    이용자는 웹브라우저에서 옵션을 조정함으로써 모든 쿠키를
                    허용/거부하거나, 쿠키가 저장될 때마다 확인을 거치도록 할 수
                    있습니다.
                    <br />
                    쿠키 설치 허용 여부를 지정하는 방법(Internet Explorer의
                    경우);은 다음과 같습니다
                    <br />
                    -[도구] 메뉴에서 [인터넷 옵션]을 선택합니다.
                    <br />
                    -[개인정보 탭]을 클릭합니다.
                    <br />
                    -[개인정보처리 수준]을 설정하시면 됩니다.
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div id='policy_item06' className='policy-items'>
              <div className='policy-items-tit'>제6조. 이용자의 권리</div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>가.</div>
                <div className='policy-text'>
                  용자는 언제든지 개인정보고객센터를 통하여 회원님의 개인정보를
                  열람, 정정 처리하실 수 있으며 전자우편 또는 서면으로 요청하신
                  경우 열람, 정정, 삭제 처리해드리겠습니다. 이용자의 개인
                  <br />
                  정보가 제3자에게 제공되거나 처리 위탁된 경우 이용자는 회사
                  또는 ‘제3자’/’수탁자’에게 파기를 요청할 수 있습니다. 단, 회원
                  아이디(ID), 성명은 정정이 불가능하며, 개명으로 인한 성명 변경
                  및<br />
                  행정상의 문제로 인한 사업자등록번호 변경은 예외적으로 허용 될
                  수 있습니다. 기타 법률에 따라 정정 또는 삭제가 금지되거나
                  제한되어 있는 경우에는 해당 처리가 제한될 수 있습니다. 또한
                  개인
                  <br />
                  정보 오류에 대한 정정 요청한 경우에는 다른 법률에 따라
                  개인정보의 제공을 요청 받는 경우가 아닌 한 정정을 완료하기
                  전까지 당해 개인정보를 이용 또는 제공하지 않습니다, 만약
                  잘못된
                  <br />
                  개인정보를 이미 제공한 경우에는 정정 처리 결과를 제 3자에게
                  통지하여 정정이 이루어지도록 하겠습니다.
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>나.</div>
                <div className='policy-text'>
                  이용자는 언제든지 이카루스 마케팅 플랫폼 사이트의 개인정보에
                  대하여 처리의 정지를 요구 할 수 있습니다. 다만 아래의 경우에
                  해당하는 경우 처리정지 요구를 거절할 수 있습니다.
                </div>
              </div>
              <div className='policy-sub'>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>1&#41;</div>
                  <div className='policy-text'>
                    법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여
                    불가피한 경우
                  </div>
                </div>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>2&#41;</div>
                  <div className='policy-text'>
                    다른 사람의 생명·신체를 해할 우려가 있거나 다른 사람의
                    재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우
                  </div>
                </div>
                <div className='policy-sub-wrap'>
                  <div className='policy-text'>3&#41;</div>
                  <div className='policy-text'>
                    개인정보를 처리하지 아니하면 정보주체와 약정한 서비스를
                    제공하지 못하는 등 계약의 이행이 곤란한 경우로서 정보주체가
                    그 계약의 해지 의사를 명확하게 밝히지 아니한 경우
                  </div>
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>다.</div>
                <div className='policy-text'>
                  회원가입 등을 통해 개인정보의 수집·이용·제공에 대해 회원님께서
                  동의하신 내용을 언제든지 철회할 수 있습니다. 동의철회는 회사
                  사이트 내 “회원 탈퇴 신청”을 클릭하거나 서면, 이메일
                  <br />
                  으로 연락하시면 지체 없이 개인정보의 삭제 등 필요한 조치를
                  하겠습니다. 다만 법률 또는 약관의 규정에 따라 회사가 회원님의
                  개인정보를 보존하여야 하는 경우에는 해당 처리가 있습니다.
                  <br />이 경우 회원님은 본인 식별을 위하여 반드시
                  회원아이디(ID)와 본인확인 식별정보를 밝히셔야 하며, 철회로
                  인해 서비스에 다소 제약이 있거나 일부 서비스를 이용하지 못하실
                  수 있습니다.
                </div>
              </div>
            </div>
            <div id='policy_item07' className='policy-items'>
              <div className='policy-items-tit'>제7조. 이용자의 의무</div>
              <div className='policy-text-top policy-text'>
                이용자는 자신의 개인정보를 보호할 의무가 있으며, 회사의
                귀책사유가 없이 ID, 비밀번호, 접근매체 등의 양도•대여•분실이나
                로그인 상태에서 이석 등 이용자 본인의 부주의나 관계법령에 의한{' '}
                <br />
                보안 조치로 차단할 수 없는 방법이나 기술을 사용한 해킹 등 회사가
                상당한 주의에도 불구하고 통제할 수 없는 인터넷 상의 문제 등으로
                개인정보가 유출되어 발생한 문제에 대해 회사는 책임을 지지
                않습니다.
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>가.</div>
                <div className='policy-text'>
                  이용자는 자신의 개인정보를 최신의 상태로 유지해야 하며, 이용한
                  정보 입력으로 발생하는 문제의 책임은 이용자 자신에게 있습니다.
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>나.</div>
                <div className='policy-text'>
                  타인의 개인정보를 도용한 회원가입 또는 ID등을 도용하여 결제
                  처리 시 이용자자격 상실과 함께 관계법령에 의거하여 처벌될 수
                  있습니다.
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>다.</div>
                <div className='policy-text'>
                  이용자는 아이디, 비밀번호 등에 대해 보안을 유지할 책임이
                  있으며 제3자에게 이를 양도하거나 대여할 수 없습니다.
                  <br />
                  이용자는 회사의 개인정보보호정책에 따라 보안을 위해 비밀번호의
                  주기적 변경에 협조할 의무가 있습니다.
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>라.</div>
                <div className='policy-text'>
                  이용자는 회사의 서비스를 이용한 후에는 반드시 로그인 계정을
                  종료하고 웹 브라우저 프로그램을 종료해야 합니다.
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>마.</div>
                <div className='policy-text'>
                  이용자는 "정보 통신망 이용촉진 및 정보보호 등에 관한 법률",
                  “개인정보보호법”, 등 기타 개인정보에 관한 법률을 준수하여야
                  합니다.
                </div>
              </div>
            </div>
            <div id='policy_item08' className='policy-items'>
              <div className='policy-items-tit'>제8조. 이용자의 의무</div>
              <div className='policy-text-top policy-text'>
                회사는 이용자에게 다른 웹사이트에 대한 링크를 제공할 수
                있습니다. 다만, 링크되어 있는 웹사이트들이 개인정보를 수집하는
                행위에 대해서는 본 "개인정보처리방침"이 적용되지 않습니다.
              </div>
            </div>
            <div id='policy_item09' className='policy-items'>
              <div className='policy-items-tit'>
                제9조. 개인정보의 기술적/관리적 보호 대책
              </div>
              <div className='policy-text-top policy-text'>
                회사는 이용자들의 개인정보를 처리함에 있어 개인정보가 분실,
                도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여
                다음과 같은 기술적/관리적 보호대책을 강구하고 있습니다.
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>가.</div>
                <div className='policy-text'>
                  개인정보의 암호화
                  <br />
                  이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고 있으며,
                  개인정보의 확인 및 변경은 비밀번호를 알고 있는 본인에 의해서만
                  가능합니다. 비밀번호는 이용자의 생일, 전화번호 등 타인이
                  <br />
                  추측하기 쉬운 숫자 등을 이용하지 않도록 비밀번호 생성규칙을
                  수립하여 적용하고 있습니다. 비밀번호 등의 개인정보는 안전한
                  암호 알고리즘으로 암호화되어 저장 및 관리되고 있습니다.
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>나.</div>
                <div className='policy-text'>
                  해킹 등에 대비한 대책
                  <br />
                  회사는 해킹 등 회사 정보통신망 침입에 의해 이용자의 개인정보가
                  유출되는 것을 방지하기 위해 침입탐지 및 침입차단 시스템을
                  24시간 가동하고 있습니다. 만일의 사태에 대비하여 모든
                  <br />
                  침입탐지 시스템과 침입차단 시스템은 이중화로 구성하여 운영하고
                  있으며, 민감한 개인정보는 암호화 통신 등을 통하여
                  네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고
                  있습니다.
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>다.</div>
                <div className='policy-text'>
                  개인정보 취급자의 최소화 및 교육
                  <br />
                  회사는 회사의 개인정보 취급자를 최소한으로 제한하며, 개인정보
                  취급자에 대한 교육 등 관리적 조치를 통해 개인정보보호의
                  중요성을 인식시키고 있습니다.
                </div>
              </div>
              <div className='policy-main-wrap'>
                <div className='policy-text'>라.</div>
                <div className='policy-text'>
                  개인정보보호 전담부서의 운영
                  <br />
                  회사는 개인정보의 효율적 보호를 위해 개인정보보호전담부서를
                  운영하고 있으며, 개인정보처리방침의 이행사항 및 개인정보
                  취급자의 준수여부를 확인하여 문제가 발견될 경우 즉시 수정할
                  <br />
                  있도록 노력하고 있습니다.
                </div>
              </div>
            </div>
            <div id='policy_item10' className='policy-items'>
              <div className='policy-items-tit'>
                제10조. 개인정보 보호책임자
              </div>
              <div className='policy-text-top policy-text'>
                회사는 이용자가 회사의 서비스를 안전하게 이용할 수 있도록 최선을
                다하고 있습니다. 이용자는 회사의 서비스 이용과 관련한 모든
                개인정보보호 민원을 전담부서로 신고하실 수 있으며, <br />
                회사는 이용자의 신고사항에 대해 신속하고 성실하게 답변해드리고
                있습니다.
              </div>
              <div className='policy-text-top policy-text'>
                [개인정보 보호책임자]
                <br />
                성명: 이진희
                <br />
                소속부서: 개인정보 보호팀
                <br />
                전자우편: lubme520@naver.com
                <br />
                전화번호: 044-864-9984
                <br />※ 상기 연락처 등은 “개인정보보호 전담 고객센터”로
                연결됩니다.
              </div>
              <div className='policy-text-top policy-text'>
                기타 개인정보침해에 대한 신고 또는 상담이 필요하신 경우에는 아래
                기관으로 문의하시기 바랍니다.
                <br />
                개인정보분쟁조정위원회 / www.kopico.go.kr / 1833-6972
                <br />
                개인정보침해신고센터 / privacy.kisa.or.kr / (국번없이) 118
                <br />
                대검찰청 첨단범죄수사센터 / www.spo.go.kr / (국번없이) 1301
                <br />
                경찰청 사이버안전국 / cyberbureau.police.go.kr / (국번없이) 182
              </div>
            </div>
            <div id='policy_item11' className='policy-items'>
              <div className='policy-text-top'>
                <div className='policy-items-tit'>제11조. 고지의 의무</div>
                <div className='policy-text-top policy-text'>
                  본 개인정보처리방침은 관계법령 및 지침의 변경 또는 회사의 필요
                  등에 의하여 내용의 추가, 삭제 및 수정이 생길 수 있습니다. 이
                  경우 최소 7일 전에 홈페이지 또는 이메일을 통해 사전 공지하고
                  <br />
                  사전 공지가 곤란한 경우 지체 없이 공지하며, 별도 공지가 없는
                  한 7일이 경과된 후에 시행됩니다. 다만, 중대한 내용이 변경되는
                  경우에는 최소 30일 전에 공지하고, 별도 공지가 없는 한 30일이
                  <br />
                  경과된 후에 시행됩니다. 또한 당사는 관계법령에 따라 필요한
                  경우 고객의 별도 동의를 받을 수 있습니다.
                </div>
              </div>
            </div>
            <div className='policy-date'>
              공고 일자: 0000년 00월 00일
              <br />
              시행 일자: 0000년 00월 00일
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyComp;
