import firebase from "@/lib/firebase";
import type { JSXElementConstructor, SVGAttributes } from "react";

export type RawUser = firebase.User & { za?: string };

export type AuthUser = {
  uid: string;
  username: string;
  email: string;
  photo_url: string;
  auth_provider: string | undefined;
  jwt_token: string | undefined;
  membership_plan: string;
  created_at: number;
  updated_at: number;
};

export type AuthUserWithoutToken = Omit<AuthUser, "jwt_token">;

export type AuthProvider =
  | firebase.auth.GithubAuthProvider
  | firebase.auth.GoogleAuthProvider
  | firebase.auth.FacebookAuthProvider
  | firebase.auth.TwitterAuthProvider;

export type RawSiteData = {
  name: string;
  new_website: string;
  description: string;
};

export type SiteData = {
  id: string;
  user_id: string;
  doc_id: string;
  url: string;
  description: string;
  name: string;
  created_at: number;
  updated_at: number;
};

export type Component = string | JSXElementConstructor<any>;

export interface SvgIcon extends SVGAttributes<HTMLOrSVGElement> {}
