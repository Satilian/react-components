import styled from "astroturf";
import TreeSelect from "components/TreeSelect";
import { SelectDataType } from "components/TreeSelect/TreeSelect";
import React, { useMemo } from "react";
import { regions } from "./mock";

// Преобразует структуру данных с сервера для компонента TreeSelect
const assignChildrenRecursive = (list: SelectDataType[], parentId?: number): any =>
  list
    .filter((item) => parentId === item.parentId)
    .map((item) => ({
      ...item,
      children: assignChildrenRecursive(list, item.id),
    }));

export const TreeSelectPage = () => {
  const data = useMemo<SelectDataType[]>(() => assignChildrenRecursive(regions), []);

  return (
    <div className="container">
      <h1>TreeSelect</h1>

      <TreeSelectContainer>
        <TreeSelect data={data} />
      </TreeSelectContainer>
    </div>
  );
};

const TreeSelectContainer = styled.div`
  width: 500px;
`;
