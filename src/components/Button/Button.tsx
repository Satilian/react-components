import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import * as styles from "./styles.module.scss";

interface IProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  btnType?: string;
  size?: string;
}

export const Button = ({ size, className, ...props }: IProps) => (
  <button className={`${styles.button} ${size && `size-${size}`} ${className}`} {...props} />
);
