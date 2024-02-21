'use client';

import ContactList from '@components/contact-list/contact-list.component';
import { fetchContactAtom } from '@states/contact.state';

export default function All() {
  return <ContactList atom={fetchContactAtom} />;
}
