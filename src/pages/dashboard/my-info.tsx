import Link from "next/link";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import useAuth from "@src/hooks/useAuth";
import { useUpdateUserInfo } from "@src/apis/user";
import Button from "@src/components/Button";
import { FormProvider, RHFInput, Yup, useForm, yupResolver } from '@src/components/Form';

const defaultValues = {
  company_name: "",
  company_phone_number: "",
  business_registration_number: "",
  employee_phone_number: "",
  employee_email: "",
  sector: "",
  business_license: null,
}

const UpdateUserInfoSchema = Yup.object({
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
      (value: any) => {
        if (value) {
          return [
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/pdf",
            "image/jpeg",
            "image/png",
          ].includes(value?.type);
        }
        return true;
      }
    )
    .test("fileSize", "File size should be less than 10MB", (value: any) => {
      if (value) {
        return value?.size <= 10 * 1024 * 1024;
      }
      return true;
    }),
  sector: Yup.string().required("Sector is required"),
})

export default function MyInfoScreen() {
  const { mutateAsync: updateUserInfo } = useUpdateUserInfo();
  const { user } = useAuth();
  const email = user?.email;

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(UpdateUserInfoSchema)
  })
  const { handleSubmit, formState: { isSubmitting }, setValue } = methods;

  const onSubmit = handleSubmit(async (values) => {
    await updateUserInfo(values, {
      onSuccess: () => {
        toast("Profile updated successfully!", { type: "success" });
      }
    });
  })

  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([key, value]) => {
        setValue(key as keyof typeof defaultValues, value)
      })
    }
  }, [user]);



  return (
    <>
      <Row>
        <Col md="12">
          <div className="my-info-content">
            <FormProvider methods={methods}>
              <div className="form-wrap">
                <div className="profile">
                  <div className="title-wraps-1">
                    <div className="title">
                      <span>Profile</span>
                    </div>
                    <a href="#">
                      <span>to withdraw</span>
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
                        <span>Must Fintech</span>
                      </div>
                      <div className="email">{email}</div>
                    </div>
                  </div>
                  <div className="change-password">
                    <div className="title">
                      <span>Change Password</span>
                    </div>
                    <span>
                      <Link href={"/change-password"} className="correction">
                        correction
                      </Link>
                    </span>
                  </div>
                  <div className="my-information">
                    <div className="title">
                      <span className="my-infos">My Info</span>
                    </div>
                    <div className="information-wrap">
                      <ul className="list-wrap">
                        <li className="lists">
                          <div className="desc">
                            <span>Company Name</span>
                          </div>
                          <div className="company-name text">
                            <input
                              type="text"
                              className="company"
                              // onChange={handleChange}
                              // onBlur={handleBlur}
                              // value={values.company_name}
                              id="company_name"
                            />
                          </div>
                        </li>
                        <li className="lists">
                          <div className="desc">
                            <span>Company phone number </span>
                            <span className="point">
                              <span>*</span>
                            </span>
                          </div>
                          <input
                            type="number"
                            name="company_phone_number"
                            className="input"
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            // value={values.company_phone_number}
                            id="company_phone_number"
                          />
                        </li>
                        <li className="lists">
                          <div className="desc">
                            <span>Contact Email (Invoice Issuance) </span>
                            <span className="point">
                              <span>*</span>
                            </span>
                          </div>
                          <input
                            type="email"
                            id="employee_email"
                            name="employee_email"
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            // value={values.employee_email}
                            className="input"
                          />
                        </li>
                        <li className="lists">
                          <div className="desc">
                            <span>Employee Phone Number</span>
                          </div>
                          <div className="text">
                            <input
                              type="number"
                              name="employee_phone_number"
                              className="input"
                              id="employee_phone_number"
                            // value={values.employee_phone_number}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            />
                          </div>
                        </li>
                        <li className="lists">
                          <div className="desc">
                            <span>Company Registration Number</span>
                          </div>
                          <div className="company-name text">
                            <input
                              type="number"
                              name="business_registration_number"
                              className="input"
                              id="business_registration_number"
                            // value={values.business_registration_number}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            />
                          </div>
                        </li>
                        <li className="lists">
                          <div className="desc">
                            <span>Bussiness License</span>
                          </div>
                          <input
                            type="file"
                            id="business_license"
                            name="business_license"
                            className="input"
                            onChange={(event) => {
                              console.log(event.target.files);
                              setValue(
                                "business_license",
                                // @ts-ignore
                                event.target.files?.[0]
                              );
                            }}
                          />
                        </li>
                        <li className="lists">
                          <div className="desc">
                            <span>Sectors</span>
                          </div>
                          <input
                            type="text"
                            id="sector"
                            name="sector"
                            className="input"
                          />
                        </li>
                      </ul>
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
                </div>
              </div>
            </FormProvider>
          </div>
        </Col>
      </Row>
    </>
  );
}
