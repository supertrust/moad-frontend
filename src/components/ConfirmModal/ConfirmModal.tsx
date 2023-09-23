import { Button, Modal } from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'
import styles from "./styles.module.scss";

export interface ConfirmModalProps {
  open: boolean;
  text: ReactNode | null;
  accept: VoidFunction;
  reject: VoidFunction;
}

export default function ConfirmModal({ open, text, accept, reject }: ConfirmModalProps) {
  const [openModal, setOpenModal] = useState(false);

  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setOpenModal(open);
    setAccepted(false);
  }, [open]);

  const handleAccept = () => {
    setAccepted(true);
    accept();
  }

  return (
    <Modal
      open={openModal}
      onClose={reject}
      className='justify-center items-center flex'
    >
      <div className="bg-white rounded-xl px-11 py-9 shadow-md">
        <div className="flex flex-col justify-center">
          {  text}
          <div className="flex mt-3 gap-3 justify-center">
            <Button className={'w-[92px] h-[35px]'} variant='outlined' sx={{
              color : "#2f48d1"
            }} onClick={reject}>
              <span className={styles['reject-btn']}>취소</span></Button>
            <Button  className={'w-[92px] h-[35px]'} variant='contained'  sx={{background : "#2f48d1"}} onClick={handleAccept}
                     disabled={accepted}><span className={styles['accept-btn']}>삭제하기</span></Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
