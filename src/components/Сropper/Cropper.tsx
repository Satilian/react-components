import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { CropBox } from "./CropBox";
import { cropImage } from "./cropImage";
import cn from "./style.module.css";

interface IProps {
  dataUrl: string;
  width?: number;
  height?: number;
  onResize?: (dataUrl: string) => void;
}

const WIDTH = 400;

export const Cropper = ({ dataUrl, width, height, onResize }: IProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const aspectRatio = useMemo(() => {
    if (width && height) return width / height;
  }, [width, height]);

  const previewResize = useCallback((w: number, h: number, t: number, l: number) => {
    const previewBox = previewRef.current;
    const previewImg = previewImgRef.current;
    const img = imageRef.current;
    if (previewImg && img && previewBox) {
      const ratio = WIDTH / w;
      previewBox.style.height = WIDTH / (w / h) + "px";
      previewImg.style.width = WIDTH * ratio + "px";
      previewImg.style.left = -l * ratio + "px";
      previewImg.style.top = -t * ratio + "px";
    }
  }, []);

  const handleResize = async (w: number, h: number, t: number, l: number) => {
    previewResize(w, h, t, l);

    const nextDataUrl = await cropImage(dataUrl, w, h, t, l);
    if (onResize) onResize(nextDataUrl);
  };

  useEffect(() => {
    const previewBox = previewRef.current;
    const img = imageRef.current;
    if (previewBox && img) {
      const ratio = img.width / img.height;
      previewBox.style.width = WIDTH + "px";
      previewBox.style.height = (aspectRatio ? WIDTH / aspectRatio : WIDTH / ratio) + "px";
    }
  }, []);

  return (
    <div className={cn.cropper}>
      <div className={cn.wrapper}>
        <img className={cn.croppedImage} src={dataUrl} alt="Crop this" ref={imageRef} />
        <CropBox aspectRatio={aspectRatio} imageRef={imageRef} onResize={handleResize} />
      </div>

      <div className={cn.preview} ref={previewRef}>
        <img className={cn.previewImage} src={dataUrl} alt="Preview" ref={previewImgRef} />
      </div>
    </div>
  );
};
