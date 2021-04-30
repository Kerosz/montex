// packages
import Head from "next/head";
// components
import Container from "@components/ui/contaienr";
import Link from "@components/ui/link";
import SigningForm from "@components/signing-form";
import Navbar from "@components/navbar";
// context
import { useAuth } from "@/context/auth";

export default function Login(): JSX.Element {
  const { signInWithEmailAndPassword } = useAuth();

  return (
    <>
      <Head>
        <title>Login - Montex</title>
      </Head>

      <Navbar withBorder />

      <Container className="py-16 max-w-md">
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
