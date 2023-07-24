'use client';
import { useState } from 'react';

import style from './SegmentBarStatus.module.css';
export default function SegmentBarStatus({ formSegment }) {
  const [stateSegment, setStateSegment] = useState(false);

  function handleStateSegment() {
    setStateSegment(!stateSegment);
  }

  return (
    <>
      {formSegment === 'initial' ? (
        <div
          className={!stateSegment ? style.initial : style.initialChecked}
          onClick={handleStateSegment}
        ></div>
      ) : undefined}
      {formSegment === 'center' ? (
        <div
          className={!stateSegment ? style.center : style.centerChecked}
          onClick={handleStateSegment}
        ></div>
      ) : undefined}
      {formSegment === 'final' ? (
        <div
          className={!stateSegment ? style.final : style.finalChecked}
          onClick={handleStateSegment}
        ></div>
      ) : undefined}
    </>
  );
}
