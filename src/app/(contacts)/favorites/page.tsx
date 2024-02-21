'use client';

import ContactList from '@components/contact-list/contact-list.component';
import { favContactAtom } from '@states/contact.state';

export default function Favorites() {
  return <ContactList atom={favContactAtom} />;
}
