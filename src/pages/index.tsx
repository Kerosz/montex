// packages
import Head from "next/head";
import Link from "next/link";
// components
import BaseLayout from "@components/layouts/base";
import Container from "@components/ui/contaienr";
import Button from "@components/ui/button";
import FeatureSection from "@components/feature-section";
import CallToAction from "@components/cta";
// data
import activityFeature from "@data/landing/activity-feature";
import toolingFeature from "@data/landing/tooling-features";

export default function Home(): JSX.Element {
  return (
    <BaseLayout>
      <Head>
        <title>Montex - Add. Embed. Comment. Easiest way to add comments and reviews</title>
      </Head>
      <Container>
        <div className="flex flex-col py-10 items-center">
          <Heading title="Add." />
          <Heading title="Embed." />
          <Heading title="Comment." />
          <div className="sm:space-x-5 mt-16 flex flex-col sm:flex-row">
            <Link href="/signup" passHref>
              <Button
                as="a"
                className="text-lg border border-black-normal hover:border-black-light py-2.5 px-9"
              >
                Get Started
              </Button>
            </Link>

            <Button className="py-2.5 px-9 text-lg mt-3.5 sm:mt-0" variant="secondary">
              Learn More
            </Button>
          </div>
          <p className="text-black-light text-xl mt-14 text-center max-w-4xl">
            <span className="text-secondary font-bold">Montex</span> it's the easiest way to add
            comments or reviews to your blog or personal website. Try it out by signing up for a
            free tier plan and use our platform for up to 3 custom domains.
          </p>
        </div>
        <FeatureSection color="secondary" data={activityFeature} />
        <FeatureSection color="blue-400" data={toolingFeature} />
      </Container>

      <CallToAction />
    </BaseLayout>
  );
}

function Heading(props: { title: string }): JSX.Element {
  return (
    <span className="font-extrabold text-black-normal lg:text-10xl md:text-9xl text-vw">
      {props.title}
    </span>
  );
}
