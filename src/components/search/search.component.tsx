import IconSearch from '@components/icons/search';
import Input from '@components/ui/input/input.component';
import { useDebounce } from '@hooks/use-debounce';
import { useState } from 'react';

import style from './search.module.scss';

export default function SearchWidget({
  value = '',
  className,
  onChange,
}: {
  value?: string;
  className?: string;
  onChange: (term: string) => void;
}) {
  const [term, setTerm] = useState(value);

  const handleChange = useDebounce((query: string) => {
    if (query.length >= 3 || query === '' || query === null) {
      onChange(query);
    }
  }, 500);

  return (
    <Input
      name="search"
      value={term}
      containerClass={style.container}
      className={`${style.search} ${className || ''}`}
      placeholder="Search Here"
      prefixIcon={<IconSearch />}
      onChange={(event) => {
        setTerm(event?.target.value);
        handleChange(event?.target.value);
      }}
    />
  );
}
