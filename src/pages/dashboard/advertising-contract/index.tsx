import React from "react";
import ArrowBack from "@src/components/icons/ArrowBack";
import { useRouter } from "next/router";
export default function PolicyModulePage() {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };
  return (
    <>
      <div className="policy-container">
        <div className="privacy-content">
          <div className={`advertising-contract mt-[15px]`}>
            <div className={`mobile-top-header !mb-[14px]`}>
              <ArrowBack handleAction={onBack} />
              <div className={"header"}>이카루스 광고 신청 약관 계약서</div>
              <div></div>
            </div>
          </div>
          <div className="content-terms">
            <div className="content">
              주식회사애드메타(이하 “대행사”라 한다)와 (이하 “차주”라
              한다)하기조항에 의거하여 광고계약을 체결한다. 제 1 조【 계약의
              목적 】 "대행사"는 제2조에 명시된 광고물을 "차주"에게 위임하여
              "차주"가 관리자로서 의무를 성실히 이행하여 본 광고가 효과적으로
              집행될 수 있도록 "대행사", "차주" 간의 책무 관계를 명확히 하는데
              있다. 제 2 조【 계약목적물 】 매체명, 매체종류, 광고위치, 수량,
              기타사항 제 3 조【 광고료 및 지불방법 】 1. "대행사"는 매월 광고료
              일금 원정 (\ )을 3조2항이 지켜진 익월 2번째주화요일에 계좌이체로
              "차주"에게 지급한다. 2. "차주"는 매월(4번째주월요일~ 금요일사이)
              날짜, 운행거리(계기판) 식별이 가능한 사진(차량의 좌우,후면)을
              "대행사"에게 제공하여 광고 게재 확인이 가능하도록 하여야 한다. 3.
              위의 3조2항이 지켜지지 않을 시에 “대행사”는 “차주”에게 광고료를
              지급하지 아니한다. 제 4 조【 계약기간 】 1. 본 광고의 계약기간은
              게첨 일로부터 개월까지 로 하며, 계약만료 1개월 전에 "대행사",
              "차주" 협의 하에 연장키로 하며, 동일조건에서는 "대행 사"에게 광고
              우선권을 주기로 한다. 단, 계약만료 시 광고주 또는 대행사가 바뀔
              경우에 본 계약은 자동 만료되는 것으로 간주한다.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
