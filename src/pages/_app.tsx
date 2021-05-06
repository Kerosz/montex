// packages
import { Fragment } from "react";
import { SWRConfig } from "swr";
// components
import Head from "@components/head";
// helpers
import fetcher from "@helpers/fetcher";
// context
import AuthProvider from "@/context/auth";
// types
import type { AppProps } from "next/app";

import "@/styles/tailwind.css";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const Layout = (Component as any).Layout || Fragment;

  return (
    <>
      <Head />
      <AuthProvider>
        <SWRConfig value={{ fetcher }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </AuthProvider>
    </>
  );
}
