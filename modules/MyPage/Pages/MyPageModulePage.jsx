import { getUserDetailsApi } from "@/store/api/userApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  clearUserDetails,
  getUserDetails,
  setUserDetails,
} from "@/store/slices/mypageSlice";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { updateMyInfoApi } from "@/store/api/myPageApi";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function MyPageModulePage() {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth.user);
  const { userDetails } = useSelector((state) => state.myPage);

  useEffect(() => {
    if (!userDetails || Object.keys(userDetails).length === 0) {
      dispatch(getUserDetails());
    }
  }, [dispatch, userDetails]);

  useEffect(() => {
    if (userDetails && Object.keys(userDetails).length > 0) {
      formik.setValues(userDetails);
    }
  }, [userDetails]);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      company_name: "",
      company_phone_number: "",
      business_registration_number: "",
      employee_phone_number: "",
      employee_email: "",
      sector: "",
      business_license: null,
    },
    validationSchema: Yup.object({
      company_name: Yup.string().required("Company Name is required"),
      company_phone_number: Yup.string()
        .required("Company Phone is required")
        .matches(/^[0-9]{11}$/, "Should be 11 digits"),
      employee_phone_number: Yup.string()
        .required("Employee Phone is required")
        .matches(/^[0-9]{11}$/, "Should be 11 digits"),
      business_registration_number: Yup.string()
        .required("Business Registration Number is required")
        .matches(/^[0-9]{10}$/, "Should be 10 digits"),
      employee_email: Yup.string()
        .email("Invalid email")
        .required("Employee Email is required"),
      business_license: Yup.mixed()
        .required("Please upload your business license.")
        .test(
          "fileFormat",
          "Only .doc, .docx, .pdf, .jpg, .jpeg, .png files are allowed",
          (value) => {
            if (value) {
              return [
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/pdf",
                "image/jpeg",
                "image/png",
              ].includes(value.type);
            }
            return true;
          }
        )
        .test("fileSize", "File size should be less than 10MB", (value) => {
          if (value) {
            return value.size <= 10 * 1024 * 1024;
          }
          return true;
        }),
      sector: Yup.string().required("Sector is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await updateMyInfoApi(values);
        toast("Profile updated successfully!", { type: "success" });
        dispatch(clearUserDetails());
        dispatch(setUserDetails({}));
        setLoading(false);
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
          <div className="my-info-content">
            <form action="#" className="form-wrap">
              <div className="profile">
                <div className="title-wraps-1">
                  <div className="title">
                    <font>Profile</font>
                  </div>
                  <a href="#">
                    <font>to withdraw</font>
                  </a>
                </div>
                <div className="profile-wrap">
                  <div className="profile-img">
                    <div className="user-photo">
                      <img
                        src="https://dev-icarus.mufin.lol/wp-content/themes/icarus/assets/images/my-info/img-default.png"
                        alt=""
                      />
                    </div>
                    <input type="file" id="input_file" className="input-file" />
                    <button
                      type="button"
                      id="photo_btn"
                      className="photo-btn"
                    />
                  </div>
                  <div className="profile-text">
                    <div className="company-name">
                      <font>Must Fintech</font>
                    </div>
                    <div className="email">{email}</div>
                  </div>
                </div>
                <div className="change-password">
                  <div className="title">
                    <font>Change Password</font>
                  </div>
                  <font>
                    <Link href={"/change-password"} className="correction">
                      correction
                    </Link>
                  </font>
                </div>
                <div className="my-information">
                  <div className="title">
                    <font className="my-infos">My Info</font>
                  </div>
                  <div className="information-wrap">
                    <ul className="list-wrap">
                      <li className="lists">
                        <div className="desc">
                          <font>Company Name</font>
                        </div>
                        <div className="company-name text">
                          <input
                            type="text"
                            className="company"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.company_name}
                            id="company_name"
                          />
                        </div>
                        {formik.touched.company_name &&
                          formik.errors.company_name && (
                            <span className="text-danger">
                              {formik.errors.company_name}
                            </span>
                          )}
                      </li>
                      <li className="lists">
                        <div className="desc">
                          <font>Company phone number </font>
                          <span className="point">
                            <font>*</font>
                          </span>
                        </div>
                        <input
                          type="number"
                          name="company_phone_number"
                          className="input"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.company_phone_number}
                          id="company_phone_number"
                        />
                        {formik.touched.company_phone_number &&
                          formik.errors.company_phone_number && (
                            <span className="text-danger">
                              {formik.errors.company_phone_number}
                            </span>
                          )}
                      </li>
                      <li className="lists">
                        <div className="desc">
                          <font>Contact Email (Invoice Issuance) </font>
                          <span className="point">
                            <font>*</font>
                          </span>
                        </div>
                        <input
                          type="email"
                          id="employee_email"
                          name="employee_email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.employee_email}
                          className="input"
                        />
                        {formik.touched.employee_email &&
                          formik.errors.employee_email && (
                            <span className="text-danger">
                              {formik.errors.employee_email}
                            </span>
                          )}
                      </li>
                      <li className="lists">
                        <div className="desc">
                          <font>Employee Phone Number</font>
                        </div>
                        <div className="text">
                          <input
                            type="number"
                            name="employee_phone_number"
                            className="input"
                            id="employee_phone_number"
                            value={formik.values.employee_phone_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        {formik.touched.employee_phone_number &&
                          formik.errors.employee_phone_number && (
                            <span className="text-danger">
                              {formik.errors.employee_phone_number}
                            </span>
                          )}
                      </li>
                      <li className="lists">
                        <div className="desc">
                          <font>Company Registration Number</font>
                        </div>
                        <div className="company-name text">
                          <input
                            type="number"
                            name="business_registration_number"
                            className="input"
                            id="business_registration_number"
                            value={formik.values.business_registration_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        {formik.touched.business_registration_number &&
                          formik.errors.business_registration_number && (
                            <span className="text-danger">
                              {formik.errors.business_registration_number}
                            </span>
                          )}
                      </li>
                      <li className="lists">
                        <div className="desc">
                          <font>Bussiness License</font>
                        </div>
                        <input
                          type="file"
                          id="business_license"
                          name="business_license"
                          className="input"
                          onChange={(event) => {
                            console.log(event.target.files);
                            formik.setFieldValue(
                              "business_license",
                              event.target.files[0]
                            );
                          }}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.business_license &&
                          formik.errors.business_license && (
                            <span className="text-danger">
                              {formik.errors.business_license}
                            </span>
                          )}
                      </li>
                      <li className="lists">
                        <div className="desc">
                          <font>Sectors</font>
                        </div>
                        <input
                          type="text"
                          id="sector"
                          name="sector"
                          className="input"
                          value={formik.values.sector}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.sector && formik.errors.sector && (
                          <span className="text-danger">
                            {formik.errors.sector}
                          </span>
                        )}
                      </li>
                    </ul>
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
                </div>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
}
