import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Col, Modal, Row } from 'react-bootstrap';
import {
	FormProvider,
	RHFInput,
	Yup,
	useForm,
	yupResolver,
	Button,
} from '@src/components/common';
import { useChangePassword } from '@src/apis/user';
import { clsx } from 'clsx';
import { PASSWORD_REGEX } from '@src/constants';
import Link from 'next/link';
import Input from '@src/components/common/Input';
import { Controller } from "react-hook-form";

const defaultValues = {
	old_password: '',
	new_password: '',
	confirm_password: '',
};

const ChangePasswordSchema = Yup.object({
  old_password: Yup.string().required('이전 비밀번호가 필요합니다.'),
  new_password: Yup.string()
    .required('새 비밀번호가 필요합니다.')
    .notOneOf([Yup.ref('old_password')], '새 비밀번호는 이전 비밀번호와 같을 수 없습니다.')
    .matches(
      PASSWORD_REGEX,
      '문자, 대문자, 숫자, 기호를 조합하여 8자 이상을 입력하세요.',
    )
    .min(8, '비밀번호는 8자 이상이어야 합니다.'),
  confirm_password: Yup.string()
    .required('비밀번호 확인이 필요합니다.')
		// @ts-ignore
    .oneOf([Yup.ref('new_password'), null], '비밀번호 형식이 맞지 않습니다.'),
});


export default function ChangePasswordScreen() {
	const { mutateAsync: changePassword, isLoading } = useChangePassword();
	const router = useRouter();

	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState(false);
	const [showPassword, setShowPassword] = useState<{
		old_password: boolean;
		new_password: boolean;
		confirm_password: boolean;
	}>({ old_password: false, new_password: false, confirm_password: false });

	const toggleVisiblePassword = (field: string) => {
		setShowPassword({
			...showPassword,
			[field]: !showPassword[field],
		});
	};

	const methods = useForm({
		defaultValues,
		resolver: yupResolver(ChangePasswordSchema),
	});
	const {
		formState: { dirtyFields },
		handleSubmit,
		control,
		reset,
	} = methods;

	const onSubmit = handleSubmit(async (props) => {
		await changePassword(props, {
			onSuccess: () => {
				setError(false);
				setShowModal(true);
				reset();
			},
			onError: (error: string) => {
				setError(true);
				// toast(error, { type: 'error' });
			},
		});
	});

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.code === 'Enter' && !showModal) {
				event.preventDefault(); // Prevent form submission
				onSubmit().then(() => {});
			}
		};
		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [showModal]);

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.code === 'Enter') {
				event.preventDefault(); // Prevent form submission
				setShowModal(false);
			}
		};
		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	return (
		<>
			<Row style={{backgroundColor : "#F5F7FB"}}>
				<Col md='12'>
					<div className='change-password-content p-10'>
						<FormProvider methods={methods}>
							<div className='form-wrap'>
								<div className='change-password-wrap'>
									<div className='title-wrap p-0'>
										<div className='title'>비밀번호 변경</div>
										<div className='sub-text'>
											문자, 숫자, 기호를 조합하여 8자 이상
										</div>
									</div>
									<ul className='list-wrap-11'>
										<Controller
											control={control}
											name={'old_password'}
											render={({ field: { onChange, onBlur, ref, value }, fieldState: { error } }) => (
												<Input
													// @ts-ignore
													ref={ref}
													onBlur={onBlur}
													onChange={e => {onChange(e.target.value);setError(false)}}
													value={value}
													label='기존 비밀번호'
													type={showPassword.old_password ? 'text' : 'password'}
													id='old_password'
													name='old_password'
													className='input-pass form-control input-wrap'
													placeholder='비밀번호 입력'
													right={
														<i
															className={clsx(
																`icon pw-show`,
																showPassword.old_password && 'active',
															)}
															onClick={() => toggleVisiblePassword('old_password')}
														/>
													}
													errorPosition='bottom'
													justifyEnd={false}
													error={false}
														/>
											)}
										/>
										{error && <span className='pull-right text-danger'>비밀번호가 일치하지 않습니다.</span>}
										<RHFInput
											label='새 비밀번호'
											type={showPassword.new_password ? 'text' : 'password'}
											id='new_password'
											name='new_password'
											className='input-pass form-control input-wrap'
											placeholder='새 비밀번호 입력'
											right={
												<i
													className={clsx(
														`icon pw-show`,
														showPassword.new_password && 'active',
													)}
													onClick={() => toggleVisiblePassword('new_password')}
												/>
											}
											errorPosition='bottom'
											justifyEnd={false}
										/>
										<RHFInput
											label='새 비밀번호 재입력'
											type={showPassword.confirm_password ? 'text' : 'password'}
											id='confirm_password'
											name='confirm_password'
											className='input-pass form-control input-wrap'
											placeholder='새 비밀번호 재입력'
											right={
												<i
													className={clsx(
														`icon pw-show`,
														showPassword.confirm_password && 'active',
													)}
													onClick={() =>
														toggleVisiblePassword('confirm_password')
													}
												/>
											}
											errorPosition='bottom'
											justifyEnd={false}
										/>
									</ul>
								</div>
								<div className='btn-wrap'>
									<Link href='/dashboard/my-info' className='cancel-btn btns'>
										취소
									</Link>
									<Button
										loading={isLoading}
										type='submit'
										className='modify-btn btnss'
										onClick={onSubmit}
										disabled={Object.keys(dirtyFields).length !== 3}>
										수정완료
									</Button>
								</div>
							</div>
						</FormProvider>
					</div>
				</Col>
				<Modal show={showModal} centered size='sm' backdrop='static'>
					<Modal.Body>
						<div className='text-center my-4'>
							<div className='text-[#2C324C] text-xl	font-bold text-left mb-3'>변경완료</div>
							<div className='mb-3 p-3 border-y-[1px] border-[#EEEEEE] text-[14px]'>비밀번호 변경이 완료되었습니다.</div>
							<div className='flex flex-row justify-end'>
								<Button
									onClick={() => setShowModal(false)}
									className='bg-primary text-white flex justify-center px-4'>
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
