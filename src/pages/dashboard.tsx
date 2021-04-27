// packages
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
// components
import Button from "@/components/ui/button";
import Container from "@components/ui/contaienr";
import Link from "@components/ui/link";
import Navbar from "@/components/navbar";
import AddSite from "@/components/site/add-site";
// context
import { useAuth } from "@/context/auth";
// hooks
import useDisclosure from "@/hooks/use-disclosure";

export default function Dashboard(): JSX.Element {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) router.replace("/");
    }, 3500);

    return () => clearTimeout(timeoutId);
  }, [user]);

  if (!user) {
    return (
      <Container>
        <p>Loading</p>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard - Montex</title>
      </Head>
      <Navbar variant="dashboard" />
      <div className="pt-9 pb-20 bg-gray-50 border-b border-gray-200">
        <Container className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/account" title={user.username as string}>
              <Image
                src={user.photo_url as string}
                width={85}
                height={85}
                className="rounded-full"
              />
            </Link>
            <h3 className="text-4xl font-semibold text-black-normal ml-8">
              {user.username}
            </h3>
            <span className="bg-gray-50 border border-gray-300 rounded-xl px-1.5 py-0.5 text-xs uppercase ml-2.5 mt-2">
              {user.membership_plan}
            </span>
          </div>

          <Button className="h-9 px-8 font-medium text-sm" onClick={onOpen}>
            New Site
          </Button>
        </Container>
      </div>

      <Container>
        <div className="transform -translate-y-9 bg-white-normal flex flex-col items-center rounded shadow-md py-14">
          <h2 className="text-2xl font-semibold text-black-normal">
            Get activity on your website instantly
          </h2>
          <p className="text-black-normal text-lg mt-1.5">
            Start today, then grow with us
          </p>
          <Button
            className="h-10 px-6 font-semibold max-w-max mt-6"
            onClick={onOpen}
          >
            Add Your First Site
          </Button>

          <AddSite isOpen={isOpen} onClose={onClose} />
        </div>
      </Container>
    </div>
  );
}
