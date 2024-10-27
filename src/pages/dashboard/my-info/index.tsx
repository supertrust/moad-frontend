import { useUpdateUserInfo, useUpdateUserProfileImage } from '@src/apis/user';
import { Button, FormProvider, RHFInput, useForm, Yup, yupResolver, } from '@src/components/common';
import { EMAIL_REGEX } from '@src/constants';
import { ConfirmPropsType } from '@src/contexts/ConfirmDialogContext';
import { isHangul } from '@src/helpers';
import useAuth from '@src/hooks/useAuth';
import { useConfirmDialog } from '@src/hooks/useConfirmationDialog';
import { useIcarusContext } from '@src/hooks/useIcarusContext';
import { styles } from '@src/sections/my-info';
import { logger } from "@src/utils/func";
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const defaultValues = {
  company_phone_number: '',
  employee_name: '',
  employee_phone_number: '',
  employee_email: '',
  sector: '',
};

export default function MyInfoScreen() {
  const { mutateAsync: updateUserInfo, isLoading } = useUpdateUserInfo();
  const {
    mutateAsync: updateUserProfileImage,
    isLoading: isProfilePicUpdating,
  } = useUpdateUserProfileImage();
  const { setPageTitle, setProfileImage: setTopBarImage } = useIcarusContext();
  const {
    user,
    localDataUpdated,
    dictionary: { myInfo,pageTitle },
      isKorean
  } = useAuth();
  const email = user?.contact_email;
  logger.log(email, 'email');
  const [showModal, setShowModal] = useState(false);
  const { confirm } = useConfirmDialog();
  const { validations } = myInfo;
  const UpdateUserInfoSchema = Yup.object({
    company_phone_number: Yup.string()
      .required(validations.companyPhoneNumber.required)
      .matches(/^[0-9]{11}$/, validations.companyPhoneNumber.length),
    employee_name: Yup.string()
      .required(validations.employeeName.required)
      .max(10, validations.employeeName.length)
      .test('isKorean', validations.employeeName.isKorean, isHangul),
    employee_phone_number: Yup.string()
      .required(validations.employeePhoneNumber.required)
      .matches(/^[0-9]{11}$/, validations.employeePhoneNumber.length),
    employee_email: Yup.string()
      .matches(EMAIL_REGEX, validations.employeeEmail.format)
      .required(validations.employeeEmail.required),
    sector: Yup.string(),
  });

  const methods = useForm({
    defaultValues,
    //@ts-ignore
    resolver: yupResolver(UpdateUserInfoSchema),
  });
  const { handleSubmit, setValue, watch } = methods;

  const [disabledSubmit, setDisabledSubmit] = useState(true);
  useEffect(() => {
    watch(
      ({
        company_phone_number,
        employee_email,
        employee_name,
        employee_phone_number,
        sector,
      }) => {
        const disabled =
          company_phone_number === (user?.company_phone_number || '') &&
          employee_email === (user?.employee_email || '') &&
          employee_name === (user?.employee_name || '') &&
          sector === (user?.sector || '') &&
          employee_phone_number === (user?.employee_phone_number || '');
        setDisabledSubmit(disabled);
      },
    );
  }, [watch, user]);

  const onSubmit = handleSubmit(async (values) => {
    await updateUserInfo(
      {
        ...values,
        sector: values?.sector || '',
        company_name: user?.company_name || '',
        business_registration_number: user?.business_registration_number || '',
        business_license: null,
      },
      {
        onSuccess: () => {
          localDataUpdated();
          setShowModal(true);
        },
        onError: (error) => toast(error, { type: 'error' }),
      },
    );
  });

  useEffect(()=>{
    localDataUpdated()
  },[])

  useEffect(() => {
    setPageTitle(pageTitle["top_bar_my_page"]);
  }, [isKorean]);

  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([key, value]) => {
        setValue(key as keyof typeof defaultValues, value || '');
      });
      setValue('employee_email', email || '');
    }
  }, [user]);

  const [profileImage, setProfileImage] = useState<File | undefined>();

  const handleUpdateProfileImage = (profileImage: File) => {
    const allowedImages = ['image/jpeg', 'image/jpg', 'image/png'];
    const options: ConfirmPropsType = {
      title: myInfo.updateProfileImgModal.title,
      size: 'sm',
      cancelText: (
        <span className='text-[#FFFFFF]'>
          {myInfo.updateProfileImgModal.cancelBtnText}
        </span>
      ),
      disableConfirmBtn: true,
      cancelButtonProps: {
        className: 'border-primary bg-primary !text-[#FFFFFF]',
      },
      footerClassName: 'flex flex-row justify-end',
    };

    if (!profileImage) return;

    if (!allowedImages.includes(profileImage.type)) {
      return confirm({
        ...options,
        description: (
          <div className='mt-3 text-center'>
            {myInfo.updateProfileImgModal.allowedFileTypesMsg}
          </div>
        ),
      });
    }

    // 3 MB image
    if (profileImage.size > 3 * 1024 * 1024) {
      return confirm({
        ...options,
        description: (
          <div className='mt-3 text-center'>
            {myInfo.updateProfileImgModal.allowedFileSizeMsg}
          </div>
        ),
      });
    }

    setProfileImage(profileImage);

    if (profileImage) {
      updateUserProfileImage(
        { profile_img: profileImage },
        {
          onSuccess: () => {
            setTopBarImage(profileImage);
            localDataUpdated();
            toast.success(
              myInfo.updateProfileImgModal.profilePictureUpdatedMsg.success,
            );
          },
          onError: () => {
            setTopBarImage(undefined);
            toast.error(
              myInfo.updateProfileImgModal.profilePictureUpdatedMsg.failed,
            );
          },
        },
      ).then((r) => {});
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Enter' && !disabledSubmit && !showModal) {
        event.preventDefault(); // Prevent form submission
        onSubmit().then(() => {});
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [disabledSubmit, showModal]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Enter' && showModal) {
        event.preventDefault(); // Prevent form submission
        setShowModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [showModal]);

  return (
    <>
      <Row>
        <Col md='12'>
          <div className={styles.my_info_content}>
            <FormProvider methods={methods}>
              <div className={styles.form_wrap}>
                <div className={styles.profile}>
                  <div className={styles.title_wraps_1}>
                    <div className={styles.title}>{myInfo.header}</div>
                    <Link
                      href='/dashboard/membership-withdrawal'
                      className={styles.link}>
                      {myInfo.subHeader}
                    </Link>
                  </div>
                  <div className={styles.profile_wrap}>
                    <div className={styles.profile_img}>
                      <div className={styles.user_photo}>
                        <Image
                          src={
                            profileImage
                              ? URL.createObjectURL(profileImage)
                              : user?.image || '/images/account_circle.png'
                          }
                          alt=''
                          width={72}
                          height={72}
                          className='img w-[72px] h-[72px] object-cover '
                        />
                      </div>
                      <input
                        type='file'
                        placeholder='#'
                        id='input_file'
                        className={styles.input_file}
                        onChange={(e) =>
                          e.target.files &&
                          handleUpdateProfileImage(e.target.files[0])
                        }
                        accept='image/*'
                      />
                      <Button
                        type='button'
                        id='photo_btn'
                        className={styles.photo_btn}
                        onClick={() =>
                          document.getElementById('input_file')?.click()
                        }
                      />
                    </div>
                    <div className={styles.profile_text}>
                      <div>
                        <span id='comoany-name'>{user?.company_name}</span>
                      </div>
                      <div className={styles.email}>{user?.email}</div>
                    </div>
                  </div>
                  <div className={styles.change_password}>
                    <div className={styles.title}>{myInfo.changePass}</div>
                    <Link
                      href={'change-password'}
                      className={styles.correction}>
                      {myInfo.edit}
                    </Link>
                  </div>
                  <div className={styles.my_information}>
                    <div className={styles.title}>{myInfo.title}</div>
                    <div className={clsx('mt-4', styles.information_wrap)}>
                      <ul
                        className={clsx(
                          'flex flex-col gap-2',
                          styles.list_wrap,
                        )}>
                        <li
                          className={clsx(
                            'flex-col !items-start sm:flex-row sm:items-center',
                            styles.lists,
                          )}>
                          <div className={styles.desc}>
                            {myInfo.companyName}
                          </div>
                          <RHFInput
                            title='company_name'
                            type='input'
                            name='company_name'
                            className={styles.input}
                            errorPosition='bottom'
                            justifyEnd={false}
                            disabled={true}
                            wrapperClassName={`${styles.company_name} ${styles.text}`}
                            id='company_phone_number'
                            value={user?.company_name}
                          />
                        </li>
                        <li
                          className={clsx(
                            'flex-col !items-start sm:flex-row sm:items-center',
                            styles.lists,
                          )}>
                          <div className={styles.desc}>
                            {myInfo.companyPhoneNumber}
                            <span className={styles.point}>*</span>
                          </div>
                          <RHFInput
                            numberFunctionality={false}
                            title='company_phone_number'
                            type='number'
                            name='company_phone_number'
                            className={styles.input}
                            errorPosition='bottom'
                            justifyEnd={false}
                            wrapperClassName={`${styles.company_name} ${styles.text}`}
                            id='company_phone_number'
                          />
                        </li>
                        <li
                          className={clsx(
                            'flex-col !items-start sm:flex-row sm:items-center',
                            styles.lists,
                          )}>
                          <div className={styles.desc}>
                            {myInfo.contactPersonName}
                            <span className={styles.point}>*</span>
                          </div>
                          <RHFInput
                            type='text'
                            id='employee_name'
                            title='employee_name'
                            name='employee_name'
                            wrapperClassName={`${styles.company_name} ${styles.text}`}
                            className={styles.input}
                            errorPosition='bottom'
                            justifyEnd={false}
                          />
                        </li>
                        <li
                          className={clsx(
                            'flex-col !items-start sm:flex-row sm:items-center',
                            styles.lists,
                          )}>
                          <div className={styles.desc}>
                            {myInfo.contactPersonsCellPhone}
                            <span className={styles.point}>*</span>
                          </div>
                          <RHFInput
                            numberFunctionality={false}
                            type='number'
                            name='employee_phone_number'
                            title='employee_phone_number'
                            className={styles.input}
                            errorPosition='bottom'
                            justifyEnd={false}
                            id='employee_phone_number'
                            wrapperClassName={`${styles.company_name} ${styles.text}`}
                          />
                        </li>
                        <li
                          className={clsx(
                            'flex-col !items-start sm:flex-row sm:items-center',
                            styles.lists,
                          )}>
                          <div className={styles.desc}>
                            {myInfo.contactPersonsEmail}
                            <span className={styles.point}>*</span>
                          </div>
                          <div
                            className={`${styles.company_name} ${styles.text}`}>
                            <RHFInput
                              type='email'
                              id='employee_email'
                              title='employee_email'
                              name='employee_email'
                              className={styles.input}
                              errorPosition='bottom'
                              justifyEnd={false}
                            />
                          </div>
                        </li>
                        <li
                          className={clsx(
                            'flex-col !items-start sm:flex-row sm:items-center',
                            styles.lists,
                          )}>
                          <div className={styles.desc}>
                            {myInfo.companyRegistrationNumber}
                          </div>
                          <RHFInput
                            title='business_registration_number'
                            type='number'
                            name='business_registration_number'
                            className={styles.input}
                            errorPosition='bottom'
                            justifyEnd={false}
                            disabled={true}
                            wrapperClassName={`${styles.company_name} ${styles.text}`}
                            id='company_phone_number'
                            value={user?.business_registration_number}
                          />
                        </li>
                        <li
                          className={clsx(
                            'flex-col !items-start sm:flex-row sm:items-center',
                            styles.lists,
                          )}>
                          <div className={styles.desc}>{myInfo.sectors}</div>
                          <RHFInput
                            type='text'
                            id='sector'
                            title='sector'
                            name='sector'
                            className={styles.input}
                            errorPosition='bottom'
                            justifyEnd={false}
                            showCount={true}
                            maxCount={20}
                            wrapperClassName={`${styles.company_name} ${styles.text}`}
                          />
                        </li>
                      </ul>
                      <div className={'flex justify-center'}>
                        <Button
                          loading={isLoading || isProfilePicUpdating}
                          type='submit'
                          className={`${styles.modify_btn} p-1 `}
                          onClick={onSubmit}
                          disabled={disabledSubmit}>
                          {myInfo.modificationsCompleted}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FormProvider>
          </div>
        </Col>
        <Modal show={showModal} centered size='sm' backdrop='static'>
          <Modal.Body>
            <div className='text-center my-[4px]'>
              <div className='text-[#2C324C] text-left text-xl mb-[20px] font-bold'>
                {myInfo.modificationsCompletedModal.title}
              </div>
              <div className='text-center p-3 border-y-[1px] border-[#EEEEEE]'>
                {myInfo.modificationsCompletedModal.msg}
              </div>
              <div className='flex flex-row justify-end mt-[20px]'>
                <Button
                  onClick={() => setShowModal(false)}
                  className='bg-primary text-white flex justify-center px-4'>
                  {myInfo.modificationsCompletedModal.btnText}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Row>
    </>
  );
}
