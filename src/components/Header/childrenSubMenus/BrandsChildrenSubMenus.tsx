"use client";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const productGroupNavOptions = [
  {
    label: "HOME",
    href: "/brand",
    imageLink: "/brand",
    baseLink: "/collections",
    params: {},

    baseCollectionTitle: "Brands",
  },

  {
    label: "READY TO WEAR",
    href: "/brand?productGroupPage=READY TO WEAR",
    imageLink: "/brand?productGroupPage=READY TO WEAR&isReadyMade=true",
    baseLink: "/collections/isReadyMade=true",
    params: {
      isReadyMade: true,
    },

    baseCollectionTitle: "Ready to Wear Brands",
  },
];

type BrandType = {
  brand: string;
  count: number;
};
const BrandsChildrenSubMenus = ({
  setHovered,
  setIsOpen,
  slideAnimate,
}: {
  setHovered: (value: string) => void;
  setIsOpen: (value: boolean) => void;
  slideAnimate: "animate-slide-right" | "animate-slide-left" | "";
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productGroupPage = searchParams.get("productGroupPage") || "HOME";

  const token = useSelector(globalSelectors.selectAuthToken);

  const imageLink =
    productGroupNavOptions.find(
      (option) => pathname === option.href || productGroupPage === option.label
    )?.imageLink || "";
  //   const [selectedMenu, setSelectedMenu] = useState<string | undefined>(
  //     undefined
  //   );
  const [isImageHovered, setIsImageHovered] = useState(false);

  const getQueryParamObject = useCallback(() => {
    let params = {};
    const found = productGroupNavOptions.find(
      (option) => pathname === option.href || productGroupPage === option.label
    );
    if (found?.params) {
      params = found.params;
    }
    return params;
  }, [pathname, productGroupPage]);
  const brandsProductsDynamicFiltersQuery =
    zeapApiSlice.useGetProductBrandsQuery(
      {
        ...getQueryParamObject(),
      },
      {
        skip: !token,
      }
    );

  const productBrands: BrandType[] =
    brandsProductsDynamicFiltersQuery.data?.data || [];

  const getSubMenuLink = (brand: string) => {
    const found = productGroupNavOptions.find(
      (option) => pathname === option.href || productGroupPage === option.label
    );
    if (!found) return "";
    const baseLink = found.baseLink || "";

    return `${baseLink}/brand=${brand}?productGroupPage=${
      productGroupPage || ""
    }&subProductGroupPage=Brands&collectionTitle=${brand || ""} Collections`;
  };

  const getImageObj = () => {
    const imgaeObj = {
      link: imageLink,
      label: "",
      collectionTitle: "ALL BRANDS",
    };
    if (pathname === "/" || productGroupPage === "HOME") {
      imgaeObj.label = "Shop All Brands";
    }
    if (pathname === "/ready-to-wear" || productGroupPage === "READY TO WEAR") {
      imgaeObj.label = "Ready to Wear Brands";
    }

    return imgaeObj;
  };
  const imageObj = getImageObj();
  return (
    <div className="flex ">
      {productBrands.length > 0 && (
        <div className={`flex   flex-col xl:flex-row gap-4 xl:gap-24 p-4 flex-col-reverse xl:flex-row-reverse ${slideAnimate}`}>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-extrabold mb-2">BRANDS</span>

            <div className="flex flex-col gap-4 xl:gap-6 xl:flex-wrap xl:max-h-[10rem] ">
              {productBrands.map((brand) => (
                <>
                  <Link
                    key={brand.brand}
                    href={getSubMenuLink(brand.brand)}
                    className=" hover:underline text-[0.8rem]"
                    prefetch={false}
                    onClick={() => {
                      setIsOpen(false);
                      setHovered("");
                    }}
                  >
                    {brand.brand}
                  </Link>
                  <hr className="xl:hidden border-b border-slate-300 mt-2  w-[calc(100vw-4rem)]" />
                </>
              ))}
            </div>
          </div>
          {imageObj && (
            <Link
              href={imageLink}
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
              <div className="min-w-[15rem] h-[15rem] rounded-lg bg-primary flex items-center justify-center text-white text-xl font-bold p-2">
                {imageObj.label.toLocaleUpperCase()}
              </div>
              <div className="flex flex-col items-center mt-2">
                {imageObj.label && (
                  <span className="text-xs font-semibold ">
                    {imageObj.label}
                  </span>
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
      )}
    </div>
  );
};

export default BrandsChildrenSubMenus;
