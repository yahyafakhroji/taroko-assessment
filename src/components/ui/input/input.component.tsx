import type { HTMLInputTypeAttribute } from 'react';
import { useRef, useState } from 'react';

import style from './input.module.scss';

interface Props {
  name: string;
  label?: string;
  value?: string | number;
  type?: HTMLInputTypeAttribute;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  containerClass?: string;
  prefixIcon?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  name,
  label,
  value = '',
  type = 'text',
  placeholder,
  className,
  prefixIcon,
  containerClass,
  error,
  required,
  onChange,
}: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  return (
    <div className={`${style.container} ${containerClass || ''}`}>
      {label && (
        <label htmlFor={name} className={`${required && style.required}`}>
          {label}
        </label>
      )}
      <div
        className={`${style.group} ${onFocus && style.focused} ${error && style.invalid} ${className || ''}`}
        onClick={() => input?.current?.focus()}
      >
        {prefixIcon && <div className={style.icon}>{prefixIcon}</div>}
        <input
          name={name}
          value={value}
          ref={input}
          type={type}
          className={style.input}
          placeholder={placeholder || ''}
          required={required}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          onChange={(event) => onChange?.(event)}
        />
      </div>
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
}
