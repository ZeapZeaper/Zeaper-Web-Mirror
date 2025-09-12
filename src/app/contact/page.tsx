import Link from "next/link";
import React from "react";

import { contactSection } from "@/data/content";
import ButtonCircle3 from "@/shared/Button/ButtonCircle3";
import Heading from "@/shared/Heading/Heading";

const page = () => {
  return (
    <div className="container">
      
      <div className="mt-20">
        <Heading desc={contactSection.description} isMain isCenter>
          {contactSection.heading}
        </Heading>
      </div>

      <div className="mb-10 text-center">
        <p className="text-info">{contactSection.subDescription}</p>
      </div>

      <div className="mb-32">
        <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {contactSection.directContactInfo.map((info) => (
            <div
              key={info.title}
              className="flex flex-col items-center justify-center gap-2"
            >
              <ButtonCircle3 className="text-primary" size="w-10 h-10">
                {info.icon}
              </ButtonCircle3>

              <h2 className="text-2xl font-medium">{info.title}</h2>
              <div className="flex flex-col items-center gap-2">
                {info?.contactLinks?.map(
                  (link: { href: string; title: string; flag?: string }) => (
                    <Link
                      key={link.title}
                      className="text-info hover:text-primary"
                      href={link.href}
                    >
                      {link?.flag} {link.title}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
