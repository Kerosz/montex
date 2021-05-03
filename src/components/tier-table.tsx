// packages
import cn from "classnames";
import { ArrowNarrowRightIcon, MinusSmIcon } from "@heroicons/react/solid";
// components
import List from "@/components/ui/list";
import Button from "@/components/ui/button";
import Link from "@components/ui/link";
// types
import type { ReactNode } from "react";

enum ColorScheme {
  black,
  green,
  gray,
  purple,
}

export interface TierTableProps {
  children?: ReactNode;
  custom?: ReactNode;
}

export interface OptionProps {
  title: string;
  subTitle: string;
  price?: string | number;
  customPrice?: string | number;
  featureData: Array<string>;
  buttonLabel: string;
  buttonLink: string;
  colorScheme?: keyof typeof ColorScheme;
}

export default function TierTable({ children, custom }: TierTableProps) {
  return (
    <div className="flex xl:flex-row flex-col mt-20">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 bg-gray-100 rounded-md shadow flex-grow">
        {children}
      </div>
      <div className="flex w-full xl:max-w-sm xl:ml-6 shadow-xl mt-5 xl:mt-0">{custom}</div>
    </div>
  );
}

TierTable.Option = function ({
  title,
  subTitle,
  price,
  customPrice,
  featureData,
  buttonLabel,
  buttonLink,
  colorScheme = "black",
}: OptionProps) {
  const panelColor = cn("rounded-md py-4 px-5 w-full", {
    "bg-black-normal": colorScheme === "black",
    "bg-green-400": colorScheme === "green",
    "bg-purple-400": colorScheme === "purple",
    "bg-gray-400": colorScheme === "gray",
  });
  const buttonColor = cn("py-3.5 w-full flex px-4 items-center mt-10 text-lg", {
    "bg-black-normal text-gray-50 hover:border-gray-300 hover:text-gray-200 hover:shadow-lg":
      colorScheme === "black",
    "bg-green-400 text-white-normal hover:border-gray-300 hover:text-gray-100 hover:shadow-lg":
      colorScheme === "green",
    "bg-purple-400 text-white-normal hover:border-gray-300 hover:shadow-lg hover:text-gray-100":
      colorScheme === "purple",
    "bg-gray-400 text-white-normal hover:border-gray-300 hover:shadow-lg hover:text-gray-100":
      colorScheme === "gray",
  });

  return (
    <div className="row-span-1 p-4 flex flex-col items-center w-full">
      <Button variant="slim" as={Link} href={buttonLink} className={panelColor}>
        <h2 className="text-gray-50 text-2xl font-semibold">{title}</h2>
        <p className="mt-1.5 text-gray-50 text-lg font-semibold">{subTitle}</p>
      </Button>

      <h3 className="text-3xl text-gray-600 my-7">
        {!customPrice ? (
          <>
            <span className="text-4xl font-bold text-gray-800">${price}</span>/mo
          </>
        ) : (
          customPrice
        )}
      </h3>

      <List
        data={featureData}
        customIcon={MinusSmIcon}
        title="Features"
        titleClass="text-xl"
        listClass="text-lg"
      />

      <Button as={Link} href={buttonLink} variant="slim" className={buttonColor}>
        {buttonLabel}
        <ArrowNarrowRightIcon className="w-5 text-gray-50 ml-1.5 mt-1" />
      </Button>
    </div>
  );
};
