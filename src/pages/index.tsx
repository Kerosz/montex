// components
import BaseLayout from "@components/layouts/base";
import Container from "@components/ui/container";
import Button from "@components/ui/button";
import Link from "@components/ui/link";
import FeatureSection from "@components/feature-section";
import CallToAction from "@components/cta";
// data
import activityFeature from "@data/landing/activity-feature";
import toolingFeature from "@data/landing/tooling-features";

export default function Home(): JSX.Element {
  return (
    <BaseLayout title="Add. Embed. Comment. Easiest way to add comments and reviews">
      <Container>
        <div className="flex flex-col py-10 items-center">
          <Heading title="Add." />
          <Heading title="Embed." />
          <Heading title="Comment." />
          <div className="sm:space-x-5 mt-16 flex flex-col sm:flex-row">
            <Button as={Link} href="/signup" variant="primary" size="large">
              Get Started
            </Button>

            <Button
              as={Link}
              href="/pricing"
              variant="secondary"
              size="large"
              className="mt-3.5 sm:mt-0"
            >
              Learn More
            </Button>
          </div>
          <p className="text-black-light text-xl mt-14 text-center max-w-4xl">
            <span className="text-secondary font-bold">Montex</span> it's the easiest way to add
            comments or reviews to your blog or personal website. Try it out by signing up for a
            free tier plan and use our platform to engage with your audience.
          </p>
        </div>
        <FeatureSection colorScheme="red" data={activityFeature} />
        <FeatureSection colorScheme="blue" data={toolingFeature} />
      </Container>

      <CallToAction
        title="Grow with us"
        subTitle="The platform to empower your website engagement"
        primaryBtn={["Get started", "/signup"]}
        secondaryBtn={["Learn more", "/pricing"]}
      />
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
