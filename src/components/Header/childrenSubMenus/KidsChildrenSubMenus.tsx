"use client";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import RenderChildrenSubMenus from "./RenderChildrenSubMenus";
import BespokeImage from "@/images/ath6.webp";
import HomeImage from "@/images/kid_1.jpg";
import ReadyImage from "@/images/black_child_rtw.avif";
import AccessImage from "@/images/black_child_bespoke.jpg";
import { usePathname, useSearchParams } from "next/navigation";
import pluralize from "pluralize";

const productGroupNavOptions = [
  {
    label: "HOME",
    href: "/",
    imageLink: "/collections/ageGroup=Kids",
    params: { ageGroup: "Kids" },
    image: HomeImage,
    baseCollectionTitle: "",
  },
  {
    label: "BESPOKE",
    href: "/bespoke",
    imageLink:
      "/collections/ageGroup=Kids/isBespoke=true/productType=bespokeCloth,bespokeShoe",

    params: {
      isBespoke: true,
      ageGroup: "Kids",
    },
    image: BespokeImage,

    baseCollectionTitle: "Bespoke",
  },
  {
    label: "READY TO WEAR",
    href: "/collections/ageGroup=Kids/isReadyMade=true/productType=readyMadeCloth,readyMadeShoe",
    imageLink:
      "/collections/ageGroup=Kids/isReadyMade=true/productType=readyMadeCloth,readyMadeShoe",
    params: {
      isReadyMade: true,
      ageGroup: "Kids",
      productType: "readyMadeCloth,readyMadeShoe",
    },
    image: ReadyImage,

    baseCollectionTitle: "Ready to Wear",
  },
  {
    label: "ACCESSORIES",
    href: "/collections/ageGroup=Kids/productType=accessory",
    params: {
      productType: "accessory",

      ageGroup: "Kids",
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
const KidsChildrenSubMenus = ({
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
  const KidsProductsDynamicFiltersQuery =
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
      KidsProductsDynamicFiltersQuery?.data?.data || [];
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
  }, [KidsProductsDynamicFiltersQuery?.data?.data]);

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
                collectionTitle: `KIDS' ${
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
      collectionTitle: "ALL KIDS' CLOTHINGS",
    };
    if (pathname === "/" || productGroupPage === "HOME") {
      imgaeObj.label = "Shop All Kids";
    }
    if (pathname === "/bespoke" || productGroupPage === "BESPOKE") {
      imgaeObj.label = "Shop All Bespoke Kids";
    }
    if (pathname === "/ready-to-wear" || productGroupPage === "READY TO WEAR") {
      imgaeObj.label = "Shop All Kids Ready to Wear";
    }
    if (pathname === "/accessories" || productGroupPage === "ACCESSORIES") {
      imgaeObj.label = "Shop All Kids Accessories";
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
          subProductGroupPage="KIDS"
          productGroupPage={productGroupPage}
          slideAnimate={slideAnimate}
        />
      )}
    </div>
  );
};

export default KidsChildrenSubMenus;
