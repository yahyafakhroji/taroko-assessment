import IconStar from '@components/icons/star';
import type { ContactListModal } from '@interfaces/contact.interface';
import { favoritesAtom } from '@states/favorite.state';
import { useSetAtom } from 'jotai';

import style from './contact-card.module.scss';

export default function ContactCard({ data, footer }: { data: ContactListModal; footer?: React.ReactNode }) {
  const setFavorite = useSetAtom(favoritesAtom);

  const getInitials = (fullName: string, includeMiddleName = false): string => {
    if (!fullName) return '';

    const names = fullName.trim().split(/\s+/);

    return includeMiddleName
      ? names.map((name) => name.charAt(0)).join('')
      : names[0].charAt(0) + (names.length > 1 ? names[names.length - 1].charAt(0) : '');
  };

  const changeFavorite = (value: boolean) => {
    if (value) {
      // Add New ID as Favorite Contact
      setFavorite((prev) => [...prev, data.id]);
    } else {
      // Remove ID as Favorite Contact
      setFavorite((prev) => prev.filter((vl) => vl !== data.id));
    }
  };

  return (
    <>
      <div className={style.card}>
        <div className={style.head}>
          <div className={style.profile}>
            <span className={style.avatar}>{getInitials(data?.full_name || '')}</span>
            <p>
              <span className={style.name}>{data.full_name}</span>
              <span className={style.job}>{data.job}</span>
            </p>
          </div>
          <div
            className={`${style.favorite} ${data.is_favorite && style.active}`}
            onClick={() => changeFavorite(!data.is_favorite)}
          >
            <IconStar active={data.is_favorite || false} />
          </div>
        </div>
        <div className={style.content}>{data.description}</div>
        {footer && <div className={style.footer}>{footer}</div>}
      </div>
    </>
  );
}
