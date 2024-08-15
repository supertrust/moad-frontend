import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import styles from './style.module.css';
import useAuth from '@src/hooks/useAuth';
import {
	RHFInput,
	FormProvider,
	useForm,
	yupResolver,
	Button,
} from '@src/components/common';
import { EMAIL_REGEX } from '@src/constants';

const defaultValues = {
	email: '',
	password: '',
};

const LoginFormModule = ({ enabledSubmit }: { enabledSubmit: boolean }) => {
	const router = useRouter();
	const {returnUrl} = router.query;
	const { login, dictionary:{ login:{ loginForm } } } = useAuth();
	const [remeberId, setRemeberId] = useState<boolean>(false);
	const [error, setFormError] = useState<boolean>(false);
	const [email, setEmail] = useState('');
	const [password, setpassword] = useState('');
	const [form, setform] = useState(true);
	const [visiblePassword, setVisiblePassword] = useState(false);

	const canBeSubmitted = () => {
		const isValid =
			email.trim().length && // Email
			password.trim().length; // Password

		if (isValid) {
			setform(true);
		} else {
			setform(false);
		}
	};

	const LoginSchema = Yup.object({
		email: Yup.string()
			.matches(EMAIL_REGEX, loginForm.validations.email.format)
			.required(loginForm.validations.email.required),
		password: Yup.string().required(loginForm.validations.password.required),
	});

	// useEffect(() => canBeSubmitted());
	const methods = useForm({
		defaultValues,
		resolver: yupResolver(LoginSchema),
	});

	const {
		handleSubmit,
		formState: { isSubmitting, dirtyFields },
	} = methods;

	const onSubmit = handleSubmit(async (props) => {
		if (!enabledSubmit) return;
		try {
			const isActiveUser = await login(props);
			setFormError(false);
			if(isActiveUser) {
				toast(loginForm.onSubmit.successToast, { type: 'success' });
				await router.replace(returnUrl as string || "/dashboard")
			}
		} catch (error) {
			setFormError(true);
			toast(loginForm.onSubmit.errorToast, {
				type: 'error',
			});
		}
	});

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.code === 'Enter') {
				event.preventDefault(); // Prevent form submission
				onSubmit().then(() => {});
			}
		};
		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [enabledSubmit]);

	return (
		<FormProvider methods={methods}>
			<form action='' className='login-form'>
				<RHFInput
					name='email'
					className={`user-input ${error ? 'error' : 'active'}`}
					type='text'
					placeholder={loginForm.emailPlaceholder}
					label={loginForm.emailLabel}
					// value={email}
					// onChange={(e) => setEmail(e.target.value)}
				/>
				<i className='icon pw-show'></i>
				<RHFInput
					type={visiblePassword ? 'text' : 'password'}
					placeholder={loginForm.passwordPlaceholder}
					name='password'
					label={loginForm.passwordLabel}
					className={`user-input ${error ? 'error' : 'active'}`}
					// value={password}
					// onChange={(e) => setpassword(e.target.value)}
					right={
						<span
							className={`icon pw-show ${visiblePassword && 'active'}`}
							onClick={() => setVisiblePassword(!visiblePassword)}
						/>
					}
				/>
				{/*<div className="login-utile-wrap flex-column align-items-start gap-2">
          <div className="login-keep-wrap">
            <label htmlFor="login_keep">
              <input type="checkbox" id="login_keep" className="login-keep" />
              <div className="chk-text">아이디기억하기</div>
            </label>
          </div>
          <div className="login-error w-100">
            <div className="bg-danger rounded-2 p-2 text-white">아이디/비밀번호를 확인하세요</div>
          </div>
        </div>*/}
				<div
					className={`${styles.check_mark} flex items-center justify-between`}>
					<label
						htmlFor='chk_1'
						className={`${styles.chk_wrap} flex items-center gap-1 text-sm mt-[22px] mb-[30px]`}>
						<input
							checked={remeberId}
							type='checkbox'
							id='chk_1'
							className={`${styles.remeber_chk}`}
							onChange={() => setRemeberId(!remeberId)}
						/>
						<div className='chk-text'>{loginForm.rememberIdLabel}</div>
					</label>
					<div
						className={`${
							error ? 'block' : 'hidden'
						} text-sm text-[#F24747] mt-[22px] mb-[30px]`}>
						{loginForm.errorMsg}
					</div>
				</div>
				<Button
					id='login_btn'
					className={`${styles.login_btn} ${
						form ? styles.active : styles.disabled
					} `}
					onClick={onSubmit}
					loading={isSubmitting}
					disabled={
						Object.keys(dirtyFields).length !== 2 &&
						!isSubmitting &&
						!enabledSubmit
					}>
					{loginForm.loginBtn}
				</Button>
			</form>
		</FormProvider>
	);
};

export default LoginFormModule;
