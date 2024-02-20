import IconPencil from '@components/icons/pencil';
import IconStar from '@components/icons/star';
import IconTrash from '@components/icons/trash';
import Button from '@components/ui/button/button.component';

import style from './contact-card.module.scss';

export default function ContactCard() {
  return (
    <div className={style.card}>
      <div className={style.head}>
        <div className={style.profile}>
          <span className={style.avatar}>YF</span>
          <p>
            <span className={style.name}>Yahya Fakhroji</span>
            <span className={style.job}>Designer</span>
          </p>
        </div>
        <div className={`${style.favorite} `}>
          <IconStar active />
        </div>
      </div>
      <div className={style.content}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
      <div className={style.footer}>
        <Button label="Delete" size="sm" prefixIcon={<IconTrash />} type="danger" />
        <Button label="Edit" size="sm" prefixIcon={<IconPencil />} type="primary" />
      </div>
    </div>
  );
}
