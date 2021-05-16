// types
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Component } from "@/types";
import cn from "classnames";

export interface BasePanelProps extends ComponentPropsWithoutRef<"div"> {
  as?: Component;
  component?: Component;
  title: string;
  subTitle?: string;
  action?: Component | JSX.Element;
  children?: ReactNode;
}

export default function BasePanel({
  as,
  component = "div",
  title,
  subTitle,
  action,
  className,
  children,
  ...rest
}: BasePanelProps): JSX.Element {
  const rootClass = cn("bg-white-normal shadow overflow-hidden sm:rounded-lg w-full", className);
  const contentClass = cn("border-t border-gray-200", { "border-b": !!action });

  const El = as || component;

  return (
    <El className={rootClass} {...rest}>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{subTitle}</p>
      </div>

      <div className={contentClass}>{children}</div>
      {action && <div className="px-4 py-5 sm:px-6">{action}</div>}
    </El>
  );
}
