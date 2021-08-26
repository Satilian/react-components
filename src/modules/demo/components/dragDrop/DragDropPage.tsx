import { Context, ContextData, Draggable, Droppable } from "components/DragDrop";
import React, { useState } from "react";
import styles from "./DragDropPage.module.scss";

const data = [
  { label: "label 1", value: "value_1" },
  { label: "label 2", value: "value_2" },
  { label: "label 3", value: "value_3" },
  { label: "label 4", value: "value_4" },
  { label: "label 5", value: "value_5" },
  { label: "label 6", value: "value_6" },
];

const id2list: Record<string, string> = { droppable1: "left", droppable2: "right" };

const move = (state: Record<string, any[]>, { source, destination }: ContextData) => {
  if (source?.index === undefined || !destination) return state;

  const sourceList = [...state[id2list[source.droppableId]]];
  const destinationList = [...state[id2list[destination.droppableId]]];
  const [item] = sourceList.splice(source.index, 1);

  if (!item || !destinationList) return state;

  const result: Record<string, any[]> = state;

  if (source.droppableId === destination.droppableId) {
    if (source.index === destination.index) return state;
    destinationList.splice(source.index, 1);
  } else {
    result[id2list[source.droppableId]] = sourceList;
  }

  destination.index !== undefined
    ? destinationList.splice(destination.index, 0, item)
    : destinationList.push(item);

  result[id2list[destination.droppableId]] = destinationList;

  return result;
};

export const DragDropPage = () => {
  const [state, setState] = useState<Record<string, any[]>>({ left: [...data], right: [...data] });

  const onDragEnd = (e: ContextData) => setState({ ...move(state, e) });

  return (
    <Context onDragEnd={onDragEnd}>
      <div className={styles.container}>
        <Droppable<HTMLUListElement> id="droppable1">
          {({ props }) => (
            <ul {...props} className={styles.droppable}>
              {state.left.map(({ label }, i) => (
                <Draggable<HTMLLIElement> key={i} draggableId={"draggable1" + i} index={i}>
                  {({ props }) => (
                    <li {...props} className={styles.li}>
                      <div>
                        <span>{label}</span>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>

        <Droppable<HTMLUListElement> id="droppable2">
          {({ props }) => (
            <ul {...props} className={styles.droppable}>
              {state.right.map(({ label }, i) => (
                <Draggable<HTMLLIElement> key={i} draggableId={"draggable2" + i} index={i}>
                  {({ props }) => (
                    <li {...props} className={styles.li}>
                      <div>
                        <span>{label}</span>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </div>
    </Context>
  );
};
