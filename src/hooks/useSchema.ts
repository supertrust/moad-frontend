import { EMAIL_REGEX } from "@src/constants";
import { isHangul } from "@src/helpers";
import useAuth from "@src/hooks/useAuth";
import { KOREAN_PHONE_REGEX } from "@src/utils/formatter";
import { companyPhoneNumberSchema, phoneNumberSchema } from "@src/utils/validationSchema";
import * as Yup from "yup";


const useSchema = () => {

    const { dictionary } = useAuth()
    const { step3: { registerSchemaValidation } } = dictionary?.signup

    const allowedFiles = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
        'image/jpeg',
        'image/png',
    ];

    const RegisterSchema = Yup.object({
        company_name: Yup.string()
            .required(registerSchemaValidation?.company_name)
            .test('isKorean', registerSchemaValidation?.is_korean, isHangul),
        employee_name: Yup.string()
            .required(registerSchemaValidation?.employee_name)
            .max(10, registerSchemaValidation?.employee_max_len)
            .test('isKorean', registerSchemaValidation?.is_korean, isHangul),
        company_phone_number: companyPhoneNumberSchema(registerSchemaValidation),
        employee_phone_number: phoneNumberSchema(KOREAN_PHONE_REGEX, registerSchemaValidation?.error_please_enter_a_valid_phone_num),
        business_registration_number: Yup.string()
            .required(registerSchemaValidation?.business_registration_number)
            .matches(/^[0-9]{10}$/, registerSchemaValidation?.business_registration_number_validation),
        verify_business_registration_number:
            Yup.boolean().required(registerSchemaValidation?.verify_business_reg_num),
        employee_email: Yup.string()
            .matches(EMAIL_REGEX, registerSchemaValidation?.employee_email_validation)
            .required(registerSchemaValidation?.employee_email),
        business_license: Yup.mixed()
            .required(registerSchemaValidation?.business_license)
            .test(
                'fileFormat',
                registerSchemaValidation?.business_license_file_format,
                (value: any) => {
                    if (value) {
                        return allowedFiles.includes(value.type);
                    }
                    return true;
                },
            )
            .test('fileSize', registerSchemaValidation?.business_license_file_size, (value: any) => {
                if (value) {
                    return value.size <= 10 * 1024 * 1024;
                }
                return true;
            }),
    });

    return {
        RegisterSchema,
        allowedFiles
    }
}

export default useSchema;