import {
	FormProvider,
	RHFInput,
	useForm,
	yupResolver,
	Button,
} from '@src/components/common';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { PASSWORD_REGEX } from '@src/constants';
import Image from 'next/image';
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

const RegisterSchema = Yup.object({
	email: Yup.string()
		.email('아이디(이메일)를 확인해주세요')
		.required('아이디(이메일)를 확인해주세요'),
	password: Yup.string()
		.required('비밀번호가 필요합니다.')
		.matches(
			PASSWORD_REGEX,
			'비밀번호는 문자, 숫자, 특수 문자를 조합하여 8자 이상이어야 합니다.',
		)
		.min(8, '비밀번호는 8자 이상이어야 합니다.'),
	confirm_password: Yup.string()
		.required('비밀번호 확인이 필요합니다.')
		.oneOf(
			// @ts-ignore
			[Yup.ref('password'), null],
			'비밀번호가 일치하지 않습니다.',
		),
});

const Step2 = ({
	onPrevStep,
	onNextStep,
	setMembershipInformation,
}: Step2Props) => {
	const { mutateAsync: verifyInput } = useVerifyInput();
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
					setError('email', { message: '이미 사용중인 아이디입니다.' });
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
						<div onClick={onPrevStep} className='back-btn'></div>
						<div className='step-title'>
							회원가입 정보를
							<br />
							입력해주세요
						</div>
						<div className='step-text'>회원여부 확인 및 가입을 진행합니다</div>
						<FormProvider methods={methods}>
							<div className='user-info'>
								<RHFInput
									type='text'
									className='user-input'
									placeholder='이메일 입력'
									name='email'
									id='email'
									label='아이디 (이메일)'
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
															message: '이미 사용중인 아이디입니다.',
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
									label='비밀번호'
									placeholder='비밀번호 입력'
									caption={
										<p className='pw-info-text'>
											문자, 숫자, 기호를 조합하여 8자 이상을 사용하세요
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
									placeholder='비밀번호 재입력'
									label='비밀번호 확인'
									right={
										<span
											className={`icon pw-show ${
												visiblePasswordConfirmation && 'active'
											}`}
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
									다음
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
