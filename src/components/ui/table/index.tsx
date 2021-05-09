// packages
import cn from "classnames";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { TableContext, useTable, Data } from "./table-context";
// types
import { ReactNode, ComponentPropsWithoutRef, useMemo } from "react";

// TODO: Convert components into "withRef" (forwardRef)

export interface TableProps extends ComponentPropsWithoutRef<"table"> {
  tableData: Data;
  children?: ReactNode;
  withPagination?: boolean;
}

export interface THeadProps extends ComponentPropsWithoutRef<"thead"> {}

export interface THeadCellProps extends ComponentPropsWithoutRef<"th"> {
  readerOnly?: boolean;
}

export interface TBodyProps extends ComponentPropsWithoutRef<"tbody"> {
  children?: (context: { tableData: Data }) => ReactNode;
}

export interface TRowProps extends ComponentPropsWithoutRef<"tr"> {}

export interface TDataCellProps extends ComponentPropsWithoutRef<"td"> {
  alignEnd?: boolean;
  fixedWidth?: boolean;
}

export interface TPagination extends ComponentPropsWithoutRef<"div"> {
  pageNumberButtonClass?: string;
}

function TableHead({ children, ...rest }: THeadProps) {
  return (
    <thead className="bg-gray-50" {...rest}>
      <tr>{children}</tr>
    </thead>
  );
}

function TableHeadCell({ children, readerOnly, className, ...rest }: THeadCellProps) {
  const rootClass = cn("px-6 py-3 cursor-default", {
    "text-left text-xs font-medium text-gray-500 uppercase tracking-wider": !readerOnly,
    relative: readerOnly,
  });

  return (
    <th scope="col" className={rootClass} title={String(children)} {...rest}>
      {readerOnly ? <span className="sr-only">{children}</span> : children}
    </th>
  );
}

function TableBody({ children, ...rest }: TBodyProps) {
  const { tableData } = useTable();

  return (
    <tbody className="bg-white-normal divide-y divide-gray-200" {...rest}>
      {children ? children({ tableData }) : null}
    </tbody>
  );
}

function TableRow(props: TRowProps) {
  return <tr {...props} />;
}

function TableDataCell({ className, alignEnd, fixedWidth, ...rest }: TDataCellProps) {
  const rootClass = cn(
    "px-6 py-4",
    {
      "text-right": alignEnd,
      "max-w-[405px] min-w-[300px]": fixedWidth,
      "whitespace-nowrap": !fixedWidth,
    },
    className
  );

  return <td className={rootClass} {...rest} />;
}

function TablePagination({ pageNumberButtonClass, className, ...rest }: TPagination) {
  const numberButtonClass = cn(
    {
      "items-center px-4 py-2 border border-gray-300 bg-white-normal text-sm font-medium text-gray-700 hover:bg-gray-50": !pageNumberButtonClass,
      pageNumberButtonClass: !!pageNumberButtonClass,
    },
    className
  );
  const hiddenNumberButtonClass = cn("hidden md:inline-flex", numberButtonClass);

  return (
    <div
      className="bg-white-normal shadow rounded-b-lg px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      {...rest}
    >
      <div className="flex-1 flex justify-between sm:hidden">
        <a href="#" className={numberButtonClass}>
          Previous
        </a>
        <a href="#" className={numberButtonClass}>
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-semibold">1</span> to{" "}
            <span className="font-semibold">10</span> of <span className="font-semibold">97</span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white-normal text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="#" className={numberButtonClass}>
              1
            </a>
            <a href="#" className={numberButtonClass}>
              2
            </a>
            <a href="#" className={hiddenNumberButtonClass}>
              3
            </a>
            <span className={numberButtonClass}>...</span>
            <a href="#" className={hiddenNumberButtonClass}>
              8
            </a>
            <a href="#" className={numberButtonClass}>
              9
            </a>
            <a href="#" className={numberButtonClass}>
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white-normal text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default function Table({
  children,
  withPagination = false,
  tableData,
  ...rest
}: TableProps): JSX.Element {
  const wrapperClass = cn("shadow overflow-hidden", {
    "sm:rounded-t-lg": withPagination,
    "sm:rounded-lg border-b border-gray-200": !withPagination,
  });

  const tableProvider = useMemo(() => ({ tableData, withPagination }), [tableData, withPagination]);

  return (
    <TableContext.Provider value={tableProvider}>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className={wrapperClass}>
              <table className="w-full divide-y divide-gray-200" {...rest}>
                {children}
              </table>
            </div>
          </div>
        </div>
      </div>
    </TableContext.Provider>
  );
}

Table.Head = TableHead;
Table.HeadCell = TableHeadCell;
Table.Body = TableBody;
Table.Row = TableRow;
Table.DataCell = TableDataCell;
Table.Pagination = TablePagination;
