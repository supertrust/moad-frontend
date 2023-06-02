import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import * as Yup from "yup";

import useAuth from "@src/hooks/useAuth";
import { RHFInput, FormProvider, useForm, yupResolver } from '@src/components/Form';
import Button from "@src/components/Button";

const defaultValues = {
  email: "",
  password: ""
}

const LoginSchema = Yup.object({
  email: Yup.string().required("이메일이 필요합니다"),
  password: Yup.string().required("비밀번호가 필요합니다"),
})

const LoginFormModule = () => {
  const { login } = useAuth();
  const router = useRouter();
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(LoginSchema)
  })

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (props) => {
    try {
      await login(props)
      toast("성공적으로 로그인했습니다", { type: "success" });
      router.push("/dashboard");
    } catch (error) {
      toast("로그인에 실패했습니다. 자격 증명을 확인하십시오.", { type: "error" });
    }
  })

  return (
    <FormProvider methods={methods}>
      <form action="" className="login-form cargo">
        <RHFInput
          name="email"
          className="user-input active"
          type="text"
          placeholder="이메일 입력"
          label="아이디 (이메일)"
        />
        <i className="icon pw-show"></i>
        <RHFInput
          type="password"
          placeholder="비밀번호 입력"
          name="password"
          label="비밀번호"
          className="user-input active"
        />
        <Button
          id="login_btn"
          className="login-btn active"
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
