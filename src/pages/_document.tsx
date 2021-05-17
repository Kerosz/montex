// packages
import Document, { Head, Html, Main, NextScript } from "next/document";

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
          <div id="__portals" className="fixed z-40 top-0 right-0 flex flex-col items-end" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
