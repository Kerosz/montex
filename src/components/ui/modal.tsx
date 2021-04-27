// packages
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
// types
import type { MutableRefObject, ReactNode } from "react";

export interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  focusRef?: MutableRefObject<HTMLElement | null>;
  children?: ReactNode;
}

export default function Modal({
  title,
  isOpen,
  onClose,
  focusRef,
  children,
}: ModalProps): JSX.Element {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        static
        className="fixed z-40 inset-0 overflow-y-auto"
        initialFocus={focusRef}
        open={isOpen}
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-gray-50 rounded-lg text-left overflow-hidden shadow-md transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="p-4 bg-gray-200 flex justify-between border-b border-gray-300">
                <Dialog.Title
                  as="h3"
                  className="leading-6 font-semibold text-black-normal"
                >
                  {title}
                </Dialog.Title>
                <button
                  type="button"
                  onClick={onClose}
                  className="focus:ring-black-normal focus:border-black-normal focus:ring-1 rounded px-0.5 focus:outline-none"
                >
                  <XIcon className="w-5 text-gray-600" />
                </button>
              </div>

              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
