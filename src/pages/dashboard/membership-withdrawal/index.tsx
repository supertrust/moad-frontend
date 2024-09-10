import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { styles } from '@src/sections/my-info';
import { clsx } from 'clsx';
import {
	Controller,
	FormProvider,
	RHFInput,
	useForm,
	Button,
	Yup,
	yupResolver,
} from '@src/components/common';
import { useMemberWithdrawal } from '@src/apis/user';
import { toast } from 'react-toastify';
import { useConfirmDialog } from '@src/hooks/useConfirmationDialog';
import { ConfirmPropsType } from '@src/contexts/ConfirmDialogContext';
import useAuth from '@src/hooks/useAuth';
import RHFTextarea from '@src/components/common/Form/RHFTextarea';
import { useIcarusContext } from "@src/hooks/useIcarusContext";

function MembershipWithdrawalScreen() {
	const { mutateAsync: memberWithdrawal, isLoading } = useMemberWithdrawal();
	const { confirm } = useConfirmDialog();
	const { logout, dictionary: { membershipWithdrawal, pageTitle }, isKorean } = useAuth();
	const { setPageTitle } = useIcarusContext();
	const MembershipWithDrawalSchema = Yup.object({
		reason: Yup.string()
			.required(membershipWithdrawal.validations.reason.required),
		condition: Yup.boolean()
			.required(membershipWithdrawal.validations.condition.required)
			.oneOf([true], membershipWithdrawal.validations.condition.isTrue)
	})

	const methods = useForm({
		defaultValues: { condition: false, reason: "" } ,
		resolver: yupResolver(MembershipWithDrawalSchema),
	});
	const { handleSubmit, control, watch } = methods;

	const [disabledSubmit, setDisabledSubmit] = useState(true);
	useEffect(() => {
		watch(({ condition, reason }) => {
			const disabled = !reason || !condition ;
			disabledSubmit !== disabled && setDisabledSubmit(disabled);
		});
	}, [watch]);

	useEffect(() => setPageTitle(pageTitle["top_bar_my_page"]), [isKorean]);

	const onSubmit = handleSubmit(async ({ reason }) => {
		const options: ConfirmPropsType = {
			title: '',
			size: 'sm',
			cancelText: membershipWithdrawal.verificationModal.cancelText,
			confirmText: membershipWithdrawal.verificationModal.confirmText,
			cancelButtonProps: { className: 'border-primary text-primary !px-[21px] !py-[5px]' },
			confirmButtonProps: { className: 'border-primary bg-primary !px-[8px] !py-[5px]' },
			footerClassName: 'border-none flex flex-row justify-end mb-3 py-1',
		};

		confirm({
			...options,
			description: (
				<div className='mt-[4px]'>
					<div className='text-[#2C324C] text-left text-xl mb-[20px] font-bold'>
					{membershipWithdrawal.verificationModal.title}
					</div>
					<div className='text-center p-3 border-y-[1px] border-[#EEEEEE]'>{membershipWithdrawal.verificationModal.description}</div>
				</div>
			),
			onConfirm: () => {
				memberWithdrawal({ reason }, {
					onSuccess: (response : any) =>
						{
							const status = response?.data?.status;
							const dialogClassName = (status != 'success') ? 'max-w-[380px]' : '' ;
							confirm({
							...options,
							disableConfirmBtn: true,
							cancelButtonProps: {
								className: `border-primary bg-primary !px-[21px] !py-[5px] ${styles.text_white}`
							},
							dialogClassName : dialogClassName,
							description: (
								<div className='mt-[4px]'>
									<div className='text-[#2C324C] text-left text-xl mb-[20px] font-bold'>
									{status == 'success' ? membershipWithdrawal.submitModal.successTitle : membershipWithdrawal.submitModal.failedTitle}
									</div>
									<div className='text-center p-3 border-y-[1px] border-[#EEEEEE]'>
									{status == 'success' ? membershipWithdrawal.submitModal.successMsg :  (
										<>
										{membershipWithdrawal.submitModal.failedMsg}
										<br/>
										{membershipWithdrawal.submitModal.contactSupportMsg}
										</>
									)}
									</div>
								</div>
							),
							onCancel: () => {
								if(status == 'success'){
									 logout();
								}
								return;
							},
						})
					},
					onError: (error) => toast(error, { type: 'error' }),
				});
			},
		});
	});

	return (
		<Row>
			<Col md='12'>
				<div className={styles.my_info_content}>
					<FormProvider methods={methods}>
						<div className={styles.form_wrap}>
							<div className={styles.profile}>
								<div className={styles.my_information}>
									<div className={clsx(styles.title, '!border-none mb-0')}>
									{membershipWithdrawal.title}
									</div>
									<div className={clsx(styles.information_wrap, 'py-2')}>
										<div className='p-4 border border-[#EBEDF4] rounded-md bg-[#F24747] bg-opacity-5'>
											<div className='text-danger font-bold mb-3 text-base'>
											{membershipWithdrawal.heading}
											</div>
											<p>
												{membershipWithdrawal.precautionaryMeasures[0]} <br />
												{membershipWithdrawal.precautionaryMeasures[1]} <br />
												{membershipWithdrawal.precautionaryMeasures[2][0]} <br />
												<p className='ml-6'>
												{membershipWithdrawal.precautionaryMeasures[2][1]}<br />
												{membershipWithdrawal.precautionaryMeasures[2][2]}
												</p>
												{membershipWithdrawal.precautionaryMeasures[3]} <br />
												{membershipWithdrawal.precautionaryMeasures[4]} <br />
												{membershipWithdrawal.precautionaryMeasures[5]}
											</p>
										</div>
									</div>
									{/* <div className={clsx(styles.title, '!text-[14px] !border-none mb-0')}>
										유의사항
									</div> */}
									<div className={clsx(styles.information_wrap, 'pt-0')}>

										<RHFTextarea
											label={membershipWithdrawal.reasonForWithdrawal}
											name="reason"
											rows={5}
											placeholder={membershipWithdrawal.placeholderReason}
											required
											wrapperClassName='mt-4'
											showLength
											maxLength={300}
											placeholderError={true}
										/>
										<Controller
											name='condition'
											control={control}
											render={({ field: { onChange, onBlur, value}, fieldState : {error}}) => (
												<>
													<div className='mt-2 mb-4'>
														<label className='text-[#999999] flex flex-row items-center cursor-pointer'>
															<RHFInput
																name=''
																type='checkbox'
																className='mr-2 border-[#999999]'
																checked={value}
																onBlur={onBlur}
																onChange={onChange}
															/>
															{membershipWithdrawal.agreeToWithdrawMsg}
														</label>
														{error && <span className='text-danger'>{error.message}</span>}
													</div>
												</>
											)}
										/>
										<Button
											loading={isLoading}
											type='submit'
											className={`${styles.modify_btn} !leading-6`}
											onClick={onSubmit}
											disabled={disabledSubmit}
										>
											{membershipWithdrawal.btnText}
										</Button>
									</div>
								</div>
							</div>
						</div>
					</FormProvider>
				</div>
			</Col>
		</Row>
	);
}

export default MembershipWithdrawalScreen;
