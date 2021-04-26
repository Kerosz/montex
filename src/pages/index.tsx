// packages
import Head from "next/head";
import Link from "next/link";
// components
import BaseLayout from "@components/layouts/base";
import Container from "@components/ui/contaienr";
import Button from "@/components/ui/button";

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Commentry</title>
      </Head>
      <BaseLayout>
        <Container>
          <div className="flex flex-col pt-10 pb-6 items-center">
            <Heading title="Add." />
            <Heading title="Embed." />
            <Heading title="Comment." />
            <div className="space-x-5 mt-16">
              <Link href="/signup" passHref>
                <Button
                  as="a"
                  className="text-lg border border-black-normal hover:border-black-light py-2.5 px-9"
                >
                  Get Started
                </Button>
              </Link>

              <Button className="py-2.5 px-9 text-lg" variant="secondary">
                Learn More
              </Button>
            </div>
            <p className="text-black-light text-xl mt-14 text-center max-w-4xl">
              <span className="text-black-normal font-bold">Montex</span> it's
              the easiest way to add comments or reviews to your blog or
              personal web application. Try it out by signing up for a free tier
              plan and use our platform for up to 3 domains.
            </p>
          </div>
        </Container>
      </BaseLayout>
    </div>
  );
}

function Heading(props: { title: string }): JSX.Element {
  return (
    <span
      className="font-extrabold"
      style={{ fontSize: "8.8rem", lineHeight: "1.05" }}
    >
      {props.title}
    </span>
  );
}
