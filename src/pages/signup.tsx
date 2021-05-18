// packages
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
// components
import BaseLayout from "@components/layouts/base";
import Container from "@components/ui/container";
import Link from "@components/ui/link";
import SigningForm from "@/components/signing-form";
// context
import { useAuth } from "@/context/auth";
// data
import features from "@data/signup/features";

export default function Signup(): JSX.Element {
  const router = useRouter();

  const { user, signUpWithEmailAndPassword } = useAuth();

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user]);

  return (
    <BaseLayout title="Sign Up" withNav={false}>
      <div className="min-h-screen relative flex items-center">
        <div
          className="absolute lg:block hidden h-full w-1/2 top-0 left-0 z-0 bg-gray-50 border-r border-gray-200"
          aria-hidden
        />

        <Container className="py-10">
          <Link
            href="/"
            title="Montex branding"
            fixPosition
            className="justify-center lg:justify-start"
          >
            <Image src="/images/logo-full.png" width={168} height={32} />
          </Link>
          <div className="lg:grid grid-cols-2 lg:mt-7 mt-12 flex flex-col-reverse items-center lg:items-start">
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
              <SigningForm onSubmit={signUpWithEmailAndPassword} />
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
    </BaseLayout>
  );
}
