import styled from "astroturf";
import { useToolTip } from "hooks/useToolTip";
import React from "react";
import Button from "components/Button";
import * as styles from "./styles.module.scss";

export const ToolTipPage = () => {
  const { getToolTipProps } = useToolTip();

  return (
    <div className="container">
      <h1>Tool tip</h1>
      <ButtonContainer>
        <Button
          {...getToolTipProps(
            <div className={styles.toolTipContent}>button button button button button button</div>
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
`;
