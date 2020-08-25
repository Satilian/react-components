export const cropImage = (
  dataUrl: string,
  nextWidth: number,
  nextHeight: number,
  top?: number,
  left?: number
): Promise<string> =>
  new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const aspectRatio = nextWidth / nextHeight;

    canvas.width = nextWidth;
    canvas.height = nextHeight;
    img.src = dataUrl;

    img.addEventListener("load", () => {
      const currentAspectRatio = img.width / img.height;
      const w = currentAspectRatio < aspectRatio ? img.width : img.height * aspectRatio;
      const h = currentAspectRatio < aspectRatio ? img.width / aspectRatio : img.height;
      const sx = img.width > w ? (img.width - w) / 2 : 0;
      const sy = img.height > h ? (img.height - h) / 2 : 0;
      if (top && left) {
        ctx?.drawImage(img, left, top, nextWidth, nextHeight, 0, 0, nextWidth, nextHeight);
      } else {
        ctx?.drawImage(img, sx, sy, w, h, 0, 0, nextWidth, nextHeight);
      }
      resolve(canvas.toDataURL(dataUrl.split(";")[0].split(":")[1]));
    });
  });
