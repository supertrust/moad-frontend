import React from "react";
import styles from "./styles.module.css";
import useAuth from "@src/hooks/useAuth";

function SaveAdSuccessPopup({ onOk }: { onOk: VoidFunction }) {
  const { user } = useAuth();
  return (
    <div className={styles.apply_completed_wrap}>
      <div className={styles.ad_apply_content}>
        <img
          className={styles.ic_modal_chk}
          alt="icon"
          src="/images/ic-success.png"
        />
        <div className={styles.popup_success_title}>광고 신청 완료</div>
        <div className={styles.popup_success_text}>
          다음 진행을 위하여 등록하신 담당자님의 연락처로 <br /> 최대한 빠르게
          연락드리겠습니다.
          <br />
          {`${user?.employee_name} / ${user?.employee_phone_number}`}
        </div>
        <div className={styles.popup_sub_text}>
          등록하신 광고는 광고관리에서 확인 가능합니다.
        </div>
        <div className={styles.modal_step}>
          <div className={styles.btn_section}>
            <button
              type="button"
              id={styles.ad_apply_btn}
              className={`${styles.btns} ${styles.apply_completed_btn}`}
              onClick={onOk}
            >
              동의
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaveAdSuccessPopup;
