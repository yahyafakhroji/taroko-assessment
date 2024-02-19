import Header from './header';
import style from './style.module.scss';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={style.wrap}>
      <Header />
      <div className={style.content}>{children}</div>
    </main>
  );
}
