// packages
import { format, formatDistanceStrict } from "date-fns";
// components
import Button from "@components/ui/button";
import Link from "@components/ui/link";
// types
import { SiteData } from "@/types";

export interface CardProps {
  data: SiteData;
}

export default function DetailCard({ data }: CardProps): JSX.Element {
  return (
    <div className="border border-gray-100 shadow-md rounded pt-4 space-y-4">
      <div className="flex w-full justify-between items-center sm:px-6 px-4 py-1.5">
        <h2 className="text-xl text-black-normal font-bold" title={data.description}>
          <Link href={`/s/${data.id}`}>{data.name}</Link>
        </h2>
        <div className="sm:space-x-3 sm:block flex flex-col text-center">
          <Button as={Link} href={`/s/${data.id}`} variant="secondary" size="small">
            Manage
          </Button>
          <Button
            as={Link}
            href={data.url}
            external
            variant="secondary"
            size="small"
            className="sm:mt-0 mt-1.5"
          >
            Visit
          </Button>
        </div>
      </div>

      <div className="border-t border-gray-200 cursor-default">
        <dl>
          <div
            className="bg-gray-100 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            title={data.id}
          >
            <dt className="font-semibold text-gray-500">Identifier</dt>
            <dd className="mt-2 text-black-light sm:mt-0 sm:col-span-2 truncate">{data.id}</dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" title={data.url}>
            <dt className="font-semibold text-gray-500">URL</dt>
            <dd className="mt-2 text-black-light sm:mt-0 sm:col-span-2">
              <Link href={data.url} external className="hover:underline">
                {data.url}
              </Link>
            </dd>
          </div>
          <div
            className="bg-gray-100 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            title={data.description}
          >
            <dt className="font-semibold text-gray-500">Description</dt>
            <dd
              className="mt-2 text-black-light sm:mt-0 sm:col-span-2 line-clamp-3"
              style={{ minHeight: "72px" }}
            >
              {data.description}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="font-semibold text-gray-500">Date created</dt>
            <dd className="mt-2 text-black-light sm:mt-0 sm:col-span-2">
              {format(data.created_at, "MMM dd, yyyy - h:mm:ss a")}
            </dd>
          </div>
          <div className="bg-gray-100 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="font-semibold text-gray-500">Last updated</dt>
            <dd className="mt-2 text-black-light sm:mt-0 sm:col-span-2">
              {formatDistanceStrict(data.updated_at, Date.now(), { addSuffix: true })}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
