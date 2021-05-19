import BaseLayout from "@components/layouts/base";
import Container from "@components/ui/container";

export default function DocsPage() {
  return (
    <BaseLayout title="Docs" navbarProps={{ withBorder: true }}>
      <Container>
        <h2 className="text-3xl font-bold py-10">
          Form TBA <em>( needs implementation )</em>
        </h2>
      </Container>
    </BaseLayout>
  );
}
