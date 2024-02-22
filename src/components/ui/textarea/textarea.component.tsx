import style from './textarea.module.scss';

interface Props {
  name: string;
  label?: string;
  value?: string | number;
  error?: string;
  required?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({ name, label, value = '', className, error, required, onChange }: Props) {
  return (
    <div className={style.container}>
      {label && (
        <label htmlFor={name} className={`${required && style.required}`}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`${style.textarea} ${error && style.invalid} ${className || ''}`}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
