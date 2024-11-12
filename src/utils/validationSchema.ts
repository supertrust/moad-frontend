// validationSchemas.js
import * as Yup from 'yup';
import { KOREAN_COMPANY_PHONE_REGEX } from './formatter';

const nameSchema = Yup.string().required('error_please_enter_the_administrator_name').matches(/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]*$/, 'error_only_korean_and_english_letters_are_allowed')

const idNumberSchema = Yup.string()
  .matches(
    /^[a-zA-Z0-9_]*$/,
    "error_administrator_id_must_contain_only_letters_and_numbers"
  )
  .test(
    "has-letters",
    "error_administrator_id_must_contain_atleast_one_letter",
    (value) => /[a-zA-Z]/.test(value || "")
  )
  .required("error_please_enter_your_administrator_id");

const emailSchema = Yup.string()
    .email()
    .required("error_please_enter_the_administrator_email");

const passwordSchema = Yup.string().required(
    "error_please_enter_the_administrator_password"
);

const newPasswordSchema = Yup.string().test(
    "passwords-match",
    "error_password_not_match",
    function (value) {
        const confirmNewPassword = this.parent.confirm_new_password;
        const password = this.parent.password;
        if (password && confirmNewPassword) {
            return value === confirmNewPassword;
        }
        return true;
    }
);

const confirmPasswordSchema = Yup.string().test(
    "passwords-match",
    "error_password_not_match",
    function (value) {
        const new_password = this.parent.new_password;
        const password = this.parent.password;
        if (password && new_password) {
            return value === new_password;
        }
        return true;
    }
);

const phoneNumberSchema = (regex, errorMessage) =>
    Yup.string()
        .matches(regex, errorMessage)
        .optional();


const companyPhoneNumberSchema = (registerSchemaValidation: { [key: string]: string }) => {
    let schema = Yup.string()
        .required(registerSchemaValidation.error_number_is_required)
        .test(
            'is-valid-number',
            registerSchemaValidation.error_company_number_must_start_with_0,
            (value) => {
                if (!value || value === "0") {
                    return true;
                }
                return KOREAN_COMPANY_PHONE_REGEX.test(value);
            }
        )
        .min(9, registerSchemaValidation.error_company_number_min_length_9)
        .max(11, registerSchemaValidation.error_company_number_max_length_11);

    return schema;
};



const mobilePhoneSchema = (regex, errorMessage) =>
    Yup.string()
        .matches(regex, errorMessage)
        .required(errorMessage);

const pushNotificationSchema = Yup.string().nullable();

export {
    idNumberSchema,
    nameSchema,
    emailSchema,
    passwordSchema,
    newPasswordSchema,
    confirmPasswordSchema,
    phoneNumberSchema,
    mobilePhoneSchema,
    pushNotificationSchema,
    companyPhoneNumberSchema
};
