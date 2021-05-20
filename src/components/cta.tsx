// packages
import cn from "classnames";
// components
import Container from "@components/ui/container";
import Button from "./ui/button";
import Link from "./ui/link";
// types
import type { ReactNode } from "react";

enum Scheme {
  default,
  blue,
  red,
}

type ButtonOption = [label: string, path: string];

export interface CallToActionProps {
  title: string;
  subTitle?: string;
  primaryBtn: ButtonOption;
  secondaryBtn?: ButtonOption;
  colorScheme?: keyof typeof Scheme;
  children?: ReactNode;
}

export default function CallToAction({
  title,
  subTitle,
  primaryBtn,
  secondaryBtn,
  colorScheme = "default",
}: CallToActionProps): JSX.Element {
  const backgroundClass = cn({
    "bg-gray-100": colorScheme === "default",
    "bg-blue-600": colorScheme === "blue",
    "bg-secondary": colorScheme === "red",
  });

  const titleClass = cn("block sm:text-6xl text-4xl", {
    "text-secondary": colorScheme === "default",
    "text-white-normal": colorScheme === "blue",
    "text-black-light": colorScheme === "red",
  });

  const subTitleClass = cn("block text-2xl font-medium mt-5", {
    "text-black-light": colorScheme === "default",
    "text-gray-100": colorScheme === "blue",
    "text-gray-700": colorScheme === "red",
  });

  return (
    <section className={backgroundClass}>
      <Container>
        <div className="py-12 lg:py-16 lg:flex lg:items-center lg:justify-between">
          <h2 className="font-extrabold tracking-tight">
            <span className={titleClass}>{title}</span>
            <span className={subTitleClass}>{subTitle}</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <Button
              as={Link}
              href={primaryBtn[1]}
              variant={colorScheme === "red" ? "secondary" : "primary"}
              className="flex justify-center items-center h-12 px-7"
            >
              {primaryBtn[0]}
            </Button>

            {secondaryBtn && (
              <Button
                as={Link}
                href={secondaryBtn[1]}
                variant="outlined"
                className="flex justify-center items-center h-12 px-7 ml-3"
              >
                {secondaryBtn[0]}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
