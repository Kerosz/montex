// packages
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// components
import Container from "@components/ui/contaienr";
import Link from "@components/ui/link";
import SigningForm from "@components/signing-form";
import Navbar from "@components/navbar";
// context
import { useAuth } from "@/context/auth";

export default function Login(): JSX.Element {
  const { user, signInWithEmailAndPassword } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user]);

  return (
    <>
      <Head>
        <title>Login - Montex</title>
      </Head>

      <Navbar withBorder />

      <Container className="py-16" maxW="max-w-md">
        <h1 className="text-4xl text-center font-bold -mb-4">Login to Montex</h1>
        <SigningForm onSubmit={signInWithEmailAndPassword} />
        <p className="mt-10 pt-5 border-t border-gray-200 text-gray-700 font-semibold text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-secondary hover:underline">
            Sign Up
          </Link>
        </p>
      </Container>
    </>
  );
}
