// packages
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// components
import Navbar from "@/components/navbar";
import Overview from "@/components/overview";
// context
import { useAuth } from "@/context/auth";

export default function Dashboard(): JSX.Element | null {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) router.replace("/");
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard - Montex</title>
      </Head>
      <Navbar variant="dashboard" />
      {user && <Overview user={user} />}
    </div>
  );
}
