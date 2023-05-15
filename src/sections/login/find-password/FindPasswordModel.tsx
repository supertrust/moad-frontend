import React, { useState } from "react";
import { styles } from "./index";

const FindPassModel = ({ SetFindPass }: { SetFindPass: (show: boolean) => void }) => {
    const [step, setStep] = useState('step01');
    const [show_password, setPasswordStatus] = useState(false);
    const [show_confirmPassword, setConfirmPassStatus] = useState(false);

    return (
        <>
            <div id={styles.pw_find_modal} className="pw-find-modal">
                <form action="/login" id="pw_find_form" className={styles.pw_find_form}>
                    <div className={styles.form_wrap}></div>
                    <div id="step01_modal" className={`${styles.step01_modal} ${styles.model_wrap} ${step === 'step01' ? styles.active : null}`}>
                        <div className={styles.model_title}>비밀번호 찾기</div>
                        <div className={styles.modal_text}>
                            가입시 등록했던 정보를 입력해주세요.<br />
                            아이디(이메일)을 잊으셨나요? <button type="button" id="id_find_link" className={styles.id_find_link}>아이디찾기</button>
                        </div>
                        <div className={styles.input_content}>
                            <div className={styles.input_wrap}>
                                <div className={styles.input_text}>아이디 (이메일)<span className={styles.essential}>*</span></div>
                                <input type="text" id="pw_find_email" name="pw_find_email" className={`${styles.user_email} ${styles.input}`} placeholder="이메일 입력" />
                                <div className={`${styles.email_error_text} ${styles.error_text}`}>아이디(이메일)를 확인해주세요</div>
                            </div>
                            <div className={styles.input_wrap}>
                                <div className={styles.input_text}>회사명<span className={styles.essential}>*</span></div>
                                <input type="text" id="pw_find_company_name" className={`${styles.company_name} ${styles.input}`} placeholder="회사명 입력" />
                                <div className={`${styles.company_error_text} ${styles.error_text}`}>회사명을 확인해주세요</div>
                            </div>
                            <div className={styles.input_wrap}>
                                <div className={styles.input_text}>전화번호<span className={styles.essential}>*</span></div>
                                <input type="number" id="pw_find_company_phone" name="pw_find_company_phone" className={`${styles.user_phone} ${styles.input}`} placeholder="전화번호 입력" />
                                <div className={`${styles.phone_error_text} ${styles.error_text}`}>전화번호를 확인해주세요</div>
                            </div>
                        </div>
                        <div className={styles.btn_wrap}>
                            <button
                                type="button" id="step01_confirm"
                                onClick={() => setStep('step02')}
                                className={`${styles.confirm_btn} ${styles.btns}`}>
                                확인
                            </button>
                            <button type="button"
                                onClick={() => SetFindPass(false)}
                                className={`${styles.pw_modal_close} ${styles.cancel_btn} ${styles.btns}`}>
                                취소
                            </button>
                        </div>
                    </div>
                    <div id="step02_modal" className={`${styles.step02_modal} ${styles.model_wrap} ${step === 'step02' ? styles.active : null}`}>
                        <div className={styles.model_title}>비밀번호 찾기</div>
                        <div className={styles.modal_text}>
                            이메일로 인증 번호를 받아 입력해주세요.<br />
                        </div>
                        <div className={styles.input_content}>
                            <div className={styles.input_wrap}>
                                <div className={styles.input_text}>인증 번호를 받을 이메일주소</div>
                                <div className={styles.certification_wrap}>
                                    <div className={styles.certification_email}></div>
                                    <button type="button" className={styles.certification_btn}>인증번호받기</button>
                                </div>
                            </div>
                            <div className={styles.input_wrap}>
                                <div className={styles.input_text}>이메일로 받은 인증번호 (숫자 6자리)</div>
                                <div className={styles.certification_num}>
                                    <input type="number" id="certification_num" className={`${styles.input_num} ${styles.input}`} placeholder="인증번호 입력" />
                                    <div className={styles.certification_time}>03:00</div>
                                </div>
                                <div className={`${styles.certification_error} ${styles.error_text}`}>인증번호를 다시 한번 확인해 주세요.</div>

                                <div className={`${styles.time_error} ${styles.error_text}`}>인증번호 입력가능 시간이 초과되었습니다.</div>
                            </div>
                        </div>
                        <div className={styles.btn_wrap}>
                            <button
                                type="button" id="step02_confirm"
                                onClick={() => setStep('step03')}
                                className={`${styles.confirm_btn} ${styles.btns} `}>
                                인증번호 확인
                            </button>
                            <button type="button"
                                onClick={() => SetFindPass(false)}
                                className={`${styles.pw_modal_close} ${styles.cancel_btn} ${styles.btns}`}>
                                취소
                            </button>
                        </div>
                    </div>
                    <div id="step03_modal" className={`${styles.step03_modal} ${styles.model_wrap} ${step === 'step03' ? styles.active : null}`}>
                        <div className={styles.model_title}>비밀번호 찾기</div>
                        <div className={styles.modal_text}>비밀번호를 재설정해주세요.</div>
                        <div className={styles.input_content}>
                            <div className={styles.input_wrap}>
                                <div className={styles.input_text}>아이디 (이메일)</div>
                                <div id="pw_find_email02" className={styles.pw_find_email02}></div>
                            </div>
                            <div className={styles.input_wrap}>
                                <div className={styles.input_text}>비밀번호</div>
                                <input type={show_password ? 'text' : 'password'} id="pw_find_password" name="pw_find_password"
                                    className={`${styles.user_pw} ${styles.input}`} placeholder="비밀번호" />
                                <div className={styles.pw_error_text}>문자, 숫자, 기호를 조합하여 8자 이상을 사용하세요</div>
                                <i
                                    onClick={() => setPasswordStatus(!show_password)}
                                    className={`${styles.icon} ${styles.pw_show} ${show_password ? styles.active : ""}`} >
                                </i>
                            </div>
                            <div className={styles.input_wrap}>
                                <div className={styles.input_text}>비밀번호 확인</div>
                                <input type={show_confirmPassword ? 'text' : 'password'} id="pw_find_password_confirm" name="pw_find_password_confirm"
                                    className={`${styles.user_pw_confirm} ${styles.input}`} placeholder="비밀번호 재입력" />
                                <div className={`${styles.pw_confirm_text} ${styles.error_text}`}>비밀번호가 일치하지 않습니다.</div>
                                <i
                                    onClick={() => setConfirmPassStatus(!show_confirmPassword)}
                                    className={`${styles.icon} ${styles.pw_show} ${show_confirmPassword ? styles.active : ""}`}>
                                </i>
                            </div>
                        </div>
                        <div className={styles.btn_wrap}>
                            <button type="button" id="step03_confirm"
                                onClick={() => SetFindPass(false)}
                                className={`${styles.confirm_btn} ${styles.btns} `}>
                                완료
                            </button>
                            <button type="button"
                                onClick={() => SetFindPass(false)}
                                className={`${styles.pw_modal_close} ${styles.cancel_btn} ${styles.btns}`}>
                                취소
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FindPassModel;
