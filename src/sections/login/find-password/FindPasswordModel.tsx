import React, { useState } from "react";
import {Step1, Step2, Step3, styles} from "./index";

type FindPassModelProps = {
    setFindPass: (show: boolean) => void;
    setFindId: (show: boolean) => void;
}

const FindPassModel = ({ setFindPass, setFindId }: FindPassModelProps) => {
    const [email, setEmail] = useState<string>('');
    const [step, setStep] = useState<number>(1);

    return (
        <>
            <div id={styles.pw_find_modal} className="pw-find-modal">
                <form action="/login" id="pw_find_form" className={styles.pw_find_form}>
                    <div className={styles.form_wrap}></div>
                    <Step1
                        step={step}
                        onCheckUserSuccess={(email) => {
                            setEmail(email);
                            setStep(2);
                        }}
                        onClose={() => setFindPass(false)}
                        onFindId={() => {
                            setFindPass(false)
                            setFindId(true)
                        }}
                    />
                    <Step2
                        step={step}
                        email={email}
                        onClose={() => setFindPass(false)}
                        onVerifyOTPSuccess={() => setStep(3)}
                    />
                    <Step3
                        step={step}
                        email={email}
                        onClose={() => setFindPass(false)}
                    />
                </form>
            </div>
        </>
    );
};

export default FindPassModel;
