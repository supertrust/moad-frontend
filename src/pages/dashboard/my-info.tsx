import Link from "next/link";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import useAuth from "@src/hooks/useAuth";
import { useUpdateUserInfo } from "@src/apis/user";
import Button from "@src/components/Button";
import { FormProvider, RHFInput, Yup, useForm, yupResolver } from '@src/components/Form';
import {styles} from "@src/sections/my-info";
import Image from "next/image";

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
          <div className={styles.my_info_content}>
            <FormProvider methods={methods}>
              <div className={styles.form_wrap}>
                <div className={styles.profile}>
                  <div className={styles.title_wraps_1}>
                    <div className={styles.title}>
                      <span>Profile</span>
                    </div>
                    <a href="#">
                      <span>to withdraw</span>
                    </a>
                  </div>
                  <div className={styles.profile_wrap}>
                    <div className={styles.profile_img}>
                      <div className={styles.user_photo}>
                        <Image
                          src="https://dev-icarus.mufin.lol/wp-content/themes/icarus/assets/images/my-info/img-default.png"
                          alt=""
                        />
                      </div>
                      <input type="file" id="input_file" className={styles.input_file} />
                      <button
                        type="button"
                        id="photo_btn"
                        className={styles.photo_btn}
                      />
                    </div>
                    <div className={styles.profile_text}>
                      <div className={styles.company_name}>
                        <span>Must Fintech</span>
                      </div>
                      <div className={styles.email}>{email}</div>
                    </div>
                  </div>
                  <div className={styles.change_password}>
                    <div className={styles.title}>
                      <span>Change Password</span>
                    </div>
                    <span>
                      <Link href={"/change-password"} className={styles.correction}>
                        correction
                      </Link>
                    </span>
                  </div>
                  <div className={styles.my_information}>
                    <div className={styles.title}>
                      <span className={styles.my_infos}>My Info</span>
                    </div>
                    <div className={styles.information_wrap}>
                      <ul className={styles.list_wrap}>
                        <li className={styles.lists}>
                          <div className={styles.desc}>
                            <span>Company Name</span>
                          </div>
                          <div className={`${styles.company_name} ${styles.text}`}>
                            <input
                              type="text"
                              className={styles.company}
                              // onChange={handleChange}
                              // onBlur={handleBlur}
                              value={user?.company_name}
                              id="company_name"
                            />
                          </div>
                        </li>
                        <li className={styles.lists}>
                          <div className={styles.desc}>
                            <span>Company phone number </span>
                            <span className={styles.point}>
                              <span>*</span>
                            </span>
                          </div>
                          <input
                            type="number"
                            name="company_phone_number"
                            className={styles.input}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            value={user?.company_phone_number}
                            id="company_phone_number"
                          />
                        </li>
                        <li className={styles.lists}>
                          <div className={styles.desc}>
                            <span>Contact Email (Invoice Issuance) </span>
                            <span className={styles.point}>
                              <span>*</span>
                            </span>
                          </div>
                          <input
                            type="email"
                            id="employee_email"
                            name="employee_email"
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            value={user?.employee_email}
                            className={styles.input}
                          />
                        </li>
                        <li className={styles.lists}>
                          <div className={styles.desc}>
                            <span>Employee Phone Number</span>
                          </div>
                            <input
                              type="number"
                              name="employee_phone_number"
                              className={styles.input}
                              id="employee_phone_number"
                            value={user?.employee_phone_number}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            />
                        </li>
                        <li className={styles.lists}>
                          <div className={styles.desc}>
                            <span>Company Registration Number</span>
                          </div>
                          <div className={`${styles.company_name} ${styles.text}`}>
                            <input
                              type="number"
                              name="business_registration_number"
                              className={styles.input}
                              id="business_registration_number"
                            value={user?.business_registration_number}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            />
                          </div>
                        </li>
                        <li className={styles.lists}>
                          <div className={styles.desc}>
                            <span>Bussiness License</span>
                          </div>
                          <input
                            type="file"
                            id="business_license"
                            name="business_license"
                            className={styles.input}
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
                        <li className={styles.lists}>
                          <div className={styles.desc}>
                            <span>Sectors</span>
                          </div>
                          <input
                            type="text"
                            id="sector"
                            name="sector"
                            value={user?.sector}
                            className={styles.input}
                          />
                        </li>
                      </ul>
                      <Button
                        loading={isSubmitting}
                        type="submit"
                        className={`${styles.modify_btn} ${styles.btnss}`}
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
