// components
import Navbar from "@components/navbar";
// types
import type { ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

export default function BaseLayout({ children }: Props): JSX.Element {
  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-3">{children}</main>
    </>
  );
}
