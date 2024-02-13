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
									{status == 'success' ? '회원탈퇴완료' : '주의'}
									</div>
									<div className='text-center p-3 border-y-[1px] border-[#EEEEEE]'>
									{status == 'success' ? '지금까지 이용해주셔서 감사합니다.' :  (
										<>
										진행중인 광고가 있거나 삭제할수 없는 상태입니다.
										<br/>
										고객센터에 연락주시길 바랍니다.
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
									회원탈퇴
									</div>
									<div className={clsx(styles.information_wrap, 'py-2')}>
										<div className='p-4 border border-[#EBEDF4] rounded-md bg-[#F24747] bg-opacity-5'>
											<div className='text-danger font-bold mb-3 text-base'>
											이카루스 회원탈퇴시 아래 주의사항을 반드시 읽어주시길 바랍니다.
											</div>
											<p>
												1. 기존 아이디는 영구적으로 사용이 중지되므로, 기존에 사용하시던 아이디를 통한 재가입은 불가능합니다. <br />
												2. 회원 정보는 1년동안 보관되며, 이후 일괄적으로 정보는 삭제됩니다. <br />
												3. 아래의 경우에 하나라도 해당되는 경우 아이디 삭제가 불가능합니다. <br />
												<p className='ml-6'>
													    a. 검수중인 광고가 있을경우.<br />
													    b. 진행중인 광고가 있을경우. (진행중이라 함은, 검수, 종료, 거부의 상태를 제외한 모든 광고상태에 해당함)
												</p>
												4. 작성한 1:1문의 및 게시글등은 삭제되지않고 영구보존됩니다. <br />
												5. 회원탈퇴 취소는 절대적으로 불가능하므로 꼭 주의하시길 바랍니다. <br />
												6. 이후 문의사항은 이카루스 고객센터로 연락 바랍니다.
											</p>
										</div>
									</div>
									{/* <div className={clsx(styles.title, '!text-[14px] !border-none mb-0')}>
										유의사항
									</div> */}
									<div className={clsx(styles.information_wrap, 'pt-0')}>

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
