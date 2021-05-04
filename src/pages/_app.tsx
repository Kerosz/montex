// components
import Head from "@components/head";
// context
import AuthProvider from "@/context/auth";
// types
import type { AppProps } from "next/app";

import "@/styles/tailwind.css";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
