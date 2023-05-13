import { Cropper } from "components/Сropper/Cropper";
import React, { ReactEventHandler, useState } from "react";

export const CropperDemo = () => {
  const [dataUrl, setDataUrl] = useState("");
  const handleChange: ReactEventHandler<HTMLInputElement> = (e) => {
    const files = e.currentTarget.files;
    if (files && files.length) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => setDataUrl(reader.result as string);
    }
  };

  return (
    <div className="container">
      <h1>Cropper</h1>

      <input type="file" onChange={handleChange} />
      {!!dataUrl && <Cropper dataUrl={dataUrl} width={300} height={200} />}
    </div>
  );
};
