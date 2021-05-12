// packages
import useSWR from "swr";
// components
import SiteLayout from "@components/layouts/site";
import Table from "@components/ui/table";
import Link from "@components/ui/link";
import Button from "@components/ui/button";
// types
import { PageProps, SiteData } from "@/types";

const columns = [
  {
    label: "Path",
    orderBy: "url",
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
export default function Routes({ data }: PageProps<SiteData>): JSX.Element {
  const { data: routeData } = useSWR(data.id ? `/api/routes/${data.id}` : null);

  if (!routeData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="bg-white-normal shadow overflow-hidden sm:rounded-lg w-full">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Routes</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Information about site routes</p>
      </div>

      <div className="border-t border-gray-200">
        <Table
          rowData={routeData}
          columnData={columns}
          rowsPerPage={5}
          defaultOrderBy="created_at"
          withPagination={routeData.length > 5}
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
                    <Button as={Link} href={`/s/${entry.id}`} variant="secondary" size="small">
                      Details
                    </Button>
                  </Table.DataCell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

Routes.Layout = SiteLayout;
