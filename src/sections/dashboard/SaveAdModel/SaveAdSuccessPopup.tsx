import useAuth from "@src/hooks/useAuth";
import { Modal } from "antd";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "./styles.module.css";

function SaveAdSuccessPopup({ open,onCancel}: { onCancel: VoidFunction,open : boolean }) {
  const { user } = useAuth();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Enter") {
        event.preventDefault(); // Prevent form submission
        onCancel();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
      <Modal
          open={open}
          onCancel={onCancel}
          width={'367px'}
          footer={false}
          closable={false}
          className={'ad_modal'}
      >
          <div className={'ad_apply_modal'}>
            <div className={styles.apply_completed_wrap}>
              <div className={styles.ad_apply_content}>
                <Image
                    className={styles.ic_modal_chk}
                    alt="icon"
                    src="/images/ic-success.png"
                    width={40}
                    height={40}
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
                <div className={'flex justify-center'}>

                    <button
                        type="button"
                        className={styles['apply_completed_btn']}
                        onClick={onCancel}
                    >
                      확인
                    </button>

                </div>
              </div>
            </div>
          </div>

      </Modal>

  );
}

export default SaveAdSuccessPopup;
