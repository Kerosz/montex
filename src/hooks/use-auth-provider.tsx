// packages
import { useEffect, useState } from "react";
import firebase from "@/lib/firebase";
// helpers
import { transformRawUser } from "@helpers/transformers";
// types
import type { AuthUser, RawUser } from "@/types";
import { createUser, getUserByUserId } from "@/services/firestore";

export default function useAuthProvider() {
  const [userState, setUser] = useState<AuthUser | null>(null);

  async function handleRawUser(
    rawUser: RawUser | null,
    insertToDB: boolean = false
  ): Promise<void> {
    if (!rawUser) {
      setUser(null);
      return;
    }

    const user = transformRawUser(rawUser);

    setUser(user);

    if (insertToDB) {
      const doesUserExist = await getUserByUserId(user.uid);

      if (doesUserExist) return;

      createUser(user.uid, user);
    }
  }

  async function signInWithEmailAndPassword(
    emailAddress: string,
    password: string
  ): Promise<void> {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(emailAddress, password);

    handleRawUser(user);
  }

  async function signInWithGithub(): Promise<void> {
    const githubProvider = new firebase.auth.GithubAuthProvider();

    const { user } = await firebase.auth().signInWithPopup(githubProvider);

    await handleRawUser(user, true);
  }

  async function signUpWithEmailAndPassword(
    emailAddress: string,
    password: string
  ): Promise<void> {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password);

    await handleRawUser(user, true);
  }

  async function signOut(): Promise<void> {
    await firebase.auth().signOut();
  }

  useEffect(() => {
    const listner = firebase
      .auth()
      .onAuthStateChanged((user) => handleRawUser(user));

    return () => listner();
  }, []);

  return {
    user: userState,
    signInWithEmailAndPassword,
    signInWithGithub,
    signUpWithEmailAndPassword,
    signOut,
  };
}
