// packages
import cn from "classnames";
// components
import Link from "@components/ui/link";
// types
import type { Component, ListData } from "@/types";
import type { ComponentProps, ReactNode } from "react";
import React from "react";

type ListOptions = {
  withSpace?: boolean;
  withDecimal?: boolean;
  withBullet?: boolean;
};

export interface ListProps extends ComponentProps<"ul"> {
  data?: Array<ListData>;
  title?: string;
  customIcon?: Component;
  titleClass?: string;
  listItemProps?: ListOptions & ComponentProps<"li">;
  children?: ReactNode;
}

export interface ListItemProps extends ComponentProps<"li"> {
  icon?: Component;
  customIcon?: Component | ReactNode;
  children?: ReactNode;
}

function ListItem({
  label,
  link,
  icon,
  customIcon,
  external,
  className,
  withSpace = true,
  withBullet = false,
  withDecimal = false,
  children,
  ...rest
}: ListItemProps & Partial<ListData> & ListOptions): JSX.Element {
  const IconEl = icon;

  const listItemClass = cn(
    "flex items-center text-gray-600 py-1",
    {
      "pl-4": withSpace,
      "list-disc": withBullet && !icon,
      "list-decimal": withDecimal && !icon,
    },
    className
  );

  return (
    <li className={listItemClass} {...rest}>
      {link ? (
        <Link href={link} external={external} className="hover:underline">
          {IconEl && !customIcon && <IconEl className="w-5 text-gray-500 pt-1 mr-1" />}
          {customIcon && customIcon}
          {label || children}
        </Link>
      ) : (
        <>
          {IconEl && !customIcon && <IconEl className="w-5 text-gray-500 mr-1" />}
          {customIcon && customIcon}
          {label || children}
        </>
      )}
    </li>
  );
}

export default function List({
  data,
  title,
  customIcon,
  className,
  titleClass,
  listItemProps,
  children,
  ...rest
}: ListProps): JSX.Element {
  const rootClass = cn("w-full", className);
  const listTitleClass = cn("text-black-light font-semibold text-lg mb-3", titleClass);

  return (
    <ul className={rootClass} {...rest}>
      {title && <li className={listTitleClass}>{title}</li>}
      {data &&
        data.map(({ link, label, external }, idx) => (
          <ListItem
            key={`name_${label}-${idx}`}
            label={label}
            link={link}
            external={external}
            icon={customIcon}
            {...listItemProps}
          />
        ))}
      {children}
    </ul>
  );
}

List.Item = ListItem;
