import { styles } from '@src/sections/login/find-password/index';
import React, { useEffect } from 'react';
import {
	FormProvider,
	RHFInput,
	useForm,
	yupResolver,
	Button,
} from '@src/components/common';
import * as Yup from 'yup';
import { CheckUserProps } from '@src/types/auth';
import { toast } from 'react-toastify';
import { useCheckUser } from '@src/apis/auth';

type Step1Props = {
	step: number;
	onCheckUserSuccess: (string: string) => void;
	onClose: () => void;
	onFindId: () => void;
};

const defaultValues: CheckUserProps = {
	email: '',
	company_name: '',
	company_phone_number: '',
};

const CheckUserSchema = Yup.object({
	email: Yup.string().required('이메일이 필요합니다'),
	company_name: Yup.string().required('Company name is required'),
	company_phone_number: Yup.string()
		.required('Company Phone is required')
		.matches(/^[0-9]{11}$/, 'Should be 11 digits'),
});

const Step1 = ({ step, onCheckUserSuccess, onClose, onFindId }: Step1Props) => {
	const { mutateAsync: checkUser, isLoading } = useCheckUser();

	const methods = useForm<CheckUserProps>({
		defaultValues,
		resolver: yupResolver(CheckUserSchema),
	});

	const {
		handleSubmit,
		formState: { dirtyFields },
	} = methods;

	const onSubmit = handleSubmit(async (props) => {
		await checkUser(
			{
				...props,
			},
			{
				onSuccess: (res) => {
					onCheckUserSuccess(props.email);
				},
				onError: (err) => {
					toast(err || 'Something went wrong Please try again later', {
						type: 'error',
					});
				},
			},
		);
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
	}, []);

	return (
		<div
			id='step01_modal'
			className={`${styles.step01_modal} ${styles.model_wrap} ${
				step === 1 ? styles.active : null
			}`}>
			<div className={styles.model_title}>비밀번호 찾기</div>
			<div className={styles.modal_text}>
				가입시 등록했던 정보를 입력해주세요.
				<br />
				아이디(이메일)을 잊으셨나요?
				<button
					onClick={onFindId}
					type='button'
					id='id_find_link'
					className={styles.id_find_link}>
					아이디찾기
				</button>
			</div>
			<FormProvider methods={methods}>
				<div className={styles.input_content}>
					<div className={styles.input_wrap}>
						<div className={styles.input_text}>
							아이디 (이메일)<span className={styles.essential}>*</span>
						</div>
						<RHFInput
							required
							id='pw_find_email'
							name='email'
							className={`${styles.user_email} ${styles.input}`}
							type='text'
							placeholder='이메일 입력'
						/>
						<div className={`${styles.email_error_text} ${styles.error_text}`}>
							아이디(이메일)를 확인해주세요
						</div>
					</div>
					<div className={styles.input_wrap}>
						<div className={styles.input_text}>
							회사명<span className={styles.essential}>*</span>
						</div>
						<RHFInput
							required
							type='text'
							id='pw_find_company_name'
							name='company_name'
							className={`${styles.company_name} ${styles.input}`}
							placeholder='회사명 입력'
						/>
						<div
							className={`${styles.company_error_text} ${styles.error_text}`}>
							회사명을 확인해주세요
						</div>
					</div>
					<div className={styles.input_wrap}>
						<div className={styles.input_text}>
							전화번호<span className={styles.essential}>*</span>
						</div>
						<RHFInput
							required
							type='number'
							id='pw_find_company_phone'
							name='company_phone_number'
							className={`${styles.user_phone} ${styles.input}`}
							placeholder='전화번호 입력'
						/>
						<div className={`${styles.phone_error_text} ${styles.error_text}`}>
							전화번호를 확인해주세요
						</div>
					</div>
				</div>
				<div className={styles.btn_wrap}>
					<Button
						id='step01_confirm'
						loading={isLoading}
						onClick={onSubmit}
						disabled={Object.keys(dirtyFields).length !== 3}
						className={`${styles.confirm_btn} ${styles.btns} ${
							isLoading && styles.confirm_btn_loading
						}`}>
						확인
					</Button>
					<button
						type='button'
						onClick={onClose}
						className={`${styles.pw_modal_close} ${styles.cancel_btn} ${styles.btns}`}>
						취소
					</button>
				</div>
			</FormProvider>
		</div>
	);
};

export default Step1;
