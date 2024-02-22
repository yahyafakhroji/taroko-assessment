import type { ContactListModal, ContactModel } from '@interfaces/contact.interface';
import { atom } from 'jotai';
import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query';

import { favoritesAtom } from './favorite.state';

const CONTACT_API = `${process.env.NEXT_PUBLIC_API_URL}/contacts`;

export const fetchContactAtom = atomWithQuery<ContactListModal[]>((get) => ({
  queryKey: ['get-contact', get(favoritesAtom)],
  queryFn: async ({ queryKey: [_, favorites] }) => {
    const res = await fetch(CONTACT_API);

    if (!res.ok) {
      throw new Error('Resource not found');
    }

    const obj = await res.json();

    const modified = (obj?.data || []).map((val: ContactModel) => ({
      ...val,
      is_favorite: Object.values(favorites || {}).includes(val.id),
      full_name: `${val.first_name} ${val.last_name}`,
    }));

    return modified;
  },
  onError: (error: any) => {
    throw error;
  },
}));

export const favContactAtom = atom((get) => {
  const contacts = get(fetchContactAtom);

  const { data } = contacts;

  return { ...contacts, data: (data || []).filter((val) => val.is_favorite) };
});

export const postContactAtom = atomWithMutation(() => ({
  mutationKey: ['post-contact'],
  mutationFn: async (payload: Partial<ContactModel>) => {
    const res = await fetch(CONTACT_API, {
      method: 'POST',
      body: JSON.stringify({
        contact: {
          first_name: payload.first_name,
          last_name: payload.last_name,
          job: payload.job || '',
          description: payload.description || '',
        },
      }),
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

export const deleteContactAtom = atomWithMutation(() => ({
  mutationKey: ['delete-contact'],
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

export const editContactAtom = atomWithMutation(() => ({
  mutationKey: ['edit-contact'],
  mutationFn: async (payload: Partial<ContactModel>) => {
    const res = await fetch(`${CONTACT_API}/${payload.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        info: {
          first_name: payload.first_name,
          last_name: payload.last_name,
          job: payload.job || '',
          description: payload.description || '',
        },
      }),
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
