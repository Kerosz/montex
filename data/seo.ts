import type { DefaultSeoProps } from "next-seo";

export default {
  defaultTitle: "Montex",
  titleTemplate: "Montex - %s",
  canonical: "https://montex.chirila.dev",
  description:
    "Montex it's the easiest way to add comments or reviews to your blog or personal website.",
  openGraph: {
    description:
      "Montex it's the easiest way to add comments or reviews to your blog or personal website.",
    type: "website",
    locale: "en_IE",
    url: "https://montex.chirila.dev",
    site_name: "Montex",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Montex",
      },
    ],
  },
  twitter: {
    handle: "@montex",
    site: "@montex",
    cardType: "summary_large_image",
  },
} as DefaultSeoProps;
