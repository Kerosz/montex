// packages
import cn from "classnames";
// types
import type { ReactNode, TdHTMLAttributes } from "react";

export interface TableProps {
  rowData?: Array<Record<string, any>>;
  columnData: Array<string>;
  children?: ReactNode;
}

export interface TableDataCellProps extends TdHTMLAttributes<HTMLTableDataCellElement> {
  alignEnd?: boolean;
}

export default function Table({ columnData, children }: TableProps): JSX.Element {
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                {columnData.map((columnName, idx) => (
                  <th
                    key={`${columnName}_${idx}`}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    {columnName}
                  </th>
                ))}
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Details</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white-normal divide-y divide-gray-200">{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

Table.Td = function ({ className, alignEnd, ...rest }: TableDataCellProps) {
  const rootClass = cn(
    "px-6 py-4 max-w-xs break-words",
    {
      "text-right": alignEnd,
    },
    className
  );

  return <td className={rootClass} {...rest} />;
};
