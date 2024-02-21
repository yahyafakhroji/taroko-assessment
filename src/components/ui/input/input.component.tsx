import { useRef, useState } from 'react';

import style from './input.module.scss';

interface Props {
  value?: string | number;
  placeholder?: string;
  className?: string;
  prefixIcon?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ value = '', placeholder, className, prefixIcon, onChange }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  return (
    <div
      className={`${style.container} ${onFocus ? style.focused : ''} ${className || ''}`}
      onClick={() => input?.current?.focus()}
    >
      {prefixIcon && <div className={style.icon}>{prefixIcon}</div>}
      <input
        value={value}
        ref={input}
        type="text"
        className={style.input}
        placeholder={placeholder || ''}
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        onChange={(event) => onChange?.(event)}
      />
    </div>
  );
}
