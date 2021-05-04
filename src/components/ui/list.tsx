// packages
import cn from "classnames";
// components
import Link from "@components/ui/link";
// types
import type { Component, ListData } from "@/types";
import type { ComponentProps } from "react";

export interface ListProps extends ComponentProps<"ul"> {
  data: Array<ListData>;
  title?: string;
  customIcon?: Component;
  titleClass?: string;
  listClass?: string;
  withSpace?: boolean;
  withDecimal?: boolean;
  withBullet?: boolean;
}

export default function List({
  data,
  title,
  customIcon,
  className,
  titleClass,
  listClass,
  withSpace = true,
  withDecimal = false,
  withBullet = false,
  ...rest
}: ListProps) {
  const IconEl = customIcon;

  const rootClass = cn("w-full", className);
  const listTitleClass = cn("text-black-light font-semibold text-lg mb-3", titleClass);
  const listItemClass = cn(
    "flex items-center text-gray-600 py-1",
    {
      "pl-4": withSpace,
      "list-disc": withBullet && !customIcon,
      "list-decimal": withDecimal && !customIcon,
    },
    listClass
  );

  return (
    <ul className={rootClass} {...rest}>
      <li className={listTitleClass}>{title}</li>
      {data.map(({ link, label, external }, idx) => (
        <li key={`name_${label}-${idx}`} className={listItemClass}>
          {link ? (
            <Link href={link} external={external} className="hover:underline">
              {IconEl && <IconEl className="w-5 text-gray-500 pt-1 mr-1" />}
              {label}
            </Link>
          ) : (
            <>
              {IconEl && <IconEl className="w-5 text-gray-500 pt-1 mr-1" />}
              {label}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
