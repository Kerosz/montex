import firebase from "@/lib/firebase";
import type { JSXElementConstructor } from "react";

export type RawUser = firebase.User;

export type AuthUser = {
  uid: RawUser["uid"];
  username: RawUser["displayName"];
  email: RawUser["email"];
  photo_url: RawUser["photoURL"];
  auth_provider: string | undefined;
  membership_plan: string;
};

export type AuthProvider =
  | firebase.auth.GithubAuthProvider
  | firebase.auth.GoogleAuthProvider
  | firebase.auth.FacebookAuthProvider
  | firebase.auth.TwitterAuthProvider;

export type Component = string | JSXElementConstructor<any>;
