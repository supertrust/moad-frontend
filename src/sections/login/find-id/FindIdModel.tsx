import React, {useState} from "react";
import { styles } from "./index";
import {useFindId} from "@src/apis/auth";
import {FormProvider, RHFInput, useForm, yupResolver} from "@src/components/Form";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {FindIdProps} from "@src/types/auth";
import {useRouter} from "next/router";

const defaultValues: FindIdProps = {
    company_name: "",
    company_phone_number: ""
}

const LoginSchema = Yup.object({
    company_name: Yup.string().required("Company name is required"),
    company_phone_number: Yup.string().required("Company Phone is required")
        .matches(/^[0-9]{11}$/, "Should be 11 digits"),
})
const FindIdModel = ({ SetFindId }: { SetFindId: (show: boolean) => void }) => {
    const router = useRouter();
    const { mutateAsync: findId } = useFindId();
    const [id, setId] = useState<string | boolean>()

    const methods = useForm<FindIdProps>({
        defaultValues,
        resolver: yupResolver(LoginSchema)
    })

    const { handleSubmit  } = methods;

    const onSubmit = handleSubmit(async (props) => {
        try {
            await findId({
                ...props
            }, {
                onSuccess: (res) => {
                    setId(res);
                }
            })
            toast("성공적으로 로그인했습니다", { type: "success" });
            router.push("/login");
        } catch (error) {
            setId(false)
            toast("로그인에 실패했습니다. 자격 증명을 확인하십시오.", { type: "error" });
        }
    })



  return (
   <>
  <div id={styles.id_find_modal} className="id-find-modal">
    <div className={styles.modal_wrap}>
        <div className={styles.modal_title}>아이디 찾기</div>
        <div className={styles.modal_text}>가입시 등록했던 정보를 입력해주세요.</div>
        <form action="/login" id="id_find_form" className={styles.id_find_form}>
            <FormProvider methods={methods}>
                <div className={styles.input_content}>
                    <div className={styles.input_wrap}>
                        <div className={styles.input_text}>회사명<span className={styles.essential}>*</span></div>
                        <RHFInput
                            // wrapperClassName="company-name"
                            required
                            type="text"
                            id="id_find_company_name"
                            name="company_name"
                            className={`${styles.user_company} ${styles.input} `}
                            placeholder="회사명"
                            spellCheck="false"
                            data-ms-editor="true"
                        />
                        {/*<input type="text" id="id_find_company_name" name="id_find_company_name" className={`${styles.user_company} ${styles.input} `} placeholder="회사명"/>*/}
                    </div>
                    <div className={styles.input_wrap}>
                        <div className={styles.input_text}>전화번호<span className={styles.essential}>*</span></div>
                        <RHFInput
                            // wrapperClassName="company-tel"
                            required
                            type="text"
                            id="id_find_company_phone"
                            name="company_phone_number"
                            className={`${styles.user_num} ${styles.input}`}
                            placeholder="전화번호 입력"
                            spellCheck="false"
                            data-ms-editor="true"
                        />
                        {/*<input type="text" id="id_find_company_phone" name="id_find_company_phone" className={`${styles.user_num} ${styles.input}`} placeholder="전화번호 입력"/>*/}
                    </div>
                </div>

                {id && (
                    <div className={styles.id_message}>
                        고객님의 아이디는<br/>
                        <span className={styles.user_mail}>{id}</span> 입니다.
                    </div>
                )}

                {id === false && (
                    <div className={styles.none_profile}>
                        <span className={styles.text}>등록된 정보가 없습니다.</span><br/>
                        회원가입을 해주세요.
                    </div>
                )}

            <div className={styles.btn_wrap}>
                <a href="sign-up" className={`${styles.btns} ${styles.sign_up_link}`}>회원가입</a>
                <button
                    onClick={onSubmit}
                    type="button"
                    id="id_modal_find"
                    className={`${styles.id_model_find} ${styles.btns}`}>
                    찾기
                </button>
                <button type="button" id="id_modal_close" className={`${styles.id_model_close} ${styles.btns}`} onClick={() => SetFindId(false)}>취소</button>
            </div>
            </FormProvider>
        </form>
    </div>
</div>
   </>
  );
};

export default FindIdModel;
