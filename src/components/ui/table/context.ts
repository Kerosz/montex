// packages
import { createContext, useContext } from "react";
// helpers
import { isUndefined } from "@helpers/assertions";
// types
import type { Dispatch, SetStateAction } from "react";

export type Data = Array<Record<string, any>>;

export type TableContextProps = {
  rowData: Data;
  rowCount: number;
  withPagination: boolean;
  page: number;
  rowsPerPage: number;
  setData: Dispatch<SetStateAction<Data>>;
  setPage: Dispatch<SetStateAction<number>>;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
};

const DEFAULT_CTX_VALUES = ({} as unknown) as TableContextProps;

export const TableContext = createContext(DEFAULT_CTX_VALUES);

export const useTable = () => {
  const ctx = useContext(TableContext);

  if (isUndefined(ctx)) {
    throw new Error(`'useTable' must be used within a 'TableProvider'`);
  }

  return ctx;
};
