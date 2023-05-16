import React from "react";
import { styles } from "./index";

const FindIdModel = ({ SetFindId }: { SetFindId: (show: boolean) => void }) => {

  return (
   <>
  <div id={styles.id_find_modal} className="id-find-modal">
    <div className={styles.modal_wrap}>
        <div className={styles.modal_title}>아이디 찾기</div>
        <div className={styles.modal_text}>가입시 등록했던 정보를 입력해주세요.</div>
        <form action="/login" id="id_find_form" className={styles.id_find_form}>
            <div className={styles.input_content}>
                <div className={styles.input_wrap}>
                    <div className={styles.input_text}>회사명<span className={styles.essential}>*</span></div>
                    <input type="text" id="id_find_company_name" name="id_find_company_name" className={`${styles.user_company} ${styles.input} `} placeholder="회사명"/>
                </div>
                <div className={styles.input_wrap}>
                    <div className={styles.input_text}>전화번호<span className={styles.essential}>*</span></div>
                    <input type="text" id="id_find_company_phone" name="id_find_company_phone" className={`${styles.user_num} ${styles.input}`} placeholder="전화번호 입력"/>
                </div>
            </div>

            <div className={styles.id_message}>
                고객님의 아이디는<br/>
                <span className={styles.user_mail}>tan@mufin.co.kr</span> 입니다.
            </div>

            <div className={styles.none_profile}>
                <span className={styles.text}>등록된 정보가 없습니다.</span><br/>
                회원가입을 해주세요.
            </div>

            <div className={styles.btn_wrap}>
                <a href="sign-up" className={`${styles.btns} ${styles.sign_up_link}`}>회원가입</a>
                <button type="button" id="id_modal_find" className={`${styles.id_model_find} ${styles.btns} ${styles.disabled}`}>찾기</button>
                <button type="button" id="id_modal_close" className={`${styles.id_model_close} ${styles.btns}`} onClick={() => SetFindId(false)}>취소</button>
            </div>
        </form>
    </div>
</div>
   </>
  );
};

export default FindIdModel;
