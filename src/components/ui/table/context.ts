// packages
import { createContext, useContext } from "react";
// helpers
import { isUndefined } from "@helpers/assertions";
// types
import { TableContextProps } from "./types";

const DEFAULT_CTX_VALUES = ({} as unknown) as TableContextProps;

export const TableContext = createContext(DEFAULT_CTX_VALUES);

export const useTable = () => {
  const ctx = useContext(TableContext);

  if (isUndefined(ctx)) {
    throw new Error(`'useTable' must be used within a 'TableProvider'`);
  }

  return ctx;
};
