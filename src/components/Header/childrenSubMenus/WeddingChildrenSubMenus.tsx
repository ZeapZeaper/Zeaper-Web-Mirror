"use client";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import RenderChildrenSubMenus from "./RenderChildrenSubMenus";
import BespokeImage from "@/images/wedding_dress_1.jpg";
import HomeImage from "@/images/wedding_1.jpeg";
import ReadyImage from "@/images/bridal_1.jpg";
import { usePathname, useSearchParams } from "next/navigation";
import pluralize from "pluralize";

const productGroupNavOptions = [
  {
    label: "HOME",
    href: "/",
    imageLink:
      "/collections/ageGroup=Adults/occasion=Wedding,Bride,Bridesmaid,Bride Shower,Groom,Groomsman",
    baseLink: "/collections/ageGroup=Adults",
    params: {
      ageGroup: "Adults",
      occasion: "Wedding,Bride,Bridesmaid,Bride Shower,Groom,Groomsman",
    },
    image: HomeImage,
    baseCollectionTitle: "Wedding Collection",
    subProductGroupPage: "WEDDING COLLECTION",
  },
  {
    label: "BESPOKE",
    href: "/bespoke",
    imageLink:
      "/collections/ageGroup=Adults/isBespoke=true/occasion=Wedding,Bride,Bridesmaid,Bride Shower,Groom,Groomsman",
    baseLink: "/collections/ageGroup=Adults/isBespoke=true",

    params: {
      isBespoke: true,
      ageGroup: "Adults",
      occasion: "Wedding,Bride,Bridesmaid,Bride Shower,Groom,Groomsman",
    },
    image: BespokeImage,

    baseCollectionTitle: "Bespoke Wedding Collection",
    subProductGroupPage: "BESPOKE WEDDING COLLECTION",
  },
  {
    label: "READY TO WEAR",
    href: "/collections/ageGroup=Adults/isReadyMade=true/occasion=Wedding,Bride,Bridesmaid,Bride Shower,Groom,Groomsman",
    imageLink:
      "/collections/ageGroup=Adults/isReadyMade=true/occasion=Wedding,Bride,Bridesmaid,Bride Shower,Groom,Groomsman",
    baseLink: "/collections/ageGroup=Adults/isReadyMade=true",
    params: {
      isReadyMade: true,
      ageGroup: "Adults",
      occasion: "Wedding,Bride,Bridesmaid,Bride Shower,Groom,Groomsman",
    },
    image: ReadyImage,
    baseCollectionTitle: "Ready to Wear Wedding Collection",
    subProductGroupPage: "READY TO WEAR WEDDING COLLECTION",
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
const WeddingChildrenSubMenus = ({
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
    const found = productGroupNavOptions.find(
      (option) => pathname === option.href || productGroupPage === option.label
    );
    const params = {
      ...found?.params,
    };
    return params;
  }, [pathname, productGroupPage]);

  const bridalProductsDynamicFiltersQuery =
    zeapApiSlice.useGetProductsDynamicFiltersQuery(
      {
        ...getQueryParamObject(),

        occasion: "Bride",
        gender: "Female",
      },
      {
        skip:
          !token ||
          !pathname ||
          Object.keys(getQueryParamObject()).length === 0,
      }
    );

  const bridesmaidProductsDynamicFiltersQuery =
    zeapApiSlice.useGetProductsDynamicFiltersQuery(
      {
        ...getQueryParamObject(),
        occasion: "Bridesmaid",
        gender: "Female",
      },
      {
        skip:
          !token ||
          !pathname ||
          Object.keys(getQueryParamObject()).length === 0,
      }
    );

  const groomProductsDynamicFiltersQuery =
    zeapApiSlice.useGetProductsDynamicFiltersQuery(
      {
        ...getQueryParamObject(),
        occasion: "Groom",
        gender: "Male",
      },
      {
        skip:
          !token ||
          !pathname ||
          Object.keys(getQueryParamObject()).length === 0,
      }
    );
  const groomsmanProductsDynamicFiltersQuery =
    zeapApiSlice.useGetProductsDynamicFiltersQuery(
      {
        ...getQueryParamObject(),
        occasion: "Groomsman",
        gender: "Male",
      },
      {
        skip:
          !token ||
          !pathname ||
          Object.keys(getQueryParamObject()).length === 0,
      }
    );
  const bridalShowerProductsDynamicFiltersQuery =
    zeapApiSlice.useGetProductsDynamicFiltersQuery(
      {
        ...getQueryParamObject(),
        occasion: "Bride Shower",
        gender: "Female",
      },
      {
        skip:
          !token ||
          !pathname ||
          Object.keys(getQueryParamObject()).length === 0,
      }
    );

  const weddingProductsDynamicFiltersQuery =
    zeapApiSlice.useGetProductsDynamicFiltersQuery(
      {
        ...getQueryParamObject(),
        occasion: "Wedding",
      },
      {
        skip:
          !token ||
          !pathname ||
          Object.keys(getQueryParamObject()).length === 0,
      }
    );
  const femaleWeddingProductsDynamicFiltersQuery =
    zeapApiSlice.useGetProductsDynamicFiltersQuery(
      {
        ...getQueryParamObject(),
        occasion: "Wedding",
        gender: "Female",
      },
      {
        skip:
          !token ||
          !pathname ||
          Object.keys(getQueryParamObject()).length === 0,
      }
    );
  const maleWeddingProductsDynamicFiltersQuery =
    zeapApiSlice.useGetProductsDynamicFiltersQuery(
      {
        ...getQueryParamObject(),
        occasion: "Wedding",
        gender: "Male",
      },
      {
        skip:
          !token ||
          !pathname ||
          Object.keys(getQueryParamObject()).length === 0,
      }
    );
  const getAllowedFields = (data: productsDynamicFilterType[] = []) => {
    
    if (!data || data.length === 0) return [];
    return data.filter(
      (field: productsDynamicFilterType) =>
        field.name.toLowerCase() === "occasion"
    );
  };
  const filteredProductsDynamicFilters = useMemo(() => {
    const productsDynamicFilters: productsDynamicFilterType[] = [
      {
        name: "Women",
        options: [],
      },
      {
        name: "Men",
        options: [],
      },
      {
        name: "Occasion",
        options: [],
      },
    ];
    if (
      getAllowedFields(bridalProductsDynamicFiltersQuery?.data?.data)?.length >
      0
    ) {
      productsDynamicFilters[0].options.push({
        value: "Bride",
        count: bridalProductsDynamicFiltersQuery?.data?.data?.length || 0,
      });
      productsDynamicFilters[2].options.push({
        value: "Bride",
        count: bridalProductsDynamicFiltersQuery?.data?.data?.length || 0,
      });
    }
    if (
      getAllowedFields(bridesmaidProductsDynamicFiltersQuery?.data?.data)
        ?.length > 0
    ) {
      productsDynamicFilters[0].options.push({
        value: "Bridesmaid",
        count: bridesmaidProductsDynamicFiltersQuery?.data?.data?.length || 0,
      });
      productsDynamicFilters[2].options.push({
        value: "Bridesmaid",
        count: bridesmaidProductsDynamicFiltersQuery?.data?.data?.length || 0,
      });
    }
    if (
      getAllowedFields(groomProductsDynamicFiltersQuery?.data?.data)?.length > 0
    ) {
      productsDynamicFilters[1].options.push({
        value: "Groom",
        count: groomProductsDynamicFiltersQuery?.data?.data?.length || 0,
      });
      productsDynamicFilters[2].options.push({
        value: "Groom",
        count: groomProductsDynamicFiltersQuery?.data?.data?.length || 0,
      });
    }
    if (
      getAllowedFields(groomsmanProductsDynamicFiltersQuery?.data?.data)
        ?.length > 0
    ) {
      productsDynamicFilters[1].options.push({
        value: "Groomsman",
        count: groomsmanProductsDynamicFiltersQuery?.data?.data?.length || 0,
      });
      productsDynamicFilters[2].options.push({
        value: "Groomsman",
        count: groomsmanProductsDynamicFiltersQuery?.data?.data?.length || 0,
      });
    }
    if (
      getAllowedFields(bridalShowerProductsDynamicFiltersQuery?.data?.data)
        ?.length > 0
    ) {
      productsDynamicFilters[0].options.push({
        value: "Bride Shower",
        count: bridalShowerProductsDynamicFiltersQuery?.data?.data?.length || 0,
      });
      productsDynamicFilters[2].options.push({
        value: "Bride Shower",
        count: bridalShowerProductsDynamicFiltersQuery?.data?.data?.length || 0,
      });
    }
    if (
      getAllowedFields(weddingProductsDynamicFiltersQuery?.data?.data)?.length >
      0
    ) {
      productsDynamicFilters[2].options.push({
        value: "Wedding",
        count: weddingProductsDynamicFiltersQuery?.data?.data?.length || 0,
      });
    }
    if (
      getAllowedFields(maleWeddingProductsDynamicFiltersQuery?.data?.data)
        ?.length > 0
    ) {
      productsDynamicFilters[1].options.push({
        value: "Wedding",
        count: maleWeddingProductsDynamicFiltersQuery?.data?.data?.length || 0,
      });
    }
    if (
      getAllowedFields(femaleWeddingProductsDynamicFiltersQuery?.data?.data)
        ?.length > 0
    ) {
      productsDynamicFilters[0].options.push({
        value: "Wedding",
        count:
          femaleWeddingProductsDynamicFiltersQuery?.data?.data?.length || 0,
      });
    }
    return productsDynamicFilters.filter(
      (field: productsDynamicFilterType) => field.options.length > 0
    );
  }, [
    bridalProductsDynamicFiltersQuery?.data?.data,
    bridesmaidProductsDynamicFiltersQuery?.data?.data,
    groomProductsDynamicFiltersQuery?.data?.data,
    groomsmanProductsDynamicFiltersQuery?.data?.data,
    bridalShowerProductsDynamicFiltersQuery?.data?.data,
    weddingProductsDynamicFiltersQuery?.data?.data,
    maleWeddingProductsDynamicFiltersQuery?.data?.data,
    femaleWeddingProductsDynamicFiltersQuery?.data?.data,
  ]);

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
    const getNameParam = (name: string) => {
      if (name === "Women") {
        return `/gender=Female`;
      }
      if (name === "Men") {
        return `/gender=Male`;
      }
      return;
    };
    const getSubMenuLink = (name: string, value: string) => {
      if (!found) return "";
      const baseLink = found.baseLink || "";
      return `${baseLink}${getNameParam(name)}/occasion=${value}`;
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
      collectionTitle: "ALL WEDDING COLLECTIONS",
    };
    if (pathname === "/" || productGroupPage === "HOME") {
      imgaeObj.label = "Shop All Wedding Collections";
    }
    if (pathname === "/bespoke" || productGroupPage === "BESPOKE") {
      imgaeObj.label = "Shop All Bespoke Wedding Collections";
    }
    if (pathname === "/ready-to-wear" || productGroupPage === "READY TO WEAR") {
      imgaeObj.label = "Shop All Ready to Wear Wedding Collections";
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
          subProductGroupPage={
            productGroupNavOptions.find(
              (option) =>
                pathname === option.href || productGroupPage === option.label
            )?.subProductGroupPage || "CLOTHINGS"
          }
          productGroupPage={productGroupPage}
          slideAnimate={slideAnimate}
        />
      )}
    </div>
  );
};

export default WeddingChildrenSubMenus;
