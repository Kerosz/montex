// packages
import useSWR, { mutate } from "swr";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import SiteLayout from "@components/layouts/site";
import Input from "@components/ui/input";
import BasePanel from "@components/base-panel";
import Table from "@components/ui/table";
import Link from "@components/ui/link";
import Button from "@components/ui/button";
// helpers
import { ADD_ROUTE } from "@helpers/validations";
// types
import type { PageProps, SiteData } from "@/types";

type RoutesFormData = {
  name: string;
  path: string;
};

const COLUMNS = [
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

const DEFAULT_FORM_VALUES = {
  name: "",
  path: "",
} as RoutesFormData;

export default function Routes({ data }: PageProps<SiteData>): JSX.Element {
  const { data: routeData } = useSWR(data.id ? `/api/routes/${data.id}` : null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<RoutesFormData>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(ADD_ROUTE),
    mode: "all",
  });

  const onSubmitHandler = async (formData: RoutesFormData) => {
    console.log(formData);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      <BasePanel
        as="form"
        title="Management"
        subTitle="Create new routes for your site."
        action={
          <Button type="submit" variant="primary" size="normal" loading={isSubmitting}>
            Add new route
          </Button>
        }
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="border-t border-b border-gray-200">
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Route name
            </label>

            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Input
                id="name"
                placeholder="My route name"
                isError={errors.name && touchedFields.name}
                error={errors.name?.message}
                {...register("name")}
              />
            </div>
          </div>

          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Path
            </label>

            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Input
                id="path"
                placeholder="Route path"
                isError={errors.path && touchedFields.path}
                error={errors.path?.message}
                {...register("path")}
              />
            </div>
          </div>
        </div>
      </BasePanel>
      <BasePanel title="Routes" subTitle="General information about existent site routes.">
        {routeData ? (
          <Table
            rowData={routeData}
            columnData={COLUMNS}
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
        ) : (
          <h1>Loading...</h1>
        )}
      </BasePanel>
    </div>
  );
}

Routes.Layout = SiteLayout;
