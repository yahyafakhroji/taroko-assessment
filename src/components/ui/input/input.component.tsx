import { useRef, useState } from 'react';

import style from './input.module.scss';

interface Props {
  placeholder?: string;
  className?: string;
  prefixIcon?: React.ReactNode;
}

export default function Input({ placeholder, className, prefixIcon }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  return (
    <div
      className={`${style.container} ${onFocus ? style.focused : ''} ${className || ''}`}
      onClick={() => input?.current?.focus()}
    >
      {prefixIcon && <div className={style.icon}>{prefixIcon}</div>}
      <input
        ref={input}
        type="text"
        className={style.input}
        placeholder={placeholder || ''}
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
      />
    </div>
  );
}
