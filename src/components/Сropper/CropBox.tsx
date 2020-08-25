import styled from "astroturf";
import React, { FC, MouseEventHandler, RefObject, useCallback, useEffect, useRef } from "react";

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
    (p: string): MouseEventHandler<HTMLDivElement> => (e) => {
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
    <Container className="droppable" onMouseMove={drag}>
      <Box ref={boxRef} onMouseDown={startDrag("c")}>
        <Point point="t" onMouseDown={startDrag("t")} />
        <Point point="b" onMouseDown={startDrag("b")} />
        <Point point="r" onMouseDown={startDrag("r")} />
        <Point point="l" onMouseDown={startDrag("l")} />
        <Point point="tr" onMouseDown={startDrag("tr")} />
        <Point point="tl" onMouseDown={startDrag("tl")} />
        <Point point="br" onMouseDown={startDrag("br")} />
        <Point point="bl" onMouseDown={startDrag("bl")} />
      </Box>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Box = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(66, 139, 210, 0.36);
  cursor: move;
`;

const Point = styled.div<{ point: string }>`
  width: 4px;
  height: 4px;
  position: absolute;
  background: rgba(216, 216, 216, 0.31);
  border: 1px solid rgba(182, 182, 182, 0.65);
  cursor: pointer;
  &::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    position: relative;
    top: -4px;
    left: -4px;
  }
  &.point-t {
    top: -2px;
    cursor: n-resize;
  }
  &.point-b {
    bottom: -2px;
    cursor: n-resize;
  }
  &.point-l {
    left: -2px;
    cursor: e-resize;
  }
  &.point-r {
    right: -2px;
    cursor: e-resize;
  }
  &.point-tl {
    top: -2px;
    left: -2px;
    cursor: se-resize;
  }
  &.point-tr {
    top: -2px;
    right: -2px;
    cursor: ne-resize;
  }
  &.point-bl {
    bottom: -2px;
    left: -2px;
    cursor: ne-resize;
  }
  &.point-br {
    bottom: -2px;
    right: -2px;
    cursor: se-resize;
  }
`;
