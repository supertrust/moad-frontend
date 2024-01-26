import {
	FormProvider,
	RHFInput,
	useForm,
	yupResolver,
	Button,
} from '@src/components/common';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useVerifyInput } from '@src/apis/auth';
import useAuth from '@src/hooks/useAuth';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';
import { RegisterPropsType } from '@src/types/auth';
import { File } from 'buffer';
import clsx from 'clsx';
import { isHangul } from '@src/helpers';
import RHFSelect from '@src/components/common/Form/RHFSelect';
import { EMAIL_REGEX } from '@src/constants';

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

const allowedFiles = [
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/pdf',
	'image/jpeg',
	'image/png',
];

const RegisterSchema = Yup.object({
	company_name: Yup.string()
		.required('회사명은 필수 입력 사항입니다.')
		.test('isKorean', '올바른 한글 이름 입력' , isHangul),
	employee_name: Yup.string()
		.required('직원 이름을 입력하세요.')
		.max(10, '담당자 이름은 10자를 넘지 않아야 합니다.')
		.test('isKorean', '올바른 한글 이름 입력' , isHangul),
	company_phone_number: Yup.string()
		.required('핸드폰번호를 입력해주세요')
		.matches(/^[0-9]{11}$/, '전화번호는 11자리여야 합니다.'),
	employee_phone_number: Yup.string()
		.required('직원 전화번호를 입력하세요.')
		.matches(/^[0-9]{11}$/, '전화번호는 11자리여야 합니다.'),
	business_registration_number: Yup.string()
		.required('사업자 등록 번호를 입력하세요.')
		.matches(/^[0-9]{10}$/, '10자리여야 합니다.'),
	verify_business_registration_number:
		Yup.boolean().required('사업자등록번호를 확인해 주세요.'),
	employee_email: Yup.string()
		.matches(EMAIL_REGEX, '유효한 이메일을 입력하세요.')
		.required('직원 이메일을 입력하세요.'),
	business_license: Yup.mixed()
		.required('사업자 등록증을 업로드하세요.')
		.test(
			'fileFormat',
			'.pdf, .jpg, .jpeg, .png 파일만 허용됩니다.',
			(value: any) => {
				if (value) {
					return allowedFiles.includes(value.type);
				}
				return true;
			},
		)
		.test('fileSize', '파일 크기는 10MB 미만이어야 합니다.', (value: any) => {
			if (value) {
				return value.size <= 10 * 1024 * 1024;
			}
			return true;
		}),
});

