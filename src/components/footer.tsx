// packages
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
// components
import Container from "@components/ui/container";
import Link from "@components/ui/link";
import List from "@components/ui/list";
import Select from "@components/ui/select";
import { Github, Twitter } from "./icons";
// data
import companyList from "@data/footer/company";
import devList from "@data/footer/developers";
import legalList from "@data/footer/legal";
import languageList from "@data/footer/language";
import themeList from "@data/footer/theme";

export default function Footer() {
  const [languageState, setLanguage] = useState(languageList[0]);
  const [themeState, setTheme] = useState(themeList[0]);

  return (
    <footer>
      <div className="border-t border-b border-gray-200 py-16">
        <Container>
          <div className="flex md:flex-row flex-col xl:space-x-20 lg:space-x-14 md:space-x-8">
            <div className="flex flex-col xl:max-w-sm md:max-w-xs max-w-sm">
              <Link href="/" title="Montex Branding" fixPosition>
                <Image src="/images/logo-full.png" width={131} height={25} />
              </Link>

              <p className="text-lg mt-4 text-gray-600">
                The easiest way to add comments or reviews to your blog or personal website.
              </p>

              <div className="flex flex-wrap">
                <Select
                  title="Language"
                  data={languageList}
                  selected={languageState}
                  setSelected={setLanguage}
                  className="mr-5 mt-4"
                />
                <Select
                  title="Theme"
                  data={themeList}
                  selected={themeState}
                  setSelected={setTheme}
                  className="mt-4"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 grid-cols-1 md:gap-7 sm:gap-16 gap-8 w-full md:mt-0 sm:mt-10 mt-8">
              <List title="Company" data={companyList} listItemProps={{ withSpace: false }} />
              <List title="Developers" data={devList} listItemProps={{ withSpace: false }} />
              <List title="Legal" data={legalList} listItemProps={{ withSpace: false }} />
            </div>
          </div>
        </Container>
      </div>

      <div className="py-6 bg-gray-100">
        <Container className="flex sm:flex-row flex-col-reverse justify-between">
          <p className="text-gray-500 sm:mt-0 mt-4">
            ©{format(Date.now(), "yyyy")} Montex® - All Rights Reserved.
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
