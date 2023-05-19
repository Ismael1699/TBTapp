import style from './layout.module.css';

export const metadata = {
  title: 'Home',
  description: 'Generated by Next.js',
};

export default function ContainerHome({ children }) {
  return <div className={style.compras}>{children}</div>;
}
