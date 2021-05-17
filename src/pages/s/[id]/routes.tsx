// packages
import useSWR, { mutate } from "swr";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
// components
import SiteLayout from "@components/layouts/site";
import Input from "@components/ui/input";
import BasePanel from "@components/base-panel";
import Badge from "@components/ui/badge";
import Table from "@components/ui/table";
import Button from "@components/ui/button";
import Toast, { useToast } from "@components/ui/toast";
// helpers
import { createNewRoute } from "@services/firestore";
import { rawRouteTransform } from "@helpers/transformers";
import { ADD_ROUTE } from "@helpers/validations";
// types
import type { PageProps, SiteData, RawRouteData, RouteData } from "@/types";

type RoutesFormData = RawRouteData;

const COLUMNS = [
  {
    label: "Path",
    orderBy: "path",
  },
  {
    label: "Created",
    orderBy: "created_at",
  },
];

const DEFAULT_FORM_VALUES = {
  name: "",
  path: "",
};

export default function Routes({ data }: PageProps<SiteData>): JSX.Element {
  const { data: routeData } = useSWR<Array<RouteData>>(data.id ? `/api/routes/${data.id}` : null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    reset,
  } = useForm<RoutesFormData>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(ADD_ROUTE),
    mode: "all",
  });
  const { config, toast } = useToast();

  const onSubmitHandler = async (formData: RoutesFormData) => {
    await createNewRoute(formData, data.id);

    const tempRouteData = rawRouteTransform(formData, null, data.id);
    await mutate(`/api/routes/${data.id}`, [...(routeData as RouteData[]), tempRouteData]);

    toast({
      title: "Route created.",
      description: "We've successfully created a new route for you.",
      status: "success",
      duration: 3500,
    });

    reset(DEFAULT_FORM_VALUES);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      <Toast {...config} />
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
            withPagination
          >
            <Table.Body>
              {({ rows }) =>
                rows.map((entry) => (
                  <Table.Row key={entry.id || entry.name}>
                    <Table.DataCell>
                      <Badge colorScheme="gray" size="medium">
                        {entry.path}
                      </Badge>
                    </Table.DataCell>
                    <Table.DataCell>
                      {format(entry.created_at, "MMM dd, yyyy - h:mm:ss a")}
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
