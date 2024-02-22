import Loader from '@components/loader/loader.component';

import style from './button.module.scss';

interface Props {
  type?: 'submit' | 'button';
  color?: 'primary' | 'danger' | 'success' | 'ghost' | 'outline' | undefined;
  label?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  prefixIcon?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

export default function Button({
  type = 'button',
  label,
  className,
  prefixIcon,
  color = 'primary',
  size = 'md',
  isLoading,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      disabled={disabled || isLoading}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`${style.btn} ${style[color]} ${style[size]} ${className || ''}`}
      onClick={() => onClick?.()}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {prefixIcon && <div className={style.icon}>{prefixIcon}</div>}
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}
