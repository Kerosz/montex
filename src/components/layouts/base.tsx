// packages
import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";
// components
const CookieBanner = dynamic(() => import("@components/cookie-banner"), { ssr: false });
import Navbar, { NavbarProps } from "@components/navbar";
import Footer from "@components/footer";
// types
import type { ReactNode } from "react";

export interface Props {
  children: ReactNode;
  navbarProps?: NavbarProps;
  title?: string;
  description?: string;
  withNav?: boolean;
  withFooter?: boolean;
}

export default function BaseLayout({
  children,
  navbarProps,
  title = "Montex",
  description,
  withNav = true,
  withFooter = true,
}: Props): JSX.Element {
  return (
    <>
      <NextSeo title={title} description={description} />
      {withNav && <Navbar {...navbarProps} />}
      <main>{children}</main>
      {withFooter && <Footer />}

      <CookieBanner />
    </>
  );
}