const Step3 = ({
	onPrevStep,
	onNextStep,
	membershipInformation,
	setMembershipInformation,
}: Step3Props) => {
	const { mutateAsync: verifyInput } = useVerifyInput();
	const { register } = useAuth();
	const [showModal, setShowModal] = useState(false);
	const [isReadonly, setReadonly] = useState(false);
	const [verifybtnclick, setverifybtn] = useState(false);
	const [message, setMessage] = useState('');
	const ModalhandleClose = () => setShowModal(false);
	const options = [
		{value : '', text : '담당자 직위'},
		{value : '사원', text : '사원'},
		{value : '주임', text : '주임'},
		{value : '대리', text : '대리'},
		{value : '과장', text : '과장'},
		{value : '차장', text : '차장'},
		{value : '부장', text : '부장'},
		{value : '임원', text : '임원'},
		{value : '기타', text : '기타'}
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
			await verifyInput(
				{ key, value },
				{
					onSuccess: () => {
						setValue('verify_business_registration_number', true);
						cb ? cb() : toast.success('국세청에 등록된 사업자등록번호입니다.');
						setReadonly(true);
					},
					onError: (error) => {
						ModalhandleShow(error);
						setError('business_registration_number', { message: error });
					},
				},
			);
		} catch (error) {}
	};

	const onSubmit = handleSubmit(async (props) => {

		if (!verifybtnclick) {
			ModalhandleShow('사업자등록번호를 확인해주세요.');
			return false;
		}
		try {
			await _verifyBusinessNumber(
				'business_registration_number',
				props.business_registration_number,
				async () => {
					const res = await register({ ...membershipInformation, ...props });
					if (res !== null && res === true) {
						toast('사용자 등록 성공', { type: 'success' });
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
				onSubmit().then(() => {});
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
				<div className='right-wrap'>
					<div className='right-content'>
						<div onClick={onPrevStep} className='back-btn'></div>
						<div className='step-title'>회사 정보를 입력해주세요</div>
						<div className='step-text'>
							기입정보를 입력 후 완료버튼을 눌러주세요
							<br />
							<span className='text-danger'>*표시는 필수 입력값 입니다</span>
						</div>
						<div className='user-info'>
							<FormProvider methods={methods}>
								<RHFInput
									wrapperClassName='company-name'
									label='회사명'
									required
									type='text'
									id='company_name'
									name='company_name'
									className='company-input'
									placeholder='회사명 입력'
									maxLength={30}
									spellCheck='false'
									data-ms-editor='true'
									caption={
										<div className='error-text'>이미 사용중인 회사명입니다</div>
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
															message: '이미 사용중인 회사명입니다.',
														});
													},
												},
											);
									}}
								/>
								<RHFInput
									wrapperClassName='company-tel'
									label='회사 전화번호'
									required
									type='number'
									id='company_phone_number'
									name='company_phone_number'
									className='company-input'
									maxLength={30}
									placeholder='회사 전화번호 입력'
									spellCheck='false'
									data-ms-editor='true'
									caption={
										<div className='error-text'>
											전화번호 형식이 잘못되었습니다
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
															message: '전화번호 형식이 잘못되었습니다',
														});
													},
												},
											);
									}}
								/>
								<RHFInput
									wrapperClassName='manager-name'
									label='담당자 성함'
									required
									type='text'
									id='employee_name'
									name='employee_name'
									className='company-input'
									placeholder='담당자 성함 입력'
									spellCheck='false'
									data-ms-editor='true'
								/>

								<RHFSelect
									wrapperClassName='manager-tel'
									label='담당자 직위'
									required
									id='contact_position'
									name='contact_position'
									options={options}
									className='company-input'
								/>
								<RHFInput
									wrapperClassName='manager-tel'
									label='담당자 전화번호'
									required
									type='number'
									minLength={11}
									maxLength={11}
									id='employee_phone_number'
									name='employee_phone_number'
									className='company-input'
									placeholder='01012345678'
									spellCheck={false}
									data-ms-editor='true'
									caption={
										<div className='error-text'>핸드폰번호를 입력해주세요</div>
									}
								/>

								<RHFInput
									wrapperClassName='manager-email'
									label='담당자 이메일(계산서 발행)'
									required
									type='text'
									id='employee_email'
									name='employee_email'
									className='company-input'
									placeholder='담당자 이메일 입력'
									spellCheck='false'
									data-ms-editor='true'
									caption={
										<div className='error-text'>
											이메일 형식을 확인해주세요.
										</div>
									}
								/>
								<RHFInput
									wrapperClassName='manager-email'
									label='업종'
									required
									type='text'
									id='sector'
									name='sector'
									className='company-input'
									placeholder='업태/업종 입력'
									spellCheck='false'
									data-ms-editor='true'
									caption={
										<div className='error-text'>
										</div>
									}
								/>
								<div className='business-num-wrap'>
									<RHFInput
										wrapperClassName='business-num  flex-1'
										required
										label='사업자 등록번호 (10자리)'
										type='phoneNumber'
										minLength={12}
										maxLength={12}
										id='business_registration_number'
										name='business_registration_number'
										className='company-input'
										placeholder='사업자 번호 입력 (-없이 입력)'
										spellCheck={false}
										data-ms-editor='true'
										readOnly={isReadonly}
										caption={
											<div className='error-text'>
												이미 사용중인 사업자 번호입니다.
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
												확인
											</button>
										}
									/>
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
											사업자 등록증 첨부<span className='essential text-danger'>*</span>
										</div>
										{errors?.business_license && (
											<span className='text-danger'>
												{String(errors.business_license.message)}
											</span>
										)}
									</div>
									<div className='file-wrap'>
										<div className='error-text'>
											사업자 등록증을 첨부해주세요
										</div>
										<div
											className={clsx(
												'file-name',
												errors?.business_license && 'border-danger',
											)}>
											{file?.name || 'png, pdf, jpeg, jpg 확장자 가능'}
										</div>
										<label htmlFor='business_license' className='file-label'>
											찾아보기
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
										추가 서류 필요시 추가 요청이 있을 수 있습니다.
									</div>
								</div>
								<Button
									loading={isSubmitting}
									className='link link-step01'
									onClick={onSubmit}
									disabled={
										!(Object.keys(dirtyFields).length > 7 && imageUploaded)
									}>
									다음
								</Button>
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
					<Modal.Title>확인사항</Modal.Title>
				</Modal.Header>
				<Modal.Body className='text-center py-[10px]'>
					{message || '존재하지 않는 사업자 번호입니다.'}
				</Modal.Body>
				<Modal.Footer>
					<Button
						className=' bg-primary text-white px-4'
						onClick={ModalhandleClose}>
						확인
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Step3;
