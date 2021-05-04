// packages
import NextHead from "next/head";
import { DefaultSeo } from "next-seo";
// data
import seoConfig from "@data/seo";

export default function Head() {
  return (
    <>
      <DefaultSeo {...seoConfig} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="manifest" href="/site.webmanifest" key="site-manifest" /> */}
      </NextHead>
    </>
  );
}
