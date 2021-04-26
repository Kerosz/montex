// packages
import Head from "next/head";
// components
import BaseLayout from "@components/layouts/base";

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Commentry</title>
      </Head>
      <BaseLayout>Hello World</BaseLayout>
    </div>
  );
}
