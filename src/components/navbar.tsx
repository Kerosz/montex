// packages
import { useEffect, useState } from "react";
import Image from "next/image";
import cn from "classnames";
import { PlusIcon } from "@heroicons/react/outline";
// components
import Button from "@components/ui/button";
import Container from "@components/ui/container";
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

export interface NavbarProps {
  variant?: keyof typeof Variant;
  withBorder?: boolean;
  children?: ReactNode;
}

export default function Navbar({ variant = "base", withBorder }: NavbarProps): JSX.Element {
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

  const baseClass = "h-16 sticky top-0 z-30 border-b";

  const rootClass = cn(baseClass, {
    "border-gray-200": (showBorderState && variant === "base") || withBorder,
    "border-transparent": !showBorderState && !withBorder && variant === "base",
    "border-gray-200 shadow-sm": variant === "dashboard",
    "bg-white-faded": variant === "base",
    "bg-white-normal": variant === "dashboard",
  });

  return (
    <header className={rootClass}>
      <Container as="nav" className="w-full h-full flex justify-between items-center z-20">
        {variant === "dashboard" ? (
          <div className="flex items-center space-x-5">
            <Link href="/dashboard" title="Montex Dashboard" fixPosition>
              <Image src="/images/logo-simple.png" width={28} height={28} />
            </Link>
            <span
              style={{ width: "1px", height: "25px" }}
              className="bg-gray-300 transform rotate-30"
            />
            <Button as={Link} href="/dashboard" variant="slim" reset>
              Overview
            </Button>
            <Button as={Link} href="/dashboard/sites" variant="slim" reset>
              Sites
            </Button>
            <Button as={Link} href="/dashboard/activity" variant="slim" reset>
              Activity
            </Button>
          </div>
        ) : (
          <Link href="/" title="Montex branding">
            <Image src="/images/logo-full.png" width={131} height={25} />
          </Link>
        )}
        {user ? (
          <Dropdown
            button={
              <Image
                src={user.photo_url as string}
                width={30}
                height={30}
                className="rounded-full"
                title={user.username as string}
              />
            }
          >
            <div>
              <Dropdown.Item>
                {({ active }) => (
                  <Link
                    href="/dashboard"
                    className={`${
                      active ? "bg-gray-50 text-black-normal" : "text-gray-500"
                    } group flex rounded-md items-center w-full px-5 py-3 text-sm`}
                  >
                    Dashboard
                  </Link>
                )}
              </Dropdown.Item>
            </div>
            <div>
              <Dropdown.Item>
                {({ active }) => (
                  <Link
                    href="/account"
                    className={`${
                      active ? "bg-gray-50 text-black-normal" : "text-gray-500"
                    } group flex rounded-md items-center w-full px-5 py-3 text-sm`}
                  >
                    Settings
                  </Link>
                )}
              </Dropdown.Item>
              <Dropdown.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active ? "bg-gray-50 text-black-normal" : "text-gray-500"
                    } group flex justify-between rounded-md items-center w-full px-5 py-3 text-sm`}
                  >
                    <span>New Site</span>
                    <PlusIcon className="w-6" />
                  </button>
                )}
              </Dropdown.Item>
            </div>
            <div>
              <Dropdown.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active ? "bg-gray-50 text-black-normal" : "text-gray-500"
                    } group flex rounded-md items-center w-full px-5 py-3.5 text-sm`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <label htmlFor="theme" className="block">
                        Theme
                      </label>
                      <select
                        id="theme"
                        name="theme"
                        autoComplete="theme"
                        className="block py-1.5 pl-3 pr-8 border border-gray-300 bg-white-normal rounded-md shadow-sm focus:outline-none focus:border-black-normal focus:ring-0 cursor-pointer text-sm"
                      >
                        <option>System</option>
                        <option>Light</option>
                        <option>Dark</option>
                      </select>
                    </div>
                  </div>
                )}
              </Dropdown.Item>
            </div>
            <div>
              <Dropdown.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={signOut}
                    className={`${
                      active ? "bg-gray-50 text-black-normal" : "text-gray-500"
                    } group flex rounded-md items-center w-full px-5 py-3 text-sm`}
                  >
                    Log Out
                  </button>
                )}
              </Dropdown.Item>
            </div>
          </Dropdown>
        ) : (
          <div className="sm:space-x-6 space-x-2">
            <Button
              as={Link}
              href="/pricing"
              variant="slim"
              className="py-1.5 px-1 text-gray-500 hover:text-black-normal"
              title="Pricing"
              reset
            >
              Pricing
            </Button>

            <Button
              as={Link}
              href="/contact"
              variant="slim"
              className="py-1.5 px-1 text-gray-500 hover:text-black-normal"
              title="Contact"
              reset
            >
              Contact
            </Button>

            <Button as={Link} href="/login" variant="secondary" size="normal" title="Login">
              Login
            </Button>

            <Button as={Link} href="/signup" variant="primary" size="normal" title="Sign up">
              Sign up
            </Button>
          </div>
        )}
      </Container>
    </header>
  );
}
