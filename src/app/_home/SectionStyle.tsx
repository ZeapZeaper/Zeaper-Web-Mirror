"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { FaStarOfLife } from "react-icons/fa";

import { signUpSection } from "@/data/content";
import pic from "@/images/black_woman.png";

import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Heading from "@/shared/Heading/Heading";
import { AuthContext } from "@/contexts/authContext";
import Link from "next/link";

const SectionStyle = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container ">
      <Heading className="lg:mb-5 max-w-3xl" showDash>
        {signUpSection.heading}
      </Heading>

      <div className="grid gap-5 lg:grid-cols-2">
        {!user || user?.isGuest ? (
          <div className="items-stretch gap-5 lg:flex">
            <div className="basis-[60%]">
              <div className="h-5 w-full lg:h-[250px]" />

              <div className="space-y-5 rounded-2xl bg-primary p-5 text-white">
                <Link href="/account/login">
                  <ButtonSecondary className="border-2 border-white bg-transparent text-white">
                    Sign Up
                  </ButtonSecondary>
                </Link>
                <h2 className="text-2xl md:text-4xl font-medium">
                  {signUpSection.promoTitle}
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="items-stretch gap-5 lg:flex text-center">
            <div className="basis-[60%]">
              <div className="h-5 w-full lg:h-[250px]" />

              <div className="space-y-5 rounded-2xl bg-primary p-5 text-white">
                <h2 className="text-3xl font-medium">
                  Shop and earn points with every purchase
                </h2>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-10 md:pt-40 lg:pt-0 ">
          <div className="relative flex h-[350px] w-full items-center justify-center rounded-2xl bg-secondary">
            <Image
              src={pic}
              alt="pic"
              className="absolute bottom-0 mx-auto w-[80%] object-cover md:w-[60%]"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center md:flex">
              <FaStarOfLife className="text-4xl text-primary" />
              <div className="h-px w-24 bg-primary" />
            </div>
            <div className="space-y-5">
              <p className="text-xl font-medium">
                {signUpSection.review.quote}
              </p>
              <p className="text-lg font-medium text-primary">
                - {signUpSection.review.reviewer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionStyle;
