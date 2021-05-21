// packages
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import Container from "@components/ui/container";
import Select from "@components/ui/select";
import Input from "@components/ui/input";
import Textarea from "@components/ui/textarea";
import Button from "@components/ui/button";
import Toast, { useToast } from "@components/ui/toast";
// helpers
import { CONTACT_SCHEMA } from "@helpers/validations";

type PartnerFormData = {
  partner_type: string;
  first_name: string;
  last_name: string;
  company_name: string;
  company_size: number | string;
  job_title: string;
  work_email: string;
  additional_info: string;
};

const DATA = [
  { id: 1, name: "Company and/or Agency" },
  { id: 2, name: "Independent" },
];

const DEFAULT_FORM_VALUES: PartnerFormData = {
  partner_type: "",
  first_name: "",
  last_name: "",
  company_name: "",
  company_size: "",
  job_title: "",
  work_email: "",
  additional_info: "",
};

export default function PartnerForm() {
  const [partnerTypeState, setPartnerType] = useState(DATA[0]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
    reset,
    setValue,
  } = useForm<PartnerFormData>({
    resolver: yupResolver(CONTACT_SCHEMA),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "all",
  });
  const { config, toast } = useToast();

  const onSubmitHandler: SubmitHandler<PartnerFormData> = async (formData) => {
    await fetch("/api/send/partner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    toast({
      title: "Successfully sent!",
      description:
        "We've successfully sent your partnership request. Our team will contact you soon!",
      status: "success",
      duration: 3500,
    });

    reset(DEFAULT_FORM_VALUES);
  };

  /** Using this update effect to dynamically change the value of a hidden input for a custom select */
  useEffect(() => setValue("partner_type", partnerTypeState.name), [partnerTypeState.name]);

  return (
    <section className="md:pb-20 pt-14 py-14">
      <Toast {...config} />
      <Container className="flex justify-center">
        <form
          className="w-full sm:max-w-2xl bg-gray-50 shadow-lg rounded-md sm:px-6 py-6 px-3 space-y-7"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <h2 className="text-center text-3xl font-bold pb-3">Become a Partner today</h2>
          <Select
            title="Partner Type"
            data={DATA}
            selected={partnerTypeState}
            setSelected={setPartnerType}
          />
          <Input id="partner_type" placeholder="Joe" {...register("partner_type")} hidden />

          <div className="flex sm:flex-row sm:space-x-7 sm:space-y-0 flex-col space-y-7">
            <div className="w-full">
              <label htmlFor="first_name" className="block text-black-light font-semibold pb-2">
                First Name
              </label>

              <Input
                id="first_name"
                placeholder="Joe"
                aria-invalid={!!errors.first_name}
                isError={errors.first_name && touchedFields.first_name}
                error={errors.first_name?.message}
                {...register("first_name")}
              />
            </div>

            <div className="w-full">
              <label htmlFor="last_name" className="block text-black-light font-semibold pb-2">
                Last Name
              </label>

              <Input
                id="last_name"
                placeholder="Doe"
                aria-invalid={!!errors.last_name}
                isError={errors.last_name && touchedFields.last_name}
                error={errors.last_name?.message}
                {...register("last_name")}
              />
            </div>
          </div>

          <div className="flex sm:flex-row sm:space-x-7 sm:space-y-0 flex-col space-y-7">
            <div className="w-full">
              <label htmlFor="company_name" className="block text-black-light font-semibold pb-2">
                Company Name
              </label>

              <Input
                id="company_name"
                placeholder="ECMA"
                aria-invalid={!!errors.company_name}
                isError={errors.company_name && touchedFields.company_name}
                error={errors.company_name?.message}
                {...register("company_name")}
              />
            </div>

            <div className="w-full">
              <label htmlFor="company_size" className="block text-black-light font-semibold pb-2">
                Company Size
              </label>

              <Input
                type="number"
                id="company_size"
                placeholder="50"
                aria-invalid={!!errors.company_size}
                isError={errors.company_size && touchedFields.company_size}
                error={errors.company_size?.message}
                {...register("company_size")}
              />
            </div>
          </div>

          <div className="flex sm:flex-row sm:space-x-7 sm:space-y-0 flex-col space-y-7">
            <div className="w-full">
              <label htmlFor="job_title" className="block text-black-light font-semibold pb-2">
                Job Title
              </label>

              <Input
                id="job_title"
                placeholder="CTO"
                aria-invalid={!!errors.job_title}
                isError={errors.job_title && touchedFields.job_title}
                error={errors.job_title?.message}
                {...register("job_title")}
              />
            </div>

            <div className="w-full">
              <label htmlFor="work_email" className="block text-black-light font-semibold pb-2">
                Work Email
              </label>

              <Input
                id="work_email"
                placeholder="jondoe@ecma.com"
                aria-invalid={!!errors.work_email}
                isError={errors.work_email && touchedFields.work_email}
                error={errors.work_email?.message}
                {...register("work_email")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="additional_info" className="block text-black-light font-semibold pb-2">
              Additional Information
            </label>

            <Textarea
              id="additional_info"
              placeholder="Tell us more about your projects and the way you are using Montex service..."
              rows={4}
              aria-invalid={!!errors.additional_info}
              isError={errors.additional_info && touchedFields.additional_info}
              error={errors.additional_info?.message}
              {...register("additional_info")}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="medium"
            loading={isSubmitting}
            disabled={!isValid}
            aria-disabled={!isValid}
          >
            Send Request
          </Button>
        </form>
      </Container>
    </section>
  );
}
