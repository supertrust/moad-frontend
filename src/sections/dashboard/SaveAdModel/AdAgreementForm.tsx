import React from "react";
import styles from "./styles.module.css";
import useAuth from "@src/hooks/useAuth";

function AdAgreementForm({
  onDisagree,
  onAgree,
}: {
  onDisagree: VoidFunction;
  onAgree: VoidFunction;
}) {
  const { user } = useAuth();
  return (
    <div className={styles.ad_modal_wrap}>
      <div className={styles.ad_apply_title}>
        <p>광고신청</p>
      </div>
      <div className={styles.ad_apply_content}>
        <div className={styles.terms_title}>이카루스 광고 신청 약관 계약서</div>
        <div className={styles.terms_text}>
          <div className={styles.terms_content}>
            이카루스 관련 제반 서비스의 이용과 관련하여 필요한 사항을
            규정합니다.
            <br />
            <br />
            이용약관이 들어갈 예정입니다이용약관이 들어갈 예정입니다이용약관이
            들어갈 예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어갈 예정입니다이용약관이 들어갈
            예정입니다이용약관이 들어
          </div>
        </div>
        <hr />
        <div className={styles.terms_company}>
          {`회사명 : ${user?.company_name}`}
          <br />
          {`사업자 등록번호 : ${user?.business_registration_number}`}
        </div>
        <div className={styles.modal_step}>
          <div className={styles.btn_section}>
            <button
              type="button"
              id={styles.ad_apply_cancel}
              className={`${styles.btns} ${styles.cancel_btn}`}
              onClick={onDisagree}
            >
              이전
            </button>
            <button
              type="button"
              id={styles.ad_apply_btn}
              className={`${styles.btns} ${styles.active} ${styles.ad_apply_btn}`}
              onClick={onAgree}
            >
              동의
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdAgreementForm;
