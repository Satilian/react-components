import React, { useState } from "react";
import cn from "./style.module.css";
import { CustomScroll } from "components/CustomScroll/CustomScroll";
import { CropperDemo } from "./CropperDemo";
import { Button } from "components/Button/Button";

export const App = () => {
  const [size, setSize] = useState(100);

  return (
    <div className={cn.app}>
      <div className={cn.scrollDemo}>
        <div className={cn.buttns}>
          <Button onClick={() => setSize(size + 20)}>+</Button>
          <Button onClick={() => setSize(size - 20)}>-</Button>
        </div>

        <CustomScroll className={cn.scrolled}>
          <div className={cn.content} style={{ width: `${10 * size}px`, height: `${5 * size}px` }}>
            <div>content</div>
          </div>
        </CustomScroll>
      </div>

      <div className={cn.cropperDemo}>
        <CropperDemo />
      </div>
    </div>
  );
};
