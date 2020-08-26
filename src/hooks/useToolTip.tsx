import React, { Fragment, MouseEvent, useLayoutEffect } from "react";
import { render } from "react-dom";

let container: HTMLElement;

const getPosition = (rect: DOMRect, height: number, width: number, position: string) => {
  const isTop =
    (window.innerHeight < rect.top + height || position === "top") && rect.top - height > 0;
  const isLeft =
    (window.innerWidth < rect.right + width || position === "left") && rect.left - width > 0;

  const topCenter = rect.top + rect.height / 2 - height / 2;
  const leftCenter = rect.left + rect.width / 2 - width / 2;

  switch (position) {
    case "right":
    case "left":
      return {
        left: isLeft ? rect.left - width : rect.right,
        top: topCenter + height > window.innerHeight ? window.innerHeight - height : topCenter,
      };
    case "top":
    case "bottom":
    default:
      return {
        left: leftCenter + width > window.innerWidth ? window.innerWidth - width : leftCenter,
        top: isTop ? rect.top - height : rect.bottom,
      };
  }
};

const getToolTipProps = (content: JSX.Element, position = "bottom") => {
  const toolTipProps = {
    onMouseOver(e: MouseEvent<HTMLElement>) {
      const rect = e.currentTarget.getBoundingClientRect();
      render(content, container);
      setTimeout(() => {
        container.style.display = "block";
        const { offsetHeight: htight, offsetWidth: width } = container;
        const { left, top } = getPosition(rect, htight, width, position);
        container.style.left = `${left}px`;
        container.style.top = `${top}px`;
      }, 0);
    },
    onMouseLeave() {
      container.style.display = "none";
      render(<Fragment />, container);
    },
  };
  return toolTipProps;
};

export const useToolTip = (className = "custom-class") => {
  useLayoutEffect(() => {
    container = document.querySelector(".react-tool-tip") || document.createElement("div");
    container.classList.add("react-tool-tip");
    container.classList.add(className);
    const style = "position: absolute; width: max-content; display: none;";
    container.setAttribute("style", style);
    document.body.appendChild(container);

    return () => {
      if (container) document.body.removeChild(container);
    };
  }, []);
  return { getToolTipProps };
};
