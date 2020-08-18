import React, { useEffect, useState } from "react";
import * as styles from "./styles.module.scss";

interface IProps {
  title: string;
  className?: string;
}

export const ToolTip = ({ title, className }: IProps) => {
  const [state, setState] = useState(className);
  const handleMouseOver = (e: any) => {
    console.dir(e.target.dataset);
  };

  useEffect(() => {
    document.addEventListener("mouseover", handleMouseOver);

    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, []);

  return <div className={`${styles.container} ${state}`}>{title}</div>;
};
