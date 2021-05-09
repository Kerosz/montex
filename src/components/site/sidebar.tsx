// packages
import { useRouter } from "next/router";
// components
import Link from "@components/ui/link";
// data
import ROUTES from "@data/site/sidebar";

export interface SidebarProps {
  siteId: string;
}

export default function Sidebar({ siteId }: SidebarProps) {
  const router = useRouter();
  const routerPath = router.pathname;

  const isActive = (key: string): boolean => {
    // Sets the "General" route/label as active for the main path "/s/[id]"
    if (routerPath.length === 7 && key === "General") return true;

    if (routerPath.includes(key.toLowerCase())) return true;

    return false;
  };

  return (
    <aside className="w-full max-w-[180px] mr-12 flex flex-col sticky top-20 h-full">
      {ROUTES.map(({ label, path, icon }) => {
        const active = isActive(label);
        const IconEl = icon;

        return (
          <Link
            key={label}
            href={`/s/${siteId}/${path}`}
            className={`py-2 ${
              active ? "text-gray-900" : "text-gray-500 hover:text-black-light"
            } font-semibold flex items-center`}
          >
            <IconEl className="w-5 mr-1.5 mt-0.5" /> {label}
          </Link>
        );
      })}
    </aside>
  );
}
