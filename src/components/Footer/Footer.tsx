import Link from "next/link";
import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { MdCopyright } from "react-icons/md";

import { footerData } from "@/data/content";

import Subscribe from "./Subscribe";
const socialMediaLinks = [
  {
    name: "X Twitter",
    href: "https://x.com/officialzeaper?t=269UtqV0o2U7KQjbama2VA&s=09",
    icon: FaXTwitter,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/zona-empire-partners-ltd-zeap/",
    icon: BsLinkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/officialzeaper?igsh=MXRmc3FmM2IwMHAyMg==",
    icon: BsInstagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/19up8Gitkb/",
    icon: BsFacebook,
  },
];

const Footer: React.FC = () => {
  return (
    <div>
      <div className="z-50">
        <div className=" bg-primary text-white">
          <div className="grid gap-10 divide-x divide-neutral-500 lg:grid-cols-2 lg:gap-0">
            <div className="grid gap-y-10 px-10 pb-5 pt-16 grid-cols-2 md:grid-cols-3">
              {footerData.footerLinks.map((item) => (
                <div key={item.title} className="space-y-5">
                  <h4 className="text-2xl font-medium">{item.title}</h4>
                  {item.links.map((link) => (
                    <div key={link.name}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                      >
                        {link.name}
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex items-center gap-5">
                {socialMediaLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    className="text-2xl hover:text-gray-300"
                  >
                    <item.icon />
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center p-5 md:p-20">
              <Subscribe />
            </div>
          </div>
          <div className="h-px w-full bg-neutral-500" />
          <div className="flex flex-col items-center justify-between gap-3 px-10 py-5 md:flex-row md:gap-0">
            <div className="flex items-center gap-1 text-sm md:text-base">
              <MdCopyright /> <span>2025 Zeaper. All rights reserved</span>
            </div>

            <div className="flex items-center gap-5">
              <Link
                href="https://admin.zeaper.com/docs/Zeaper_Policy.pdf"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
