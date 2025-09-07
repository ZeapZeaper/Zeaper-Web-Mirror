"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import SaleSubNAv from "./SaleSubNAv";
import { subNavPrimaryData } from "@/data/content";

const SubProductPrimaryNav = ({
  hovered,
  setHovered,
  setIsOpen,
  setIsVisable,
  setSlideAnimate,
}: {
  hovered: string;
  setHovered: (label: string) => void;
  setIsVisable?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: (value: boolean) => void;
  setSlideAnimate: React.Dispatch<"animate-slide-right" | "animate-slide-left">;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productGroupPage = searchParams.get("productGroupPage") || "HOME";

  const getFilteredSubNavData = () => {
    if (!productGroupPage) {
      return subNavPrimaryData.filter(
        (item) => item.productGroupNav === "HOME"
      );
    }
    const navData =
      subNavPrimaryData.filter(
        (item) =>
          item.productGroupNav === productGroupPage ||
          item.matchedHref === pathname
      ) || [];
    //ensure no duplicate labels
    const uniqueLabels = new Set();
    return navData.filter((item) => {
      if (uniqueLabels.has(item.label)) {
        return false;
      }
      uniqueLabels.add(item.label);
      return true;
    });
  };

  const filteredSubNavData = getFilteredSubNavData();

  const controlAnimate = (label: string) => {
    if (hovered === label) return;
    // if (label === "SALES") return setSlideAnimate("animate-slide-left");
    const data = [...filteredSubNavData, { label: "SALES" }];
    const labelIndex = data.findIndex((item) => item.label === label);
    if (labelIndex === -1) return;

    const prevHoveredIndex = data.findIndex((item) => item.label === hovered);
    if (prevHoveredIndex === -1) return;

    if (labelIndex > prevHoveredIndex) {
      setSlideAnimate("animate-slide-right");
    } else {
      setSlideAnimate("animate-slide-left");
    }
  };

  return (
    <div className="flex gap-4 w-[100vw] overflow-auto xl:bg-primary xl:justify-start xl:items-center xl:gap-2 xl:px-4 xl:py-2 no-scrollbar">
      {filteredSubNavData?.length > 0 &&
        filteredSubNavData.map((item) => (
          <Link
            key={item.label + item.productGroupNav}
            href={{
              pathname: item.matchedHref,
              query: {
                productGroupPage: item.productGroupNav,
                subProductGroupPage: item.label,
                collectionTitle: item.collectionTitle,
              },
            }}
            onClick={() => {
              setHovered("");
              setIsOpen(false);
              if (setIsVisable) setIsVisable(false);
            }}
            onMouseEnter={() => {
              controlAnimate(item.label);
              setHovered(item.label);
            }}
            className={`text-xs text-nowrap font-extrabold text-slate-900 xl:text-white  transition-all duration-300 ease-in-out p-1 xl:px-2 ${
              hovered === item.label ? "bg-primary text-white  rounded-md" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      <SaleSubNAv
        hovered={hovered}
        setHovered={setHovered}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default SubProductPrimaryNav;
