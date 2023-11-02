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
import clsx from 'clsx';

const defaultValues = {
	username: '',
	password: '',
};

const LoginSchema = Yup.object({
	username: Yup.string().required('아이디(이메일)를 확인해주세요.'),
	password: Yup.string().required('비밀번호를 입력해주세요.'),
});

const LoginForm = ({ enabledSubmit }: { enabledSubmit: boolean }) => {
	const { login } = useAuth();
	const router = useRouter();
	const [remeberId, setRemeberId] = useState<boolean>(false);
	const [error, setFormError] = useState<boolean>(false);
	const [username, setUsername] = useState('');
	const [password, setpassword] = useState('');
	const [form, setform] = useState(true);
	const [visiblePassword, setVisiblePassword] = useState(false);

	const canBeSubmitted = () => {
		const isValid =
			username.trim().length && // Username
			password.trim().length; // Password

		if (isValid) {
			setform(true);
		} else {
			setform(false);
		}
	};

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
			await login(props);
			setFormError(false);
			toast('성공적으로 로그인했습니다', { type: 'success' });
		} catch (error) {
			setFormError(true);
			toast('로그인에 실패했습니다. 자격 증명을 확인하십시오.', {
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
					name='username'
					className={`user-input ${error ? 'error' : 'active'}`}
					type='text'
					placeholder='이메일 입력'
					label='아이디'
					caption='아이디를 잊어버리셨나요?'
					captionPosition='top'
					errorPosition="bottom"
					labelClassName='font-medium'
				/>
				<i className='icon pw-show'></i>
				<RHFInput
					type={visiblePassword ? 'text' : 'password'}
					placeholder='비밀번호 입력'
					name='password'
					label='비밀번호'
					caption='비밀번호를 잊어버리셨나요?'
					className={`user-input ${error ? 'error' : 'active'}`}
					right={
						<span
							className={`icon pw-show ${visiblePassword && 'active'}`}
							onClick={() => setVisiblePassword(!visiblePassword)}
						/>
					}
					captionPosition='top'
					errorPosition="bottom"
					labelClassName='font-medium'
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
				{/*<div className={`${styles.check_mark} flex items-center justify-between`}>
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
						<div className='chk-text'>아이디기억하기</div>
					</label>
					<div
						className={`${
							error ? 'block' : 'hidden'
						} text-sm text-[#F24747] mt-[22px] mb-[30px]`}>
						아이디또는 비밀번호를 확인하세요
					</div> 
				</div>*/}
				<Button
					id='login_btn'
					className={clsx(
						styles.login_btn , "mt-4 font-semibold",  
						form ? styles.active : styles.disabled
					)}
					onClick={onSubmit}
					loading={isSubmitting}
					disabled={
						Object.keys(dirtyFields).length !== 2 &&
						!isSubmitting &&
						!enabledSubmit
					}>
					로그인
				</Button>
			</form>
		</FormProvider>
	);
};

export default LoginForm;