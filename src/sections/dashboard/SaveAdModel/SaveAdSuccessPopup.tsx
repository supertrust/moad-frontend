import React from 'react'
import styles from './styles.module.css';
import useAuth from '@src/hooks/useAuth';

function SaveAdSuccessPopup({ onOk }: { onOk: VoidFunction }) {
    const {user}=useAuth();
    return (
        <div className={styles.ad_modal_wrap}>
            <div className={styles.ad_apply_content}>
                <img alt="icon" src='/images/ic-success.png' width={45} />
                <h4>광고 신청 완료</h4>
                <p>{`다음 진행을 위하여 등록하신 담당자님의 연락처로 최대한 빠르게 연락드리겠습니다. ${user?.employee_name} / ${user?.employee_phone_number}`}</p>
                <span>등록하신 광고는 광고관리에서 확인 가능합니다.</span>
                <div className={styles.modal_step}>
                    <div className={styles.btn_section}>
                        <button
                            type="button"
                            id={styles.ad_apply_btn}
                            className={`${styles.btns} ${styles.active} ${styles.ad_apply_btn}`}
                            onClick={onOk}
                        >
                            동의
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaveAdSuccessPopup