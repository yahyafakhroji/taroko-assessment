'use client';

import ContactCard from '@components/contact-card/contact-card.component';
import IconSortAsc from '@components/icons/sort-asc';
import SearchWidget from '@components/search/search.component';
import Button from '@components/ui/button/button.component';

import style from './style.module.scss';

export default function All() {
  const dummy = new Array(20).fill(0);

  return (
    <div className={style.wrap}>
      <div className={style.filter}>
        <SearchWidget className={style.searchbar} />
        <Button prefixIcon={<IconSortAsc />} className={style.sort} />
      </div>
      <div className={style.content}>
        {dummy.map((val, index) => {
          return <ContactCard key={`contact_${index + 1}`} />;
        })}
      </div>
    </div>
  );
}
