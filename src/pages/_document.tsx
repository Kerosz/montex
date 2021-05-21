// packages
import Document, { Head, Html, Main, NextScript } from "next/document";
import { tawkScriptInit } from "@/lib/tawk";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta name="description" content="Easy comment" />
          <meta content="#ffffff" name="theme-color" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
