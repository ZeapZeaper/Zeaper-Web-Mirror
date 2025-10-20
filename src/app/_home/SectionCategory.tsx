import { slideCategories } from "@/data/content";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const SectionCategory = () => {
  return (
    <div className="grid grid-cols-2  md:grid-cols-4 gap-4 md:mt-10">
      {slideCategories.slice(0, 4).map((item) => (
        <Link
          key={item.title}
          href={`${item.link}`}
          className="relative mt-10 md:mt-0 lg:mt-10 flex h-[130px] md:h-[80px] lg:h-[120px] 2xl:h-[240px] w-full items-center justify-center rounded-2xl bg-secondary hover:bg-lightGold transition-all duration-300 ease-in-out cursor-pointer"
        >
          <Image
            src={item.coverImage}
            alt={item.title}
            className="absolute bottom-0 mx-auto w-[80%] object-cover md:w-[60%]"
            width={500}
            height={500}
          />
          <div className="absolute bottom-0 left-0 right-0  flex items-center justify-center bg-black/50  rounded-2xl">
            <h4 className="text-white text-xl font-bold">{item.title}</h4>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SectionCategory;
