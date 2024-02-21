import type { ContactListModal, ContactModel } from '@interfaces/contact.interface';
import { atom } from 'jotai';
import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query';

import { favoritesAtom } from './favorite.state';

const CONTACT_API = 'http://localhost:3000/api/contacts';

export const fetchContactAtom = atomWithQuery<ContactListModal[]>((get) => ({
  queryKey: ['contact', get(favoritesAtom)],
  queryFn: async ({ queryKey: [_, favorites] }) => {
    const res = await fetch(CONTACT_API);
    const obj = await res.json();

    const modified = (obj?.data || []).map((val: ContactModel) => ({
      ...val,
      is_favorite: Object.values(favorites || {}).includes(val.id),
      full_name: `${val.first_name} ${val.last_name}`,
    }));

    // return sortByString('full_name', 'asc', modified);
    return modified;
  },
}));

export const favContactAtom = atom((get) => {
  const contacts = get(fetchContactAtom);

  const { data } = contacts;

  return { ...contacts, data: (data || []).filter((val) => val.is_favorite) };
});

export const postContactAtom = atomWithMutation(() => ({
  mutationKey: ['contact'],
  mutationFn: async () => {
    const res = await fetch(CONTACT_API, {
      method: 'POST',
      body: JSON.stringify({
        contact: {
          first_name: 'Test',
          last_name: 'test',
          job: 'test',
          description: 'test',
        },
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await res.json();

    return data;
  },
  onError: (error) => {
    throw error;
  },
}));

export const deleteContactAtom = atomWithMutation(() => ({
  mutationKey: ['contact'],
  mutationFn: async (id: number) => {
    const res = await fetch(`${CONTACT_API}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    return data;
  },
  onError: (error) => {
    throw error;
  },
}));
