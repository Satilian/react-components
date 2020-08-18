import React, { FC, MouseEvent, useEffect, useRef } from "react";
import * as styles from "./styles.module.scss";

interface IProps {
  title: string;
}

export const ToolTip: FC<IProps> = ({ children, title }) => {
  const ref = useRef(null);
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget;
    console.log(e.pageX, e.pageY);
  };

  useEffect(() => {
    // console.log(ref.current)
  }, [ref]);

  return (
    <div className={styles.container} ref={ref} onMouseMove={handleMouseMove}>
      {children}
      <div className={`${styles.title} ${styles.displayNone}`}>{title}</div>
    </div>
  );
};
