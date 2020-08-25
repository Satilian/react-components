import { SelectDataType } from "./TreeSelect";

// Возвращает карту данных для доступа к элементам по id
export const getDataMap = (items: SelectDataType[], map: Map<number, SelectDataType>) => {
  items.forEach((item) => {
    map.set(item.id, item);
    if (item.children) getDataMap(item.children, map);
  });

  return map;
};

// Рекурсивно фильтрует данные в зависимости от текста для поиска
export const filterData = (data: SelectDataType[], text: string): SelectDataType[] =>
  data.filter((item) => {
    const children = item.children && filterData(item.children, text);
    if (children?.length) {
      item.children = children;
      return true;
    }
    return item.label.toLowerCase().includes(text.toLowerCase());
  });

// Рекурсивно удаляет элементы из выбранных значений
export const removeSelectedRecursiv = (
  item: SelectDataType,
  dataMap: Map<number, SelectDataType>,
  nextSelected: Record<string, SelectDataType>
) => {
  const parent = item.parentId ? dataMap.get(item.parentId) : undefined;
  if (parent && !nextSelected[item.value])
    parent.children?.forEach((child) => (nextSelected[child.value] = child));
  delete nextSelected[item.value];
  if (parent) removeSelectedRecursiv(parent, dataMap, nextSelected);
  return nextSelected;
};

// Рекурсивно удаляет вложенные элементы из выбранных значений при выборе родительского элемента
const unsetSelection = (items: SelectDataType[], nextSelected: Record<string, SelectDataType>) => {
  items.forEach((child) => {
    delete nextSelected[child.value];
    if (child.children) unsetSelection(child.children, nextSelected);
  });
};

// Рекурсивно выберает элемент, удаляет вложенные элементы из выбранных,
// добавляет родительский элемент в выбранные если выбраны все вложенные элементы
export const selectItemRecursiv = (
  item: SelectDataType,
  dataMap: Map<number, SelectDataType>,
  nextSelected: Record<string, SelectDataType>
) => {
  nextSelected[item.value] = item;
  const parent = item.parentId ? dataMap.get(item.parentId) : undefined;
  const allChildSelected =
    parent?.children?.length && parent.children.every((child) => nextSelected[child.value]);

  if (parent && allChildSelected) {
    (parent?.children || []).forEach((child) => {
      delete nextSelected[child.value];
    });
    selectItemRecursiv(parent, dataMap, nextSelected);
  } else {
    item.children?.length && unsetSelection(item.children, nextSelected);
  }
  return nextSelected;
};

// Создает список выбранных элементов из первоночального значения
export const getSelectedFromValues = (values: number[], dataMap: Map<number, SelectDataType>) => {
  const selected: Record<string, SelectDataType> = {};
  values.forEach((id) => {
    const item = dataMap.get(id);
    if (item) {
      selectItemRecursiv(item, dataMap, selected);
    }
  });
  return selected;
};
