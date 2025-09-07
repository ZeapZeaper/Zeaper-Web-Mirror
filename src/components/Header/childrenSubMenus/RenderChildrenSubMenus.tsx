"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SupMenuOption {
  name: string;
  options: { label: string; link: string; collectionTitle: string }[];
}
type imageObjectType = {
  src: StaticImageData | string | undefined;
  link: string;
  label?: string;
  collectionTitle?: string;
};

const RenderChildrenSubMenus = ({
  childrenSubMenus = [],
  imageObj = {
    src: "",
    link: "",
    label: undefined,
  },
  setHovered,
  setIsOpen,
  subProductGroupPage,
  productGroupPage,
  slideAnimate,
}: {
  childrenSubMenus: SupMenuOption[] | [];
  imageObj: imageObjectType;
  setHovered: (value: string) => void;
  setIsOpen: (value: boolean) => void;
  subProductGroupPage: string;
  productGroupPage: string;
  slideAnimate: "animate-slide-right" | "animate-slide-left" | "";
}) => {
  const filteredChildrenSubMenus =
    childrenSubMenus.filter((subMenu) => subMenu.options.length > 0) || [];

  const [isImageHovered, setIsImageHovered] = useState(false);
  const formatName = (name: string) => {
    if (name === "Accessory Type") {
      return "ACCESSORY";
    }
    if (name === "Main") {
      return "CATEGORY";
    }
    return name.toUpperCase();
  };
  return (
    <div className={`flex flex-col xl:flex-row   gap-4 xl:gap-24 p-4 flex-col-reverse xl:flex-row-reverse ${slideAnimate}`}>
      <div className="flex flex-col  xl:flex-row  gap-8 xl:gap-24 p-4  ">
        {filteredChildrenSubMenus.map((subMenu, index) => (
          <div key={index} className="flex flex-col">
            <p className="text-xs font-extrabold mb-2">
              {formatName(subMenu.name)}
            </p>
            <ul className="list-none p-0 m-0  flex flex-col flex-wrap  xl:gap-x-12 infinite-scroll overflow-auto">
              {subMenu.options.map((option, idx) => (
                <li
                  key={idx}
                  className="mb-1"
                  onClick={() => {
                    setHovered("");

                    setIsOpen(false);
                  }}
                >
                  {option.link && (
                    <Link
                      href={`${option.link}?productGroupPage=${
                        productGroupPage || ""
                      }&subProductGroupPage=${subProductGroupPage}&collectionTitle=${
                        option.collectionTitle || ""
                      }`}
                      className="hover:underline text-[0.8rem]"
                    >
                      {option.label}
                    </Link>
                  )}
                  <hr className="xl:hidden border-b border-slate-300 mt-2  w-[calc(100vw-4rem)]" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {imageObj && imageObj?.src && (
        <Link
          href={`${imageObj.link}?productGroupPage=${
            productGroupPage || ""
          }&subProductGroupPage=${subProductGroupPage}&collectionTitle=${
            imageObj.collectionTitle || ""
          }`}
          // href={`${"/collections/parameters1=dress/parameters2=bottom top"}?productGroupPage=${
          //   productGroupPage || ""
          // }&subProductGroupPage=${subProductGroupPage}&collectionTitle=${
          //   imageObj.collectionTitle || ""
          // }`}
          className="flex flex-col items-center justify-center cursor-pointer"
          prefetch={false}
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
          onClick={() => {
            setHovered("");
            setIsOpen(false);
          }}
        >
          <Image
            src={imageObj.src}
            alt={imageObj.label || "Category Image"}
            width={300}
            height={300}
            // layout="responsive"
            className="object-cover w-[15rem] h-[15rem] rounded-lg"
          />
          <div className="flex flex-col items-center mt-2">
            {imageObj.label && (
              <span className="text-xs font-semibold ">{imageObj.label}</span>
            )}
            <span
              className={`${
                isImageHovered
                  ? "bg-primary scale-100"
                  : "bg-transparent scale-0"
              } h-1 w-full transition-all duration-500 ease-in-out`}
            ></span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default RenderChildrenSubMenus;
