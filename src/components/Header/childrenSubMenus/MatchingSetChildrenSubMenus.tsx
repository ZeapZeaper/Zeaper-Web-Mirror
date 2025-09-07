"use client";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import RenderChildrenSubMenus from "./RenderChildrenSubMenus";
import BespokeImage from "@/images/machingSet_3.avif";
import HomeImage from "@/images/matchingSet_1.jpg";
import ReadyImage from "@/images/matchingSet_2.webp";
import { usePathname, useSearchParams } from "next/navigation";
import pluralize from "pluralize";
const productGroupNavOptions = [
  {
    label: "HOME",
    href: "/",
    imageLink: "/collections/ageGroup=Adults/main=Matching Set",
    params: {
      ageGroup: "Adults",
      main: "Matching Set",
    },
    image: HomeImage,
    baseCollectionTitle: "Matching Sets",
  },
  {
    label: "BESPOKE",
    href: "/bespoke",
    imageLink:
      "/collections/ageGroup=Adults/isBespoke=true/productType=bespokeCloth/main=Matching Set",

    params: {
      isBespoke: true,
      ageGroup: "Adults",
      productType: "bespokeCloth",
      main: "Matching Set",
    },
    image: BespokeImage,
    baseCollectionTitle: "Bespoke Matching Sets",
  },
  {
    label: "READY TO WEAR",
    href: "/ready-to-wear",
    imageLink:
      "/collections/ageGroup=Adults/isReadyMade=true/productType=readyMadeCloth/main=Matching Set",
    params: {
      isReadyMade: true,
      ageGroup: "Adults",
      productType: "readyMadeCloth",
      main: "Matching Set",
    },
    image: ReadyImage,
    baseCollectionTitle: "Ready to Wear Matching Sets",
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
const MatchingSetsChildrenSubMenus = ({
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
  const MatchingSetsProductsDynamicFiltersQuery =
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
      MatchingSetsProductsDynamicFiltersQuery?.data?.data || [];
    return productsDynamicFilters.filter(
      (field: productsDynamicFilterType) =>
        field.name.toLowerCase() === "gender" ||
        field.name.toLowerCase() === "style" ||
        field.name.toLowerCase() === "design" ||
        field.name.toLowerCase() === "brand" ||
        field.name.toLowerCase() === "occasion" ||
        field.name.toLowerCase() === "heel type"
      // field.name.toLowerCase() === "accessory type"
    );
  }, [MatchingSetsProductsDynamicFiltersQuery?.data?.data]);

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
                collectionTitle: `${
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
      collectionTitle: "ALL MATCHING SETS",
    };
    if (pathname === "/" || productGroupPage === "HOME") {
      imgaeObj.label = "Shop All Matching Sets";
    }
    if (pathname === "/bespoke" || productGroupPage === "BESPOKE") {
      imgaeObj.label = "Shop All Bespoke Matching Sets";
    }
    if (pathname === "/ready-to-wear" || productGroupPage === "READY TO WEAR") {
      imgaeObj.label = "Shop All Ready to Wear Matching Sets";
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
          subProductGroupPage="MATCHING SETS"
          productGroupPage={productGroupPage}
          slideAnimate={slideAnimate}
        />
      )}
    </div>
  );
};

export default MatchingSetsChildrenSubMenus;
