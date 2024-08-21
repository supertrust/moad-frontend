import React, { useEffect, useState } from 'react';
import { styles } from './index';
import { useFindId } from '@src/apis/auth';
import {
	FormProvider,
	RHFInput,
	useForm,
	yupResolver,
	Button,
} from '@src/components/common';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FindIdProps } from '@src/types/auth';
import { useRouter } from 'next/router';
import useAuth from "@src/hooks/useAuth";

const defaultValues: FindIdProps = {
	business_registration_number : '',
};

const LoginSchema = Yup.object({
	business_registration_number : Yup.string().required('Business registration number is required'),
});
const FindIdModel = ({ SetFindId }: { SetFindId: (show: boolean) => void }) => {
	const router = useRouter();
  const { dictionary:{ login:{findIdModal} } } = useAuth();
	const { mutateAsync: findId, isLoading } = useFindId();
	const [id, setId] = useState<string | boolean>();

	const methods = useForm<FindIdProps>({
		defaultValues,
		resolver: yupResolver(LoginSchema),
	});

	const {
		handleSubmit,
		formState: { dirtyFields },
	} = methods;

	const onSubmit = handleSubmit(async (props) => {
		try {
			await findId(
				{
					...props,
				},
				{
					onSuccess: (res) => {
						setId(res);
					},
				},
			);
			toast.success(findIdModal.onSubmit.successToast);
		} catch (error) {
			setId(false);
			toast.error(findIdModal.onSubmit.errorToast);
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
	}, []);

	return (
		<>
			<div id={styles.id_find_modal} className='id-find-modal'>
				<div className={styles.modal_wrap}>
					<div className={styles.modal_title}>{findIdModal.title}</div>
					<div className={styles.modal_text}>
						{findIdModal.text}
					</div>
					<form
						action='/login'
						id='id_find_form'
						className={styles.id_find_form}>
						<FormProvider methods={methods}>
							<div className={styles.input_content}>
								<div className={styles.input_wrap}>
									<div className={styles.input_text}>
									{findIdModal.regNoLabel}<span className={styles.essential}>*</span>
									</div>
									<RHFInput
										required
										type='text'
										id='id_find_business_registration_number'
										name='business_registration_number'
										className={`${styles.user_company} ${styles.input} `}
										placeholder={findIdModal.regNoPlaceholder}
										spellCheck='false'
										data-ms-editor='true'
									/>
								</div>
								{/* <div className={styles.input_wrap}>
									<div className={styles.input_text}>
										전화번호<span className={styles.essential}>*</span>
									</div>
									<RHFInput
										required
										type='text'
										id='id_find_company_phone'
										name='company_phone_number'
										className={`${styles.user_num} ${styles.input}`}
										placeholder='전화번호 입력'
										spellCheck='false'
										data-ms-editor='true'
									/>
								</div> */}
							</div>

							{id && (
								<div className={styles.id_message}>
									{findIdModal.idMsg[0]}
									<br />
									<span className={styles.user_mail}>{id}</span> {findIdModal.idMsg[1]}.
								</div>
							)}

							{id === false && (
								<div className={styles.none_profile}>
									<span className={styles.text}>{findIdModal.noProfileMsg[0]}</span>
									<br />
									{findIdModal.noProfileMsg[1]}
								</div>
							)}

							<div className={styles.btn_wrap}>
								<a
									href='sign-up'
									className={`${styles.btns} ${styles.sign_up_link}`}>
									{findIdModal.signUpLink}
								</a>
								<Button
									id='id_modal_find'
									type='button'
									loading={isLoading}
									onClick={onSubmit}
									disabled={Object.keys(dirtyFields).length !== 1}
									className={`${styles.id_model_find} ${styles.btns} ${
										isLoading && styles.btns_loading
									}`}>
									{findIdModal.modalFindBtn}
								</Button>
								<button
									type='button'
									id='id_modal_close'
									className={`${styles.id_model_close} ${styles.btns}`}
									onClick={() => SetFindId(false)}>
									{findIdModal.modalCloseBtn}
								</button>
							</div>
						</FormProvider>
					</form>
				</div>
			</div>
		</>
	);
};

export default FindIdModel;
