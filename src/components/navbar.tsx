// packages
import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import Image from "next/image";
import cn from "classnames";
// components
import Button from "@components/ui/button";
import Container from "@components/ui/contaienr";
import Link from "@components/ui/link";
import Dropdown from "@components/ui/dropdown";
// context
import { useAuth } from "@/context/auth";
// helpers
import { isDefined } from "@/helpers/assertions";
// types
import type { ReactNode } from "react";

enum Variant {
  base,
  dashboard,
}

interface NavbarProps {
  variant?: keyof typeof Variant;
  children?: ReactNode;
}

export default function Navbar({ variant = "base" }: NavbarProps): JSX.Element {
  const { user, signOut } = useAuth();
  const [showBorderState, setShowBorder] = useState<boolean>(false);

  const handleBorder = () => {
    if (window.scrollY >= 10) {
      setShowBorder(true);
    } else {
      setShowBorder(false);
    }
  };

  useEffect(() => {
    if (isDefined(window)) {
      window.addEventListener("scroll", handleBorder);

      return () => {
        window.removeEventListener("scroll", handleBorder);
      };
    }
  }, []);

  const baseClass = "h-16 sticky top-0 z-30 bg-white-faded border-b";

  const rootClass = cn(baseClass, {
    "border-gray-200": showBorderState && variant === "base",
    "border-transparent": !showBorderState && variant === "base",
    "border-gray-200 shadow-sm": variant === "dashboard",
  });

  return (
    <header className={rootClass}>
      <Container
        as="nav"
        className="w-full h-full flex justify-between items-center z-20"
      >
        {variant === "dashboard" ? (
          <div className="flex items-center space-x-5">
            <Link href="/dashboard" title="Montex Dashboard">
              <Image src="/images/logo-simple.png" width={28} height={28} />
            </Link>
            <span
              style={{ width: "1px", height: "25px" }}
              className="bg-gray-300 transform rotate-30"
            />
            <Button as={Link} href="/dashboard" variant="slim">
              Overview
            </Button>
            <Button as={Link} href="/dashboard/sites" variant="slim">
              Sites
            </Button>
            <Button as={Link} href="/dashboard/activity" variant="slim">
              Activity
            </Button>
          </div>
        ) : (
          <>
            <Link href="/" title="Montex branding">
              <Image src="/images/logo-full.png" width={131} height={25} />
            </Link>
            {/* <button type="button" onClick={signOut}>
              s
            </button> */}
          </>
        )}
        {user ? (
          <Dropdown
            button={
              <Image
                src={user.photo_url as string}
                width={30}
                height={30}
                className="rounded-full"
              />
            }
          >
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Duplicate
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Archive
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Move
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Dropdown>
        ) : (
          <div className="space-x-6">
            <Button
              as={Link}
              href="/login"
              variant="secondary"
              className="py-1.5 px-4"
              title="Login"
            >
              Login
            </Button>

            <Button
              as={Link}
              href="/signup"
              className="py-1.5 px-4"
              title="Sign up"
            >
              Sign up
            </Button>
          </div>
        )}
      </Container>
    </header>
  );
}
