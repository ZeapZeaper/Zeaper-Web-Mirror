import { ShopAnaliticsInterface, ShopInterface } from "@/interface/interface";
// import NoPic from "@/images/noPhoto.png";
import {
  capitalizeFirstLetter,
  getCurrencySmallSymbol,
  numberWithCommas,
} from "@/utils/helpers";

// import Image from "next/image";

import ShopQuickLinks from "@/components/shop/ShopQuickLinks";

const TopSection = ({
  shop,
  shopAnalytics,
}: {
  shop: ShopInterface;
  shopAnalytics: ShopAnaliticsInterface;
}) => {
  const shopRevenuesByPaymentStatus = shopAnalytics.shopRevenuesByPaymentStatus;
  const paid = shopRevenuesByPaymentStatus?.paid;

  return (
    <div className="bg-lightGreen text-black dark:text-white dark:bg-baseGreen  opacity-100 rounded-b-3xl p-2">
      <div className="flex flex-col gap-0.5">
        {/* <Image
          data-tooltip-target="tooltip-jese"
          className="w-10 h-10 rounded"
          src={shop?.imageUrl?.link || NoPic}
          alt="Medium avatar"
        /> */}
        <p className=" text-md font-bold">{shop?.shopName}</p>
        <p className=" text-sm text-grey-700 dark:text-slate-400 ">
          {capitalizeFirstLetter(shop?.address) || "No address"}
        </p>
        <p className=" text-sm text-grey-700 dark:text-slate-400 ">
          {shop?.phoneNumber || "No phone number "}
        </p>
        <div className="flex gap-1 my-2">
          {shop?.disabled ? (
            <span className="inline-flex items-center justify-center gap-1 rounded-full  px-1.5 text-xs text-white mr-2 bg-danger">
              Disabled
            </span>
          ) : (
            <span className="inline-flex items-center justify-center gap-1 rounded-full  px-1.5 text-xs text-white mr-2 bg-success">
              Active
            </span>
          )}
          {shop?.isTailor && (
            <span className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-600 px-1.5 text-xs text-white mr-2">
              Tailor
            </span>
          )}
          {shop?.isShoeMaker && (
            <span className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-600 px-1.5 text-xs text-white mr-2">
              Shoe Maker
            </span>
          )}
          {shop?.isMakeUpArtist && (
            <span className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-600 px-1.5 text-xs text-white mr-2">
              MakeUp Artist
            </span>
          )}
        </div>
        <div className="my-2 w-full flex flex-col md:flex-row flex-1 justify-between  md:items-end">
          <div className=" bg-white flex flex-col  text-green-800  rounded-xl p-2 w-fit ">
            <p className=" w-[6rem] text-xs md:text-sm text-success font-bold">
              Paid Revenue
            </p>
            <p className=" text-md font-bold">
              {getCurrencySmallSymbol(paid.currency)}
              {numberWithCommas(paid?.value)}
            </p>
          </div>
          <div className="flex  md:justify-end w-full mt-4">
            <ShopQuickLinks shopId={shop?.shopId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
