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
          <div className="change-password-content">
            <FormProvider methods={methods}>
              <div className="form-wraps">
                <div className="change-password-wrap">
                  <div className="title-wrapss">
                    <div className="title">
                      <span>Change Password</span>
                    </div>
                    <div className="sub-text">
                      <span>
                        8 or more characters with a combination of letters,
                        numbers and symbols
                      </span>
                    </div>
                  </div>
                  <ul className="list-wrap-11">
                    <RHFInput
                      label="old password"
                      type="password"
                      id="old_password"
                      name="old_password"
                      className="input-pass form-control"
                      placeholder="Enter Password"
                      caption={
                        <i className="icon pw-show eyes"></i>
                      }
                    />
                    <RHFInput
                      label="New password"
                      type="password"
                      id="new_password"
                      name="new_password"
                      className="input-pass form-control"
                      placeholder="Enter New Password"
                      caption={
                        <i className="icon pw-show eyes"></i>
                      }
                    />
                    <RHFInput
                      label="Re-enter new password"
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      className="input-pass form-control"
                      placeholder="Enter Re-enter new password"
                      caption={
                        <i className="icon pw-show eyes"></i>
                      }
                    />
                  </ul>
                </div>
                <div className="btn-wrap">
                  <a href="#" className="cancel-btn btns">
                    cancellation{" "}
                  </a>
                  <Button
                    loading={isSubmitting}
                    type="submit"
                    className="modify-btn btnss"
                    onClick={onSubmit}
                  >
                    Modifications completed
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
