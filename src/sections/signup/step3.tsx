import { CircularProgress } from "@mui/material";
import { useVerifyInput } from '@src/apis/auth';
import { Button, FormProvider, RHFInput, useForm, yupResolver, } from '@src/components/common';
import RHFSelect from '@src/components/common/Form/RHFSelect';
import useAuth from '@src/hooks/useAuth';
import useSchema from "@src/hooks/useSchema";
import { RegisterPropsType } from '@src/types/auth';
import { logoMobileSize } from "@src/utils/values";
import { File } from 'buffer';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';

interface Step3Props {
    onPrevStep: () => void;
    onNextStep: () => void;
    membershipInformation: RegisterPropsType;
    setMembershipInformation: (MembershipInformation: RegisterPropsType) => void;
}

const defaultValues = {
    company_name: '',
    company_phone_number: '',
    business_registration_number: '',
    employee_name: '',
    employee_phone_number: '',
    employee_email: '',
    sector: '',
    contact_position: '',
    business_license: File,
    verify_business_registration_number: false,
};

const Step3 = ({
                   onPrevStep,
                   onNextStep,
                   membershipInformation,
                   setMembershipInformation,
               }: Step3Props) => {

    const { RegisterSchema, allowedFiles } = useSchema()
    const { mutateAsync: verifyInput } = useVerifyInput();
    const { register, dictionary: { signup: { step3 } }, isPcOnly, isKorean } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [isReadonly, setReadonly] = useState(false);
    const [verifybtnclick, setverifybtn] = useState(false);
    const [message, setMessage] = useState('');
    const [businessVerifyLoading, setBusinessVerifyLoading] = useState(false);
    const ModalhandleClose = () => setShowModal(false);
    const options = [
        // {value : '', text : step3?.contact_position?.contact_person_position},
        { value: '사원', text: step3?.contact_position?.employee },
        { value: '주임', text: step3?.contact_position?.team_leader },
        { value: '대리', text: step3?.contact_position?.manager },
        { value: '과장', text: step3?.contact_position?.director },
        { value: '차장', text: step3?.contact_position?.vice_president },
        { value: '부장', text: step3?.contact_position?.executive_director },
        { value: '임원', text: step3?.contact_position?.executive },
        { value: '기타', text: step3?.contact_position?.other },
    ];
    const ModalhandleShow = (error: string) => {
        setShowModal(true);
        setMessage(error);
    };
    const [imageUploaded, setImageUploaded] = useState(false);

    const methods = useForm({
        defaultValues,
        resolver: yupResolver(RegisterSchema),
    });
    const {
        handleSubmit,
        formState: { isSubmitting, errors, dirtyFields },
        getValues,
        setValue,
        setError,
        trigger,
        watch,
    } = methods;

    const [file, setFile] = useState<File | undefined>();

    const _verifyBusinessNumber = async (
        key: string,
        value: string,
        cb?: VoidFunction,
    ) => {
        try {
            setBusinessVerifyLoading(true)
            await verifyInput(
                { key, value },
                {
                    onSuccess: () => {
                        setValue('verify_business_registration_number', true);
                        cb ? cb() : toast.success(step3.verifyBusinessNumber.successToast);
                        setReadonly(true);
                    },
                    onError: (error) => {
                        ModalhandleShow(step3?.businessRegError);
                        setError('business_registration_number', { message: step3?.businessRegError });
                    },
                },
            );
            setBusinessVerifyLoading(false)
        } catch (error) {
            setBusinessVerifyLoading(false)
        }
    };

    const onSubmit = handleSubmit(async (props) => {

        if (!verifybtnclick) {
            ModalhandleShow(step3.onSubmit.modalHandleShow);
            return false;
        }
        try {
            await _verifyBusinessNumber(
                'business_registration_number',
                props.business_registration_number,
                async () => {
                    const res = await register({ ...membershipInformation, ...props });
                    if (res !== null && res === true) {
                        toast(step3.onSubmit.successToast, { type: 'success' });
                        onNextStep();
                    }
                },
            );
        } catch (error: any) {
            toast(error?.message || 'Something went wrong Please try again later', {
                type: 'error',
            });
        }
    });

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (
                event.code === 'Enter' &&
                Object.keys(dirtyFields).length === 6 &&
                imageUploaded
            ) {
                event.preventDefault(); // Prevent form submission
                onSubmit().then(() => {
                });
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [Object.keys(dirtyFields).length, imageUploaded]);

    return (
        <div className='step03 step-section'>
            <div className='left'>
                <div className='left-wrap'>
                    <h1 className='logo-pc'>
                        <Image
                            src='/images/logo-pc.svg'
                            alt='logo-pc'
                            width={150}
                            height={50}
                        />
                    </h1>
                </div>
            </div>
            <div className='right'>
                {
                    !isPcOnly &&
                    <div
                        className={'pb-[44.4px]'}>
                        <Image src="/images/logo-mb.svg" alt='logo-mb' width={logoMobileSize.width} height={
                            logoMobileSize.height
                        }/>
                    </div>
                }
                <div className='right-wrap'>
                    <div className='right-content'>
                        <div onClick={onPrevStep}
                             className={clsx('cursor-pointer back-btn', isPcOnly ? "!mt-[181px]" : "!mt-[110px]")}></div>
                        <div className='step-title'>{step3.stepTitle}</div>
                        <div className='step-text'>
                            {step3.stepText}
                            <br/>
                            <span className='text-danger'>*{step3.stepTextRequired}</span>
                        </div>
                        <div className='user-info'>
                            <FormProvider methods={methods}>
                                <RHFInput
                                    wrapperClassName='company-name'
                                    label={step3.companyNameLabel}
                                    required
                                    type='text'
                                    id='company_name'
                                    name='company_name'
                                    className='company-input'
                                    placeholder={step3.companyNamePlaceholder}
                                    maxLength={30}
                                    spellCheck='false'
                                    data-ms-editor='true'
                                    caption={
                                        <div className='error-text'>{step3.companyNameCaption}</div>
                                    }
                                    onBlur={(event) => {
                                        event.target.value &&
                                        verifyInput(
                                            { key: 'company_name', value: event.target.value },
                                            {
                                                onSuccess: () => {
                                                    setError('company_name', { message: '' });
                                                },
                                                onError: (error) => {
                                                    setError('company_name', {
                                                        message: step3.companyNameErrorMsg,
                                                    });
                                                },
                                            },
                                        );
                                    }}
                                />
                                <RHFInput
                                    wrapperClassName='company-tel'
                                    label={step3.companyPhoneNumberLabel}
                                    required
                                    type='number'
                                    id='company_phone_number'
                                    name='company_phone_number'
                                    className='company-input'
                                    maxLength={30}
                                    placeholder={step3.companyPhoneNumberPlaceholder}
                                    spellCheck='false'
                                    data-ms-editor='true'
                                    caption={
                                        <div className='error-text'>
                                            {step3.companyPhoneNumberCaption}
                                        </div>
                                    }
                                    onBlur={(event) => {
                                        event.target.value &&
                                        verifyInput(
                                            {
                                                key: 'company_phone_number',
                                                value: event.target.value,
                                            },
                                            {
                                                onSuccess: () => {
                                                    setError('company_phone_number', { message: '' });
                                                },
                                                onError: (error) => {
                                                    setError('company_phone_number', {
                                                        message: error,
                                                    });
                                                },
                                            },
                                        );
                                    }}
                                />
                                <RHFInput
                                    wrapperClassName='manager-name'
                                    label={step3.managerNameLabel}
                                    required
                                    type='text'
                                    id='employee_name'
                                    name='employee_name'
                                    className='company-input'
                                    placeholder={step3.managerNamePlaceholder}
                                    spellCheck='false'
                                    data-ms-editor='true'
                                />

                                <RHFSelect
                                    wrapperClassName='manager-tel'
                                    label={step3.contactPositionLabel}
                                    required
                                    id='contact_position'
                                    name='contact_position'
                                    options={options}
                                    className='company-input'
                                    placeholder={step3?.contact_position?.contact_person_position}
                                />
                                <RHFInput
                                    wrapperClassName='manager-tel'
                                    label={step3.employeePhoneNumberLabel}
                                    required
                                    type='number'
                                    minLength={11}
                                    maxLength={11}
                                    id='employee_phone_number'
                                    name='employee_phone_number'
                                    className='company-input'
                                    placeholder={step3.employeePhoneNumberPlaceholder}
                                    spellCheck={false}
                                    data-ms-editor='true'
                                    caption={
                                        <div className='error-text'>{step3.employeePhoneNumberCaption}</div>
                                    }
                                />

                                <RHFInput
                                    wrapperClassName='manager-email'
                                    label={step3.employeeEmailLabel}
                                    required
                                    type='text'
                                    id='employee_email'
                                    name='employee_email'
                                    className='company-input'
                                    placeholder={step3.employeeEmailPlaceholder}
                                    spellCheck='false'
                                    data-ms-editor='true'
                                    caption={
                                        <div className='error-text'>
                                            {step3.employeeEmailCaption}
                                        </div>
                                    }
                                />
                                <RHFInput
                                    wrapperClassName='manager-email'
                                    label={step3.sectorLabel}
                                    required
                                    type='text'
                                    maxLength={10}
                                    id='sector'
                                    name='sector'
                                    className='company-input'
                                    placeholder={step3.sectorPlaceholder}
                                    spellCheck='false'
                                    data-ms-editor='true'
                                    caption={
                                        <div className='error-text'>
                                        </div>
                                    }
                                />
                                <div className='business-num-wrap'>
                                    <Tooltip
                                        title={(isKorean || watch().business_registration_number) ? "" : step3.businessRegistrationNumberPlaceholder}>
                                        <RHFInput
                                            wrapperClassName='business-num  flex-1'
                                            required
                                            label={step3.businessRegistrationNumberLabel}
                                            type='phoneNumber'
                                            minLength={12}
                                            maxLength={12}
                                            id='business_registration_number'
                                            name='business_registration_number'
                                            className='company-input'
                                            placeholder={step3.businessRegistrationNumberPlaceholder}
                                            spellCheck={false}
                                            data-ms-editor='true'
                                            readOnly={isReadonly}
                                            caption={
                                                <div className='error-text'>
                                                    {step3.businessRegistrationNumberCaption}
                                                </div>
                                            }
                                            right={
                                                <button
                                                    type='button'
                                                    disabled={isReadonly}
                                                    className='business-num-btn ml-2'
                                                    onClick={() => {
                                                        setverifybtn(true);
                                                        trigger('business_registration_number', {
                                                            shouldFocus: true,
                                                        }).then((isValid) => {
                                                            isValid &&
                                                            _verifyBusinessNumber(
                                                                'business_registration_number',
                                                                getValues().business_registration_number,
                                                            );
                                                        });
                                                    }}>
                                                  <div className={'flex items-center gap-1'}>
                                                      {  businessVerifyLoading?  <CircularProgress size={'20px'} color={'secondary'}/>  :<></> }
                                                      {step3.businessRegistrationNumberBtn}
                                               </div>
                                                </button>
                                            }
                                        />

                                    </Tooltip>

                                    {errors.verify_business_registration_number && (
                                        <span className='text-danger'>
											{String(
                                                errors.verify_business_registration_number.message,
                                            )}
										</span>
                                    )}
                                </div>
                                <div className='input-wrap business-license'>
                                    <div className='flex flex-row justify-between gap-3'>
                                        <div className='input-text'>
                                            {step3.attachBusinessLicense}<span
                                            className='essential text-danger'>*</span>
                                        </div>
                                        {errors?.business_license && (
                                            <span className='text-danger'>
												{String(errors.business_license.message)}
											</span>
                                        )}
                                    </div>
                                    <div className='file-wrap'>
                                        <div className='error-text'>
                                            {step3.plsAttachBusinessLicense}
                                        </div>
                                        <div
                                            className={clsx(
                                                'file-name',
                                                errors?.business_license && 'border-danger',
                                            )}>
                                            {file?.name || step3?.file_placeholder}
                                        </div>
                                        <label htmlFor='business_license' className='file-label'>
                                            {step3.browse}
                                        </label>
                                        <input
                                            required={true}
                                            type='file'
                                            id={'business_license'}
                                            className='company-file company-input'
                                            name={'business_license'}
                                            onChange={(event) => {
                                                const file = event?.target?.files?.[0];
                                                if (file) {
                                                    setImageUploaded(true);
                                                    setValue(
                                                        'business_license',
                                                        file as unknown as typeof File,
                                                    );
                                                    //@ts-ignore
                                                    setFile(file);
                                                }
                                            }}
                                            accept={allowedFiles.toString()}
                                            // accept="image/jpeg, image/jpg, image/png, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                                        />
                                    </div>
                                    <div className='file-info'>
                                        {step3.additionalReqsMsg}
                                    </div>
                                </div>
                                <div className={'flex w-[100%] justify-center'}>
                                    <Button
                                        loading={isSubmitting}
                                        className='link link-step01 !mb-[42px]'
                                        onClick={onSubmit}
                                        disabled={
                                            !(Object.keys(dirtyFields).length > 7 && imageUploaded)
                                        }>
                                        {step3.next}
                                    </Button>
                                </div>
                            </FormProvider>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                onHide={ModalhandleClose}
                centered
                className='bussiness-modal'>
                <Modal.Header className='!pb-[20px] p-0 '>
                    <Modal.Title>{step3.modal.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center py-[10px]'>
                    {message || step3.modal.body}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className=' bg-primary text-white px-4'
                        onClick={ModalhandleClose}>
                        {step3.modal.btn}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Step3;
