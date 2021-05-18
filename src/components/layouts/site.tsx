// packages
import { cloneElement, Children } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
// components
import BaseLayout from "@components/layouts/base";
import Sidebar from "@components/site/sidebar";
import Container from "@components/ui/container";
import Button from "@components/ui/button";
import Link from "@components/ui/link";
import Badge from "@components/ui/badge";
// types
import type { SiteData } from "@/types";
import type { ReactNode } from "react";

export interface SiteProps {
  children?: ReactNode;
}

export default function Site({ children }: SiteProps): JSX.Element | null {
  const router = useRouter();
  const id = router.query.id as string;
  const { data } = useSWR<SiteData>(id ? `/api/site/${id}` : null);

  // TODO: HAVE A SKELETON
  if (!data)
    return (
      <BaseLayout title="Sites" navbarProps={{ variant: "dashboard" }}>
        <h1>Loading...</h1>
      </BaseLayout>
    );

  return (
    <BaseLayout title={`Sites - ${data.name}`} navbarProps={{ variant: "dashboard" }}>
      <div className="min-h-screen bg-gray-100">
        <section className="pt-7 pb-8 bg-gray-50 border-b border-gray-200">
          <Container className="flex justify-between items-center">
            <div>
              <h3
                className="text-4xl font-semibold text-black-normal cursor-default"
                title="Site name"
              >
                {data.name}
              </h3>

              <p
                className="flex flex-col space-y-1.5 text-sm text-gray-500 font-semibold mt-6"
                title={data.id}
              >
                <span className="ml-0.5">Site ID</span>
                <Badge colorScheme="gray">{data.id}</Badge>
              </p>
            </div>

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
        <section className="py-12">
          <Container className="flex">
            <Sidebar siteId={id} />
            {cloneElement(children as JSX.Element, {
              data,
            })}
          </Container>
        </section>
      </div>
    </BaseLayout>
  );
}
