import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { styles } from "@src/sections/my-info";
import { clsx } from 'clsx';
import Button from '@src/components/Button';
import { Controller, FormProvider, RHFInput,  useForm } from '@src/components/Form';
import { useMemberWithdrawal } from '@src/apis/user';
import { toast } from 'react-toastify';
import { useConfirmDialog } from '@src/hooks/useConfirmationDialog';
import { ConfirmPropsType } from '@src/contexts/ConfirmDialogContext';
import useAuth from '@src/hooks/useAuth';

function MembershipWithdrawalScreen() {
    const { mutateAsync: memberWithdrawal,  isLoading } = useMemberWithdrawal();
    const { confirm } = useConfirmDialog();
    const { logout } = useAuth();

    const methods = useForm({  defaultValues : { check: false } });
    const { handleSubmit, control  } = methods;

    const onSubmit = handleSubmit(async () => {
        const options: ConfirmPropsType = {
            title : "",
            size: "sm",
            cancelText:"취소",
            confirmText: "회원탈퇴",
            cancelButtonProps: {className: "border-secondary text-secondary"},
            confirmButtonProps : {className: "border-secondary bg-secondary"},
            footerClassName: "border-none flex flex-row justify-center mb-3",
        }

        confirm({
            ...options,
            description: (
                <div className='mt-3'>
                    <div className='text-secondary text-center mb-2 font-bold'>회원탈퇴</div>
                    <div className='text-center'>게시물을 정말 삭제하시겠습니까?</div>
                </div>
            ),
            onConfirm: () => {
            memberWithdrawal(undefined,{
                onSuccess: () => 
                confirm({
                    ...options,
                    disableConfirmBtn : true,
                    cancelButtonProps : { className: "border-secondary bg-secondary text-white" },
                    description : (
                        <div className='mt-3'>
                            <div className='text-secondary text-center mb-2 font-bold'>회원탈퇴</div>
                            <div className='text-center'>지금까지 이용해주셔서 감사합니다.</div>
                        </div>
                    ),
                    onCancel: logout
                }),
                onError: (error) => toast(error, { type : "error" })
            });
            }
        })
    });


    return (
        <Row>
            <Col md="12">
                <div className={styles.my_info_content}>
                    <FormProvider methods={methods}>
                        <div className={styles.form_wrap}>
                            <div className={styles.profile}>
                                <div className={styles.my_information}>
                                    <div className={clsx(styles.title, '!border-none mb-0')}>내 정보</div>
                                    <div className={clsx(styles.information_wrap, 'py-2')}>
                                        <div className='p-4 border border-[#EBEDF4] rounded-md bg-[#F24747] bg-opacity-5'>
                                            <div className='text-danger font-bold mb-3 text-base'>
                                                회원 탈퇴 시 1년동안 개인정보 및 이카루스 내에서 만들어진 데이터가 보관되며,<br/>1년 이후에 회원님에 관한 모든 데이터가 자동으로 삭제됩니다.
                                            </div>
                                            <p>
                                                1.계약 또는청약철회 등에 관한 기록 보존 이류 : 전자상거래 등에서의 소비자보호에 관한법률/ 보존 기간 : 5년 <br/>
                                                1.계약 또는청약철회 등에 관한 기록 보존 이류 : 전자상거래 등에서의 소비자보호에 관한법률/ 보존 기간 : 5년 <br/>
                                                1.계약 또는청약철회 등에 관한 기록 보존 이류 : 전자상거래 등에서의 소비자보호에 관한법률/ 보존 기간 : 5년 <br/>
                                                1.계약 또는청약철회 등에 관한 기록 보존 이류 : 전자상거래 등에서의 소비자보호에 관한법률/ 보존 기간 : 5년 <br/>
                                                1.계약 또는청약철회 등에 관한 기록 보존 이류 : 전자상거래 등에서의 소비자보호에 관한법률/ 보존 기간 : 5년 <br/>
                                                1.계약 또는청약철회 등에 관한 기록 보존 이류 : 전자상거래 등에서의 소비자보호에 관한법률/ 보존 기간 : 5년
                                            </p>
                                        </div>
                                    </div>
                                    <div className={clsx(styles.title, '!border-none mb-0')}>유의사항</div>
                                    <div className={clsx(styles.information_wrap, 'pt-2')}>
                                        <div className='p-4 border border-[#EBEDF4] rounded-md bg-[#EBEDF4] bg-opacity-20'>
                                            <p>
                                                1.회원탈퇴 처리 후에는 회원님의 개인정보를 복원할 수없습니다.<br/>
                                                2.진행중 또는 신청중인 광고가 있을 시 회원탈퇴가 불가능 합니다.
                                            </p>
                                        </div>

                                        <Controller 
                                            name='check'
                                            control={control}
                                            render={({ field: { onChange, onBlur, ref, value } }) => (
                                                <>
                                                    <div className='mt-4'>
                                                        <label className='text-[#999999] flex flex-row items-center'>
                                                            <RHFInput 
                                                                name=''
                                                                type='checkbox'
                                                                className='mr-2 border-[#999999]'
                                                                onBlur={onBlur}
                                                                onChange={onChange}
                                                            />
                                                            해당 내용을 모두 확인했으며, 회원탈퇴에 동의합니다
                                                        </label>
                                                    </div>
                                                    
                                                    <Button
                                                        loading={isLoading}
                                                        type="submit"
                                                        className={`${styles.modify_btn} `}
                                                        onClick={onSubmit}
                                                        disabled={!value}
                                                    >
                                                        수정완료
                                                    </Button>
                                                </>
                                            )}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormProvider>
                </div>
            </Col>
        </Row>
    )
}

export default MembershipWithdrawalScreen