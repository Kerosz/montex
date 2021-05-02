// packages
import { useEffect, useState } from "react";
import firebase from "@/lib/firebase";
// helpers
import { transformRawUser } from "@helpers/transformers";
import { createUser, getUserByUserId } from "@services/firestore";
// types
import type { AuthProvider, RawUser, AuthUser } from "@/types";

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

    const { jwt_token, ...user } = transformRawUser(rawUser);

    setUser({ jwt_token, ...user });

    if (insertToDB) {
      const doesUserExist = await getUserByUserId(user.uid);

      if (doesUserExist) return;

      createUser(user.uid, user);
    }
  }

  async function handlePopupSignIn(provider: AuthProvider) {
    try {
      const { user } = await firebase.auth().signInWithPopup(provider);

      await handleRawUser(user, true);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function signInWithEmailAndPassword(emailAddress: string, password: string): Promise<void> {
    const { user } = await firebase.auth().signInWithEmailAndPassword(emailAddress, password);

    handleRawUser(user);
  }

  async function signInWithGithub(): Promise<void> {
    const githubProvider = new firebase.auth.GithubAuthProvider();

    await handlePopupSignIn(githubProvider);
  }

  async function signInWithGoogle(): Promise<void> {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    await handlePopupSignIn(googleProvider);
  }

  async function signInWithTwitter(): Promise<void> {
    const twitterProvider = new firebase.auth.TwitterAuthProvider();

    await handlePopupSignIn(twitterProvider);
  }

  async function signUpWithEmailAndPassword(emailAddress: string, password: string): Promise<void> {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(emailAddress, password);

    await handleRawUser(user, true);
  }

  async function signOut(): Promise<void> {
    await firebase.auth().signOut();
  }

  useEffect(() => {
    const listner = firebase.auth().onAuthStateChanged((user) => handleRawUser(user));

    return () => listner();
  }, []);

  return {
    user: userState,
    signInWithEmailAndPassword,
    signInWithGithub,
    signInWithGoogle,
    signInWithTwitter,
    signUpWithEmailAndPassword,
    signOut,
  };
}
