import { useEffect, useState } from "react";
import firebase from "@/lib/firebase";

export default function useAuthProvider() {
  const [userState, setUser] = useState<firebase.User | null>(null);

  const signInWithEmailAndPassword = async (
    emailAddress: string,
    password: string
  ): Promise<void> => {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(emailAddress, password);

    setUser(user);
  };

  const signInWithGithub = async (): Promise<void> => {
    const githubProvider = new firebase.auth.GithubAuthProvider();

    const { user } = await firebase.auth().signInWithPopup(githubProvider);

    setUser(user);
  };

  const signUpWithEmailAndPassword = async (
    emailAddress: string,
    password: string
  ): Promise<void> => {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password);

    setUser(user);
  };

  const signOut = async (): Promise<void> => {
    await firebase.auth().signOut();

    setUser(null);
  };

  useEffect(() => {
    const listner = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

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
