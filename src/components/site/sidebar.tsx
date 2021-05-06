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
    if (routerPath.length === 7 && key === "General") return true;

    if (routerPath.includes(key.toLowerCase())) return true;

    return false;
  };

  return (
    <aside className="w-40 mr-14 flex flex-col">
      {ROUTES.map(({ label, path }) => {
        const active = isActive(label);

        return (
          <Link
            key={label}
            href={`/s/${siteId}/${path}`}
            className={`py-2 ${
              active ? "text-gray-900" : "text-gray-500"
            } hover:text-black-light font-semibold`}
          >
            {label}
          </Link>
        );
      })}
    </aside>
  );
}
