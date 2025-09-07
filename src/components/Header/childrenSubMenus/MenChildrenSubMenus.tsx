"use client";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import RenderChildrenSubMenus from "./RenderChildrenSubMenus";
import BespokeImage from "@/images/men_suit_1.webp";

import HomeImage from "@/images/men_image_2.webp";
import ReadyImage from "@/images/men_1.webp";
import AccessImage from "@/images/mens-black-hat.webp";
import { usePathname, useSearchParams } from "next/navigation";
import pluralize from "pluralize";

const productGroupNavOptions = [
  {
    label: "HOME",
    href: "/",
    imageLink: "/collections/gender=Male/ageGroup=Adults",
    params: { gender: "Male", ageGroup: "Adults" },
    image: HomeImage,
    baseCollectionTitle: "",
  },
  {
    label: "BESPOKE",
    href: "/bespoke",
    imageLink:
      "/collections/gender=Male/ageGroup=Adults/isBespoke=true/productType=bespokeCloth,bespokeShoe",

    params: {
      isBespoke: true,
      gender: "Male",
      ageGroup: "Adults",
    },
    image: BespokeImage,
    baseCollectionTitle: "Bespoke",
  },
  {
    label: "READY TO WEAR",
    href: "/ready-to-wear",
    imageLink:
      "collections/gender=Male/ageGroup=Adults/isReadyMade=true/productType=readyMadeCloth,readyMadeShoe",
    params: {
      isReadyMade: true,
      gender: "Male",
      ageGroup: "Adults",
    },
    image: ReadyImage,

    baseCollectionTitle: "Ready to Wear",
  },
  {
    label: "ACCESSORIES",
    href: "/accessories",
    params: {
      productType: "accessory",
      gender: "Male",
      ageGroup: "Adults",
    },
    image: AccessImage,

    baseCollectionTitle: "Accessories",
  },
];
interface SupMenuOption {
  name: string;
  options: { label: string; link: string; collectionTitle: string }[];
}
type productsDynamicFilterType = {
  name: string;
  options: { value: string; count: number }[];
};
const MenChildrenSubMenus = ({
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
  const image =
    productGroupNavOptions.find(
      (option) => pathname === option.href || productGroupPage === option.label
    )?.image || "";
  const imageLink =
    productGroupNavOptions.find(
      (option) => pathname === option.href || productGroupPage === option.label
    )?.imageLink || "";
  //   const [selectedMenu, setSelectedMenu] = useState<string | undefined>(
  //     undefined
  //   );
  const [childrenSubMenus, setChildrenSubMenus] = useState<
    SupMenuOption[] | []
  >([]);

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
  const MenProductsDynamicFiltersQuery =
    zeapApiSlice.useGetProductsDynamicFiltersQuery(
      {
        ...getQueryParamObject(),
      },
      {
        skip:
          !token ||
          !pathname ||
          Object.keys(getQueryParamObject()).length === 0,
      }
    );

  const filteredProductsDynamicFilters = useMemo(() => {
    const productsDynamicFilters =
      MenProductsDynamicFiltersQuery?.data?.data || [];
    return productsDynamicFilters.filter(
      (field: productsDynamicFilterType) =>
        field.name.toLowerCase() === "main" ||
        field.name.toLowerCase() === "style" ||
        field.name.toLowerCase() === "design" ||
        field.name.toLowerCase() === "brand" ||
        field.name.toLowerCase() === "occasion"
      // field.name.toLowerCase() === "heel type" ||
      // field.name.toLowerCase() === "accessory type"
    );
  }, [MenProductsDynamicFiltersQuery?.data?.data]);

  const formatName = (name: string) => {
    if (name === "Main") {
      return "Category";
    }
    return name.toUpperCase();
  };

  useEffect(() => {
    const found = productGroupNavOptions.find(
      (option) => pathname === option.href || productGroupPage === option.label
    );
    const getSubMenuLink = (name: string, value: string) => {
      if (!found) return "";
      const baseLink = found.imageLink || "";
      const params = getQueryParamObject();
      const queryParams = new URLSearchParams(params);
      queryParams.set(name.toLowerCase(), value);
      // return `${baseLink}?${queryParams.toString()}`;
      return `${baseLink}/${name.toLowerCase()}=${value}`;
    };
    if (
      filteredProductsDynamicFilters &&
      filteredProductsDynamicFilters.length > 0
    ) {
      const subMenus = filteredProductsDynamicFilters.map(
        (filter: productsDynamicFilterType) => ({
          name: filter.name,
          // sort options by count in descending order
          options:
            // filter out empty other opttion
            // limit to 10 options
            // map options to objects with label property
            [...filter.options]
              .sort((a, b) => b.count - a.count)
              .map((option) => ({
                label: option.value,
                link: getSubMenuLink(filter.name, option.value),
                collectionTitle: `MEN'S ${
                  found?.baseCollectionTitle
                    ? `${found.baseCollectionTitle} - `
                    : ""
                } ${formatName(pluralize(filter.name))} - ${option.value}`,
              }))
              .filter((option) => option.label !== "Other")
              .slice(0, 10),
        })
      );
      setChildrenSubMenus(subMenus);
    }
  }, [
    filteredProductsDynamicFilters,
    getQueryParamObject,
    pathname,
    productGroupPage,
  ]);

  const getImageObj = () => {
    const imgaeObj = {
      src: image,
      link: imageLink,
      label: "",
      collectionTitle: "ALL MEN'S COLLECTIONS",
    };
    if (pathname === "/" || productGroupPage === "HOME") {
      imgaeObj.label = "Shop All MEN";
    }
    if (pathname === "/bespoke" || productGroupPage === "BESPOKE") {
      imgaeObj.label = "Shop All Bespoke MEN";
    }
    if (pathname === "/ready-to-wear" || productGroupPage === "READY TO WEAR") {
      imgaeObj.label = "Shop All MEN Ready to Wear";
    }
    if (pathname === "/accessories" || productGroupPage === "ACCESSORIES") {
      imgaeObj.label = "Shop All MEN Accessories";
    }
    return imgaeObj;
  };
  return (
    <div className="flex ">
      {childrenSubMenus.length > 0 && (
        <RenderChildrenSubMenus
          childrenSubMenus={childrenSubMenus}
          imageObj={getImageObj()}
          setHovered={setHovered}
          setIsOpen={setIsOpen}
          subProductGroupPage="MEN"
          productGroupPage={productGroupPage}
          slideAnimate={slideAnimate}
        />
      )}
    </div>
  );
};

export default MenChildrenSubMenus;
