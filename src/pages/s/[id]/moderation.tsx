// components
import SiteLayout from "@components/layouts/site";
import BasePanel from "@components/base-panel";

export default function Moderation() {
  return (
    <BasePanel
      title="Moderation"
      subTitle="Configure comments and setup rules to automatically moderate your community."
    />
  );
}

Moderation.Layout = SiteLayout;
