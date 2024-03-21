import {
	FormProvider,
	RHFInput,
	useForm,
	yupResolver,
	Button,
} from '@src/components/common';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@src/constants';
import Image from 'next/image';
import useAuth from "@src/hooks/useAuth";
import { RegisterPropsType } from '@src/types/auth';
import { useVerifyInput } from '@src/apis/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Step2Props {
	onPrevStep: () => void;
	onNextStep: () => void;
	setMembershipInformation: (MembershipInformation: RegisterPropsType) => void;
}

const defaultValues = {
	confirm_password: '',
	email: '',
	password: '',
};

const Step2 = ({
	onPrevStep,
	onNextStep,
	setMembershipInformation,
}: Step2Props) => {
  const { dictionary:{ signup: { step2 } } } = useAuth();
	const { mutateAsync: verifyInput } = useVerifyInput();

	const RegisterSchema = Yup.object({
		email: Yup.string()
			.matches(EMAIL_REGEX, step2.validations.email.format)
			.required(step2.validations.email.required),
		password: Yup.string()
			.required(step2.validations.password.required)
			.matches(
				PASSWORD_REGEX,
				step2.validations.password.format,
			)
			.min(8, step2.validations.password.checkLength),
		confirm_password: Yup.string()
			.required(step2.validations.confirm_password.required)
			.oneOf(
				// @ts-ignore
				[Yup.ref('password'), null],
				step2.validations.confirm_password.oneOf,
			),
	});

	const methods = useForm<RegisterPropsType>({
		defaultValues,
		//@ts-ignore
		resolver: yupResolver(RegisterSchema),
	});
	const {
		handleSubmit,
		formState: { dirtyFields, errors },
		setError,
		setFocus,
	} = methods;

	const [visiblePassword, setVisiblePassword] = useState(false);
	const [visiblePasswordConfirmation, setVisiblePasswordConfirmation] =
		useState(false);

	const onSubmit = handleSubmit(async (props) => {
		await verifyInput(
			{ key: 'email', value: props.email },
			{
				onSuccess: () => {
					setMembershipInformation(props);
					onNextStep();
				},
				onError: (error) => {
					setError('email', { message: step2.onSubmit.error });
					setFocus('email');
				},
			},
		);
	});

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.code === 'Enter' && Object.keys(dirtyFields).length === 3) {
				event.preventDefault(); // Prevent form submission
				onSubmit().then(() => {});
			}
		};
		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [Object.keys(dirtyFields).length !== 3]);

	return (
		<div className='step02 step-section'>
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
						<div onClick={onPrevStep} className='back-btn cursor-pointer'></div>
						<div className='step-title'>
							{step2.stepTitle[0]}
							<br />
							{step2.stepTitle[1]}
						</div>
						<div className='step-text'>{step2.stepText}</div>
						<FormProvider methods={methods}>
							<div className='user-info'>
								<RHFInput
									type='text'
									className='user-input'
									placeholder={step2.emailPlaceholder}
									name='email'
									id='email'
									label={step2.emailLabel}
									errorPosition="bottom"
									onBlur={(event) => {
										if (errors.email) return;
										event.target.value &&
											verifyInput(
												{ key: 'email', value: event.target.value },
												{
													onSuccess: () => {
														setError('email', { message: '' });
													},
													onError: (error) => {
														setError('email', {
															message: step2.emailOnErrorMsg,
														});
														//   setFocus("email");
													},
												},
											);
									}}
								/>
								<RHFInput
									type={visiblePassword ? 'text' : 'password'}
									className='user-input'
									name='password'
									id='password'
									label={step2.passwordLabel}
									errorPosition="bottom"
									placeholder={step2.passwordPlaceholder}
									caption={
										<p className='pw-info-text'>
											{step2.passwordCaption}
										</p>
									}
									right={
										<span
											className={`icon pw-show ${!visiblePassword && 'active'}`}
											onClick={() => setVisiblePassword(!visiblePassword)}
										/>
									}
								/>
								<RHFInput
									type={visiblePasswordConfirmation ? 'text' : 'password'}
									id='confirm_password'
									className='user-input'
									name='confirm_password'
									errorPosition="bottom"
									placeholder={step2.confirmPasswordPlaceholder}
									label={step2.confirmPasswordLabel}
									right={
										<span
											className={`icon pw-show ${!visiblePasswordConfirmation && 'active'}`}
											onClick={() =>
												setVisiblePasswordConfirmation(
													!visiblePasswordConfirmation,
												)
											}
										/>
									}
								/>
								<Button
									className='link link-step01'
									onClick={onSubmit}
									disabled={Object.keys(dirtyFields).length !== 3}>
									{step2.btn}
								</Button>
							</div>
						</FormProvider>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Step2;
