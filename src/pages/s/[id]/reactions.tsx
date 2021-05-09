// components
import SiteLayout from "@components/layouts/site";

export default function Reactions() {
  return (
    <div className="bg-white-normal shadow overflow-hidden sm:rounded-lg w-full">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Reactions</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Configure and enable your site engagement.
        </p>
      </div>

      <div className="border-t border-b border-gray-200">reactions content</div>
    </div>
  );
}

Reactions.Layout = SiteLayout;
