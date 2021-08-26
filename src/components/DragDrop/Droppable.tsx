import { DetailedHTMLProps, HTMLAttributes } from "react";

export type DroppableProps<T> = {
  props: DetailedHTMLProps<HTMLAttributes<T>, T> & { "data-droppable": string };
};

type Props<T> = {
  children: (props: DroppableProps<T>) => JSX.Element;
  id: string;
};

export const Droppable = <T,>({ children, id }: Props<T>) => {
  return children({ props: { id: id, ["data-droppable"]: id } });
};
