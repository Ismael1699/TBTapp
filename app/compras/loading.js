import style from './loading.module.css';
export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className={style.containerLoad}>
      <div className={style.headerLoad}>
        <div className={style.titleLoad}></div>
        <div className={style.containerbuscadorLoad}>
          <div className={style.buscadorLoad}></div>

          <div className={style.buttonLoad}></div>
          <div className={style.buttonLoad}></div>
        </div>
      </div>
      <div className={style.containercardLoad}>
        <div className={style.cardLoad}></div>
        <div className={style.cardLoad}></div>
        <div className={style.cardLoad}></div>
        <div className={style.cardLoad}></div>
        <div className={style.cardLoad}></div>
        <div className={style.cardLoad}></div>
        <div className={style.cardLoad}></div>
        <div className={style.cardLoad}></div>
        <div className={style.cardLoad}></div>
      </div>
    </div>
  );
}
