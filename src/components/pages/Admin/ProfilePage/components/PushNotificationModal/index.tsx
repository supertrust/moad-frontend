import { Button } from '@src/components/common'
import { Checkbox, Modal, Switch } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SoundIcon from '@images/admin-account/ic-sound.png'
import { clsx } from 'clsx'

interface PushNotificationModal {
    open: boolean
    onClose: VoidFunction
    value: string
    onChange: (value: string) => void
}


interface Notifications {
    push_settings: boolean,
    member_notification: boolean,
    ad_notification: boolean,
    post_notification: boolean,
    infos_notification: boolean
}

function PushNotificationModal({ open, onClose, value, onChange }: PushNotificationModal) {

    const [notifications, setNotifications] = useState<Notifications>({
        push_settings: false,
        member_notification: false,
        ad_notification: false,
        post_notification: false,
        infos_notification: false
    });

    useEffect(() => {
        if(value){
            const notifications = JSON.parse(value);
            setNotifications(notifications);
        }
    }, [value])

    const handleChangeNotification = (key:string , value:boolean) => setNotifications({...notifications, [key]: value})

    const handleSubmit = () => {
        onChange(JSON.stringify(notifications));
        onClose();
    }

    return (
        <Modal
            title=""
            centered
            open={open}
            width={512}
            onCancel={onClose}
            footer= {
                <div className={clsx(
                    'flex flex-row justify-center gap-2 p-2 mt-10',
                    'absolute left-0 bottom-0 w-full  border-t border-t-admin-stroke'
                )}>
                    <Button
                        className='bg-admin-button-2 text-base py-3 w-1/2 justify-center'
                        onClick={() => onClose()}
                    >
                        취소
                    </Button>
                    <Button
                        className='bg-admin-primary text-white py-3 text-base w-1/2 justify-center'
                        onClick={handleSubmit}
                    >저장</Button>
                </div>
            }
            className='push-notification'
        >
            <div className='text-center absolute left-0 top-2  w-full  border-b  border-b-admin-stroke' >
                <h4 className='font-medium mb-2'>푸시알림설정</h4>
            </div>
            <div className='flex flex-row justify-between items-center mt-12 border-b border-admin-stroke'>
                <div className='flex flex-row items-center mb-2'>
                    <Image src={SoundIcon} alt="" width={18} height={17} className='!h-[18px] w-auto'/>
                    <span className='text-lg font-medium ml-1'>푸시설정</span>
                </div>
                <Switch 
                    checked={notifications.push_settings}  
                    onChange={(checked) => handleChangeNotification('push_settings', checked) }
                />
            </div>

            <ul className='ml-3 list-disc mb-16'>
               <li>
                    <div className='flex flex-row justify-between my-2 items-center'>
                        <div className=''>
                            <div className='text-admin-sub-2 mb-2'>회원관리 알림</div>
                            <div className='text-[#929AA6] text-[12px]'>탈퇴회원 발생, 내가 관리하는 회원 메모 등</div>
                        </div>
                        <div>
                            <Checkbox 
                                checked={notifications.member_notification}  
                                onChange={(e) => handleChangeNotification('member_notification', e.target.checked) } 
                            />
                        </div>
                    </div>
                </li> 
                <li>
                    <div className='flex flex-row justify-between my-2 items-center'>
                        <div className=''>
                            <div className='text-admin-sub-2 mb-2'>광고관리 알림</div>
                            <div className='text-[#929AA6] text-[12px]'>신규광고 신청, 내가 관리하는 회원 메모 등</div>
                        </div>
                        <div>
                            <Checkbox 
                                checked={notifications.ad_notification}  
                                onChange={(e) => handleChangeNotification('ad_notification', e.target.checked) } 
                            />
                        </div>
                    </div>
                </li> 
               <li>
                    <div className='flex flex-row justify-between my-2 items-center'>
                        <div className=''>
                            <div className='text-admin-sub-2 mb-2'>게시물관리 알림</div>
                            <div className='text-[#929AA6] text-[12px]'>FAQ, 1:1문의(답변이 필요한 신규문의 포함), 공지사항, 이용약관관리, 가이드관리 등</div>
                        </div>
                        <div>
                            <Checkbox 
                                checked={notifications.post_notification}  
                                onChange={(e) => handleChangeNotification('post_notification', e.target.checked) } 
                            />
                        </div>
                    </div>
                </li> 
               <li>
                    <div className='flex flex-row justify-between my-2 items-center'>
                        <div className=''>
                            <div className='text-admin-sub-2 mb-2'>내정보관리 알림</div>
                            <div className='text-[#929AA6] text-[12px]'>내 정보 변경</div>
                        </div>
                        <div>
                            <Checkbox 
                                checked={notifications.infos_notification}  
                                onChange={(e) => handleChangeNotification('infos_notification', e.target.checked) } 
                            />
                        </div>
                    </div>
                </li> 
            </ul>
        </Modal>
    )
}

export default PushNotificationModal