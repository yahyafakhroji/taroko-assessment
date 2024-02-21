import IconSpinner from '@components/icons/spinner';

import style from './loader.module.scss';

export default function Loader() {
  return <IconSpinner className={style.spinner} />;
}
