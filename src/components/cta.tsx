// components
import Container from "@components/ui/contaienr";
import Button from "./ui/button";
import Link from "./ui/link";

export default function CallToAction() {
  return (
    <div className="bg-gray-100">
      <Container>
        <div className="py-12 lg:py-16 lg:flex lg:items-center lg:justify-between">
          <h2 className="font-extrabold tracking-tight">
            <span className="block sm:text-6xl text-4xl text-secondary">Grow with us</span>
            <span className="block text-2xl font-medium text-black-light mt-5">
              The platform to empower your website engagement
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button
                as={Link}
                href="/signup"
                variant="slim"
                className="flex justify-center items-center bg-black-normal text-white-normal hover:bg-black-light hover:text-gray-50 font-semibold h-12 px-7"
              >
                Get started
              </Button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Button
                as={Link}
                href="/pricing"
                variant="slim"
                className="flex justify-center items-center font-semibold h-12 px-7 text-gray-800 border border-gray-800 hover:text-secondary hover:border-secondary"
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
