import React, { Fragment, SyntheticEvent, useEffect, useMemo, useState } from "react";
import { CheckboxIcon, Tag, TriangleIcon } from "./elements";
import * as styles from "./styles.module.scss";
import {
  filterData,
  getDataMap,
  removeSelectedRecursiv,
  selectItemRecursiv,
  getSelectedFromValues,
} from "./util";
import { useRef } from "react";

export type SelectDataType = {
  id: number;
  parentId?: number;
  label: string;
  value: string;
  disabled: boolean;
  children?: SelectDataType[];
};

interface IProps {
  data: SelectDataType[];
  onChange?: (values: SelectDataType[]) => void;
  label?: string;
  placeholder?: string;
  disabled?: string;
  error?: string;
  values?: number[];
  allTag?: boolean;
}

/**
 * Елемент показывает выподающий (древовидный) список с подгруппами для выбора элементов групп и подгрупп
 * @data Древовидная структура данных из которых выбирать
 * @onChange Колбэк для сохранения изменений получает список выбранных элементов
 * @label Название элемента
 * @placeholder показывается если не выбраты элементы
 * @disabled выбор заблокирован или нет
 * @error Подсвечивает поле если в нем ошибка
 * @values Первоначальные значения
 * @allTag Показать тэг "Все"
 */
export const TreeSelect = ({
  onChange,
  label,
  placeholder,
  error,
  values,
  allTag,
  ...props
}: IProps) => {
  const [data, setData] = useState<SelectDataType[]>([]);
  const [listIsOpen, setListIsOpen] = useState(false);
  const [selected, setSelected] = useState<Record<string, SelectDataType>>({});
  const [expanded, setExpanded] = useState<Record<string, SelectDataType>>({});
  const dataMap = useMemo(() => getDataMap(props.data, new Map()), [props.data]);
  const containerRef = useRef<HTMLLabelElement>(null);

  // Метод для обработки изменений выбранных значений
  // вызывает событие onChange с новым значением
  const handleChange = (nextSelected: Record<string, SelectDataType>) => {
    setSelected(nextSelected);
    if (onChange) onChange(Object.values(nextSelected));
  };

  // Метод для обработки события "выбор элемента"
  const selectItem = (item: SelectDataType) => (e: SyntheticEvent) => {
    e.stopPropagation();
    handleChange(selectItemRecursiv(item, dataMap, { ...selected }));
  };

  // Метод для обработки события "отмена выбора элемента"
  const removeSelected = (item: SelectDataType) => (e?: SyntheticEvent) => {
    if (e) e.stopPropagation();
    handleChange(removeSelectedRecursiv(item, dataMap, { ...selected }));
  };

  // Метод открывает группу или подгруппу
  const handleOpen = (item: SelectDataType) => (e: SyntheticEvent) => {
    e.stopPropagation();
    setExpanded({ ...expanded, [item.value]: item });
  };

  // Метод закрывает группу или подгруппу
  const handleClose = (value: string) => (e: SyntheticEvent) => {
    e.stopPropagation();
    const nextExpanded = { ...expanded };
    delete nextExpanded[value];
    setExpanded(nextExpanded);
  };

  // Метод устанавливает значение для фильтрации элементов
  const handleSearch = (e: SyntheticEvent<HTMLInputElement>) =>
    setData(filterData(props.data, e.currentTarget.value));

  // Колбэк для закрытия списка по клику снаружи
  const handleClickOutside = (e: Event) => {
    if (containerRef.current && e.composedPath().includes(containerRef.current)) return;
    setListIsOpen(false);
  };

  // Хук добовляет обработчик для события клика снаружи
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Хук фильтрует данные для списка в зависимости от строки поиска
  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  // Хук устанавливает первоночальные значения
  useEffect(() => {
    if (values) setSelected(getSelectedFromValues(values, dataMap));
  }, [values]);

  // Рекурсивно рисует элементы древовидного списка
  const renderItem = (parentIsSelected?: boolean) => ({ children, ...item }: SelectDataType) => {
    const { label, value, disabled } = item;
    const isSelected = !!selected[item.value] || parentIsSelected;

    return (
      <Fragment key={value}>
        <div
          onClick={isSelected ? removeSelected(item) : selectItem(item)}
          className={`${styles.item} ${disabled && styles.disabledItem}`}
        >
          <div
            onClick={expanded[item.value] ? handleClose(value) : handleOpen(item)}
            className={styles.itemArrowBtn}
          >
            {!!children?.length && !disabled && (
              <TriangleIcon
                className={`${styles.listArrow} ${expanded[item.value] && styles.listArrowOpen}`}
              />
            )}
          </div>

          <div className={styles.checkboxBtn}>
            {!disabled && <CheckboxIcon selected={isSelected} />}
          </div>

          <div className={styles.itemLabel} title={label}>
            {label}
          </div>
        </div>

        {!!children?.length && expanded[item.value] && (
          <div className={styles.children}>{children.map(renderItem(isSelected))}</div>
        )}
      </Fragment>
    );
  };

  const tags = Object.values(selected);
  return (
    <label className={styles.container} ref={containerRef}>
      <span className={styles.label}>{label}</span>
      <div
        onClick={() => !props.disabled && setListIsOpen(!listIsOpen)}
        className={`${styles.field} ${!!error && styles.error} ${
          props.disabled && styles.disabled
        }`}
        tabIndex={0}
      >
        <div className={styles.tagsList}>
          {tags.length ? (
            tags.map((item) => (
              <Tag
                key={item.value}
                name={item.label}
                onClick={!props.disabled ? removeSelected(item) : undefined}
              />
            ))
          ) : allTag ? (
            <Tag name="Все" />
          ) : (
            <div className={styles.placeholder}>{placeholder}</div>
          )}
        </div>

        <div className={styles.listArrowBtn}>
          <TriangleIcon className={`${styles.listArrow} ${listIsOpen && styles.listArrowOpen}`} />
        </div>
      </div>

      <div className={`${styles.listContainer} ${!listIsOpen && styles.displayNone}`}>
        <input type="text" onChange={handleSearch} placeholder="Поиск" className={styles.search} />
        <div className={styles.optionsList}>{data.map(renderItem())}</div>
      </div>
    </label>
  );
};
