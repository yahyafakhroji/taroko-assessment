import Button from '@components/ui/button/button.component';
import Modal from '@components/ui/modal/modal.component';
import { forwardRef, useImperativeHandle, useState } from 'react';

import style from './delete-confirmation.module.scss';

interface FuncProps {
  open: () => void;
  close: () => void;
}

interface IProps {
  title: string;
  message: string;
  onCancel?: () => void;
  onDelete?: () => void;
}

const DeleteConfirmation: React.ForwardRefRenderFunction<FuncProps, IProps> = (
  { title, message, onCancel, onDelete },
  ref
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    },
  }));

  return (
    <Modal isOpen={isOpen} title={title} onClose={() => setIsOpen(false)}>
      <div className={style.container}>
        <p className={style.message}>{message}</p>

        <div className={style.actions}>
          <Button
            color="ghost"
            label="Cancel"
            onClick={() => {
              setIsOpen(false);

              onCancel?.();
            }}
          />
          <Button
            color="danger"
            label="Delete"
            onClick={() => {
              onDelete?.();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(DeleteConfirmation);
