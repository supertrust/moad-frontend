import { useIcarusContext } from '@src/hooks/useIcarusContext';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useAuth from '@src/hooks/useAuth';
import { useUpdateUserInfo, useUpdateUserProfileImage } from '@src/apis/user';
import {
	FormProvider,
	RHFInput,
	Yup,
	useForm,
	yupResolver,
	Button,
} from '@src/components/common';
import { styles } from '@src/sections/my-info';
import Image from 'next/image';
import { getFileUrl } from '@src/helpers';
import { useConfirmDialog } from '@src/hooks/useConfirmationDialog';
import { ConfirmPropsType } from '@src/contexts/ConfirmDialogContext';

const defaultValues = {
	company_phone_number: '',
	employee_name: '',
	employee_phone_number: '',
	employee_email: '',
	sector: '',
};

const UpdateUserInfoSchema = Yup.object({
	company_phone_number: Yup.string()
		.required('핸드폰번호를 입력해주세요')
		.matches(/^[0-9]{11}$/, '전화번호는 11자리여야 합니다.'),
	employee_name: Yup.string()
		.required('직원 이름을 입력하세요.')
		.max(10, '담당자 이름은 10자를 넘지 않아야 합니다.'),
	employee_phone_number: Yup.string()
		.required('핸드폰번호를 입력해주세요')
		.matches(/^[0-9]{11}$/, '전화번호는 11자리여야 합니다.'),
	employee_email: Yup.string()
		.email('유효한 이메일을 입력하세요.')
		.required('직원 이메일을 입력하세요.'),
	sector: Yup.string(),
});

