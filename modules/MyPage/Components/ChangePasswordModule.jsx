import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { ChangePasswordApi } from "@/store/api/myPageApi";
import { Col, Row } from "react-bootstrap";

export default function ChangePasswordModule() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required("Old Password is required"),
      new_password: Yup.string()
        .required("New Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirm_password: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await ChangePasswordApi(values);
        toast("Password changed successfully!", { type: "success" });
        setLoading(false);
        router.push("/my-info");
      } catch (err) {
        console.log(err?.response?.data?.message);
        toast(
          err?.response?.data?.message ||
            "Failed to change password. Please try again.",
          {
            type: "error",
          }
        );
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Row>
        <Col md="12">
          <div className="change-password-content">
            <form className="form-wraps" onSubmit={formik.handleSubmit}>
              <div className="change-password-wrap">
                <div className="title-wrapss">
                  <div className="title">
                    <font>Change Password</font>
                  </div>
                  <div className="sub-text">
                    <font>
                      8 or more characters with a combination of letters,
                      numbers and symbols
                    </font>
                  </div>
                </div>
                <ul className="list-wrap-11">
                  <div className="form-group">
                    <div className="desc">
                      <font>old password</font>
                    </div>
                    <input
                      type="password"
                      id="old_password"
                      name="old_password"
                      className="input-pass form-control"
                      placeholder="Enter Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.old_password}
                    ></input>
                    {formik.touched.old_password &&
                      formik.errors.old_password && (
                        <span className="text-danger">
                          {formik.errors.old_password}
                        </span>
                      )}
                    <i className="icon pw-show eyes"></i>
                  </div>
                  <div className="form-group">
                    <div className="desc">
                      <font>New password</font>
                    </div>
                    <input
                      type="password"
                      id="new_password"
                      name="new_password"
                      className="input-pass form-control"
                      placeholder="Enter New Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.new_password}
                    ></input>
                    {formik.touched.new_password &&
                      formik.errors.new_password && (
                        <span className="text-danger">
                          {formik.errors.new_password}
                        </span>
                      )}
                    <i className="icon pw-show eyes"></i>
                  </div>
                  <div className="form-group">
                    <div className="desc">
                      <font>Re-enter new password</font>
                    </div>
                    <input
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      className="input-pass form-control"
                      placeholder="Enter Re-enter new password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirm_password}
                    ></input>
                    {formik.touched.confirm_password &&
                      formik.errors.confirm_password && (
                        <span className="text-danger">
                          {formik.errors.confirm_password}
                        </span>
                      )}
                    <i className="icon pw-show eyes"></i>
                  </div>
                </ul>
              </div>
              <div className="btn-wrap">
                <a href="#" className="cancel-btn btns">
                  cancellation{" "}
                </a>
                <button
                  type="submit"
                  className="modify-btn btnss"
                  onClick={formik.handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <ThreeDots
                        height="20"
                        width="40"
                        radius="9"
                        color="#FFFFFF"
                        ariaLabel="three-dots-loading"
                        visible
                      />
                    </div>
                  ) : (
                    "Modifications completed"
                  )}
                </button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
}
