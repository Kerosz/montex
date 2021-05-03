// components
import Navbar from "@components/navbar";
import Footer from "@components/footer";
// types
import type { ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

export default function BaseLayout({ children }: Props): JSX.Element {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
