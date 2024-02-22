import IconStar from '@components/icons/star';
import type { ContactListModel } from '@interfaces/contact.interface';
import { favoritesAtom } from '@states/favorite.state';
import { generateInitialName } from '@utils/initial-name';
import { useSetAtom } from 'jotai';
import toast from 'react-hot-toast';

import style from './contact-card.module.scss';

export default function ContactCard({ data, footer }: { data: ContactListModel; footer?: React.ReactNode }) {
  const setFavorite = useSetAtom(favoritesAtom);

  const changeFavorite = (value: boolean) => {
    if (value) {
      // Add New ID as Favorite Contact
      setFavorite((prev) => [...prev, data.id]);

      toast.success('Favorite contact added successfully!', { id: 'favorite-added' });
    } else {
      // Remove ID as Favorite Contact
      setFavorite((prev) => prev.filter((vl) => vl !== data.id));
      toast.success('Favorite contact removed successfully!', { id: 'favorite-removed' });
    }
  };

  return (
    <>
      <div className={style.card}>
        <div className={style.head}>
          <div className={style.profile}>
            <span className={style.avatar}>{generateInitialName(data?.full_name || '')}</span>
            <p>
              <span className={style.name}>{data?.full_name}</span>
              <span className={style.job}>{data?.job}</span>
            </p>
          </div>
          <div
            className={`${style.favorite} ${data?.is_favorite && style.active}`}
            onClick={() => changeFavorite(!data?.is_favorite)}
          >
            <IconStar active={data?.is_favorite || false} />
          </div>
        </div>
        <div className={style.content}>{data?.description}</div>
        {footer && <div className={style.footer}>{footer}</div>}
      </div>
    </>
  );
}
