// packages
import { CheckCircleIcon } from "@heroicons/react/solid";
// components
import List from "@components/ui/list";
import Link from "@components/ui/link";
// data
import helpList from "@data/sales";

export default function SalesInformation() {
  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-xl text-gray-800 font-semibold pb-6">We're here to help</h2>
        <List
          data={helpList}
          customIcon={<CheckCircleIcon className="w-6 min-w-[1.5rem] text-secondary mr-3.5" />}
          listItemProps={{ withSpace: false, className: "text-lg" }}
        />
      </div>

      <div className="flex flex-col mt-14">
        <h2 className="text-xl text-gray-800 font-semibold pb-6">Partners</h2>
        <p className="text-lg text-gray-600 pb-4">
          Already a customer? If you are enjoying our service you can apply for our partner program
          and benefit from partner only offers.
        </p>
        <Link href="/partners" className="text-secondary hover:underline max-w-max">
          Become a Partner
        </Link>
      </div>

      <div className="flex flex-col mt-14 space-y-1">
        <h2 className="text-xl text-gray-800 font-semibold pb-5">Reach to use</h2>

        <Link
          href="mailto:support@montex.com"
          className="text-secondary hover:underline max-w-max"
          external
        >
          support@montex.com
        </Link>

        <Link
          href="mailto:partners@montex.com"
          className="text-secondary hover:underline max-w-max"
          external
        >
          partners@montex.com
        </Link>

        <Link
          href="mailto:sales@montex.com"
          className="text-secondary hover:underline max-w-max"
          external
        >
          sales@montex.com
        </Link>
      </div>
    </>
  );
}
