// packages
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mutate } from "swr";
// components
import SiteLayout from "@components/layouts/site";
import Link from "@/components/ui/link";
import Input from "@/components/ui/input";
import Textarea from "@components/ui/textarea";
import Button from "@/components/ui/button";
// hooks
import { useAuth } from "@/context/auth";
// helpers
import { UPDATE_SITE_SCHEMA } from "@helpers/validations";
import { updateSiteData } from "@/services/firestore";
// types
import type { PageProps, SiteData } from "@/types";

export default function General({ data }: PageProps<SiteData>): JSX.Element {
  const DEFAULT_FORM_VALUES = {
    name: data.name,
    url: data.url,
    description: data.description,
    comment_policy: data.comment_policy,
    nsfw_content: data.nsfw_content,
    branding: data.branding,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<SiteData>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(UPDATE_SITE_SCHEMA),
    mode: "all",
  });
  const { user } = useAuth();

  const isPaid = user?.membership_plan !== "hobby";

  const onSubmitHandler = async (formData: SiteData) => {
    if (!isPaid) formData.branding = true;

    await updateSiteData(formData, data.id);

    // Works for this use case, the formData needs to be transformed if new form values that don't match the DB keys are added in the future.
    mutate(`/api/site/${data.id}`, { ...data, ...formData });
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
            <label htmlFor="url" className="text-sm font-medium text-gray-600">
              Site URL
            </label>

            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Input
                id="url"
                placeholder="My site name"
                defaultValue={data.url}
                readOnly
                {...register("url")}
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
                isError={errors.name && touchedFields.name}
                error={errors.name?.message}
                {...register("name")}
              />
            </dd>
          </div>

          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <label htmlFor="description" className="text-sm font-medium text-gray-600">
              Description
            </label>

            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Textarea
                id="description"
                placeholder="Brief description for your site."
                defaultValue={data.description}
                rows={5}
                isError={errors.description && touchedFields.description}
                error={errors.description?.message}
                {...register("description")}
              />
            </dd>
          </div>

          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <label htmlFor="comment_policy" className="text-sm font-medium text-gray-600">
              Comment Policy URL
            </label>

            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Input
                id="comment_policy"
                placeholder="URL for comment policy"
                defaultValue={data.comment_policy}
                isError={errors.comment_policy && touchedFields.comment_policy}
                error={errors.comment_policy?.message}
                {...register("comment_policy")}
              />
            </dd>
          </div>

          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <label htmlFor="nsfw_content" className="text-sm font-medium text-gray-600">
              Adult Content
            </label>

            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="flex items-center">
                <Input
                  type="checkbox"
                  id="nsfw_content"
                  defaultChecked={data.nsfw_content}
                  className="w-4 h-4"
                  isError={errors.nsfw_content && touchedFields.nsfw_content}
                  error={errors.nsfw_content?.message}
                  {...register("nsfw_content")}
                />
                <label htmlFor="nsfw_content" className="ml-2 text-gray-600">
                  Flag my site as adult content or NSFW
                </label>
              </div>
            </dd>
          </div>

          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <label htmlFor="branding" className="text-sm font-medium text-gray-600">
              Montex Branding
            </label>

            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="flex items-center">
                <Input
                  type="checkbox"
                  id="branding"
                  defaultChecked={data.branding}
                  className="w-4 h-4"
                  disabled={!isPaid}
                  isError={errors.branding && touchedFields.branding}
                  error={errors.branding?.message}
                  {...register("branding")}
                />
                <label
                  htmlFor="branding"
                  className={`ml-2 text-gray-500 ${!isPaid && "font-semibold cursor-not-allowed"}`}
                >
                  Show Montex branding in your comments section
                </label>
              </div>
              {!isPaid && (
                <p className="mt-1.5 text-xs text-gray-600">
                  This feature is only available in the PRO plan.{" "}
                  <Link href="#" className="text-blue-500 hover:underline">
                    Upgrade
                  </Link>
                </p>
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
