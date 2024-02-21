import { useEffect, useRef, useState } from 'react';

import style from './modal.module.scss';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Modal({ isOpen, children }: Props) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setModalOpen(isOpen);
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
          modalElement.close();
        }
      });

      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      setModalOpen(false);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog ref={modalRef} className={style.modal} onKeyDown={handleKeyDown}>
      {children}
    </dialog>
  );
}
