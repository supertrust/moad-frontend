import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AccountCircle from '@images/account_circle.png'
import EditIcon from '@images/ic-change.png'
import CrownIcon from '@images/admin-account/ic-crown.png'
import { Button, Controller, DataRow, useForm, Yup, yupResolver } from '@src/components/common';
import Input from '../AdminAdvertisementDetailsPage/components/Input';
import { styles } from './style.module';
import { clsx } from 'clsx';
import useAuth from '@src/hooks/useAuth';
import { PushNotificationModal } from './components';
import { UpdateAdvetiserUserProps } from '@src/types/admin/user'
import { useGetAdminDetails, useUpdateAdminAdvertiserUser } from '@src/apis/admin/user';
import { toast } from 'react-toastify';
import Loader from '@src/components/Loader';
import { useRouter } from 'next/router';


type KeyAdvertiserUser = keyof UpdateAdvetiserUserProps

const ProfileSchema = Yup.object().shape({
    // status: Yup.number().required('회사 전화번호를 입력하세요.'),
    id_number: Yup.number().required('회사 전화번호를 입력하세요.'),
    // company_phone_number: Yup.number().required('회사 전화번호를 입력하세요.'),
    // name: Yup.string().required('관리자 이름을 입력하세요.'),
    username: Yup.string().required('관리자 이름을 입력하세요.'),
    email: Yup.string().required('관리자 이름을 입력하세요.'),
    password: Yup.string().required('관리자 이름을 입력하세요.'),
    confirm_password: Yup.string().required('관리자 이름을 입력하세요.'),
    // department: Yup.string().required('관리자 이름을 입력하세요.'),
    // access: Yup.string().required('관리자 이름을 입력하세요.'),
    // division: Yup.string().required('관리자 이름을 입력하세요.'),
    phone_number: Yup.string().required('연락처 전화번호를 입력하세요.'),
    mobile_phone: Yup.string().required('연락처 전화번호를 입력하세요.'),
    push_notification: Yup.string().required('광고이름을 입력해주세요.'),
    // registrants: Yup.string().required('광고이름을 입력해주세요.'),
});

