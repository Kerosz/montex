// components
import BaseLayout from "@components/layouts/base";
import Container from "@components/ui/container";
import PartnerBenefits from "@components/contact/partner-benefits";
import PartnerForm from "@components/contact/partner-form";

export default function PartnersPage() {
  return (
    <BaseLayout title="Become a Partner">
      <Container>
        <section className="flex flex-col items-center py-20 pt-24">
          <h1 className="text-5xl font-bold pb-8">
            Join Montex <span>Partner</span> Program
          </h1>
          <p className="text-2xl text-gray-500 md:text-center lg:w-4/5">
            Become a Montex Partner to accelerate your growth, engage and connect with your
            audience, and empower your community as we develop stronger bonds together.
          </p>
        </section>

        <PartnerBenefits />
        <PartnerForm />
      </Container>
    </BaseLayout>
  );
}
