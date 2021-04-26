// packages
import Link from "next/link";
// components
import Button from "@components/ui/button";
import Container from "@components/ui/contaienr";
// context
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { isDefined } from "@/helpers/assertions";

export default function Navbar(): JSX.Element {
  const { user } = useAuth();
  const [showBorderState, setShowBorder] = useState<boolean>(false);

  const handleBorder = () => {
    if (window.scrollY >= 10) {
      setShowBorder(true);
    } else {
      setShowBorder(false);
    }
  };

  useEffect(() => {
    if (isDefined(window)) {
      window.addEventListener("scroll", handleBorder);

      return () => {
        window.removeEventListener("scroll", handleBorder);
      };
    }
  }, []);

  return (
    <header
      className={`h-16 sticky top-0 z-40 bg-white-faded ${
        showBorderState && "border-b border-gray-200"
      }`}
    >
      <Container
        as="nav"
        className="w-full h-full flex justify-between items-center z-20"
      >
        <h1>Montex</h1>
        <div className="space-x-6">
          <Link href="/login" passHref>
            <Button as="a" variant="secondary" className="py-1.5 px-4">
              Login
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button as="a" className="py-1.5 px-4">
              Sign up
            </Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}
