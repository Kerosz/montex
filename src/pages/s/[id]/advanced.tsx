// components
import SiteLayout from "@components/layouts/site";

export default function Advanced() {
  return (
    <div className="bg-white-normal shadow overflow-hidden sm:rounded-lg w-full">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Advanced</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Configure your advanced site information
        </p>
      </div>

      <div className="border-t border-b border-gray-200">advanced content</div>
    </div>
  );
}

Advanced.Layout = SiteLayout;
