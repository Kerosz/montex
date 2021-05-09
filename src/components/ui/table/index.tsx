// packages
import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import cn from "classnames";
// components
import Button from "@components/ui/button";
// context
import { TableContext, useTable } from "./context";
// hooks
import { useUpdateEffect } from "@hooks/use-update-effect";
// types
import type {
  THeadProps,
  THeadCellProps,
  TBodyProps,
  TRowProps,
  TDataCellProps,
  TPagination,
  TableProps,
  Data,
} from "./types";

// TODO: Convert components into "withRef" (forwardRef)

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
  const { rowData, page, rowsPerPage, withPagination } = useTable();

  const slicedData = rowData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <tbody className="bg-white-normal divide-y divide-gray-200" {...rest}>
      {children ? children({ rowData: withPagination ? slicedData : rowData }) : null}
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
  const { rowCount, setPage, rowsPerPage, page } = useTable();

  const startBound = page === 0;
  const endBound = page === Math.ceil(rowCount / rowsPerPage - 1);
  const showResultStart = page === 0 ? page * rowsPerPage + 1 : page * rowsPerPage;
  const showResultEnd =
    page * rowsPerPage + rowsPerPage <= rowCount ? page * rowsPerPage + rowsPerPage : rowCount;

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(rowCount / rowsPerPage);
    const totalPageArray = Array.from({ length: totalPages }, (_, i) => i);

    if (totalPages <= 6) {
      return totalPageArray.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant="slim"
          className={numberButtonClass}
          onClick={() => setPage(pageNumber)}
          disabled={page === pageNumber}
          reset
        >
          {pageNumber + 1}
        </Button>
      ));
    } else if (totalPages > 6) {
      const slicedPageArray = [...totalPageArray.slice(0, 3), NaN, ...totalPageArray.slice(-3)];

      return slicedPageArray.map((pageNumber) =>
        Number.isNaN(pageNumber) ? (
          <span key={pageNumber} className={numberButtonClass}>
            ...
          </span>
        ) : (
          <Button
            key={pageNumber}
            variant="slim"
            className={numberButtonClass}
            onClick={() => setPage(pageNumber)}
            disabled={page === pageNumber}
            reset
          >
            {pageNumber + 1}
          </Button>
        )
      );
    }
  };

  const numberButtonClass = cn(
    {
      "items-center px-4 py-2 border border-gray-300 bg-white-normal text-sm font-medium text-gray-700 hover:bg-gray-50": !pageNumberButtonClass,
      pageNumberButtonClass: !!pageNumberButtonClass,
    },
    className
  );

  return (
    <div
      className="bg-white-normal shadow rounded-b-lg px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      {...rest}
    >
      <div className="flex-1 flex justify-between sm:hidden">
        <Button
          variant="slim"
          className={numberButtonClass}
          onClick={() => setPage((page) => page - 1)}
          disabled={startBound}
          reset
        >
          Previous
        </Button>
        <Button
          variant="slim"
          className={numberButtonClass}
          onClick={() => setPage((page) => page + 1)}
          disabled={endBound}
        >
          Next
        </Button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-semibold">{showResultStart}</span> to{" "}
            <span className="font-semibold">{showResultEnd}</span> of{" "}
            <span className="font-semibold">{rowCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <Button
              variant="slim"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white-normal text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => setPage((page) => page - 1)}
              disabled={startBound}
              reset
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
            {generatePageNumbers()}
            <Button
              variant="slim"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white-normal text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => setPage((page) => page + 1)}
              disabled={endBound}
              reset
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default function Table({
  children,
  withPagination = false,
  rowsPerPage = 4,
  tableData,
  ...rest
}: TableProps): JSX.Element {
  const [data, setData] = useState<Data>(tableData);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPageState, setRowsPerPage] = useState<number>(rowsPerPage);

  // Needed to re-update data state if SWR mutates state
  useUpdateEffect(() => setData(tableData), [tableData]);

  const tableProvider = useMemo(
    () => ({
      rowData: data,
      rowCount: tableData.length,
      withPagination,
      page,
      rowsPerPage: rowsPerPageState,
      setData,
      setPage,
      setRowsPerPage,
    }),
    [tableData, data, page, rowsPerPage, withPagination]
  );

  const wrapperClass = cn("shadow overflow-hidden", {
    "sm:rounded-t-lg": withPagination,
    "sm:rounded-lg border-b border-gray-200": !withPagination,
  });

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
      {withPagination && <TablePagination />}
    </TableContext.Provider>
  );
}

Table.Head = TableHead;
Table.HeadCell = TableHeadCell;
Table.Body = TableBody;
Table.Row = TableRow;
Table.DataCell = TableDataCell;
