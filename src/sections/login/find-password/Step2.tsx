import { styles } from "@src/sections/login/find-password/index";
import React, { useEffect, useState } from "react";
import { useSendOTP, useVerifyOTP } from "@src/apis/auth";
import { toast } from "react-toastify";
import { Button } from "@src/components/common";
import useAuth from "@src/hooks/useAuth";

type Step2Props = {
  step: number;
  email: string;
  onClose: () => void;
  onVerifyOTPSuccess: () => void;
};

const Step2 = ({ step, email, onClose, onVerifyOTPSuccess }: Step2Props) => {
  const { dictionary:{ login:{ findPasswordModal: { step2 } } } } = useAuth();
  const [timer, setTimer] = useState<boolean>(false);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [otp, setOTP] = useState<string>("");

  const { mutateAsync: sendOTP, isLoading: isLoadingSendOTP } = useSendOTP();
  const { mutateAsync: verifyOTP, isLoading: isLoadingVerifyOTP } =
    useVerifyOTP();

  useEffect(() => {
    let interval: any;
    if (timer) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  });

  const handleSendOTP = async () => {
    await sendOTP(
      {
        email,
      },
      {
        onSuccess: () => {
          setMinutes(3);
          setSeconds(0);
          setTimer(true);
        },
        onError: (err) => {
          toast(err || "Something went wrong Please try again later", {
            type: "error",
          });
        },
      }
    );
  };

  const handleVerifyOTP = async () => {
    await verifyOTP(
      {
        email,
        otp,
      },
      {
        onSuccess: (res) => {
          setTimer(false);
          onVerifyOTPSuccess();
        },
        onError: (err) => {
          toast(err || "Something went wrong Please try again later", {
            type: "error",
          });
        },
      }
    );
  };

  return (
    <div
      id="step02_modal"
      className={`${styles.step02_modal} ${styles.model_wrap} ${
        step === 2 ? styles.active : null
      }`}
    >
      <div className={styles.model_title}>{step2.title}</div>
      <div className={styles.modal_text}>
        {step2.text}
        <br />
      </div>
      <div className={styles.input_content}>
        <div className={styles.input_wrap}>
          <div className={styles.input_text}>{step2.emailInputText}</div>
          <div className={styles.certification_wrap}>
            <div className={styles.certification_email}>{email}</div>
            <Button
              type="button"
              loading={isLoadingSendOTP}
              onClick={handleSendOTP}
              className={`${styles.certification_btn} ${
                isLoadingSendOTP && styles.confirm_btn_loading
              }`}
            >
              {step2.sendOtpBtn}
            </Button>
          </div>
        </div>
        <div className={styles.input_wrap}>
          <div className={styles.input_text}>
            {step2.authNoLabel}
          </div>
          <div className={styles.certification_num}>
            <input
              type="text"
              id="certification_num"
              className={`${styles.input_num} ${styles.input}`}
              placeholder={step2.authNoPlaceholder}
              onChange={(e) => setOTP(e.target.value)}
            />
            <div className={styles.certification_time}>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
          </div>
          <div className={`${styles.certification_error} ${styles.error_text}`}>
            {step2.certification_error}
          </div>

          <div className={`${styles.time_error} ${styles.error_text}`}>
            {step2.time_error}
          </div>
        </div>
      </div>
      <div className={styles.btn_wrap}>
        <Button
          type="button"
          disabled={otp?.length === 0 || !otp}
          id="step02_confirm"
          loading={isLoadingVerifyOTP}
          onClick={handleVerifyOTP}
          className={`${styles.confirm_btn} ${styles.btns} ${
            isLoadingVerifyOTP && styles.confirm_btn_loading
          }`}
        >
         {step2.confirm_btn}
        </Button>
        <button
          type="button"
          onClick={onClose}
          className={`${styles.pw_modal_close} ${styles.cancel_btn} ${styles.btns}`}
        >
         {step2.cancel_btn}
        </button>
      </div>
    </div>
  );
};

export default Step2;
