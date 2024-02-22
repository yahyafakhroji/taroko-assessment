'use client';

import ContactCard from '@components/contact-card/contact-card.component';
import ContactForm from '@components/contact-form/contact-form.component';
import DeleteConfirmation from '@components/delete-confirmation/delete-confirmation.component';
import IconPencil from '@components/icons/pencil';
import IconSortAsc from '@components/icons/sort-asc';
import IconSortDesc from '@components/icons/sort-desc';
import IconTrash from '@components/icons/trash';
import Loader from '@components/loader/loader.component';
import SearchWidget from '@components/search/search.component';
import Button from '@components/ui/button/button.component';
import type { ContactListModel } from '@interfaces/contact.interface';
import { deleteContactAtom } from '@states/contact.state';
import { favoritesAtom } from '@states/favorite.state';
import { fuzzySearch } from '@utils/fuzzy-search';
import { paramsToObject } from '@utils/params-object';
import { sortByString } from '@utils/sort';
import type { Atom } from 'jotai';
import { useAtom, useSetAtom } from 'jotai';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import style from './contact-list.module.scss';

export default function ContactList({ atom }: { atom: Atom<any> }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selected, setSelected] = useState<ContactListModel>();
  const deleteModal = useRef<React.ElementRef<typeof DeleteConfirmation>>(null);
  const editModal = useRef<React.ElementRef<typeof ContactForm>>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>();
  const [filters, setFilters] = useState<Record<string, any>>();

  const [filteredData, setFilteredData] = useState<ContactListModel[]>([]);

  const [{ data, refetch, status }] = useAtom(atom);
  const [{ mutate: deleteAct, status: deleteStatus, error: deleteError }] = useAtom(deleteContactAtom);
  const setFavorite = useSetAtom(favoritesAtom);

  useEffect(() => {
    if (status === 'success') {
      setIsLoading(false);
    }
  }, [status]);

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

      toast.success('Contact deleted successfully!', { id: 'contact-deleted' });
    }

    if (deleteError) {
      toast.error('Contact deleted failed!', { id: 'contact-deleted-failed' });
    }
  }, [deleteStatus, deleteError]);

  /*
   * Handle Filter And Searching.
   */

  const applyFilters = (values: any) => {
    const newVal = { ...filters, ...values };

    setFilters((old) => {
      return { ...old, ...newVal };
    });
  };

  useEffect(() => {
    const params = paramsToObject(searchParams);
    let results = data || [];

    // Implement Local Search
    if (params?.search) {
      const term = params?.search;

      results = fuzzySearch(term, results);
    }

    // Implement Local Sort
    if (params?.sort) {
      results = sortByString('full_name', params?.sort, results);
    }

    setFilteredData(results);
  }, [searchParams, data]);

  useEffect(() => {
    if (filters) {
      // now you got a read/write object
      const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

      Object.keys(filters).forEach((key) => {
        if (!filters[key] || typeof filters[key] === 'undefined' || filters[key] === '') {
          current.delete(key);
        } else {
          current.set(key, filters[key] || '');
        }
      });

      // cast to string
      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.push(`${pathname}${query}`);
    }
  }, [filters]);

  useEffect(() => {
    const filters = {};

    if (typeof searchTerm !== 'undefined') {
      Object.assign(filters, { search: searchTerm });
    }

    if (sortOrder) {
      Object.assign(filters, { sort: sortOrder });
    }

    applyFilters(filters);
  }, [searchTerm, sortOrder]);

  return (
    <div className={style.wrap}>
      <div className={style.filter}>
        <SearchWidget
          value={searchTerm}
          className={style.searchbar}
          onChange={(term) => {
            setSearchTerm(term);
          }}
        />
        <Button
          prefixIcon={sortOrder === 'desc' ? <IconSortDesc /> : <IconSortAsc />}
          className={style.sort}
          onClick={() => {
            setSortOrder((prev) => (prev === 'desc' || typeof prev === 'undefined' ? 'asc' : 'desc'));
          }}
        />
      </div>
      <div className={style.content}>
        {isLoading && <Loader />}

        {!isLoading &&
          (filteredData.length > 0 ? (
            (filteredData || []).map((val: ContactListModel, idx) => {
              return (
                <ContactCard
                  key={`contact_${val.id}_${idx + 1}`}
                  data={val}
                  footer={
                    <>
                      <Button
                        label="Delete"
                        size="sm"
                        prefixIcon={<IconTrash />}
                        color="danger"
                        onClick={() => {
                          setSelected(val);
                          deleteModal.current?.open();
                        }}
                      />
                      <Button
                        label="Edit"
                        size="sm"
                        prefixIcon={<IconPencil />}
                        color="primary"
                        onClick={() => {
                          setSelected(val);
                          editModal.current?.open();
                        }}
                      />
                    </>
                  }
                />
              );
            })
          ) : (
            <div className={style.empty}>
              <h2>No items to display</h2>
              <p>It looks like there are no items in this list.</p>
            </div>
          ))}
      </div>

      <DeleteConfirmation
        ref={deleteModal}
        title="Delete Contact"
        message="Are you sure to Delete this Contact ?"
        onDelete={() => {
          if (selected && selected.id) {
            deleteAct(selected?.id);
          }
        }}
      />

      <ContactForm ref={editModal} title="Edit Contact" record={selected} />
    </div>
  );
}
