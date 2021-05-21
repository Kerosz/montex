// packages
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import Toast, { useToast } from "@components/ui/toast";
import Input from "@components/ui/input";
import Textarea from "@components/ui/textarea";
import Button from "@components/ui/button";
// helpers
import { CONTACT_SCHEMA } from "@helpers/validations";

type ContactFormData = {
  first_name: string;
  last_name: string;
  company_name: string;
  company_size: number | string;
  job_title: string;
  work_email: string;
  additional_info: string;
};

const DEFAULT_FORM_VALUES: ContactFormData = {
  first_name: "",
  last_name: "",
  company_name: "",
  company_size: "",
  job_title: "",
  work_email: "",
  additional_info: "",
};

export default function SalesForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(CONTACT_SCHEMA),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "all",
  });
  const { config, toast } = useToast();

  const onSubmitHandler: SubmitHandler<ContactFormData> = async (formData) => {
    await fetch("/api/send/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    toast({
      title: "Successfully sent!",
      description: "We've successfully sent your contact enquiry. Our team will contact you soon!",
      status: "success",
      duration: 3500,
    });

    reset(DEFAULT_FORM_VALUES);
  };

  return (
    <form
      className="w-full md:max-w-sm max-w-2xl bg-white-normal shadow-md rounded-md p-6 space-y-7 ml-0 md:ml-6 lg:ml-0 mb-6 md:mb-0"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Toast {...config} />
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
        Submit
      </Button>
    </form>
  );
}
