// packages
import useSWR from "swr";
import { formatDistanceStrict } from "date-fns";
// components
import Container from "@components/ui/contaienr";
import Button from "@/components/ui/button";
import Link from "@components/ui/link";
import Table from "@/components/ui/table";
import Empty from "./empty";
// helpers
import fetcher from "@helpers/fetcher";
// types
import type { SiteData } from "@/types";

export interface PanelProps {
  userId: string;
  onOpen: () => void;
}

const tableColumns = ["Name", "Site", "Description", "Created"];

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    role: "Admin",
    email: "jane.cooper@example.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];

export default function Panel({ userId, onOpen }: PanelProps) {
  const { data } = useSWR<SiteData[]>(`/api/sites/${userId}`, fetcher);

  if (!data) {
    return (
      <section className="transform -translate-y-8">
        <Container>
          <h1>Loading...</h1>
        </Container>
      </section>
    );
  }

  return (
    <section className="transform -translate-y-8">
      <Container>
        {data.length === 0 && (
          <Empty
            addButton={
              <Button variant="primary" className="h-10 px-6 max-w-max mt-6" onClick={onOpen}>
                Add First Site
              </Button>
            }
          />
        )}
        {data.length > 0 && (
          <>
            <Table tableData={data} withPagination>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Site</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Created</Table.HeadCell>
                <Table.HeadCell readerOnly>View</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {({ tableData }) =>
                  tableData.map((entry) => (
                    <Table.Row key={entry.id || entry.name}>
                      <Table.DataCell>
                        <Link href={`/s/${entry.id}`} className="font-semibold text-black-normal">
                          {entry.name}
                        </Link>
                      </Table.DataCell>
                      <Table.DataCell>
                        <Link href={entry.url} external className="hover:underline">
                          {entry.url}
                        </Link>
                      </Table.DataCell>
                      <Table.DataCell fixedWidth>{entry.description}</Table.DataCell>
                      <Table.DataCell>
                        <span className="cursor-default">
                          {formatDistanceStrict(entry.created_at, Date.now(), { addSuffix: true })}
                        </span>
                      </Table.DataCell>
                      <Table.DataCell>
                        <Button as={Link} href={`/s/${entry.id}`} variant="secondary" size="small">
                          Details
                        </Button>
                      </Table.DataCell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
            <Table.Pagination />
          </>
        )}
      </Container>
    </section>
  );
}
