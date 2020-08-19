import styled from "astroturf";
import { useToolTip } from "hooks/useToolTip";
import React from "react";
import { Button } from "../../components/Button/Button";
import * as styles from "./styles.module.scss";

export const HomePage = () => {
  const { getToolTipProps } = useToolTip();

  return (
    <div>
      <h1 {...getToolTipProps(<div>h1</div>)}>Home page</h1>
      <br />
      <ButtonContainer>
        <Button
          {...getToolTipProps(
            <div className={styles.toolTipContent}>button button button button button button</div>,
            "left"
          )}
        >
          Button
        </Button>
      </ButtonContainer>
    </div>
  );
};

const ButtonContainer = styled.div`
  position: absolute;
  top: 99%;
  left: 92%;
  transform: translate(-50%, -50%);
  width: 200px;
`;
