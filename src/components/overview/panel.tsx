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
              <Button className="h-10 px-6 font-semibold max-w-max mt-6" onClick={onOpen}>
                Add First Site
              </Button>
            }
          />
        )}
        {data.length > 0 && (
          <Table columnData={tableColumns}>
            {data.map((entry) => (
              <tr key={entry.id || entry.name}>
                <Table.Td>
                  <Link href={`/s/${entry.id}`} className="font-semibold text-black-normal">
                    {entry.name}
                  </Link>
                </Table.Td>
                <Table.Td>
                  <Link href={entry.url} external className="hover:underline">
                    {entry.url}
                  </Link>
                </Table.Td>
                <Table.Td>{entry.description}</Table.Td>
                <Table.Td style={{ maxWidth: "130px" }}>
                  <span className="cursor-default">
                    {formatDistanceStrict(entry.created_at, Date.now(), { addSuffix: true })}
                  </span>
                </Table.Td>
                <Table.Td alignEnd style={{ width: "100px" }}>
                  <Button
                    as={Link}
                    href={`/s/${entry.id}`}
                    variant="secondary"
                    className="px-4 py-1 text-sm"
                  >
                    Details
                  </Button>
                </Table.Td>
              </tr>
            ))}
          </Table>
        )}
      </Container>
    </section>
  );
}