function ProfilePage() {

    const { user } = useAuth();

    const { data: adminDetails, isLoading } = useGetAdminDetails(user?.id || 0)
    const { mutateAsync: updateAdminAdvertiserUser, isLoading: isUpdating } = useUpdateAdminAdvertiserUser();

    const methods = useForm<UpdateAdvetiserUserProps>({
        defaultValues: {},
        //@ts-ignore
        resolver: yupResolver(ProfileSchema),
    });

    const { control, setValue, handleSubmit, formState: { errors } } = methods;


    useEffect(() => {
        if (adminDetails) {
            Object.entries(adminDetails).forEach(([key, value]) => {
                if (key == 'id') key = "advertiser_id";
                setValue(key as keyof UpdateAdvetiserUserProps, value)
            })
        }
    }, [adminDetails])

    const [open, setOpen] = useState(false);

    const onSubmit = handleSubmit(async (props) => {
        await updateAdminAdvertiserUser({ ...props, department: "N/A" }, {
            onSuccess: () => toast.success('광고 업데이트 성공'),
            onError: () => toast.error('문제가 발생했습니다.')
        })
    })

    const router = useRouter();


    return (
        <div className="p-4">
            {isLoading ?
                <>
                    <Loader size='lg' />
                </> :
                <>
                    <h3>광고목록조회</h3>
                    <div className='flex flex-col items-center mt-12 mb-5'>
                        <div className='relative'>
                            <Image src={AccountCircle} alt='' />
                            <Image src={EditIcon} alt='' className='absolute right-1 bottom-0 cursor-pointer' />
                        </div>
                        <div className='text-center mt-3'>
                            <div className='flex flex-row mb-2 items-center justify-center'>
                                <Image src={CrownIcon} alt='' className='w-[14px] h-[12px] mr-1' />
                                <span className='text-admin-primary text-base font-semibold'>마스터등급</span>
                            </div>
                            <div className='text-xl text-admin-dark-1'>
                                <span className='font-semibold'>{user?.employee_name}</span>님 반갑습니다.
                            </div>
                        </div>
                    </div>

                    <table className='mt-3 w-full text-[16px]'  >
                        <Controller name="id_number" control={control} render={({ field: { value, onChange }, fieldState: {error} }) => (
                            <DataRow title='아이디' required className='p-1'>
                                <div className='flex flex-row gap-1 items-center'>
                                    <Input
                                        value={value?.toString()}
                                        onChange={onChange}
                                        className={clsx(styles.inputWrapper, 'w-[75%]')}
                                        inputClass={styles.inputClass}
                                    />
                                    <Button className={styles.button}>
                                        중복확인
                                    </Button>
                                    {error && <span className="text-sm text-admin-error">{error.message}</span>}
                                </div>
                            </DataRow>
                        )} />
                        <Controller name="name" control={control} render={({ field: { value, onChange } }) => (
                            <DataRow title='이름' required className='p-1'>
                                <Input
                                    value={value}
                                    onChange={onChange}
                                    className={styles.inputWrapper}
                                    inputClass={styles.inputClass}
                                />
                            </DataRow>
                        )} />
                        <Controller name="password" control={control} render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <DataRow title='기존 비밀번호' required className='p-1'>
                                <div className='flex flex-row gap-1 items-center'>
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        className={styles.inputWrapper}
                                        inputClass={styles.inputClass}
                                        type='password'
                                        error={!!error}
                                    />
                                    {error && <span className="text-sm text-admin-error">{error.message}</span>}
                                </div>
                            </DataRow>
                        )} />
                        <Controller name="confirm_password" control={control} render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <DataRow title='새 비밀번호' required className='p-1'>
                                <div className='flex flex-row gap-1 items-center'>
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        className={styles.inputWrapper}
                                        inputClass={styles.inputClass}
                                        type='password'
                                        error={!!error}
                                    />
                                    {error && <span className="text-sm text-admin-error">{error.message}</span>}
                                </div>
                            </DataRow>
                        )} />
                        <Controller name="confirm_password" control={control} render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <DataRow title='비밀번호 확인' required className='p-1'>
                                <div className='flex flex-row gap-1 items-center'>
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        className={styles.inputWrapper}
                                        inputClass={styles.inputClass}
                                        type='password'
                                        error={!!error}
                                    />
                                    {error && <span className="text-sm text-admin-error">{error.message}</span>}
                                </div>
                            </DataRow>
                        )} />
                        <Controller name="department" control={control} render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <DataRow title='부서' className='py-1 pr-2'>
                                <div className='flex flex-row gap-1 items-center'>
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        className={styles.inputWrapper}
                                        inputClass={styles.inputClass}
                                        error={!!error}
                                    />
                                    {error && <span className="text-sm text-admin-error">{error.message}</span>}
                                </div>
                            </DataRow>
                        )} />
                        <Controller name="division" control={control} render={({ field: { value } }) => (
                            <DataRow title='직위' className='py-1 pr-2'>
                                {value}
                            </DataRow>
                        )} />
                        <Controller name="phone_number" control={control} render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <DataRow title='전화번호' className='p-1'>
                                <div className='flex flex-row gap-1 items-center'>
                                    <Input
                                        value={value?.toString()}
                                        onChange={onChange}
                                        className={styles.inputWrapper}
                                        inputClass={styles.inputClass}
                                        error={!!error}
                                    />
                                    {error && <span className="text-sm text-admin-error">{error.message}</span>}
                                </div>
                            </DataRow>
                        )} />
                        <Controller name="mobile_phone" control={control} render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <DataRow title='휴대폰번호' className='p-1'>
                                <div className='flex flex-row gap-1 items-center'>
                                    <Input
                                        value={value?.toString()}
                                        onChange={onChange}
                                        className={styles.inputWrapper}
                                        inputClass={styles.inputClass}
                                        error={!!error}
                                    />
                                    {error && <span className="text-sm text-admin-error">{error.message}</span>}
                                </div>
                            </DataRow>
                        )} />
                        <Controller name="email" control={control} render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <DataRow title='이메일' className='p-1'>
                                <div className='flex flex-row gap-1 items-center'>
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        className={styles.inputWrapper}
                                        inputClass={styles.inputClass}
                                        error={!!error}
                                    />
                                    {error && <span className="text-sm text-admin-error">{error.message}</span>}
                                </div>
                            </DataRow>
                        )} />
                        <Controller name="access" control={control} render={({ field: { value } }) => (
                            <DataRow title='등록글이력' className='p-1'>
                                <Button className={styles.button}>
                                    보기
                                </Button>
                            </DataRow>
                        )} />
                        <Controller name="push_notification" control={control} render={({ field: { value, onChange } }) => (
                            <DataRow title='푸시알림설정' className='p-1'>
                                <>
                                    <Button className={styles.button} onClick={() => setOpen(true)}>
                                        설정
                                    </Button>
                                    <PushNotificationModal
                                        open={open}
                                        onClose={() => setOpen(false)}
                                        value={value}
                                        onChange={(value) => setValue('push_notification', value)}
                                    />
                                </>
                            </DataRow>
                        )} />
                    </table>

                    <div className='flex flex-row justify-center my-5 gap-3'>
                        <Button
                            className='border border-admin-primary text-admin-primary text-base px-5 py-2 justify-center'
                            onClick={() => router.back()}
                        >취소</Button>
                        <Button
                            className='bg-admin-primary text-white px-5 py-2 text-base justify-center'
                            onClick={() => onSubmit()}
                            loading={isUpdating}
                        >저장</Button>

                    </div>
                </>
            }
        </div>
    )
}

export default ProfilePage