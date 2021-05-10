// types
import type { ReactNode, ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";

type Column = {
  label: string;
  orderBy?: string;
  options?: THeadCellProps;
};

export type ColumnData = Array<Column | string>;

export type Order = "ASC" | "DESC";

export type RowData = Array<Record<string, any>>;

export type TableContextProps = {
  rows: RowData;
  rowCount: number;
  withPagination: boolean;
  page: number;
  order: Order;
  orderBy: string;
  rowsPerPage: number;
  setData: Dispatch<SetStateAction<RowData>>;
  setPage: Dispatch<SetStateAction<number>>;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
};
export interface TableProps extends ComponentPropsWithoutRef<"table"> {
  rowData: RowData;
  columnData?: ColumnData;
  children?: ReactNode;
  withPagination?: boolean;
  withSorting?: boolean;
  rowsPerPage?: number;
  defaultOrderBy?: string;
}

export interface THeadProps extends ComponentPropsWithoutRef<"thead"> {}

export interface THeadCellProps extends ComponentPropsWithoutRef<"th"> {
  readerOnly?: boolean;
  iconLabel?: string;
}

export interface TBodyProps extends ComponentPropsWithoutRef<"tbody"> {
  children?: (context: { rows: RowData }) => ReactNode;
}

export interface TRowProps extends ComponentPropsWithoutRef<"tr"> {}

export interface TDataCellProps extends ComponentPropsWithoutRef<"td"> {
  alignEnd?: boolean;
  fixedWidth?: boolean;
}

export interface TPagination extends ComponentPropsWithoutRef<"div"> {
  pageNumberButtonClass?: string;
}
