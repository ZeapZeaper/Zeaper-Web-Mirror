"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { productGroupNavOptions } from "@/data/content";

const ProductGroupNav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productGroupPage = searchParams.get("productGroupPage") || "HOME";
  const [hovered, setHovered] = useState("");

  const getIsActive = (href: string, label: string) => {
    if (productGroupPage === label) {
      return true;
    }
    if (pathname === href) {
      return true;
    }
    if (href === "/" && !productGroupPage) {
      return true;
    }
    return false;
  };
  return (
    <div className="flex justify-center gap-4 md:gap-8 lg:gap-4 w-full ">
      {productGroupNavOptions.map((option) => (
        <Link
          key={option.label}
          href={{
            pathname: option.href,
            query: {
              ...(option.label !== "HOME" && {
                productGroupPage: option.label,
              }),
            },
          }}
          onMouseEnter={() => setHovered(option.label)}
          onMouseLeave={() => setHovered("")}
          onClick={() => localStorage.setItem("productGroupPage", option.label)}
          className=" flex flex-col cursor-pointer "
        >
          <span className="   font-extrabold text-sm md:text-md  cursor-pointer">
            {option.label}
          </span>
          <span
            className={`${
              hovered === option.label || getIsActive(option.href, option.label)
                ? "bg-white lg:bg-primary scale-100"
                : "bg-transparent scale-0"
            } h-1 w-full transition-all duration-500 ease-in-out`}
          ></span>
        </Link>
      ))}
    </div>
  );
};

export default ProductGroupNav;
