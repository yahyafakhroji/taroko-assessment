'use client';

import ContactCard from '@components/contact-card/contact-card.component';
import DeleteConfirmationComponent from '@components/delete-confirmation/delete-confirmation.component';
import IconPencil from '@components/icons/pencil';
import IconSortAsc from '@components/icons/sort-asc';
import IconTrash from '@components/icons/trash';
import SearchWidget from '@components/search/search.component';
import Button from '@components/ui/button/button.component';
import type { ContactListModal } from '@interfaces/contact.interface';
import { deleteContactAtom } from '@states/contact.state';
import { favoritesAtom } from '@states/favorite.state';
import type { Atom } from 'jotai';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import style from './contact-list.module.scss';

export default function ContactList({ atom }: { atom: Atom<any> }) {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<ContactListModal>();
  const deleteModal = useRef<React.ElementRef<typeof DeleteConfirmationComponent>>(null);

  const [{ data, refetch, status }] = useAtom(atom);
  const [{ mutate: deleteAct, status: deleteStatus }] = useAtom(deleteContactAtom);
  const setFavorite = useSetAtom(favoritesAtom);

  useEffect(() => {
    if (status === 'success') {
      setIsLoading(false);
    }
  }, [status]);

  const doDelete = async () => {
    if (selected) {
      await deleteAct(selected?.id);
    }
  };

  useEffect(() => {
    if (deleteStatus === 'success') {
      // Remove Favorite
      if (selected?.is_favorite) {
        setFavorite((prev) => prev.filter((vl: number) => vl !== selected.id));
      }

      // Refetch New List
      setSelected(undefined);
      refetch();

      deleteModal.current?.close();
    }
  }, [deleteStatus]);

  return (
    <div className={style.wrap}>
      <div className={style.filter}>
        <SearchWidget className={style.searchbar} />
        <Button prefixIcon={<IconSortAsc />} className={style.sort} />
      </div>
      <div className={style.content}>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          (data || []).map((val: ContactListModal) => {
            return (
              <ContactCard
                key={`contact_${val.id}`}
                data={val}
                footer={
                  <>
                    <Button
                      label="Delete"
                      size="sm"
                      prefixIcon={<IconTrash />}
                      type="danger"
                      onClick={() => {
                        setSelected(val);
                        deleteModal.current?.open();
                      }}
                    />
                    <Button label="Edit" size="sm" prefixIcon={<IconPencil />} type="primary" />
                  </>
                }
              />
            );
          })
        )}
      </div>

      <DeleteConfirmationComponent
        ref={deleteModal}
        title="Delete Contact"
        message="Are you sure to Delete this Contact ?"
        onDelete={() => doDelete()}
      />
    </div>
  );
}
