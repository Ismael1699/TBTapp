import style from './navbar.module.css';

export default function Navbar() {
  return (
    <div className={style.navbar}>
      <div className={style.user}>
        <div className={style.img}></div>
        <button>Login</button>
      </div>
      <li>
        <ul>home</ul>
        <ul>compras</ul>
      </li>
    </div>
  );
}
