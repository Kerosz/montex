// packages
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mutate } from "swr";
// components
import SiteLayout from "@components/layouts/site";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
// helpers
import { ADD_SITE_SCHEMA } from "@helpers/validations";
// types
import type { PageProps, RawSiteData, SiteData } from "@/types";
import { updateSiteData } from "@/services/firestore";

export default function General({ data }: PageProps<SiteData>): JSX.Element {
  const DEFAULT_FORM_VALUES = {
    name: data.name,
    site_url: data.url,
    description: data.description,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<RawSiteData>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(ADD_SITE_SCHEMA),
    mode: "all",
  });

  const onSubmitHandler = async (formData: RawSiteData) => {
    if (
      formData.name !== data.name ||
      formData.site_url !== data.url ||
      formData.description !== data.description
    ) {
      await updateSiteData(formData, data.id);

      // Works for this use case, the formData needs to be transformed if new form values that don't match the DB keys are added in the future.
      mutate(`/api/site/${data.id}`, { ...data, ...formData });
    }
  };

  return (
    <form
      className="bg-white-normal shadow overflow-hidden sm:rounded-lg w-full"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">General</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Configure your general site information
        </p>
      </div>

      <div className="border-t border-b border-gray-200">
        <dl>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <label htmlFor="site_url" className="text-sm font-medium text-gray-600">
              Site URL
            </label>

            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Input
                id="site_url"
                placeholder="My site name"
                defaultValue={data.url}
                readOnly
                {...register("site_url")}
              />
            </dd>
          </div>

          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Site Name
            </label>

            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Input
                id="name"
                placeholder="My site name"
                defaultValue={data.name}
                {...register("name")}
              />
              {errors.name && touchedFields.name && (
                <span role="alert" className="block text-sm text-secondary mt-1 pl-0.5">
                  {errors.name.message}
                </span>
              )}
            </dd>
          </div>

          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <label htmlFor="description" className="text-sm font-medium text-gray-600">
              Description
            </label>

            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Input
                as="textarea"
                id="description"
                placeholder="Brief description for your site."
                defaultValue={data.description}
                rows={5}
                {...register("description")}
              />
              {errors.description && touchedFields.description && (
                <span role="alert" className="block text-sm text-secondary mt-1 pl-0.5">
                  {errors.description.message}
                </span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      <div className="px-4 py-5 sm:px-6">
        <Button type="submit" variant="primary" size="normal" loading={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
}

General.Layout = SiteLayout;
