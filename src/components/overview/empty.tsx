// types
import type { ReactNode } from "react";

export interface EmptyProps {
  addButton: ReactNode;
  children?: ReactNode;
}

export default function Empty({ addButton }: EmptyProps) {
  return (
    <div className="bg-white-normal flex flex-col items-center rounded shadow-md py-14">
      <h2 className="text-2xl font-semibold text-black-normal">
        Get activity on your website instantly
      </h2>
      <p className="text-black-normal text-lg mt-1.5">
        Start today, then grow with us
      </p>

      {addButton}
    </div>
  );
}
