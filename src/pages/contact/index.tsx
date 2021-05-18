// components
import BaseLayout from "@components/layouts/base";
import Container from "@components/ui/container";
import ContactCard from "@components/contact-card";
// data
import cards from "@data/contact";

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
    </BaseLayout>
  );
}
