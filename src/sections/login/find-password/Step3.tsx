import {styles} from "@src/sections/login/find-password/index";
import React, {useState} from "react";
import {useResetPassword} from "@src/apis/auth";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {PASSWORD_REGEX} from "@src/constants";
import {FormProvider, RHFInput, useForm, yupResolver} from "@src/components/Form";
import {ResetPasswordProps} from "@src/types/auth";
import MyButton from "@src/components/Button";

type Step3Props = {
    step: number;
    email: string;
    onClose: () => void;
}

const defaultValues = {
    password: "",
    confirm_password: "",
}

const ResetPasswordSchema = Yup.object({
    password: Yup.string()
        .required("Password is required")
        .matches(
            PASSWORD_REGEX,
            "Password must be at least 8 characters with a combination of letters, numbers, and symbols"
        )
        .min(8, "Password must be at least 8 characters"),
    confirm_password: Yup.string()
        .required("Confirm Password is required")
        .oneOf(
            // @ts-ignore
            [Yup.ref("password"), null],
            "Passwords and Confirm password must match"
        ),
})

const Step3 = ({step, email, onClose, }: Step3Props) => {
    const [show_password, setPasswordStatus] = useState(false);
    const [show_confirmPassword, setConfirmPassStatus] = useState(false);
    const {mutateAsync: resetPassword, isLoading} = useResetPassword();

    const methods = useForm<ResetPasswordProps>({
        defaultValues,
        resolver: yupResolver(ResetPasswordSchema)
    });
    const { handleSubmit } = methods;

    const onSubmit = handleSubmit(async (props) => {
        await resetPassword({
            email,
            ...props
        }, {
            onSuccess: (res) => {
                toast('Password updated successfully', {
                    type: "success",
                });
                onClose();
            }, onError: (err) => {
                toast(err || "Something went wrong Please try again later", {
                    type: "error",
                });
            }
        })
    })

    return (
        <div id="step03_modal" className={`${styles.step03_modal} ${styles.model_wrap} ${step === 3 ? styles.active : null}`}>
            <div className={styles.model_title}>비밀번호 찾기</div>
            <div className={styles.modal_text}>비밀번호를 재설정해주세요.</div>
            <FormProvider methods={methods}>
                <div className={styles.input_content}>
                    <div className={styles.input_wrap}>
                        <div className={styles.input_text}>아이디 (이메일)</div>
                        <div id="pw_find_email02" className={styles.pw_find_email02}>{email}</div>
                    </div>
                    <div className={styles.input_wrap}>
                        <div className={styles.input_text}>비밀번호</div>
                        <RHFInput
                            type={show_password ? 'text' : 'password'}
                            className={`${styles.user_pw} ${styles.input}`}
                            name="password"
                            id="pw_find_password"
                            placeholder="비밀번호"
                        />
                        <i
                            onClick={() => setPasswordStatus(!show_password)}
                            className={`${styles.icon} ${styles.pw_show} ${show_password ? styles.active : ""}`} >
                        </i>
                    </div>
                    <div className={styles.input_wrap}>
                        <div className={styles.input_text}>비밀번호 확인</div>
                        <RHFInput
                            type={show_confirmPassword ? 'text' : 'password'}
                            className={`${styles.user_pw_confirm} ${styles.input}`}
                            name="confirm_password"
                            id="pw_find_password_confirm"
                            placeholder="비밀번호"
                        />
                        <i
                            onClick={() => setConfirmPassStatus(!show_confirmPassword)}
                            className={`${styles.icon} ${styles.pw_show} ${show_confirmPassword ? styles.active : ""}`}>
                        </i>
                    </div>
                </div>
                <div className={styles.btn_wrap}>
                    <MyButton
                        type="button"
                        id="step03_confirm"
                        loading={isLoading}
                        onClick={onSubmit}
                        className={`${styles.confirm_btn} ${styles.btns} ${isLoading && styles.confirm_btn_loading}`}>
                        완료
                    </MyButton>
                    <button type="button"
                            onClick={onClose}
                            className={`${styles.pw_modal_close} ${styles.cancel_btn} ${styles.btns}`}>
                        취소
                    </button>
                </div>
            </FormProvider>
        </div>
    )
}

export default Step3;