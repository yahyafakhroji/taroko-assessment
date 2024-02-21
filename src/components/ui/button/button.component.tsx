import style from './button.module.scss';

interface Props {
  type?: 'primary' | 'danger' | 'success' | 'ghost' | 'outline' | undefined;
  label?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  prefixIcon?: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
}

export default function Button({ label, className, prefixIcon, type = 'primary', size = 'md', isLoading, onClick }: Props) {
  return (
    <button
      disabled={isLoading}
      type="button"
      className={`${style.btn} ${style[type]} ${style[size]} ${className || ''}`}
      onClick={() => onClick?.()}
    >
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          {prefixIcon && <div className={style.icon}>{prefixIcon}</div>}
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}
