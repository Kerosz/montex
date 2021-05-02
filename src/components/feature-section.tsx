// types
import { Component } from "@/types";

type Data = {
  caption: string;
  title: string;
  description: string;
  list: Array<{
    name: string;
    description: string;
    icon: Component;
  }>;
};

export interface FeatureSectionProps {
  data: Data;
  color?: string;
}

export default function FeatureSection({ color = "black-normal", data }: FeatureSectionProps) {
  return (
    <section className="py-12 lg:py-16 max-w-5xl mx-auto">
      <div className="lg:text-center lg:flex lg:flex-col lg:items-center">
        <p className={`text-${color} font-semibold tracking-wider uppercase`}>{data.caption}</p>
        <span
          className={`block h-24 opacity-75 border-r-4 border-dotted border-${color} mt-2.5`}
          style={{ width: "2px" }}
          aria-hidden
        />
        <h2 className="mt-4 text-4xl leading-8 font-extrabold tracking-tight text-black-normal sm:text-5xl">
          {data.title}
        </h2>
        <p className="mt-6 max-w-2xl text-xl text-gray-500 lg:mx-auto">{data.description}</p>
      </div>

      <div className="mt-24">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-14">
          {data.list.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <div
                  className={`absolute flex items-center justify-center h-14 w-14 border-dashed border rounded-md border-${color} text-${color}`}
                >
                  <feature.icon className="h-7 w-7 opacity-80" aria-hidden="true" />
                </div>
                <p className="ml-20 text-lg leading-6 font-semibold text-gray-900">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 ml-20 text-base text-gray-500">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
