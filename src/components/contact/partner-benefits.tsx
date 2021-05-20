// packages
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/solid";
// components
import Link from "@components/ui/link";
import List from "@components/ui/list";

export default function PartnerBenefits() {
  return (
    <section className="md:py-20 py-14 grid md:grid-cols-10 grid-cols-1 md:gap-16 gap-6">
      <Link href="/partners" title="Montex Partners" className="col-span-1 max-w-max min-w-max">
        <Image src="/images/logo-simple.png" width={42} height={42} />
      </Link>

      <div className="col-span-6">
        <h2 className="text-2xl text-gray-800 pb-2.5">Register as a Montex Partner</h2>
        <p className="text-lg text-gray-600 pb-8">
          By registering, you can get access to partner only yearly and monthly fixed discounts,
          priority support and much more.
        </p>
        <List>
          <List.Item
            withSpace={false}
            customIcon={<CheckCircleIcon className="w-5 min-w-[1.25rem] text-secondary mr-3.5" />}
            className="text-lg"
          >
            Priority support to any concerns regarding the service
          </List.Item>

          <List.Item
            withSpace={false}
            customIcon={<CheckCircleIcon className="w-5 min-w-[1.25rem] text-secondary mr-3.5" />}
            className="text-lg"
          >
            <p>
              Yearly fixed <strong>5% off</strong> and monthly
              <strong> 3% off</strong> discount to any subscription plan
            </p>
          </List.Item>

          <List.Item
            withSpace={false}
            customIcon={<CheckCircleIcon className="w-5 min-w-[1.25rem] text-secondary mr-3.5" />}
            className="text-lg"
          >
            <p>
              Meet with Montex team at invite-only webinars, and <strong>1-on-1</strong> discussions
            </p>
          </List.Item>

          <List.Item
            withSpace={false}
            customIcon={<CheckCircleIcon className="w-5 min-w-[1.25rem] text-secondary mr-3.5" />}
            className="text-lg"
          >
            Get regular partner updates to additional offers.
          </List.Item>

          <List.Item
            withSpace={false}
            customIcon={<CheckCircleIcon className="w-5 min-w-[1.25rem] text-secondary mr-3.5" />}
            className="text-lg"
          >
            Include your company in Montex partners market.
          </List.Item>
        </List>
      </div>

      <span className="block col-span-3 md:pl-10 pt-8 border-t md:border-l md:border-t-0 border-gray-200 text-3xl text-secondary font-semibold">
        Free
      </span>
    </section>
  );
}
