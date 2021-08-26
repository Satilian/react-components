import React, { createContext, FC, useContext, useEffect } from "react";

export type Source = { droppableId: string; index?: number; draggableId?: string };
export type ContextData = { source?: Source; destination?: Source };

type ContextValue = {
  data: ContextData;
  state: Record<string, any>;
  setData: (data: ContextData) => void;
  setState: (state: Record<string, any>) => void;
};

type Props = {
  onDragEnd: (e: ContextData) => void;
};

const initialValue = {
  data: {},
  state: {},
  setData(data: ContextData) {
    this.data = data;
  },
  setState(state: Record<string, any>) {
    this.state = state;
  },
};

export const dndContext = createContext<ContextValue>(initialValue);
const placeholder = document.createElement("div");

export const Context: FC<Props> = ({ children, onDragEnd }) => {
  const context = useContext(dndContext);

  const onMouseUp = () => {
    onDragEnd(context.data);
    context.setData({});
    context.setState({});
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!context.state.isDragging) {
      placeholder.setAttribute("style", "");
      return;
    }
    const draggable = document.getElementById(context.data.source?.draggableId || "");
    draggable && (draggable.hidden = true);
    let elem = document.elementFromPoint(e.pageX, e.pageY) as HTMLElement | null;
    draggable && (draggable.hidden = false);
    while (elem && elem !== document.body && !elem.dataset.index && !elem.dataset.droppable)
      elem = elem.parentElement || null;

    const style = `width: ${draggable?.offsetWidth}px; height: ${draggable?.offsetHeight}px;`;
    placeholder.setAttribute("style", style);

    if (elem?.dataset.index) {
      placeholder.dataset.index = elem.dataset.index;
      elem.before(placeholder);
    }
    if (elem?.dataset.droppable) {
      placeholder.dataset.index = elem.children.length.toString();
      elem.append(placeholder);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <>{children}</>;
};
