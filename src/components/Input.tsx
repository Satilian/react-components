import styled from "astroturf";
import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  title?: string;
  error?: boolean;
}
export const Input = forwardRef<HTMLInputElement, IProps>(({ title, ...props }, ref) => (
  <Container>
    <span>{title}</span>
    <InputEl {...props} ref={ref} />
  </Container>
));
Input.displayName = "Input";

const Container = styled.label`
  display: flex;
  flex-flow: column;
  margin: 4px 0;
`;

const InputEl = styled.input<{ error?: boolean }>`
  border: 1px solid #bbbbbb;
  outline: 0;
  border-radius: 4px;
  line-height: 36px;
  padding: 0 10px;
  &.error {
    border-color: red;
  }
`;