export default function MyInfoScreen() {
	const { mutateAsync: updateUserInfo, isLoading } = useUpdateUserInfo();
	const { mutateAsync: updateUserProfileImage } = useUpdateUserProfileImage();
	const { setPageTitle } = useIcarusContext();
	const { user } = useAuth();
	const email = user?.email;
	const [showModal, setShowModal] = useState(false);
	const { confirm } = useConfirmDialog();

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
			}) => {
				const disabled =
					!company_phone_number &&
					!employee_email &&
					!employee_name &&
					!employee_phone_number;
				disabledSubmit !== disabled && setDisabledSubmit(disabled);
			},
		);
	}, [watch]);

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
					setShowModal(true);
				},
				onError: (error) => toast(error, { type: 'error' }),
			},
		);
	});

	useEffect(() => {
		setPageTitle('내 정보');
	}, []);

	useEffect(() => {
		if (user) {
			Object.entries(user).forEach(([key, value]) => {
				setValue(key as keyof typeof defaultValues, value || '');
			});
		}
	}, [user]);

	const [profileImage, setProfileImage] = useState<File | undefined>();

	useEffect(() => {
		const updateProfile = async () => {
			const allowedImages = ['image/jpeg', 'image/jpg', 'image/png'];
			const options: ConfirmPropsType = {
				title: '',
				size: 'sm',
				cancelText: '확인',
				disableConfirmBtn: true,
				cancelButtonProps: {
					className: 'border-secondary bg-secondary text-white',
				},
				footerClassName: 'border-none flex flex-row justify-center mb-3',
			};

			if (profileImage) {
				if (!allowedImages.includes(profileImage.type)) {
					setProfileImage(undefined);
					return confirm({
						...options,
						description: (
							<div className='mt-3 text-secondary text-center'>
								JPG, JPEG, PNG 파일만 가능합니다.
							</div>
						),
					});
				}

				if (profileImage.size > 3 * 1024 * 1024) {
					// 3 MB
					setProfileImage(undefined);
					return confirm({
						...options,
						description: (
							<div className='mt-3 text-secondary text-center'>
								최대 3MB까지만 가능합니다.
							</div>
						),
					});
				}

				await updateUserProfileImage(
					{ profile_img: profileImage },
					{
						onSuccess: () => {
							setProfileImage(undefined);
							confirm({
								...options,
								description: (
									<div className='mt-3'>
										<div className='text-secondary text-center mb-2 font-bold'>
											내 정보 수정 완료
										</div>
										<div className='text-center'>
											정보 수정이 완료되었습니다.
										</div>
									</div>
								),
							});
						},
						onError: (error) => {
							setProfileImage(undefined);
							confirm({
								...options,
								description: (
									<div className='mt-3 text-secondary text-center'>{error}</div>
								),
							});
						},
					},
				);
			}
		};
		updateProfile();
	}, [profileImage]);

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
										<div className={styles.title}>프로필</div>
										<Link
											href='/dashboard/membership-withdrawal'
											className={styles.link}>
											탈퇴하기
										</Link>
									</div>
									<div className={styles.profile_wrap}>
										<div className={styles.profile_img}>
											<div className={styles.user_photo}>
												<Image
													src={user?.image || '/images/account_circle.png'}
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
													setProfileImage(
														e.target.files ? e.target.files[0] : undefined,
													)
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
											<div className={styles.company_name}>
												<span>Must Fintech</span>
											</div>
											<div className={styles.email}>{email}</div>
										</div>
									</div>
									<div className={styles.change_password}>
										<div className={styles.title}>비밀번호 변경</div>
										<Link
											href={'change-password'}
											className={styles.correction}>
											수정
										</Link>
									</div>
									<div className={styles.my_information}>
										<div className={styles.title}>내 정보</div>
										<div className={styles.information_wrap}>
											<ul className={styles.list_wrap}>
												<li className={styles.lists}>
													<div className={styles.desc}>회사명</div>
													<div>{user?.company_name}</div>
												</li>
												<li className={styles.lists}>
													<div className={styles.desc}>
														회사 전화번호
														<span className={styles.point}>*</span>
													</div>
													<RHFInput
														title='company_phone_number'
														type='number'
														name='company_phone_number'
														className={styles.input}
														errorPosition='top'
														wrapperClassName={`${styles.company_name} ${styles.text}`}
														id='company_phone_number'
													/>
												</li>
												<li className={styles.lists}>
													<div className={styles.desc}>
														담당자 성함
														<span className={styles.point}>*</span>
													</div>
													<RHFInput
														type='text'
														id='employee_name'
														title='employee_name'
														name='employee_name'
														wrapperClassName={`${styles.company_name} ${styles.text}`}
														className={styles.input}
														errorPosition='top'
													/>
												</li>
												<li className={styles.lists}>
													<div className={styles.desc}>
														담당자 핸드폰
														<span className={styles.point}>*</span>
													</div>
													<RHFInput
														type='number'
														name='employee_phone_number'
														title='employee_phone_number'
														className={styles.input}
														errorPosition='top'
														id='employee_phone_number'
														wrapperClassName={`${styles.company_name} ${styles.text}`}
													/>
												</li>
												<li className={styles.lists}>
													<div className={styles.desc}>
														담당자 이메일 (계산서 발행)
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
															errorPosition='top'
														/>
													</div>
												</li>
												<li className={styles.lists}>
													<div className={styles.desc}>사업자 등록번호</div>
													<div>{user?.business_registration_number}</div>
												</li>
												<li className={styles.lists}>
													<div className={styles.desc}>업종</div>
													<RHFInput
														type='text'
														id='sector'
														title='sector'
														name='sector'
														className={styles.input}
														errorPosition='top'
														wrapperClassName={`${styles.company_name} ${styles.text}`}
													/>
												</li>
											</ul>
											<Button
												loading={isLoading}
												type='submit'
												className={`${styles.modify_btn} p-0`}
												onClick={onSubmit}
												disabled={disabledSubmit}>
												수정완료
											</Button>
										</div>
									</div>
								</div>
							</div>
						</FormProvider>
					</div>
				</Col>
				<Modal show={showModal} centered size='sm' backdrop='static'>
					<Modal.Body>
						<div className='text-center my-4'>
							<div className='text-secondary mb-3'>내 정보 수정 완료</div>
							<div className='mb-3'>정보 수정이 완료되었습니다.</div>
							<div className='flex flex-row justify-center'>
								<Button
									onClick={() => setShowModal(false)}
									className='bg-secondary text-white flex justify-center px-4'>
									확인
								</Button>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			</Row>
		</>
	);
}
