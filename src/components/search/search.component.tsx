import IconSearch from '@components/icons/search';
import Input from '@components/ui/input/input.component';

import style from './search.module.scss';

export default function SearchWidget({ className }: { className?: string }) {
  return <Input className={`${style.container} ${className || ''}`} placeholder="Search Here" prefixIcon={<IconSearch />} />;
}
