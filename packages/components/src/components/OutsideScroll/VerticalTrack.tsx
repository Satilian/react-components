import React, { RefObject, useRef } from "react";
import cn from "./style.module.scss";
import { useDrag } from "./useDrag";

type Props = {
  scrolled: HTMLDivElement | null;
  trackRef: RefObject<HTMLDivElement>;
};

export const VerticalTrack = ({ scrolled, trackRef }: Props) => {
  if (!scrolled) return null;
  const { offsetHeight, scrollHeight } = scrolled;

  const thumbRef = useRef<HTMLDivElement>(null);
  const thumbHeight = ((offsetHeight / (scrollHeight / 100)) * offsetHeight) / 100;

  const startDrag = useDrag((e) => {
    if (!trackRef.current || !thumbRef.current) return;
    const max = trackRef.current.offsetHeight - thumbHeight;
    const top = thumbRef.current.offsetTop + e.movementY;

    if (top < 0 || top > max) return;

    thumbRef.current.setAttribute("style", `top: ${top}px; height: ${thumbHeight}px`);
    scrolled.scrollTo(
      scrolled.scrollLeft,
      (top / (max / 100) / 100) * (scrollHeight - offsetHeight)
    );
  });

  return (
    <div className={cn.trackV} ref={trackRef}>
      <div
        className={cn.thumbV}
        style={{ height: `${thumbHeight}px` }}
        ref={thumbRef}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      />
    </div>
  );
};
