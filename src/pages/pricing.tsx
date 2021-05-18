// packages
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
// components
import BaseLayout from "@components/layouts/base";
import Container from "@components/ui/container";
import Link from "@components/ui/link";
import Button from "@/components/ui/button";
import Accordion from "@/components/ui/accordion";
import TierTable from "@/components/tier-table";
// context
import { useAuth } from "@/context/auth";
// data
import customFeatures from "@data/pricing/custom";
import proFeatures from "@data/pricing/pro";
import hobbyFeatures from "@data/pricing/hobby";
import faq from "@data/pricing/faq";

export default function Pricing(): JSX.Element {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user]);

  return (
    <BaseLayout title="Pricing" navbarProps={{ withBorder: true }}>
      <section className="pt-16 pb-20 bg-gray-50">
        <Container>
          <h1 className="sm:text-6xl text-5xl font-bold text-black-normal text-center">
            Add. Embed. Comment.
          </h1>
          <p className="sm:text-2xl text-xl mt-5 text-center text-gray-500">
            Flexible pricing from personal projects to companies, and everything in between
          </p>

          <div className="grid lg:grid-cols-2 grid-cols-1 xl:gap-12 gap-8 mt-20">
            <div className="bg-gradient-to-r from-green-200 to-purple-200 shadow-xl py-8 xl:px-16 px-6 rounded-2xl flex flex-col items-center cursor-default">
              <h2 className="text-4xl text-black-light font-bold">Hobby</h2>
              <h3 className="text-2xl text-gray-600 mt-2">
                <span className="text-3xl font-bold text-black-light">$0</span>/mo
              </h3>

              <p className="text-center text-lg mt-6 text-black-normal">
                Get Montex for free, with 1 custom domain and up to 30 internal routes.{" "}
                <span className="font-semibold">No credit card required</span>.
              </p>

              <Button
                as={Link}
                href="/signup"
                variant="modern"
                className="py-3.5 px-6 flex justify-center items-center mt-8"
              >
                Start growing with Montex
                <ArrowNarrowRightIcon className="w-5 text-black-light ml-1.5 mt-1" />
              </Button>
            </div>

            <div className="bg-gradient-to-r from-red-200 to-purple-300 shadow-xl py-8 xl:px-16 px-6 rounded-2xl flex flex-col items-center cursor-default">
              <h2 className="text-4xl text-black-light font-bold text-center">
                Suited to your needs
              </h2>
              <h3 className="text-2xl text-gray-600 mt-3">Contact us</h3>

              <p className="text-center text-lg mt-6">
                We’ll ensure your company's projects are set up for success from day one using a
                personalized plan.
              </p>

              <Button
                variant="modern"
                className="py-3.5 px-6 flex justify-center items-center mt-8"
              >
                Talk to sales
                <ArrowNarrowRightIcon className="w-5 text-black-light ml-1.5 mt-1" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-16 pb-20 bg-gray-50 border-b border-gray-200">
        <Container>
          <h2 className="sm:text-5xl text-4xl text-black-normal text-center font-bold">
            Pay as you grow
          </h2>

          <TierTable
            custom={
              <TierTable.Option
                title="Custom"
                subTitle="for unique requirements"
                customPrice="Contact us"
                featureData={customFeatures}
                buttonLabel="Talk to sales"
                buttonLink="#"
                colorScheme="gray"
              />
            }
          >
            <TierTable.Option
              title="Hobby"
              subTitle="for smaller projects"
              price={0}
              featureData={hobbyFeatures}
              buttonLabel="Start growing for Free"
              buttonLink="/signup"
            />
            <TierTable.Option
              title="Professional"
              subTitle="for multiple projects"
              price={23}
              featureData={proFeatures}
              buttonLabel="Start 14 day Pro Trial"
              buttonLink="#"
              colorScheme="green"
            />
          </TierTable>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="sm:text-4xl text-3xl text-black-normal text-center font-bold mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion data={faq} />
        </Container>
      </section>
    </BaseLayout>
  );
}
