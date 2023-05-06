import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { ThreeDots } from "react-loader-spinner";
import * as Yup from "yup";

import { login } from "@/store/slices/authSlice";

const SignUpFormModule = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data) => {
      setLoading(true);
      dispatch(login(data))
        .unwrap()
        .then(() => {
          toast("성공적으로 로그인했습니다", { type: "success" });
          router.push("/");
          setLoading(false);
        })
        .catch(() => {
          toast("로그인에 실패했습니다. 자격 증명을 확인하십시오.", {
            type: "error",
          });
          setLoading(false);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().required("이메일이 필요합니다"),
      password: Yup.string().required("비밀번호가 필요합니다"),
    }),
  });

  return (
    <>
      <form action="" className="login-form">
        <div className="input-wrap">
          <div className="desc">아이디 (이메일)</div>
          <input
            type="text"
            placeholder="이메일 입력"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className="user-input active"
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-danger">{formik.errors.email}</span>
          )}
        </div>
        <div className="input-wrap">
          <div className="desc">비밀번호</div>
          <i className="icon pw-show"></i>
          <input
            type="password"
            placeholder="비밀번호 입력"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            className="user-input active"
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-danger">{formik.errors.password}</span>
          )}
        </div>
        <div className="login-utile-wrap">
          <div className="login-keep-wrap">
            <label htmlFor="login_keep">
              <input type="checkbox" id="login_keep" className="login-keep" />
              <div className="chk-text">아이디기억하기</div>
            </label>
          </div>
          <div className="login-error">
            <div className="error-text">아이디/비밀번호를 확인하세요</div>
          </div>
        </div>
        <button
          id="login_btn"
          className="login-btn active"
          onClick={formik.handleSubmit}
          disabled={loading}
        >
          {loading ? <div className="d-flex justify-content-center">
            <ThreeDots
              height="20"
              width="40"
              radius="9"
              color="#FFFFFF"
              ariaLabel="three-dots-loading"
              visible
            />
          </div>
          : (
            "Login"
          )}
        </button>
      </form>
    </>
  );
};

export default SignUpFormModule;
