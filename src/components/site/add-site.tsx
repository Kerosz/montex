// packages
import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useSWR, { mutate } from "swr";
// components
import Modal from "@components/ui/modal";
import Button from "../ui/button";
import Input from "@components/ui/input";
import Textarea from "@components/ui/textarea";
import Toast, { useToast } from "@components/ui/toast";
// context
import { useAuth } from "@/context/auth";
// helpers
import { createNewSite } from "@/services/firestore";
import { ADD_SITE_SCHEMA } from "@helpers/validations";
import { transformRawSite } from "@helpers/transformers";
// types
import type { RawSiteData, SiteData } from "@/types";

export interface AddSiteProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_FORM_VALUES: RawSiteData = {
  name: "",
  site_url: "",
  description: "",
};

export default function AddSite({ isOpen, onClose }: AddSiteProps): JSX.Element {
  const { user } = useAuth();
  const { config, toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    reset,
  } = useForm<RawSiteData>({
    resolver: yupResolver(ADD_SITE_SCHEMA),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "all",
  });
  const { data } = useSWR<Array<SiteData>>("/api/sites");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClose = () => {
    onClose();
    reset(DEFAULT_FORM_VALUES);
  };

  const onSubmitHandler: SubmitHandler<RawSiteData> = async (formData) => {
    if (user) {
      await createNewSite(formData, user.uid);

      const tempSiteData = transformRawSite(formData, null, user.uid);
      await mutate(`/api/sites/${user.uid}`, [...(data as SiteData[]), tempSiteData]);

      toast({
        title: "Site successfully added!",
        description:
          "Your site was successfully added, and you can start managing it at any point!",
        status: "success",
        duration: 3500,
      });

      handleClose();
    }
  };

  return (
    <>
      <Toast {...config} />
      <Modal isOpen={isOpen} onClose={handleClose} focusRef={inputRef} title="Add New Site">
        <form className="px-4 py-5 space-y-6 sm:p-6" onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-500 pl-0.5">
              Name
            </label>

            <Input
              id="name"
              placeholder="My site name"
              aria-invalid={!!errors.name}
              isError={errors.name && touchedFields.name}
              error={errors.name?.message}
              {...register("name")}
            />
          </div>

          <div>
            <label htmlFor="site_url" className="block text-sm font-semibold text-gray-500 pl-0.5">
              Website
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
                https://
              </span>
              <input
                type="text"
                id="site_url"
                aria-invalid={!!errors.site_url}
                className="focus:ring-0 focus:border-black-normal flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                placeholder="www.example.com"
                {...register("site_url")}
              />
            </div>
            {errors.site_url && touchedFields.site_url && (
              <span role="alert" className="text-sm text-secondary">
                {errors.site_url.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-500 pl-0.5"
            >
              Description
            </label>
            <div className="mt-1">
              <Textarea
                id="description"
                placeholder="Brief description for your site."
                aria-invalid={!!errors.description}
                rows={3}
                isError={errors.description && touchedFields.description}
                error={errors.description?.message}
                {...register("description")}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="secondary"
            loading={isSubmitting}
            className="py-1.5 w-full bg-gray-200 border-gray-300 shadow-sm hover:border-gray-400"
          >
            Create
          </Button>
        </form>
      </Modal>
    </>
  );
}
