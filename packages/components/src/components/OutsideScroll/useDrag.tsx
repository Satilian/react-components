import { useRef } from "react";

type MoveEvent = { movementX: number; movementY: number };

export const useDrag = (moveHandler: ({ movementX, movementY }: MoveEvent) => void) => {
  const prevRef = useRef({ x: 0, y: 0 });

  const touchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    const movementX = prevRef.current.x ? touch.pageX - prevRef.current.x : 0;
    const movementY = prevRef.current.y ? touch.pageY - prevRef.current.y : 0;
    prevRef.current = { x: touch.pageX, y: touch.pageY };
    moveHandler({ movementX, movementY });
  };

  const mouseMove = (e: MouseEvent) => {
    moveHandler({ movementX: e.movementX, movementY: e.movementY });
  };

  const stopDrag = () => {
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("mousemove", mouseMove);

    document.removeEventListener("touchend", stopDrag);
    document.removeEventListener("touchmove", touchMove);
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    prevRef.current = { x: 0, y: 0 };
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("mousemove", mouseMove);

    document.addEventListener("touchend", stopDrag);
    document.addEventListener("touchmove", touchMove);
  };

  return startDrag;
};
