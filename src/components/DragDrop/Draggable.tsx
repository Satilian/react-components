import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { dndContext } from ".";
import { getSource } from "./utils";

export type DraggbleProps<T> = {
  provided: { isDragging?: boolean };
  props: DetailedHTMLProps<HTMLAttributes<T>, T> & { "data-index": number };
};

type Props<T> = {
  children: (props: DraggbleProps<T>) => JSX.Element;
  draggableId: string;
  index: number;
};

type State<T> = {
  provided: DraggbleProps<T>["provided"];
  shiftX?: number;
  shiftY?: number;
};

export const Draggable = <T,>({ children, draggableId, index }: Props<T>) => {
  const [state, setState] = useState<State<T>>({ provided: { isDragging: false } });
  const context = useContext(dndContext);
  const ref = useRef<any>(null);

  const onMouseDown = (e: React.MouseEvent<T>) => {
    setState({
      ...state,
      provided: { isDragging: true },
      shiftX: e.clientX - (ref.current?.getBoundingClientRect().left || 0),
      shiftY: e.clientY - (ref.current?.getBoundingClientRect().top || 0),
    });
    context.setData({ ...context.data, source: getSource(e.pageX, e.pageY) });
    context.setState({ isDragging: true });
  };

  const onMouseUp = (e: React.MouseEvent<T>) => {
    setState({ ...state, provided: { isDragging: false } });
    ref.current?.setAttribute("style", "");
    context.setData({ ...context.data, destination: getSource(e.pageX, e.pageY) });
    context.setState({ isDragging: false });
  };

  const onMouseMove = (e: MouseEvent) => {
    const { shiftX = 0, shiftY = 0 } = state;
    const style = `left: ${e.pageX - shiftX}px; top: ${e.pageY - shiftY}px; position: fixed`;
    ref.current?.setAttribute("style", style);
  };

  useEffect(() => {
    if (!state.provided.isDragging) return;
    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [state.provided.isDragging]);

  return children({
    provided: state.provided,
    props: { id: draggableId, ["data-index"]: index, onMouseDown, onMouseUp, ref },
  });
};
