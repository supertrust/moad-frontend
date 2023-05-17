import {styles} from "@src/sections/login/find-password/index";
import React, {useEffect, useState} from "react";
import {useSendOTP, useVerifyOTP} from "@src/apis/auth";
import {toast} from "react-toastify";

type Step2Props = {
    step: number;
    email: string;
    onClose: () => void;
    onVerifyOTPSuccess: () => void;
}

const Step2 = ({step, email, onClose, onVerifyOTPSuccess}: Step2Props) => {
    const [timer, setTimer] = useState<boolean>(false)
    const [ minutes, setMinutes ] = useState(3);
    const [seconds, setSeconds ] =  useState(0);
    const [otp, setOTP] = useState<string>("");

    const {mutateAsync: sendOTP} = useSendOTP();
    const {mutateAsync: verifyOTP} = useVerifyOTP();

    useEffect(()=>{
        let interval;
        if (timer) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval)
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            }, 1000)
        } else {
            clearInterval(interval);
        }
        return ()=> {
            clearInterval(interval);
        };
    });

    const handleSendOTP = async () => {
        await sendOTP({
            email
        }, {
            onSuccess: () => {
                setMinutes(3);
                setSeconds(0);
                setTimer(true);
            }, onError: (err) => {
                toast(err || "Something went wrong Please try again later", {
                    type: "error",
                });
            }
        })
    }

    const handleVerifyOTP = async () => {
        await verifyOTP({
            email,
            otp,
        }, {
            onSuccess: (res) => {
                setTimer(false);
                onVerifyOTPSuccess();
            },
            onError: (err) => {
                toast(err || "Something went wrong Please try again later", {
                    type: "error",
                });
            }
        })
    }

    return (
        <div id="step02_modal" className={`${styles.step02_modal} ${styles.model_wrap} ${step === 2 ? styles.active : null}`}>
            <div className={styles.model_title}>비밀번호 찾기</div>
            <div className={styles.modal_text}>
                이메일로 인증 번호를 받아 입력해주세요.<br />
            </div>
            <div className={styles.input_content}>
                <div className={styles.input_wrap}>
                    <div className={styles.input_text}>인증 번호를 받을 이메일주소</div>
                    <div className={styles.certification_wrap}>
                        <div className={styles.certification_email}>{email}</div>
                        <button
                            onClick={handleSendOTP}
                            type="button"
                            className={styles.certification_btn}>
                            인증번호받기
                        </button>
                    </div>
                </div>
                <div className={styles.input_wrap}>
                    <div className={styles.input_text}>이메일로 받은 인증번호 (숫자 6자리)</div>
                    <div className={styles.certification_num}>
                        <input
                            type="text"
                            id="certification_num"
                            className={`${styles.input_num} ${styles.input}`}
                            placeholder="인증번호 입력"
                            onChange={(e) => setOTP(e.target.value)}
                        />
                        <div className={styles.certification_time}>
                            {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}
                        </div>
                    </div>
                    <div className={`${styles.certification_error} ${styles.error_text}`}>인증번호를 다시 한번 확인해 주세요.</div>

                    <div className={`${styles.time_error} ${styles.error_text}`}>인증번호 입력가능 시간이 초과되었습니다.</div>
                </div>
            </div>
            <div className={styles.btn_wrap}>
                <button
                    disabled={otp?.length === 0 || !otp}
                    type="button" id="step02_confirm"
                    onClick={handleVerifyOTP}
                    className={`${styles.confirm_btn} ${styles.btns} `}>
                    인증번호 확인
                </button>
                <button type="button"
                        onClick={onClose}
                        className={`${styles.pw_modal_close} ${styles.cancel_btn} ${styles.btns}`}>
                    취소
                </button>
            </div>
        </div>
    )
}

export default Step2;
