import ContactCard from '@components/contact-card/contact-card.component';

import style from './style.module.scss';

export default function All() {
  const dummy = new Array(10).fill(0);

  return (
    <div className={style.container}>
      {dummy.map((val, index) => {
        return <ContactCard key={`contact_${index + 1}`} />;
      })}
    </div>
  );
}
