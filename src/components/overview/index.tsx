// packages
import useSWR from "swr";
import Image from "next/image";
import { formatDistanceStrict } from "date-fns";
// components
import Button from "@/components/ui/button";
import Table from "@/components/ui/table";
import Container from "@components/ui/contaienr";
import Link from "@components/ui/link";
import AddSite from "@/components/site/add-site";
import Empty from "./empty";
// hooks
import useDisclosure from "@/hooks/use-disclosure";
// helpers
import fetcher from "@helpers/fetcher";
// types
import type { AuthUser, SiteData } from "@/types";
import type { ReactNode } from "react";

export interface OverviewProps {
  user: AuthUser;
  children?: ReactNode;
}

const tableColumns = ["Name", "Site", "Description", "Created"];

export default function Overview({ user }: OverviewProps): JSX.Element {
  const { data } = useSWR<SiteData[]>("/api/sites", fetcher);

  const { isOpen, onClose, onOpen } = useDisclosure();

  if (!data) {
    return (
      <Container>
        <p>Loading</p>
      </Container>
    );
  }

  return (
    <>
      <section className="pt-10 pb-20 bg-gray-50 border-b border-gray-200">
        <Container className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/account" title={user.username as string}>
              <Image
                src={user.photo_url as string}
                width={90}
                height={90}
                className="rounded-full"
              />
            </Link>
            <h3 className="text-4xl font-semibold text-black-normal ml-8">{user.username}</h3>
            <span className="bg-gray-50 border border-gray-300 rounded-xl px-1.5 py-0.5 text-xs uppercase ml-2.5 mt-2">
              {user.membership_plan}
            </span>
          </div>

          <Button className="h-9 px-8 font-medium text-sm" onClick={onOpen}>
            New Site
          </Button>
        </Container>
      </section>

      <section className="transform -translate-y-8">
        <Container>
          {data.length > 0 ? (
            <Table columnData={tableColumns}>
              {data.map((entry) => (
                <tr key={entry.id || entry.name}>
                  <Table.Td>
                    <span className="font-semibold text-black-normal">{entry.name}</span>
                  </Table.Td>
                  <Table.Td>
                    <span className="cursor-default">{entry.url}</span>
                  </Table.Td>
                  <Table.Td>{entry.description}</Table.Td>
                  <Table.Td style={{ maxWidth: "130px" }}>
                    <span className="cursor-default">
                      {formatDistanceStrict(entry.created_at, Date.now(), { addSuffix: true })}
                    </span>
                  </Table.Td>
                  <Table.Td alignEnd style={{ maxWidth: "100px" }}>
                    <Button
                      as={Link}
                      href={entry.url}
                      external
                      variant="secondary"
                      className="px-4 py-1 text-sm"
                    >
                      Details
                    </Button>
                  </Table.Td>
                </tr>
              ))}
            </Table>
          ) : (
            <Empty
              addButton={
                <Button className="h-10 px-6 font-semibold max-w-max mt-6" onClick={onOpen}>
                  Add Your First Site
                </Button>
              }
            />
          )}
        </Container>
      </section>

      <AddSite isOpen={isOpen} onClose={onClose} />
    </>
  );
}
