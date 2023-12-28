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


const MembershipWithDrawalSchema = Yup.object({
	reason: Yup.string()
		.required('탈퇴 사유를 입력해 주세요.'),
	condition: Yup.boolean()
		.required("다음 조건을 확인하세요.")
		.oneOf([true], "다음 조건을 확인하세요.")
})



function MembershipWithdrawalScreen() {
	const { mutateAsync: memberWithdrawal, isLoading } = useMemberWithdrawal();
	const { confirm } = useConfirmDialog();
	const { logout } = useAuth();

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


	const onSubmit = handleSubmit(async ({ reason }) => {
		const options: ConfirmPropsType = {
			title: '',
			size: 'sm',
			cancelText: '취소',
			confirmText: '회원탈퇴',
			cancelButtonProps: { className: 'border-primary text-primary !px-[21px] !py-[5px]' },
			confirmButtonProps: { className: 'border-primary bg-primary !px-[8px] !py-[5px]' },
			footerClassName: 'border-none flex flex-row justify-end mb-3 py-1',
		};

		confirm({
			...options,
			description: (
				<div className='mt-[4px]'>
					<div className='text-[#2C324C] text-left text-xl mb-[20px] font-bold'>
					회원탈퇴
					</div>
					<div className='text-center p-3 border-y-[1px] border-[#EEEEEE]'>정말 탈퇴하시겠습니까?</div>
				</div>
			),
			onConfirm: () => {
				memberWithdrawal({ reason }, {
					onSuccess: () =>
						confirm({
							...options,
							disableConfirmBtn: true,
							cancelButtonProps: {
								className: 'border-primary bg-primary !text-[#fff] !px-[21px] !py-[5px]',
							},
							description: (
								<div className='mt-[4px]'>
									<div className='text-[#2C324C] text-left text-xl mb-[20px] font-bold'>
									회원탈퇴완료
									</div>
									<div className='text-center p-3 border-y-[1px] border-[#EEEEEE]'>
									지금까지 이용해주셔서 감사합니다.
									</div>
								</div>
							),
							onCancel: logout,
						}),
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
									회원탈퇴
									</div>
									<div className={clsx(styles.information_wrap, 'py-2')}>
										<div className='p-4 border border-[#EBEDF4] rounded-md bg-[#F24747] bg-opacity-5'>
											<div className='text-danger font-bold mb-3 text-base'>
												회원 탈퇴 시 1년동안 개인정보 및 이카루스 내에서
												만들어진 데이터가 보관되며,
												<br />
												1년 이후에 회원님에 관한 모든 데이터가 자동으로
												삭제됩니다.
											</div>
											<p>
												1.계약 또는청약철회 등에 관한 기록 보존 이류 :
												전자상거래 등에서의 소비자보호에 관한법률/ 보존 기간 :
												5년 <br />
												1.계약 또는청약철회 등에 관한 기록 보존 이류 :
												전자상거래 등에서의 소비자보호에 관한법률/ 보존 기간 :
												5년 <br />
												1.계약 또는청약철회 등에 관한 기록 보존 이류 :
												전자상거래 등에서의 소비자보호에 관한법률/ 보존 기간 :
												5년 <br />
												1.계약 또는청약철회 등에 관한 기록 보존 이류 :
												전자상거래 등에서의 소비자보호에 관한법률/ 보존 기간 :
												5년 <br />
												1.계약 또는청약철회 등에 관한 기록 보존 이류 :
												전자상거래 등에서의 소비자보호에 관한법률/ 보존 기간 :
												5년 <br />
												1.계약 또는청약철회 등에 관한 기록 보존 이류 :
												전자상거래 등에서의 소비자보호에 관한법률/ 보존 기간 :
												5년
											</p>
										</div>
									</div>
									<div className={clsx(styles.title, '!text-[14px] !border-none mb-0')}>
										유의사항
									</div>
									<div className={clsx(styles.information_wrap, 'pt-0')}>
										<div className='p-4 border border-[#EBEDF4] rounded-md bg-[#EBEDF4] bg-opacity-20'>
											<p>
												1.회원탈퇴 처리 후에는 회원님의 개인정보를 복원할
												수없습니다.
												<br />
												2.진행중 또는 신청중인 광고가 있을 시 회원탈퇴가 불가능
												합니다.
											</p>
										</div>

										<RHFTextarea 
											label="탈퇴사유"
											name="reason"
											rows={5}
											placeholder='탈퇴사유를 입력해주세요.'
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
														<label className='text-[#999999] flex flex-row items-center'>
															<RHFInput
																name=''
																type='checkbox'
																className='mr-2 border-[#999999]'
																checked={value}
																onBlur={onBlur}
																onChange={onChange}
															/>
															해당 내용을 모두 확인했으며, 회원탈퇴에 동의합니다
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
											회원탈퇴
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
