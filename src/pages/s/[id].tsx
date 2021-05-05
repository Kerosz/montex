// packages
import { useEffect } from "react";
import { useRouter } from "next/router";
// components
import BaseLayout from "@components/layouts/base";
import Container from "@components/ui/contaienr";
import Button from "@components/ui/button";
import Link from "@components/ui/link";
// context
import { useAuth } from "@/context/auth";
// services
import { getAllSites, getSiteBySiteId } from "@/services/firestore";
// types
import type { GetStaticProps, GetStaticPaths } from "next";
import type { SiteData } from "@/types";

export interface SitesProps {
  data: SiteData;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const data = await getSiteBySiteId(id);

  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      id: site.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default function Sites({ data }: SitesProps): JSX.Element {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) router.replace("/");
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [user]);

  return (
    <BaseLayout title={`Sites - ${data.name}`} navbarProps={{ variant: "dashboard" }}>
      <div className="min-h-screen bg-gray-100">
        <section className="py-8 bg-gray-50 border-b border-gray-200">
          <Container className="flex justify-between items-center">
            <h3
              className="text-4xl font-semibold text-black-normal cursor-default"
              title="Site name"
            >
              {data.name}
            </h3>

            <Button
              as={Link}
              variant="primary"
              size="medium"
              href={data.url}
              external
              title={data.url}
            >
              Visit
            </Button>
          </Container>
        </section>
      </div>
    </BaseLayout>
  );
}
