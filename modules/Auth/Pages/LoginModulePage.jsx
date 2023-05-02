import Image from "next/image";
import React, { useState } from "react";
import LoginFormModule from "../Components/LoginFormModule";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import authService from "@/services/auth/authService";
import { useMutation } from "react-query";

export default function LoginModulePage() {
  const [inputValue, setInputValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  //mutations
  const router = useRouter();
  // const dispatch = useDispatch();

  const loginMutation = useMutation(
    (loginData) => authService.login(loginData),
    {
      onSuccess: (response) => {
        console.log("login success:", response);
        if (response?.status =="success") {
          // dispatch(setAuthData(response));
          router.push("/");
        }
      },
      onError: (error) => {
        console.error("Error logging in:", error);
        if (error.response?.data?.data?.errors) {
          const errorObj = error.response.data.data.errors;
        }
      },
    }
  );

  //end mutations
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email: inputValue, password: passwordValue });
  };
  return (
    <div id="login" className="login">
    <div className="left">
        <div className="left-wrap">
            <h1 className="logo-pc">
                <img src="assets/images/icons/logo-pc.svg" alt=""/>
            </h1>
        </div>
    </div>
    <div className="right">
        <h1 className="logo-mb noly-mb">
            <img src="assets/images/icons/logo-mb.svg" alt=""/>
        </h1>
        <div className="right-wrap">
            <div className="title-wrap">
                <div className="title">
                    WELCOME TO <strong>ICARUS</strong>
                </div>
                <div className="text">
                    이카루스 광고주 페이지에 오신걸 환영합니다
                </div>
            </div>
            <LoginFormModule
            handleLoginSubmit={handleLoginSubmit}
            passwordValue={passwordValue}
            setPasswordValue={setPasswordValue}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
            <div className="link-wrap">
                <a className="link text">회원가입</a>
                <span className="bar text">|</span>
                <div id="find_id_btn" className="link text">아이디 찾기</div>
                <span className="bar text">|</span>
                <div id="find_pw_btn" className="link text">비밀번호 찾기</div>
            </div>
        </div>
    </div>
    </div>
  );
}