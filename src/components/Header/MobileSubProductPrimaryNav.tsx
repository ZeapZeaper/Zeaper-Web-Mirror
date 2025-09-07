"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { subNavPrimaryData } from "@/data/content";
import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";
import Link from "next/link";
import MobileNotification from "./MobileNotification";
import MobileCurrencyPreference from "./MobileCurrencyPreference";
const MobileSubProductPrimaryNav = ({
  setHovered,
  setIsVisable,
}: {
  setHovered: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsVisable: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useContext(AuthContext);
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

  return (
    <div className="flex flex-col gap-4  mb-8 z-60  overflow-x-hidden overflow-y-auto no-scrollbar">
      <div
        className={`text-sm font-bold text-success transition-all duration-300 ease-in-out p-1 px-2 cursor-pointer `}
        onClick={() => {
          setHovered("SALES");
        }}
      >
        <div className="flex  justify-between">
          <span>SALES</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <hr className="border-b border-slate-300 my-2 mt-6" />
      </div>
      {filteredSubNavData?.length > 0 &&
        filteredSubNavData.map((item) => (
          <div
            key={item.label + item.productGroupNav}
            onClick={() => {
              setHovered(item.label);
            }}
            className={`flex flex-col text-sm font-extrabold text-slate-900   transition-all duration-300 ease-in-out p-1 px-2  `}
          >
            <div className="flex  justify-between">
              <span>{item.label}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            <hr className="border-b border-slate-300 my-2 mt-6" />
          </div>
        ))}
      {!user?.shopId && (
        <Link
          onClick={() => {
            setIsVisable(false);
          }}
          href={"/sell-on-zeap"}
          className="flex justify-center font-extrabold bg-lightSuccess   p-2 rounded-md cursor-pointer text-sm"
        >
          Sell on Zeaper
        </Link>
      )}
      {user?.shopId && (
        <Link
          href="/shop"
          onClick={() => {
            setIsVisable(false);
          }}
          className=" flex justify-center font-extrabold bg-lightSuccess  p-2  rounded-md cursor-pointer text-sm "
        >
          My Shop
        </Link>
      )}
      <div className="flex flex-col md:hidden">
        <MobileCurrencyPreference />
        <MobileNotification />
      </div>
    </div>
  );
};

export default MobileSubProductPrimaryNav;
