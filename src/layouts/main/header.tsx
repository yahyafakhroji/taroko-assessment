import IconAdd from '@components/icons/add';
import SearchWidget from '@components/search/search.component';
import Button from '@components/ui/button/button.component';

import style from './style.module.scss';

export default function Header() {
  return (
    <header className={style.header}>
      <span className={style.title}>Contact List</span>
      <SearchWidget className={style.searchbar} />
      <div className={style.actions}>
        <Button label="Add Contact" className={style.add} prefixIcon={<IconAdd />} />
      </div>
    </header>
  );
}
