import ContactForm from '@components/contact-form/contact-form.component';
import IconAdd from '@components/icons/add';
import Button from '@components/ui/button/button.component';
import { useRef } from 'react';

import style from './style.module.scss';

export default function Header() {
  const addNewModal = useRef<React.ElementRef<typeof ContactForm>>(null);

  return (
    <header className={style.header}>
      <span className={style.title}>Contact List</span>
      {/* <SearchWidget className={style.searchbar} /> */}
      <div className={style.actions}>
        <Button
          label="Add Contact"
          className={style.add}
          prefixIcon={<IconAdd />}
          onClick={() => addNewModal.current?.open()}
        />
      </div>

      <ContactForm ref={addNewModal} title="Add New Contact" />
    </header>
  );
}
