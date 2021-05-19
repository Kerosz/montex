// components
import BaseLayout from "@components/layouts/base";
import Container from "@components/ui/container";

export default function SalesPage() {
  return (
    <BaseLayout title="Contact - Sales" navbarProps={{ withBorder: true }}>
      <section className="bg-gray-50">
        <Container className="py-24 pt-28 flex flex-col">
          <h1 className="text-6xl font-bold pb-5">Contact sales team</h1>
          <p className="text-2xl text-gray-500">Tell us about how we can accommodate your needs.</p>

          <h2 className="text-3xl font-bold py-10">
            Form TBA <em>( needs implementation )</em>
          </h2>
        </Container>
      </section>
    </BaseLayout>
  );
}
