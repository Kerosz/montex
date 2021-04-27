// packages
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// components
import Container from "@components/ui/contaienr";
import Link from "@components/ui/link";
import Button from "@/components/ui/button";
// context
import { useAuth } from "@/context/auth";

export default function Signup(): JSX.Element {
  const router = useRouter();
  const { user, signInWithGithub, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user]);

  return (
    <div className="min-h-screen relative py-10">
      <div
        className="absolute h-full w-1/2 top-0 left-0 z-0 bg-gray-50 border-r border-gray-200"
        aria-hidden
      />
      <Container>
        <Link href="/" title="Montex branding">
          <Image src="/images/logo-full.png" width={168} height={32} />
        </Link>
        <div className="grid grid-cols-2 mt-5">
          <div className="z-10">asdadasda</div>
          <div className="flex flex-col pl-14 max-w-sm">
            <h2 className="text-5xl font-semibold" style={{ lineHeight: 1.15 }}>
              Join the most epic platform
            </h2>
            <div className="w-full mt-14 space-y-4">
              <Button
                className="w-full py-2.5 flex justify-center items-center"
                onClick={signInWithGithub}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 14 14"
                  focusable="false"
                  role="presentation"
                  aria-label="github"
                  className="mr-2"
                >
                  <path
                    d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                    fill="currentColor"
                    fillRule="nonzero"
                  ></path>
                </svg>
                Continue with Github
              </Button>
              <Button
                variant="secondary"
                className="w-full py-2.5 flex justify-center items-center bg-gray-50"
                onClick={signInWithGoogle}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 533.5 544.3"
                  focusable="false"
                  role="presentation"
                  aria-label="google"
                  className="mr-2"
                >
                  <g>
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    ></path>
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    ></path>
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    ></path>
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    ></path>
                  </g>
                </svg>
                Continue with Google
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
