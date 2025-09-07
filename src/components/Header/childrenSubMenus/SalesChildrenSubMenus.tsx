"use client";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { PromoInterface } from "@/interface/interface";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const productGroupNavOptions = [
  {
    label: "HOME",
    href: "/sales",
    imageLink: "/sales",
    baseLink: "/promo",
    params: {},

    baseCollectionTitle: "Sales",
  },

  {
    label: "READY TO WEAR",
    href: "/sales?productGroupPage=READY TO WEAR",
    imageLink: "/sales?productGroupPage=READY TO WEAR",
    baseLink: "/promo",
    params: {
      permittedProductTypes: "readyMadeCloth,readyMadeShoe",
    },

    baseCollectionTitle: "Ready to Wear Sales",
  },
  {
    label: "BESPOKE",
    href: "/sales?productGroupPage=BESPOKE",
    imageLink: "/sales?productGroupPage=BESPOKE",
    baseLink: "/promo",
    params: {
      permittedProductTypes: "bespokeCloth,bespokeShoe",
    },

    baseCollectionTitle: "Bespoke Sales",
  },
  {
    label: "ACCESSORIES",
    href: "/sales?productGroupPage=ACCESSORIES",
    imageLink: "/sales?productGroupPage=ACCESSORIES",
    baseLink: "/promo",
    params: {
      permittedProductTypes: "accessory",
    },

    baseCollectionTitle: "Accessory Sales",
  },
];

const SalesChildrenSubMenus = ({
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
  const salesProductsDynamicFiltersQuery = zeapApiSlice.useGetPromosQuery(
    {
      ...getQueryParamObject(),
    },
    {
      skip: !token,
    }
  );

  const productSales: PromoInterface[] =
    salesProductsDynamicFiltersQuery.data?.data || [];

  const getSubMenuLink = (sale: string) => {
    const found = productGroupNavOptions.find(
      (option) => pathname === option.href || productGroupPage === option.label
    );
    if (!found) return "";
    const baseLink = found.baseLink || "";

    return `${baseLink}/${sale}?productGroupPage=${
      productGroupPage || ""
    }&subProductGroupPage=Sales&collectionTitle=${sale || ""} Collections`;
  };

  const getImageObj = () => {
    const imgaeObj = {
      link: imageLink,
      label: "",
      collectionTitle: "ALL SALES",
    };
    if (pathname === "/" || productGroupPage === "HOME") {
      imgaeObj.label = "All Sales";
    }
    if (pathname === "/ready-to-wear" || productGroupPage === "READY TO WEAR") {
      imgaeObj.label = "Ready to Wear Sales";
    }
    if (pathname === "/bespoke" || productGroupPage === "BESPOKE") {
      imgaeObj.label = "Bespoke Sales";
    }
    if (pathname === "/accessories" || productGroupPage === "ACCESSORIES") {
      imgaeObj.label = "Accessory Sales";
    }

    return imgaeObj;
  };
  const imageObj = getImageObj();
  return (
    <div className="flex ">
      {productSales.length > 0 && (
        <div className={`flex   flex-col xl:flex-row gap-4 xl:gap-24 p-4 flex-col-reverse xl:flex-row-reverse ${slideAnimate}`}>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-extrabold mb-2">SALES</span>

            <div className="flex flex-col gap-4 xl:gap-6 xl:flex-wrap xl:max-h-[10rem] ">
              {productSales.map((sale) => (
                <>
                  {" "}
                  <Link
                    key={sale.promoId}
                    href={getSubMenuLink(sale.promoId)}
                    className=" hover:underline text-[0.8rem]"
                    prefetch={false}
                    onClick={() => {
                      setIsOpen(false);
                      setHovered("");
                    }}
                  >
                    {sale.title}
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
              <div className="w-[15rem] h-[15rem] rounded-lg bg-gold flex items-center justify-center text-white text-xl font-bold">
                {imageObj.label.toLocaleUpperCase()}
              </div>
              <div className="flex flex-col items-center mt-2">
                {imageObj.label && (
                  <span className="text-xs font-semibold ">
                    Shop {imageObj.label}
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

export default SalesChildrenSubMenus;
