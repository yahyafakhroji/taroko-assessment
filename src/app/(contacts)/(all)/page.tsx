'use client';

import ContactList from '@components/contact-list/contact-list.component';
import { fetchContactAtom } from '@states/contact.state';
import { Suspense } from 'react';

export default function All() {
  return (
    <Suspense>
      <ContactList atom={fetchContactAtom} />
    </Suspense>
  );
}
