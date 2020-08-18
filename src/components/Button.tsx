import styled from "astroturf";
import React, { FC, ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: string;
  size?: string;
}

export const Button: FC<IProps> = (props) => <Btn {...props} />;

const Btn = styled.button<{ btnType?: string; size?: string }>`
  background: white;
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  line-height: 30px;
  padding: 0 10px;
  cursor: pointer;
  outline: 0;
  width: 100%;
  font: inherit;
  font-size: inherit;
  color: inherit;
  &:hover {
    opacity: 0.8;
  }
  &.size-small {
    line-height: 24px;
  }
  &.size-big {
    line-height: 38px;
  }
`;
