import React, { FC, MouseEventHandler, RefObject, useCallback, useEffect, useRef } from "react";
import cn from "./style.module.css";

interface IProps {
  imageRef: RefObject<HTMLImageElement>;
  onResize: (w: number, h: number, t: number, l: number) => void;
  aspectRatio?: number;
  minSize?: number;
}

let startW: number, startH: number, startX: number, startY: number;
let width: number, height: number, top: number, left: number;
let point: string, isDrag: boolean;

export const CropBox: FC<IProps> = ({ imageRef, onResize, aspectRatio = 0, minSize = 20 }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const stopDrag = useCallback(() => {
    isDrag = false;
    document.removeEventListener("mouseup", stopDrag);
  }, []);

  const startDrag = useCallback(
    (p: string): MouseEventHandler<HTMLDivElement> =>
      (e) => {
        e.stopPropagation();
        startX = e.pageX;
        startY = e.pageY;
        point = p;
        isDrag = true;
        document.addEventListener("mouseup", stopDrag);
      },
    []
  );

  const drag = useCallback<MouseEventHandler<HTMLDivElement>>((e) => {
    if (!isDrag) return;
    const box = boxRef.current;
    const img = imageRef.current;

    if (box && img) {
      const offsetX = startX - e.pageX;
      const offsetY = startY - e.pageY;

      startX = e.pageX;
      startY = e.pageY;

      switch (point) {
        case "t":
          height += offsetY;
          width = aspectRatio ? height * aspectRatio : width;
          left -= aspectRatio ? (offsetY * aspectRatio) / 2 : 0;
          top -= offsetY;
          break;

        case "b":
          height -= offsetY;
          width = aspectRatio ? height * aspectRatio : width;
          left += aspectRatio ? (offsetY * aspectRatio) / 2 : 0;
          break;

        case "l":
          width += offsetX;
          height = aspectRatio ? width / aspectRatio : height;
          top -= aspectRatio ? offsetX / aspectRatio / 2 : 0;
          left -= offsetX;
          break;

        case "r":
          width -= offsetX;
          height = aspectRatio ? width / aspectRatio : height;
          top += aspectRatio ? offsetX / aspectRatio / 2 : 0;
          break;

        case "tl":
          height += offsetY;
          width = aspectRatio ? height * aspectRatio : width + offsetX;
          left -= aspectRatio ? (aspectRatio * offsetY) / 2 : offsetX;
          top -= offsetY;
          break;

        case "tr":
          height += offsetY;
          width = aspectRatio ? height * aspectRatio : width - offsetX;
          top -= offsetY;
          break;

        case "bl":
          height -= offsetY;
          width = aspectRatio ? height * aspectRatio : width + offsetX;
          left = aspectRatio ? left + (aspectRatio * offsetY) / 2 : left - offsetX;
          break;

        case "br":
          height -= offsetY;
          width = aspectRatio ? height * aspectRatio : width - offsetX;
          break;

        case "c":
          top -= offsetY;
          left -= offsetX;
          break;
      }

      width = width < minSize ? minSize : width > startW ? startW : width;
      height = height < minSize ? minSize : height > startH ? startH : height;
      left = left + width > img.width ? img.width - width : left < 0 ? 0 : left;
      top = top + height > img.height ? img.height - height : top < 0 ? 0 : top;

      box.style.left = left + "px";
      box.style.top = top + "px";
      box.style.height = height + "px";
      box.style.width = width + "px";
      onResize(width, height, top, left);
    }
  }, []);

  useEffect(() => {
    const img = imageRef.current;
    const box = boxRef.current;
    if (img && box) {
      if (aspectRatio) {
        const currentAspectRatio = img.width / img.height;
        width = currentAspectRatio < aspectRatio ? img.width : img.height * aspectRatio;
        height = currentAspectRatio < aspectRatio ? img.width / aspectRatio : img.height;
      } else {
        width = img.width;
        height = img.height;
      }

      top = img.height > height ? (img.height - height) / 2 : 0;
      left = img.width > width ? (img.width - width) / 2 : 0;

      startW = width;
      startH = height;

      box.style.width = width + "px";
      box.style.height = height + "px";
      box.style.left = left + "px";
      box.style.top = top + "px";
      onResize(width, height, top, left);
    }
  }, [imageRef.current?.src]);

  return (
    <div className={cn.container + " droppable"} onMouseMove={drag}>
      <div className={cn.box} ref={boxRef} onMouseDown={startDrag("c")}>
        <div className={`${cn.point} ${cn["point-t"]}`} onMouseDown={startDrag("t")} />
        <div className={`${cn.point} ${cn["point-b"]}`} onMouseDown={startDrag("b")} />
        <div className={`${cn.point} ${cn["point-r"]}`} onMouseDown={startDrag("r")} />
        <div className={`${cn.point} ${cn["point-l"]}`} onMouseDown={startDrag("l")} />
        <div className={`${cn.point} ${cn["point-tr"]}`} onMouseDown={startDrag("tr")} />
        <div className={`${cn.point} ${cn["point-tl"]}`} onMouseDown={startDrag("tl")} />
        <div className={`${cn.point} ${cn["point-br"]}`} onMouseDown={startDrag("br")} />
        <div className={`${cn.point} ${cn["point-bl"]}`} onMouseDown={startDrag("bl")} />
      </div>
    </div>
  );
};
