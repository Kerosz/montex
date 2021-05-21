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
  icon?: Component;
  customIcon?: Component | ReactNode;
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
    "flex items-center text-gray-600 py-1.5",
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

/**
 * List component to auto-generate lists or compose them using a friendly API
 *
 * @component
 * @param data List data to be mapped inside the component
 * @param title List title
 * @param icon Icon to be passed in the default styles of the component
 * @param customIcon Custom icon for list items. It's being applied globally
 * @param className Extend root list default styles
 * @param titleClass Extend title default styles
 * @param listItemProps Object of properties to be injected into the `List Item`
 * @param children - Any react node
 * @param rest - Remaining properties that are to be passed in the root element
 *
 * @example With data mapping
 * const data = [
 *    {
 *        label: "First item"
 *    },
 *    {
 *        label: "With link",
 *        link: "/my-path"
 *    },
 *    {
 *        label: "With external link",
 *        link: "my-external-path",
 *        external: true
 *    }
 *    ...
 * ]
 * return (
 *    <List title="MyList" data={data} listItemProps={{ withSpace: false }} />
 * );
 *
 * @example With Item API
 * return (
 *    <List>
 *        <List.Item
 *          withSpace={false}
 *          customIcon={MyCustomIcon}
 *        >
 *            My list item
 *         </List.Item>
 *    </List>
 * );
 */
export default function List({
  data,
  title,
  icon,
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
            icon={icon}
            customIcon={customIcon}
            {...listItemProps}
          />
        ))}
      {children}
    </ul>
  );
}

List.Item = ListItem;
