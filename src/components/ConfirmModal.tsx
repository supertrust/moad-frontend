import { Button, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'

export interface ConfirmModalProps {
  open: boolean;
  text: string | null;
  accept: VoidFunction;
  reject: VoidFunction;
}

export default function ConfirmModal({ open, text, accept, reject }: ConfirmModalProps) {
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setOpenModal(open);
    setModalText(text);
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
      <div className="w-full max-w-xs bg-white rounded-xl px-5 py-9 shadow-md">
        <div className="flex flex-col justify-center">
          {modalText && (<div className='text-center' dangerouslySetInnerHTML={{ __html: modalText }}></div>)}
          <div className="flex mt-3 gap-2 justify-center">
            <Button variant='outlined' color='primary' onClick={reject}>취소</Button>
            <Button variant='contained' color='primary' onClick={handleAccept} disabled={accepted}>삭제하기</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
