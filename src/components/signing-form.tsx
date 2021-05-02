// packages
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MailIcon } from "@heroicons/react/outline";
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from "@heroicons/react/solid";
// components
import Button from "@/components/ui/button";
import { Github, Google, Twitter } from "@/components/icons";
// context
import { useAuth } from "@/context/auth";
// helpers
import { SIGNUP_SCHEMA } from "@helpers/validations";

export interface EmailFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

type FormValues = {
  email: string;
  password: string;
};

const DEFAULT_FORM_VALUES = {
  email: "",
  password: "",
} as FormValues;

export default function SigningForm({ onSubmit }: EmailFormProps) {
  const { signInWithGithub, signInWithGoogle, signInWithTwitter } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(SIGNUP_SCHEMA),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "all",
  });

  const router = useRouter();
  const withEmail = !!router.query.email;

  const [serverErrorState, setServerError] = useState<string | null>(null);

  const onSubmitHandler: SubmitHandler<FormValues> = async (formData) => {
    try {
      await onSubmit(formData.email, formData.password);

      reset(DEFAULT_FORM_VALUES);
      setServerError(null);
    } catch (error) {
      setServerError(error.message);
    }
  };

  const changeScreenRoute = (isEmailScreen: boolean = false) => {
    if (isEmailScreen) {
      router.push({ query: { email: true } });
    } else {
      router.push({ query: {} });
    }

    reset(DEFAULT_FORM_VALUES);
    setServerError(null);
  };

  if (withEmail) {
    return (
      <>
        <form className="sm:mt-12 mt-8 space-y-3" onSubmit={handleSubmit(onSubmitHandler)}>
          {serverErrorState && (
            <span role="alert" className="text-sm text-secondary text-center block">
              {serverErrorState}
            </span>
          )}
          <div>
            <label htmlFor="email_address" className="sr-only">
              Email address
            </label>
            <input
              type="text"
              id="email"
              autoComplete="email"
              className="mt-1 focus:ring-0 focus:border-black-normal block w-full shadow-sm border-gray-300 rounded-md"
              placeholder="Email Address"
              {...register("email")}
            />
            {errors.email && (
              <span role="alert" className="text-sm text-secondary">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              className="mt-1 focus:ring-0 focus:border-black-normal block w-full shadow-sm border-gray-300 rounded-md"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <span role="alert" className="text-sm text-secondary">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button type="submit" className="w-full py-2.5 flex justify-center items-center">
            <MailIcon className="w-6 mr-2" />
            {isSubmitting ? "Loading..." : "Continue with Email"}
          </Button>
        </form>

        <Button
          variant="slim"
          className="w-full flex items-center justify-center mt-7 text-secondary font-semibold hover:underline focus:outline-none focus:underline"
          onClick={() => changeScreenRoute()}
          onKeyPress={(event) => {
            if (event.key === "Enter") changeScreenRoute();
          }}
        >
          <ArrowNarrowLeftIcon className="w-4 mr-1.5 mt-1" />
          Continue with Social
        </Button>
      </>
    );
  }

  return (
    <div className="w-full mt-14">
      <Button className="w-full py-2.5 flex justify-center items-center" onClick={signInWithGithub}>
        <Github className="mr-2" />
        Continue with Github
      </Button>
      <Button
        variant="secondary"
        className="w-full py-2.5 flex justify-center items-center bg-blue-500 mt-3.5 text-white-normal hover:text-gray-200"
        onClick={signInWithTwitter}
      >
        <Twitter className="mr-2" />
        Continue with Twitter
      </Button>
      <Button
        variant="secondary"
        className="w-full py-2.5 flex justify-center items-center bg-gray-50 mt-3.5"
        onClick={signInWithGoogle}
      >
        <Google className="mr-2" />
        Continue with Google
      </Button>
      <Button
        variant="slim"
        className="w-full flex items-center justify-center mt-7 font-semibold hover:underline focus:outline-none focus:underline text-secondary"
        onClick={() => changeScreenRoute(true)}
        onKeyPress={(event) => {
          if (event.key === "Enter") changeScreenRoute(true);
        }}
      >
        Continue with Email
        <ArrowNarrowRightIcon className="w-4 ml-1.5 mt-1" />
      </Button>
    </div>
  );
}
