import Link from 'next/link';
import style from './style.module.css';

export default function BotonSSR({
  className,
  text,
  link,
  hideIcon,
  hideText,
  rounded,
}) {
  return (
    <Link
      href={link}
      className={rounded ? style.rounded : style.button}
    >
      {hideIcon ? '' : <i className={className}></i>}
      {hideText ? '' : <p>{text}</p>}
    </Link>
  );
}
