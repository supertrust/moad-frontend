import useAuth from "@src/hooks/useAuth";
import { Modal } from "antd";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "./styles.module.css";

function SaveAdSuccessPopup({ open,onCancel}: { onCancel: (e: any) => void,open : boolean }) {
  const { user, dictionary } = useAuth();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Enter") {
        event.preventDefault(); // Prevent form submission
        onCancel(event);
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
                <div className={styles.popup_success_title}>{dictionary.adForm.success.title}</div>
                <div className={styles.popup_success_text}>
                  {dictionary.adForm.success.text[0]}
                  <br />
                  {dictionary.adForm.success.text[1]}
                  <br />
                  {`${user?.employee_name} / ${user?.employee_phone_number}`}
                </div>
                <div className={styles.popup_sub_text}>
                  {dictionary.adForm.success.sub_text}
                </div>
                <div className={'flex justify-center'}>
                    <button
                        type="button"
                        className={styles['apply_completed_btn']}
                        onClick={onCancel}
                    >
                      {dictionary.adForm.done}
                    </button>
                </div>
              </div>
            </div>
          </div>

      </Modal>

  );
}

export default SaveAdSuccessPopup;
