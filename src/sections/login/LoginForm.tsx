import React, {useState,useEffect} from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import * as Yup from "yup";
import styles from './style.module.css'
import Input, { InputProps } from "../../components/Input";

import useAuth from "@src/hooks/useAuth";
import { RHFInput, FormProvider, useForm, yupResolver } from '@src/components/Form';
import Button from "@src/components/Button";

const defaultValues = {
  email: "",
  password: ""
}

const LoginSchema = Yup.object({
  email: Yup.string().required("아이디를 입력해주세요."),
  password: Yup.string().required("비밀번호를 입력해주세요."),
})

const LoginFormModule = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [remeberId, setRemeberId] = useState<boolean>(false);
  const [error, setFormError] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [form, setform] = useState(true);
  
  const canBeSubmitted = () => {
    const isValid =
      email.trim().length && // Email
      password.trim().length; // Password
      
      if (isValid) {
        setform(true);
      } else {
        setform(false);
      }
  };

  // useEffect(() => canBeSubmitted());
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(LoginSchema)
  })

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (props) => {
    console.log('yesss')
    try {
      await login(props)
      setFormError(false)
      toast("성공적으로 로그인했습니다", { type: "success" });
      router.push("/dashboard");
    } catch (error) {
      setFormError(true)
      toast("로그인에 실패했습니다. 자격 증명을 확인하십시오.", { type: "error" });
    }
  })

  return (
    <FormProvider methods={methods}>
      <form action="" className="login-form">
        <RHFInput
          name="email"
          className={`user-input ${error ? 'error' : 'active'}`}
          type="text"
          placeholder="이메일 입력"
          label="아이디 (이메일)"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
        />
        <i className="icon pw-show"></i>
        <RHFInput
          type="password"
          placeholder="비밀번호 입력"
          name="password"
          label="비밀번호"
          className={`user-input ${error ? 'error' : 'active'}`}
          // value={password}
          // onChange={(e) => setpassword(e.target.value)}
        />
        {/*<div className="login-utile-wrap flex-column align-items-start gap-2">
          <div className="login-keep-wrap">
            <label htmlFor="login_keep">
              <input type="checkbox" id="login_keep" className="login-keep" />
              <div className="chk-text">아이디기억하기</div>
            </label>
          </div>
          <div className="login-error w-100">
            <div className="bg-danger rounded-2 p-2 text-white">아이디/비밀번호를 확인하세요</div>
          </div>
        </div>*/}
        <div className={`${styles.check_mark} flex items-center justify-between`}>
          <label htmlFor="chk_1" className={`${styles.chk_wrap} flex items-center gap-1 text-sm mt-[22px] mb-[30px]`}>
            <input
              checked={remeberId}
              type="checkbox"
              id="chk_1"
              className={`${styles.remeber_chk}`}
              onChange={() => setRemeberId(!remeberId)}
            />
            <div className="chk-text">
              아이디기억하기
            </div>
          </label>
          <div className={`${error ? 'block' : 'hidden'} text-sm text-[#F24747] mt-[22px] mb-[30px]`}>
          아이디또는 비밀번호를 확인하세요
          </div>
        </div>
        <Button
          id="login_btn"
          className={`${styles.login_btn} ${form ? styles.active : styles.disabled} `}
          onClick={onSubmit}
          loading={isSubmitting}
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginFormModule;
