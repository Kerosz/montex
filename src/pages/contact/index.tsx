// components
import BaseLayout from "@components/layouts/base";
import Accordion from "@components/ui/accordion";
import Container from "@components/ui/container";
import ContactCard from "@components/contact/contact-card";
// data
import cards from "@data/contact";
import faq from "@data/pricing/faq";
import CallToAction from "@components/cta";

export default function ContactPage() {
  return (
    <BaseLayout title="Contact" navbarProps={{ withBorder: true }}>
      <section className="bg-gray-50">
        <Container className="py-20 flex flex-col items-center">
          <h1 className="text-[4.8rem] font-bold pb-5">We are here to help</h1>
          <p className="text-2xl text-gray-500 pb-20">
            Get in touch and let us know how we can assist you
          </p>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            {cards.map((entry) => (
              <ContactCard
                key={entry.title}
                title={entry.title}
                subTitle={entry.subTitle}
                icon={entry.icon}
                button={entry.cta as [label: string, path: string]}
                colorScheme={entry.scheme}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-gray-200">
        <Container>
          <h2 className="sm:text-4xl text-3xl text-black-normal text-center font-bold mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion data={faq} />
        </Container>
      </section>

      <CallToAction
        title="Grow with us"
        subTitle="The platform to empower your website engagement"
        primaryBtn={["Get started", "/signup"]}
        secondaryBtn={["Learn more", "/pricing"]}
      />
    </BaseLayout>
  );
}
