'use client';
import { useState } from 'react';

import style from './slider.module.css';

export default function Slider({ dataSliderOnChange, factura }) {
  const [isClicked, setIsClicked] = useState(factura == 1 ? false : true);

  function handledClicked() {
    setIsClicked(!isClicked);
    changeData();
  }

  function changeData() {
    isClicked ? dataSliderOnChange(1) : dataSliderOnChange(0);
  }
  return (
    <div className={style.slider}>
      <p>Factura</p>
      {!isClicked ? (
        <div
          className={style.bodyClicked}
          onClick={handledClicked}
        >
          <div className={style.pointClicked}></div>
        </div>
      ) : (
        <div
          className={style.body}
          onClick={handledClicked}
        >
          <div className={style.point}></div>
        </div>
      )}
    </div>
  );
}
