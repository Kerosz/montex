// packages
import { useMemo, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowSmDownIcon,
  ArrowSmUpIcon,
} from "@heroicons/react/solid";
import cn from "classnames";
// components
import Button from "@components/ui/button";
// context
import { TableContext, useTable } from "./context";
// hooks
import { useUpdateEffect } from "@hooks/use-update-effect";
// helpers
import { isString } from "@/helpers/assertions";
// types
import type {
  THeadProps,
  THeadCellProps,
  TBodyProps,
  TRowProps,
  TDataCellProps,
  TPagination,
  TableProps,
  RowData,
  Order,
} from "./types";

// TODO: Convert components into "withRef" (forwardRef)

function TableHead({ children, ...rest }: THeadProps) {
  return (
    <thead className="bg-gray-50" {...rest}>
      <tr>{children}</tr>
    </thead>
  );
}

function TableHeadCell({ children, readerOnly, className, iconLabel, ...rest }: THeadCellProps) {
  const { order, orderBy } = useTable();

  const rootClass = cn(
    "px-6 py-3 cursor-default",
    {
      "text-left text-xs font-medium text-gray-500 uppercase tracking-wider": !readerOnly,
      "relative select-none pointer-events-none": readerOnly,
    },
    className
  );

  return (
    <th scope="col" className={rootClass} title={String(children)} {...rest}>
      {readerOnly ? (
        <span className="sr-only">{children}</span>
      ) : (
        <span className="flex">
          {children}
          {orderBy === iconLabel && (
            <>
              {order === "DESC" ? (
                <ArrowSmUpIcon className="w-4 ml-1" />
              ) : (
                <ArrowSmDownIcon className="w-4 ml-1" />
              )}
            </>
          )}
        </span>
      )}
    </th>
  );
}

function TableBody({ children, ...rest }: TBodyProps) {
  const { rows, page, order, orderBy, rowsPerPage, withPagination } = useTable();

  function getComparator<Key extends keyof any>(
    type: Order,
    orderKey: Key
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    function comparator<T>(a: T, b: T, key: keyof T) {
      if (b[key] < a[key]) {
        return -1;
      }
      if (b[key] > a[key]) {
        return 1;
      }
      return 0;
    }

    return type === "DESC"
      ? (a, b) => comparator(a, b, orderKey)
      : (a, b) => -comparator(a, b, orderKey);
  }

  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, idx) => [el, idx] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const orderResult = comparator(a[0], b[0]);

      if (orderResult !== 0) return orderResult;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const slicedData = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <tbody className="bg-white-normal divide-y divide-gray-200" {...rest}>
      {children ? children({ rows: withPagination ? slicedData : rows }) : null}
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
      "max-w-[300px] min-w-[300px]": fixedWidth,
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
  rowsPerPage = 5,
  rowData,
  columnData,
  defaultOrderBy,
  ...rest
}: TableProps): JSX.Element {
  const [dataState, setData] = useState<RowData>(rowData);
  // TODO: better tuping
  const [orderByState, setOrderBy] = useState<string>(
    defaultOrderBy || (columnData?.[0] as any).orderBy
  );
  const [orderState, setOrder] = useState<Order>("DESC");
  const [pageState, setPage] = useState<number>(0);
  const [rowsPerPageState, setRowsPerPage] = useState<number>(rowsPerPage);

  // Needed to re-update data state if SWR mutates state
  useUpdateEffect(() => setData(rowData), [rowData]);

  const onSort = (property: string) => {
    const isAsc = orderByState === property && orderState === "ASC";

    setOrder(isAsc ? "DESC" : "ASC");
    setOrderBy(property);
  };

  const renderHeadColumns = () => {
    if (columnData) {
      return columnData.map((column) => {
        if (isString(column)) {
          return <TableHeadCell key={column}>{column}</TableHeadCell>;
        }

        const { label, options, orderBy } = column;

        return (
          <TableHeadCell
            key={label}
            onClick={() => onSort(orderBy as string)}
            className="cursor-pointer select-none"
            iconLabel={orderBy}
            {...options}
          >
            {label}
          </TableHeadCell>
        );
      });
    } else {
      throw new Error("You must either pass in children or column data!");
    }
  };

  const tableProvider = useMemo(
    () => ({
      rows: dataState,
      rowCount: dataState.length,
      columns: columnData,
      withPagination,
      page: pageState,
      rowsPerPage: rowsPerPageState,
      order: orderState,
      orderBy: orderByState,
      setData,
      setPage,
      setRowsPerPage,
    }),
    [dataState, orderState, orderByState, pageState, rowsPerPage, withPagination, columnData]
  );

  const wrapperClass = cn("shadow overflow-hidden", {
    "sm:rounded-t-lg": withPagination,
    "sm:rounded-lg border-b border-gray-200": !withPagination,
  });

  return (
    <TableContext.Provider value={tableProvider}>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className={wrapperClass}>
              <table className="w-full divide-y divide-gray-200" {...rest}>
                {columnData && <TableHead>{renderHeadColumns()}</TableHead>}
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
