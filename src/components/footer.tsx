// packages
import Image from "next/image";
import { format } from "date-fns";
// components
import Container from "@components/ui/contaienr";
import Link from "@components/ui/link";
import List from "@components/ui/list";
import Select from "@components/ui/select";
import { Github, Twitter } from "./icons";
// data
import companyList from "@data/footer/company";
import devList from "@data/footer/developers";
import legalList from "@data/footer/legal";

export default function Footer() {
  return (
    <footer>
      <div className="border-t border-b border-gray-200 py-16">
        <Container>
          <div className="grid grid-cols-5 gap-10">
            <div className="flex flex-col col-span-2 w-11/12">
              <Link href="/" title="Montex Branding" fixPosition>
                <Image src="/images/logo-full.png" width={131} height={25} />
              </Link>

              <p className="text-lg my-4 text-gray-600">
                The easiest way to add comments or reviews to your blog or personal website.
              </p>

              <Select />
            </div>

            <List title="Company" data={companyList} withSpace={false} />
            <List title="Developers" data={devList} withSpace={false} />
            <List title="Legal" data={legalList} withSpace={false} />
          </div>
        </Container>
      </div>

      <div className="py-6 bg-gray-100">
        <Container className="flex justify-between">
          <p className="text-gray-500">
            ©{format(Date.now(), "yyyy")} Montex® Inc. All Rights Reserved.
          </p>

          <div className="flex space-x-5">
            <Link href="https://github.com/Kerosz/montex" external>
              <Github className="text-gray-400 hover:text-gray-600" />
            </Link>
            <Link href="https://twitter.com/chirila_" external>
              <Twitter className="text-gray-400 hover:text-gray-600" />
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
