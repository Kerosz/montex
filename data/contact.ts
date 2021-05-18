import { CashIcon, UserGroupIcon, DocumentTextIcon } from "@heroicons/react/outline";

export default [
  {
    icon: CashIcon,
    title: "Sales",
    subTitle: "We’d love to talk about how we can accommodate your needs.",
    cta: ["Contact Sales", "/contact/sales"],
    scheme: "red",
  },

  {
    icon: UserGroupIcon,
    title: "Partners",
    subTitle: "Join our partner ecosystem and accelerate your growth with Montex.",
    cta: ["Become Partner", "/partners"],
    scheme: "purple",
  },

  {
    icon: DocumentTextIcon,
    title: "Docs",
    subTitle: "Learn more about Montex and how to use it to ease your growth.",
    cta: ["Visit Docs", "/docs"],
    scheme: "black",
  },
] as const;
