// packages
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { CheckCircleIcon, ArrowNarrowRightIcon, ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { MailIcon } from "@heroicons/react/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Head from "next/head";
// components
import Container from "@components/ui/contaienr";
import Link from "@components/ui/link";
import Button from "@/components/ui/button";
import { Github, Google } from "@/components/icons";
// context
import { useAuth } from "@/context/auth";
// helpers
import { SIGNUP_SCHEMA } from "@helpers/validations";
// data
import features from "@data/signup/features";

type FormValues = {
  email: string;
  password: string;
};

const DEFAULT_FORM_VALUES = {
  email: "",
  password: "",
} as FormValues;

export default function Signup(): JSX.Element {
  const router = useRouter();
  const { user, signInWithGithub, signInWithGoogle, signUpWithEmailAndPassword } = useAuth();
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

  const [serverErrorState, setServerError] = useState<string | null>(null);

  const withEmail = !!router.query.email;

  const handleEmailScreen = (optionEnabled: boolean) => {
    if (optionEnabled) {
      router.push({ query: { email: true } });
    } else {
      router.push({ query: {} });
    }

    reset(DEFAULT_FORM_VALUES);
    setServerError(null);
  };

  const onSubmitHandler: SubmitHandler<FormValues> = async (formData) => {
    try {
      await signUpWithEmailAndPassword(formData.email, formData.password);

      reset(DEFAULT_FORM_VALUES);
      setServerError(null);
    } catch (error) {
      setServerError(error.message);
    }
  };

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user]);

  return (
    <div className="min-h-screen relative flex items-center">
      <div
        className="absolute lg:block hidden h-full w-1/2 top-0 left-0 z-0 bg-gray-50 border-r border-gray-200"
        aria-hidden
      />
      <Head>
        <title>Sign Up - Montex</title>
      </Head>

      <Container className="py-10">
        <Link href="/" title="Montex branding" fixPosition>
          <Image src="/images/logo-full.png" width={168} height={32} />
        </Link>
        <div className="lg:grid grid-cols-2 lg:mt-7 mt-12 flex flex-col-reverse items-center">
          <div className="z-10 lg:mt-0 mt-6">
            <dl className="pt-10 max-w-sm space-y-12">
              {features.map(({ name, description }) => (
                <div className="relative" key={name}>
                  <dt>
                    <div className="absolute flex items-center justify-center">
                      <CheckCircleIcon className="w-8 text-secondary" aria-hidden="true" />
                    </div>
                    <p className="ml-14 text-2xl leading-6 font-bold text-black-normal">{name}</p>
                  </dt>
                  <dd className="mt-4 ml-14 text-lg font-medium text-gray-500">{description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col lg:pl-14 max-w-sm">
            <h2 className="sm:text-5xl text-4xl font-semibold" style={{ lineHeight: 1.15 }}>
              Join the most epic platform
            </h2>
            {withEmail ? (
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
                  onClick={() => handleEmailScreen(false)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") handleEmailScreen(false);
                  }}
                >
                  <ArrowNarrowLeftIcon className="w-4 mr-1.5 mt-1" />
                  Continue with Social
                </Button>
              </>
            ) : (
              <div className="w-full mt-14">
                <Button
                  className="w-full py-2.5 flex justify-center items-center"
                  onClick={signInWithGithub}
                >
                  <Github className="mr-2" />
                  Continue with Github
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
                  onClick={() => handleEmailScreen(true)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") handleEmailScreen(true);
                  }}
                >
                  Continue with Email
                  <ArrowNarrowRightIcon className="w-4 ml-1.5 mt-1" />
                </Button>
              </div>
            )}
            <p className="mt-10 text-gray-500">
              By clicking continue, you agree to our{" "}
              <Link href="/legal/terms" className="text-black-normal hover:underline" external>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/privacy-policy"
                className="text-black-normal hover:underline"
                external
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p className="mt-12 pt-5 border-t border-gray-200 text-gray-700 font-semibold">
              Already have an account?{" "}
              <Link href="/login" className="text-secondary hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
