// packages
import { Dispatch, Fragment, ReactNode, SetStateAction, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import cn from "classnames";
// types
import type { ComponentProps } from "react";

type SelectData = {
  id: string | number;
  name: string;
  avatar?: string;
};

export interface SelectProps extends ComponentProps<"div"> {
  selected: SelectData;
  setSelected: Dispatch<SetStateAction<any>>;
  data: Array<SelectData>;
  title?: string;
  titleClass?: string;
  buttonClass?: string;
  optionsClass?: string;
  withIcon?: boolean;
}

export default function Select({
  selected,
  setSelected,
  data,
  title,
  titleClass,
  buttonClass,
  optionsClass,
  withIcon = false,
  children,
  ...rest
}: SelectProps) {
  const titleRootClass = cn("block text-black-light font-semibold pb-2", titleClass);
  const buttonRootClass = cn(
    "relative w-full min-w-[130px] bg-white-normal border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-0 focus:border-black-normal sm:text-sm",
    buttonClass
  );
  const optionsRootClass = cn(
    "absolute z-10 mt-1 w-full min-w-min bg-white-normal shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black-normal ring-opacity-20 overflow-auto focus:outline-none sm:text-sm",
    optionsClass
  );

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div {...rest}>
          {title && <Listbox.Label className={titleRootClass}>{title}</Listbox.Label>}
          <div className="relative">
            <Listbox.Button className={buttonRootClass}>
              <span className="flex items-center">
                {withIcon && (
                  <img
                    src={selected.avatar}
                    alt=""
                    className="flex-shrink-0 h-6 w-6 rounded-full"
                  />
                )}
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options static className={optionsRootClass}>
                {data.map((entry) => (
                  <Listbox.Option
                    key={entry.id}
                    className={({ active }) =>
                      cn(
                        active ? "text-black-normal bg-gray-100" : "text-gray-500",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={entry}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {withIcon && (
                            <img
                              src={entry.avatar}
                              alt=""
                              className="flex-shrink-0 h-6 w-6 rounded-full"
                            />
                          )}
                          <span
                            className={cn(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {entry.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={cn(
                              active ? "text-black-normal" : "text-black-normal",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
