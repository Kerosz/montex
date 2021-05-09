// types
import type { ReactNode, ComponentPropsWithoutRef } from "react";
import type { Data } from "./context";

export interface TableProps extends ComponentPropsWithoutRef<"table"> {
  tableData: Data;
  children?: ReactNode;
  withPagination?: boolean;
  rowsPerPage?: number;
}

export interface THeadProps extends ComponentPropsWithoutRef<"thead"> {}

export interface THeadCellProps extends ComponentPropsWithoutRef<"th"> {
  readerOnly?: boolean;
}

export interface TBodyProps extends ComponentPropsWithoutRef<"tbody"> {
  children?: (context: { rowData: Data }) => ReactNode;
}

export interface TRowProps extends ComponentPropsWithoutRef<"tr"> {}

export interface TDataCellProps extends ComponentPropsWithoutRef<"td"> {
  alignEnd?: boolean;
  fixedWidth?: boolean;
}

export interface TPagination extends ComponentPropsWithoutRef<"div"> {
  pageNumberButtonClass?: string;
}

export type { Data };
