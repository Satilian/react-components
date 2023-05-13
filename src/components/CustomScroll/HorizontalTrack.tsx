import React, { RefObject, useRef } from "react";
import cn from "./style.module.css";
import { useDrag } from "./useDrag";

type Props = {
  scrolled: HTMLDivElement | null;
  trackRef: RefObject<HTMLDivElement>;
};

export const HorizontalTrack = ({ scrolled, trackRef }: Props) => {
  if (!scrolled || !trackRef) return null;
  const { offsetWidth, scrollWidth } = scrolled;

  const thumbRef = useRef<HTMLDivElement>(null);
  const thumbWidth = ((offsetWidth / (scrollWidth / 100)) * offsetWidth) / 100;

  const startDrag = useDrag((e) => {
    if (!trackRef.current || !thumbRef.current) return;
    const max = trackRef.current.offsetWidth - thumbWidth;
    const left = thumbRef.current.offsetLeft + e.movementX;

    if (left < 0 || left > max) return;

    thumbRef.current.setAttribute("style", `left: ${left}px; width: ${thumbWidth}px`);
    scrolled.scrollTo((left / (max / 100) / 100) * (scrollWidth - offsetWidth), scrolled.scrollTop);
  });

  return (
    <div className={cn.trackH} ref={trackRef}>
      <div
        className={cn.thumbH}
        style={{ width: `${thumbWidth}px` }}
        ref={thumbRef}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      />
    </div>
  );
};
