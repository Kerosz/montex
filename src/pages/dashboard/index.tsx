// packages
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// components
import BaseLayout from "@components/layouts/base";
import Button from "@components/ui/button";
import Container from "@components/ui/container";
import Link from "@components/ui/link";
import AddSite from "@components/site/add-site";
import Panel from "@components/overview/panel";
// context
import { useAuth } from "@/context/auth";
// hooks
import useDisclosure from "@/hooks/use-disclosure";

export default function Dashboard(): JSX.Element | null {
  const router = useRouter();
  const { user } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) router.replace("/");
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [user]);

  return (
    <BaseLayout title="Dashboard" navbarProps={{ variant: "dashboard" }}>
      <div className="min-h-screen bg-gray-100">
        {user && (
          <>
            <section className="pt-10 pb-20 bg-gray-50 border-b border-gray-200">
              <Container className="flex justify-between items-center">
                <div className="flex items-center">
                  <Link href="/account" title={user.username as string}>
                    <Image
                      src={user.photo_url as string}
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                  </Link>
                  <h3 className="text-4xl font-semibold text-black-normal ml-8">{user.username}</h3>
                  <span className="bg-gray-50 border border-gray-300 rounded-xl px-1.5 py-0.5 text-xs uppercase ml-2.5 mt-2">
                    {user.membership_plan}
                  </span>
                </div>

                <Button variant="primary" className="h-9 px-8 font-medium text-sm" onClick={onOpen}>
                  New Site
                </Button>
              </Container>
            </section>

            <Panel userId={user.uid} onOpen={onOpen} />

            <AddSite isOpen={isOpen} onClose={onClose} />
          </>
        )}
      </div>
    </BaseLayout>
  );
}
