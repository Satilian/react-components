export const getSource = (pageX: number, pageY: number) => {
  let elem = document.elementFromPoint(pageX, pageY) as HTMLElement | null;
  let index: number | undefined;
  let droppableId: string | undefined;
  let draggableId: string | undefined;

  while (elem !== document.body && !droppableId) {
    if (elem?.dataset.index) {
      index = +elem.dataset.index;
      draggableId = elem.id;
    }
    elem?.dataset.droppable && (droppableId = elem.id);
    elem = elem?.parentElement || null;
  }

  return droppableId ? { index, draggableId, droppableId } : undefined;
};
