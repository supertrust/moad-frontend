import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import { FormProvider, RHFInput, Yup, useForm, yupResolver } from '@src/components/Form';
import { useChangePassword } from "@src/apis/user";
import Button from "@src/components/Button";

const defaultValues = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};

const ChangePasswordSchema = Yup.object({
  old_password: Yup.string().required("Old Password is required"),
  new_password: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    // @ts-ignore
    .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
})

export default function ChangePasswordScreen() {
  const { mutateAsync: changePassword } = useChangePassword();
  const router = useRouter();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(ChangePasswordSchema)
  })
  const { formState: { isSubmitting }, handleSubmit } = methods

  const onSubmit = handleSubmit(async (props) => {
    await changePassword(props, {
      onSuccess: () => {
        toast("Password changed successfully!", { type: "success" });
        router.push("/my-info");
      }
    });
  })

  return (
    <>
      <Row>
        <Col md="12">
          <div className="change-password-content p-10">
            <FormProvider methods={methods}>
              <div className="form-wrap">
                <div className="change-password-wrap">
                  <div className="title-wrap p-0">
                    <div className="title">
                      비밀번호 변경
                    </div>
                    <div className="sub-text">
                      문자, 숫자, 기호를 조합하여 8자 이상
                    </div>
                  </div>
                  <ul className="list-wrap-11">
                    <RHFInput
                      label="기존 비밀번호"
                      type="password"
                      id="old_password"
                      name="old_password"
                      className="input-pass form-control"
                      placeholder="비밀번호 입력"
                      caption={
                        <i className="icon pw-show eyes"></i>
                      }
                    />
                    <RHFInput
                      label="새 비밀번호"
                      type="password"
                      id="new_password"
                      name="new_password"
                      className="input-pass form-control"
                      placeholder="새 비밀번호 입력"
                      caption={
                        <i className="icon pw-show eyes"></i>
                      }
                    />
                    <RHFInput
                      label="새 비밀번호 재입력"
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      className="input-pass form-control"
                      placeholder="새 비밀번호 재입력"
                      caption={
                        <i className="icon pw-show eyes"></i>
                      }
                    />
                  </ul>
                </div>
                <div className="btn-wrap">
                  <a href="#" className="cancel-btn btns">
                    취소
                  </a>
                  <Button
                    loading={isSubmitting}
                    type="submit"
                    className="modify-btn btnss"
                    onClick={onSubmit}
                  >
                    수정완료
                  </Button>
                </div>
              </div>
            </FormProvider>
          </div>
        </Col>
      </Row>
    </>
  );
}
