// packages
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// components
import Container from "@components/ui/contaienr";
import Navbar from "@/components/navbar";
// context
import { useAuth } from "@/context/auth";
import Overview from "@/components/overview";

export default function Dashboard(): JSX.Element | null {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) router.replace("/");
    }, 3500);

    return () => clearTimeout(timeoutId);
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard - Montex</title>
      </Head>
      <Navbar variant="dashboard" />
      <Overview user={user} />
    </div>
  );
}
