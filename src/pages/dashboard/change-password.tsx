import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Col, Modal, Row } from "react-bootstrap";
import { FormProvider, RHFInput, Yup, useForm, yupResolver } from '@src/components/Form';
import { useChangePassword } from "@src/apis/user";
import Button from "@src/components/Button";
import { clsx } from "clsx";
import { PASSWORD_REGEX } from "@src/constants";
import Link from "next/link";

const defaultValues = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};

const ChangePasswordSchema = Yup.object({
  old_password: Yup.string().required("이전 비밀번호가 필요합니다."),
  new_password: Yup.string()
    .required("새 비밀번호가 필요합니다.")
    .matches( PASSWORD_REGEX, "비밀번호는 문자, 숫자, 기호를 조합하여 8자 이상이어야 합니다.")
    .min(8, "비밀번호는 8자 이상이어야 합니다."),
  confirm_password: Yup.string()
    .required("비밀번호 확인이 필요합니다.")
    // @ts-ignore
    .oneOf([Yup.ref("new_password"), null], "비밀번호가 일치해야 합니다."),
})

export default function ChangePasswordScreen() {
  const { mutateAsync: changePassword , isLoading} = useChangePassword();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState<{ 
    old_password: boolean, new_password: boolean,  confirm_password: boolean
  } >({ old_password: false, new_password: false, confirm_password: false})

  const toggleVisiblePassword = ( field: string) => {
    setShowPassword({
      ...showPassword ,
      [field] : !showPassword[field] 
    })
  }

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(ChangePasswordSchema)
  })
  const { formState: {  dirtyFields }, handleSubmit, reset } = methods

  const onSubmit = handleSubmit(async (props) => {
    await changePassword(props, {
      onSuccess: () => {
        setShowModal(true);
        reset();
      },
      onError : (error: string) => {
        console.log("Error =>", error)
        toast(error,  { type : "error"})
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
                      type={showPassword.old_password ? "text" : "password"}
                      id="old_password"
                      name="old_password"
                      className="input-pass form-control input-wrap"
                      placeholder="비밀번호 입력"
                      right={
                        <i
                          className={clsx(`icon pw-show` , showPassword.old_password && 'active')}
                          onClick={() => toggleVisiblePassword('old_password')}
                        />
                      }
                      errorPosition="bottom"
                    />
                    <RHFInput
                      label="새 비밀번호"
                      type={showPassword.new_password ? "text" : "password"}
                      id="new_password"
                      name="new_password"
                      className="input-pass form-control input-wrap"
                      placeholder="새 비밀번호 입력"
                      right={
                        <i
                          className={clsx(`icon pw-show` , showPassword.new_password && 'active')}
                          onClick={() => toggleVisiblePassword('new_password')}
                        />
                      }
                      errorPosition="bottom"
                    />
                    <RHFInput
                      label="새 비밀번호 재입력"
                      type={showPassword.confirm_password ? "text" : "password"}
                      id="confirm_password"
                      name="confirm_password"
                      className="input-pass form-control input-wrap"
                      placeholder="새 비밀번호 재입력"
                      right={
                        <i
                          className={clsx(`icon pw-show` , showPassword.confirm_password && 'active')}
                          onClick={() => toggleVisiblePassword('confirm_password')}
                        />
                      }
                      errorPosition="bottom"
                    />
                  </ul>
                </div>
                <div className="btn-wrap">
                  <Link href="/dashboard/my-info" className="cancel-btn btns">
                    취소
                  </Link>
                  <Button
                    loading={isLoading}
                    type="submit"
                    className="modify-btn btnss"
                    onClick={onSubmit}
                    disabled={ Object.keys(dirtyFields).length !== 3 }
                  >
                    수정완료
                  </Button>
                </div>
              </div>
            </FormProvider>
          </div>
        </Col>
        <Modal show={showModal} centered size="sm" backdrop="static">
          <Modal.Body>
              <div className="text-center my-4">
                  <div className="text-secondary mb-3">비밀번호 변경 완료</div>
                  <div className="mb-3">비밀번호 변경이 완료되었습니다.</div>
                  <div className="flex flex-row justify-center">
                    <Button 
                      onClick={() => setShowModal(false)}
                      className="bg-secondary text-white flex justify-center px-4"
                    >확인</Button>
                  </div>
              </div>
          </Modal.Body>
        </Modal>
      </Row>
    </>
  );
}
