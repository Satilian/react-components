import React, { useState } from "react";
import cn from "./style.module.scss";
import { OutsideScroll } from "components/OutsideScroll/OutsideScroll";

export const App = () => {
  const [size, setSize] = useState(100);

  return (
    <div className={cn.app}>
      <div className={cn.buttns}>
        <button onClick={() => setSize(size + 20)}>+</button>
        <button onClick={() => setSize(size - 20)}>-</button>
      </div>

      <OutsideScroll className={cn.scrolled}>
        <div className={cn.content} style={{ width: `${10 * size}px`, height: `${5 * size}px` }}>
          <div>content</div>
        </div>
      </OutsideScroll>
    </div>
  );
};
