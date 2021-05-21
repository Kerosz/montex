// packages
import { useEffect } from "react";
import { useRouter } from "next/router";
import { PlusSmIcon } from "@heroicons/react/outline";
import useSWR from "swr";
// components
import BaseLayout from "@components/layouts/base";
import Container from "@components/ui/container";
import Button from "@components/ui/button";
import AddSite from "@components/site/add-site";
import Search from "@components/site/search";
import List from "@/components/site/list";
// context
import { useAuth } from "@/context/auth";
// hooks
import useDisclosure from "@/hooks/use-disclosure";
// helpers
import fetcher from "@helpers/fetcher";
// types
import type { SiteData } from "@/types";

export default function Sites(): JSX.Element {
  const router = useRouter();
  const { user } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data } = useSWR<SiteData[]>(
    user ? [`/api/sites/${user.uid}`, user.jwt_token] : null,
    fetcher
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) router.replace("/");
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [user]);

  return (
    <BaseLayout title="Sites - Dashboard" navbarProps={{ variant: "dashboard" }}>
      <div className="min-h-screen bg-gray-50">
        {user && (
          <section className="py-8">
            <Container>
              <div className="flex items-center">
                <Search />

                <Button
                  variant="primary"
                  className="flex items-center h-10 pl-4 sm:pr-6 pr-4 font-medium"
                  onClick={onOpen}
                >
                  <PlusSmIcon className="w-5 mt-0.5 sm:mr-1.5" />
                  <span className="sm:block hidden">New Site</span>
                </Button>

                <AddSite isOpen={isOpen} onClose={onClose} />
              </div>

              <List data={data} onOpen={onOpen} />
            </Container>
          </section>
        )}
      </div>
    </BaseLayout>
  );
}
