// packages
import { useRef } from "react";
// components
import Modal from "@components/ui/modal";
import Button from "../ui/button";

export interface AddSiteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddSite({
  isOpen,
  onClose,
}: AddSiteProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      focusRef={inputRef}
      title="Add New Site"
    >
      <form className="px-4 py-5 space-y-6 sm:p-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-500 pl-0.5"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            ref={inputRef}
            className="mt-1 focus:ring-0 focus:border-black-normal block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="My site name"
          />
        </div>

        <div>
          <label
            htmlFor="new_website"
            className="block text-sm font-semibold text-gray-500 pl-0.5"
          >
            Website
          </label>
          <div className="mt-2 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
              http://
            </span>
            <input
              type="text"
              name="new_website"
              id="new_website"
              className="focus:ring-0 focus:border-black-normal flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
              placeholder="www.example.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-500 pl-0.5"
          >
            Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              rows={2}
              className="shadow-sm focus:ring-0 focus:border-black-normal mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Brief description for your site."
            />
          </div>
        </div>

        <Button
          variant="secondary"
          className="py-1.5 w-full bg-gray-200 border-gray-300 shadow-sm hover:border-gray-400"
        >
          Create
        </Button>
      </form>
    </Modal>
  );
}
