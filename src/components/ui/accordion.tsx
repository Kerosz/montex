// packages
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

type AccordionData = {
  head: string;
  body: string;
};

export interface AccordionProps {
  data: Array<AccordionData>;
}

export default function Accordion({ data }: AccordionProps) {
  return (
    <div className="w-full mx-auto max-w-4xl">
      {data.map((entry) => (
        <div className="py-1" key={entry.head}>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg font-semibold text-left text-black-normal border-t border-gray-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-black-normal focus-visible:ring-opacity-75">
                  <span>{entry.head}</span>
                  <ChevronUpIcon
                    className={`${open ? "" : "transform rotate-180"} w-6 h-6 text-black-normal`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-lg text-black-light w-10/12">
                  {entry.body}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </div>
  );
}
