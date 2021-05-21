// components
import BaseLayout from "@components/layouts/base";
import Container from "@components/ui/container";
import SalesInformation from "@components/contact/sales-information";
import SalesForm from "@components/contact/sales-form";
import CallToAction from "@components/cta";

export default function SalesPage() {
  return (
    <BaseLayout title="Contact - Sales" navbarProps={{ withBorder: true }}>
      <section className="bg-gray-50">
        <Container className="py-24 pt-28 flex flex-col">
          <h1 className="text-6xl font-bold text-gray-800 pb-5">Contact our team</h1>
          <p className="text-2xl text-gray-500">Tell us about how we can accommodate your needs.</p>

          <section className="md:grid lg:grid-cols-9 md:grid-cols-10 flex flex-col-reverse lg:gap-24 gap-8 pt-20">
            <div className="col-span-4 flex flex-col">
              <SalesInformation />
            </div>
            <div className="lg:col-span-5 col-span-6 md:border-l md:border-gray-400 flex justify-center">
              <SalesForm />
            </div>
          </section>
        </Container>
      </section>
    </BaseLayout>
  );
}
