import style from './button.module.scss';

interface Props {
  type?: 'primary' | 'danger' | 'success' | 'ghost' | undefined;
  label?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  prefixIcon?: React.ReactNode;
}

export default function Button({ label, className, prefixIcon, type = 'primary', size = 'md' }: Props) {
  return (
    <button type="button" className={`${style.btn} ${style[type]} ${style[size]} ${className || ''}`}>
      {prefixIcon && <div className={style.icon}>{prefixIcon}</div>}
      {label && <span>{label}</span>}
    </button>
  );
}
