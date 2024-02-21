import { useEffect, useRef, useState } from 'react';

import style from './modal.module.scss';

interface Props {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ isOpen, title, children, onClose }: Props) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    const modalElement = modalRef.current;

    if (modalElement) {
      setIsModalOpen(false);
      modalElement.close();

      onClose?.();
    }
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      // Add Event for Handle Backdrop Click Event
      modalElement.addEventListener('click', (event) => {
        const rect = modalElement.getBoundingClientRect();

        if (
          rect.left > event.clientX ||
          rect.right < event.clientX ||
          rect.top > event.clientY ||
          rect.bottom < event.clientY
        ) {
          closeModal();
        }
      });

      if (isModalOpen) {
        modalElement.showModal();
      } else {
        closeModal();
      }
    }
  }, [isModalOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog ref={modalRef} className={style.modal} onKeyDown={handleKeyDown}>
      {title && <h3 className={style.title}>{title}</h3>}
      {children}
    </dialog>
  );
}
