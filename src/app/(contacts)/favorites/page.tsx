'use client';

import ContactList from '@components/contact-list/contact-list.component';
import { favContactAtom } from '@states/contact.state';
import { Suspense } from 'react';

export default function Favorites() {
  return (
    <Suspense>
      <ContactList atom={favContactAtom} />
    </Suspense>
  );
}
