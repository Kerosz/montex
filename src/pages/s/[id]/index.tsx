// components
import SiteLayout from "@components/layouts/site";
// types
import type { PageProps, SiteData } from "@/types";
import Input from "@/components/ui/input";

export default function General({ data }: PageProps<SiteData>): JSX.Element {
  return (
    <div className="bg-white-normal shadow overflow-hidden sm:rounded-lg w-full">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">General</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Configure your general site information
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <label htmlFor="site_url" className="text-sm font-medium text-gray-500">
              Site URL
            </label>

            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Input id="site_url" placeholder="My site name" defaultValue={data.url} disabled />
            </dd>
          </div>

          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <label htmlFor="name" className="text-sm font-medium text-gray-500">
              Site Name
            </label>

            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Input id="name" placeholder="My site name" defaultValue={data.name} />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

General.Layout = SiteLayout;
