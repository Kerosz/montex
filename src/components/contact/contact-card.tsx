// packages
import cn from "classnames";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
// components
import Button from "@components/ui/button";
import Link from "@components/ui/link";
// types
import type { ComponentPropsWithoutRef, ReactNode, SVGProps } from "react";

enum Scheme {
  blue,
  purple,
  black,
  red,
  yellow,
}

export interface ContactCardProps extends ComponentPropsWithoutRef<"div"> {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  subTitle: string;
  button: [label: string, path: string];
  colorScheme: keyof typeof Scheme;
  children?: ReactNode;
}

export default function ContactCard({
  title,
  icon,
  subTitle,
  button,
  colorScheme = "black",
  ...rest
}: ContactCardProps): JSX.Element {
  const iconBackgroundClass = cn("rounded-full p-6 max-w-max my-8", {
    "bg-blue-600": colorScheme === "blue",
    "bg-yellow-600": colorScheme === "yellow",
    "bg-purple-600": colorScheme === "purple",
    "bg-secondary": colorScheme === "red",
    "bg-black-normal": colorScheme === "black",
  });

  const buttonClass = cn(
    "py-3.5 w-full flex px-4 items-center justify-center text-lg rounded-md hover:underline",
    {
      "bg-black-normal text-gray-50 hover:border-gray-300 hover:text-gray-200 hover:shadow-lg":
        colorScheme === "black",
      "bg-yellow-600 text-gray-700 hover:border-gray-300 hover:text-gray-600 hover:shadow-lg":
        colorScheme === "yellow",
      "bg-purple-600 text-white-normal hover:border-gray-300 hover:shadow-lg hover:text-gray-100":
        colorScheme === "purple",
      "bg-blue-600 text-white-normal hover:border-gray-300 hover:shadow-lg hover:text-gray-100":
        colorScheme === "blue",
      "bg-secondary text-white-normal hover:border-gray-300 hover:shadow-lg hover:text-gray-50":
        colorScheme === "red",
    }
  );

  const IconEl = icon;
  return (
    <div
      className="col-span-1 bg-white-normal rounded-md shadow-lg p-7 flex flex-col items-center"
      {...rest}
    >
      <div className="flex flex-col items-center flex-grow" hidden aria-hidden>
        <div className={iconBackgroundClass}>
          <IconEl className="w-10 text-white-normal" />
        </div>
        <h2 className="text-4xl font-extrabold pb-5 text-center">{title}</h2>
        <p className="text-lg text-gray-700 text-center pb-12">{subTitle}</p>
      </div>
      <Button as={Link} href={button[1]} variant="slim" className={buttonClass} reset>
        {button[0]}
        <ArrowNarrowRightIcon className="w-5 ml-3 mt-0.5" />
      </Button>
    </div>
  );
}
