import { MouseEvent, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

let elements: JSX.Element[] = [];
const container = document.createElement("div");
container.setAttribute("style", "display: none; position: absolute;");

const getToolTipProps = (content: JSX.Element) => {
  elements = [...elements, content];

  const toolTipProps = {
    onMouseOver(e: MouseEvent<HTMLElement>) {
      const rect: DOMRect = e.currentTarget.getBoundingClientRect();
      console.log(rect.width / 2, container.offsetWidth / 2);
      container.setAttribute(
        "style",
        `display: block; left: ${rect.left}px; bottom: ${
          rect.bottom
        }px;  position: absolute; transform: translate(${
          rect.width / 2 - container.offsetWidth / 2
        }px, 0)`
      );
    },
    onMouseLeave() {
      container.setAttribute("style", "display: none; position: absolute");
    },
  };
  return toolTipProps;
};

const ToolTipPortal = () => {
  useLayoutEffect(() => {
    const toolTip = document.getElementById("toolTip");
    toolTip?.appendChild(container);

    return () => {
      toolTip?.removeChild(container);
    };
  }, []);

  return createPortal(elements, container);
};

export const useToolTip = () => {
  return { getToolTipProps, ToolTipPortal };
};
