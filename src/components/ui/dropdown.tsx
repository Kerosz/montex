// packages
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
// types
import type { ReactNode } from "react";

export interface DropdownProps {
  button: ReactNode;
  children?: ReactNode;
}

export default function Dropdown({
  button,
  children,
}: DropdownProps): JSX.Element {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="flex text-black-normal bg-black-normal rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black-normal">
              {button}
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 w-56 mt-2 origin-top-right bg-white-normal divide-y divide-gray-200 rounded-sm shadow-xl border border-gray-100 focus:outline-none"
            >
              {children}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

Dropdown.Item = Menu.Item;
