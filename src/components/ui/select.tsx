// packages
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import cn from "classnames";

const people = [
  {
    id: 1,
    name: "English",
    avatar: "",
  },
  {
    id: 2,
    name: "Romanian",
    avatar: "",
  },
];

export interface SelectProps {
  title?: string;
  withIcon?: boolean;
}

export default function Select({ title, withIcon = false }: SelectProps) {
  const [selected, setSelected] = useState(people[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          {title && (
            <Listbox.Label className="block text-black-light mb-2 font-semibold">
              {title}
            </Listbox.Label>
          )}
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-0 focus:border-black-normal sm:text-sm">
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
              <Listbox.Options
                static
                className="absolute z-10 mt-1 w-full bg-white-normal shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black-normal ring-opacity-20 overflow-auto focus:outline-none sm:text-sm"
              >
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      cn(
                        active ? "text-black-normal bg-gray-100" : "text-gray-500",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {withIcon && (
                            <img
                              src={person.avatar}
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
                            {person.name}
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
        </>
      )}
    </Listbox>
  );
}
