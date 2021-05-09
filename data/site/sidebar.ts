import {
  ShieldExclamationIcon,
  LinkIcon,
  UserGroupIcon,
  SupportIcon,
  TemplateIcon,
} from "@heroicons/react/outline";
import { Component } from "@/types";

export default [
  { label: "General", path: "", icon: TemplateIcon },
  { label: "Routes", path: "routes", icon: LinkIcon },
  { label: "Moderation", path: "moderation", icon: ShieldExclamationIcon },
  { label: "Reactions", path: "reactions", icon: UserGroupIcon },
  { label: "Advanced", path: "advanced", icon: SupportIcon },
] as Array<{ label: string; path: string; icon: Component }>;
