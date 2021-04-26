import firebase from "@/lib/firebase";

export type RawUser = firebase.User;

export type AuthUser = {
  uid: RawUser["uid"];
  username: RawUser["displayName"];
  email: RawUser["email"];
  photo_url: RawUser["photoURL"];
  auth_provider: string | undefined;
};
