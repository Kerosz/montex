// packages
import useSWR from "swr";
import { formatDistanceStrict } from "date-fns";
// components
import Container from "@components/ui/container";
import Button from "@/components/ui/button";
import Link from "@components/ui/link";
import Table from "@/components/ui/table";
import Empty from "./empty";
// helpers
import fetcher from "@helpers/fetcher";
// types
import type { SiteData } from "@/types";
import useToast from "@components/ui/toast";

export interface PanelProps {
  userId: string;
  onOpen: () => void;
}

const columns = [
  {
    label: "Name",
    orderBy: "name",
  },
  {
    label: "Site",
    orderBy: "url",
  },
  {
    label: "Description",
    orderBy: "description",
  },
  {
    label: "Created",
    orderBy: "created_at",
  },
  {
    label: "View",
    options: {
      readerOnly: true,
    },
  },
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
          <Table
            rowData={data}
            columnData={columns}
            rowsPerPage={4}
            defaultOrderBy="created_at"
            withPagination
          >
            <Table.Body>
              {({ rows }) =>
                rows.map((entry) => (
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
        )}
      </Container>
    </section>
  );
}
