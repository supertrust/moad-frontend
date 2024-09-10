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
import useAuth from '@src/hooks/useAuth';
import { useIcarusContext } from "@src/hooks/useIcarusContext";


const defaultValues = {
	old_password: '',
	new_password: '',
	confirm_password: '',
};



export default function ChangePasswordScreen() {
	const { dictionary: { changePasswordScreen, pageTitle }, isKorean } = useAuth();
	const { setPageTitle } = useIcarusContext();
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

	const ChangePasswordSchema = Yup.object({
		old_password: Yup.string().required(changePasswordScreen.validations.oldPassword.required),
		new_password: Yup.string()
			.required(changePasswordScreen.validations.newPassword.required)
			.notOneOf([Yup.ref('old_password')], changePasswordScreen.validations.newPassword.notEqualsToOldPassword)
			.matches(
				PASSWORD_REGEX,
				changePasswordScreen.validations.newPassword.checkFormat,
			)
			.min(8, changePasswordScreen.validations.newPassword.checkLength),
		confirm_password: Yup.string()
			.required(changePasswordScreen.validations.confirmPassword.required)
			// @ts-ignore
			.oneOf([Yup.ref('new_password'), null], changePasswordScreen.validations.confirmPassword.shouldMatchNewPassword),
	});

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

	useEffect(() => setPageTitle(pageTitle["top_bar_my_page"]), [isKorean]);

	return (
		<>
			<Row style={{backgroundColor : "#F5F7FB"}}>
				<Col md='12'>
					<div className='change-password-content p-10'>
						<FormProvider methods={methods}>
							<div className='form-wrap'>
								<div className='change-password-wrap'>
									<div className='title-wrap p-0'>
										<div className='title'>{changePasswordScreen.title}</div>
										<div className='sub-text'>
											{changePasswordScreen.subText}
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
													label={changePasswordScreen.oldPassword}
													type={showPassword.old_password ? 'text' : 'password'}
													id='old_password'
													name='old_password'
													className='input-pass form-control input-wrap'
													placeholder={changePasswordScreen.oldPasswordPlaceholder}
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
										{error && <span className='pull-right text-danger'>{changePasswordScreen.passwordsNotMatchError}</span>}
										<RHFInput
											label={changePasswordScreen.newPassword}
											type={showPassword.new_password ? 'text' : 'password'}
											id='new_password'
											name='new_password'
											className='input-pass form-control input-wrap'
											placeholder={changePasswordScreen.newPasswordPlaceholder}
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
											label={changePasswordScreen.confirmPassword}
											type={showPassword.confirm_password ? 'text' : 'password'}
											id='confirm_password'
											name='confirm_password'
											className='input-pass form-control input-wrap'
											placeholder={changePasswordScreen.confirmPasswordPlaceholder}
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
										{changePasswordScreen.cancelText}
									</Link>
									<Button
										loading={isLoading}
										type='submit'
										className='modify-btn btnss'
										onClick={onSubmit}
										disabled={Object.keys(dirtyFields).length !== 3}>
											{changePasswordScreen.completeEditText}
									</Button>
								</div>
							</div>
						</FormProvider>
					</div>
				</Col>
				<Modal show={showModal} centered size='sm' backdrop='static'>
					<Modal.Body>
						<div className='text-center my-4'>
							<div className='text-[#2C324C] text-xl	font-bold text-left mb-3'>{changePasswordScreen.modal.title}</div>
							<div className='mb-3 p-3 border-y-[1px] border-[#EEEEEE] text-[14px]'>{changePasswordScreen.modal.description}</div>
							<div className='flex flex-row justify-end'>
								<Button
									onClick={() => setShowModal(false)}
									className='bg-primary text-white flex justify-center px-4'>
									{changePasswordScreen.modal.btn}
								</Button>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			</Row>
		</>
	);
}
