import { Button, Modal } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import useAuth from "@src/hooks/useAuth";

export interface ConfirmModalProps {
  open: boolean;
  text: ReactNode | null;
  accept: VoidFunction;
  reject: VoidFunction;
  className?: string;
}

export default function ConfirmModal({
  open,
  text,
  accept,
  reject,
  className,
}: ConfirmModalProps) {
  const { dictionary, setLang, lang } = useAuth();

  const [openModal, setOpenModal] = useState(false);

  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setOpenModal(open);
    setAccepted(false);
  }, [open]);

  const handleAccept = () => {
    setAccepted(true);
    accept();
  };

  return (
    <Modal
      open={openModal}
      onClose={reject}
      className={`justify-center items-center flex ${className}`}
    >
      <div className="bg-white rounded-xl px-11 py-9 shadow-md">
        <div className="flex flex-col justify-center">
          {text}
          <div className="flex mt-3 gap-3 justify-center">
            <Button
              className={"w-[92px] h-[35px]"}
              variant="outlined"
              sx={{
                color: "var(--primary-color)",
              }}
              onClick={reject}
            >
              <span className={styles["reject-btn"]}>
                {dictionary.confirm_modal.cancel}
              </span>
            </Button>
            <Button
              className={"w-[92px] h-[35px]"}
              variant="contained"
              sx={{ background: "var(--primary-color)" }}
              onClick={handleAccept}
              disabled={accepted}
            >
              <span className={styles["accept-btn"]}>
                {dictionary.confirm_modal.delete}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
