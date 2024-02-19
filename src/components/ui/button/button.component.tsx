import style from './button.module.scss';

interface Props {
  type?: 'primary' | 'danger' | 'success' | undefined;
  label: string;
  className?: string;
  prefixIcon?: React.ReactNode;
}

export default function Button({ label, className, prefixIcon, type }: Props) {
  return (
    <button type="button" className={`${style.btn} ${style[type || 'primary']} ${className || ''}`}>
      {prefixIcon && <div className={style.icon}>{prefixIcon}</div>}
      {label}
    </button>
  );
}
