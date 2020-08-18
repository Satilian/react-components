import React, { FC } from "react";
import { Button } from "../../components/Button/Button";
import styled from "astroturf";
import { useToolTip } from "hooks/useToolTip";

export const HomePage: FC = () => {
  const { getToolTipProps, ToolTipPortal } = useToolTip();

  return (
    <div>
      <h1>Home page</h1>
      <br />
      <ButtonContainer>
        <ToolTipPortal />
        <Button {...getToolTipProps(<div key={1}>content</div>)}>Button</Button>
      </ButtonContainer>
    </div>
  );
};

const ButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
`;
