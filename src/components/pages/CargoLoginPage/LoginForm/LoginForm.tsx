import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useCargoLogin } from "@src/apis/cargo/cargo-auth";
import clsx from "clsx";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Controller, useFormContext } from "react-hook-form";
import * as Yup from 'yup';
import  styles  from './styles.module.scss';
import useAuth from '@src/hooks/useAuth';
import {  Input } from 'antd';
import {
	RHFInput,
	FormProvider,
	useForm,
	yupResolver,
	Button,
} from '@src/components/common';

const defaultValues = {
	phone: '',
	password: '',
};

const LoginSchema = Yup.object({
	phone: Yup.string().required('이메일이 필요합니다'),
	password: Yup.string().required('비밀번호가 필요합니다'),
});

const InputPassword = (props)=>
{
	const {ref,required,label,...rest} = props;
	return <div>
		<div className='flex flex-row justify-between items-center'>
			{label && (
				<div className="desc mb-2 mr-3">
					{label && (<span className="font-bold">{label}</span>)}
					{required && (<span className="essential text-danger">*</span>)}
				</div>
			)}
			{/*{error && errorPosition == 'top' && <span className="text-danger">{error}</span>}*/}
		</div>
		<Input.Password
			ref={ref}
			{...rest}
			style={{height : "40px"}}
			iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
		/>
	</div>
}

const InputText = (props)=>
{
    const {ref,label,required,...rest} = props;
	return <div>
		<div className='flex flex-row justify-between items-center'>
			{label && (
				<div className="desc mb-2 mr-3">
					{label && (<span className="font-bold">{label}</span>)}
					{required && (<span className="essential text-danger">*</span>)}
				</div>
			)}
			{/*{error && errorPosition == 'top' && <span className="text-danger">{error}</span>}*/}
		</div>
		<Input   ref={ref}
				 {...rest} size={'large'} style={{height : "40px"}} />
	</div>;

}

const RHFAntInput = (props)=>
{

	const { name, ...rest } = props;
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, ref, value }, fieldState: { error } }) => (
				<InputText
					// @ts-ignore
					ref={ref}
					onBlur={onBlur}
					onChange={e => onChange(e.target.value)}
					value={value}
					name={name}
					error={error?.message}
					{...rest}
				/>
			)}
		/>
	)
}

const RHFAntInputPass = (props) =>
{
	const { name, ...rest } = props;
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, ref, value }, fieldState: { error } }) => (
				<InputPassword
					// @ts-ignore
					ref={ref}
					onBlur={onBlur}
					onChange={e => onChange(e.target.value)}
					value={value}
					name={name}
					error={error?.message}
					{...rest}
				/>
			)}
		/>
	)
}

const LoginFormModule = () => {
	const {login } = useAuth()
	const router = useRouter();
	const [error,setError] = useState('')
	const methods = useForm({
		defaultValues,
		resolver: yupResolver(LoginSchema),
	});

	const {
		handleSubmit,
		getValues,
		formState: { isSubmitting,dirtyFields },
	} = methods;


	const onSubmit = handleSubmit(async (props) => {
		try {
			 await login(props);
			toast('성공적으로 로그인했습니다', { type: 'success' });
			// router.push('/dashboard/cargo');
		} catch (error) {
			setError("아이디 또는 비밀번호를 확인하세요")
			toast('아이디 또는 비밀번호를 확인하세요.', {
				type: 'error',
			});
		}
	});
	const [isVisible, setVisible] = useState(false);

	const toggle = () => {
		setVisible(!isVisible);
	};


	return (
		<FormProvider methods={methods}>
			<form action='' className={''}>


				<div className={'flex flex-col space-y-5'}>

					<RHFAntInput
						name='phone'
						type='text'
						placeholder="휴대폰 번호 입력"
						label='아이디'
						status={error?.length ? 'error' : ''}
					/>

					<RHFAntInputPass
						name='password'
						type='text'
						placeholder='비밀번호 입력'
						label='비밀번호'
						status={error?.length ? 'error' : ''}
					/>


				</div>
				<div style={{
					paddingTop : "5px",
					paddingBottom : "5px"
				}}>
					<span className={styles['error-text']}>
					{error}
				</span>
				</div>

				<Button
					type={'submit'}
					id='login_btn'
					disabled={Object.values(dirtyFields).filter((value) => value === true).length !== 2}
					className={clsx("h-12 flex text-center items-center justify-center opacity-100" +
						" mt-[21px] w-[100%]", Object.values(dirtyFields).filter((value) => value === true).length !== 2 ? "!bg-[#efeef0]" : "bg-[#0868fd]")}
					onClick={onSubmit}
					loading={isSubmitting}>
					<span className={clsx(styles['login-text'],Object.values(dirtyFields).filter((value) => value === true).length !== 2 ? "text-['#c8c5cb']" : "text-[#fff]")}>
						로그인
					</span>
				</Button>
			</form>
		</FormProvider>
	);
};

export default LoginFormModule;
