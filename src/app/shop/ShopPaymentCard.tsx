import ReactTimeAgo from "react-time-ago";

import NoPic from "@/images/noPhoto.png";

import { Badge } from "flowbite-react";
import { ShopPaymentInterface } from "@/interface/interface";

import {
  capitalizeFirstLetter,
  getCurrencySmallSymbol,
  numberWithCommas,
} from "@/utils/helpers";
import Image from "next/image";

const ShopPaymentCard = ({ payment }: { payment: ShopPaymentInterface }) => {
  const purchasedProduct = payment?.purchasedProduct;
  const imageLink =
    purchasedProduct?.images.map((image) => image.link)[0] || NoPic;
  const imageName =
    purchasedProduct?.images.map((image) => image.name)[0] || "No Image";
  const buyerPaid = payment?.buyerPaid;
  const shopRevenue = payment?.shopRevenue;
  const status = shopRevenue?.status;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "paid":
        return "success";
      case "cancelled":
        return "failure";
      default:
        return "info";
    }
  };
  return (
    <div className="flex flex-col gap-4  w-full p-3 bg-neutral-100 rounded-lg dark:bg-slate-700 dark:text-white">
      <div className="flex gap-2">
        <span>
          <Image
            className="w-16 h-auto object-cover rounded-lg"
            src={imageLink}
            alt={imageName}
            onError={(e) => {
              e.currentTarget.src = NoPic.src;
            }}
            width={64}
            height={64}
          />
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-md font-semi-bold">
            {purchasedProduct?.title}
          </span>
          <span className="text-xs text-slate-400">
            Purchase date :{" "}
            <ReactTimeAgo date={payment.purchaseDate} locale="en-US" />
          </span>
        </span>
      </div>
      {status !== "cancelled" && (
        <div className="flex justify-between text-xs md:text-[11px]">
          <span>
            Customer Paid: {getCurrencySmallSymbol(buyerPaid?.currency)}
            {numberWithCommas(buyerPaid?.value)}
          </span>
          <span>
            {status === "paid"? "Vendor Received" : "Vendor Revenue"}:{" "}
            <span className="text-success">
              {getCurrencySmallSymbol(shopRevenue?.currency)}
              {numberWithCommas(shopRevenue?.value)}
            </span>
          </span>
        </div>
      )}
      <div>
        {status && (
          <div className="flex justify-end">
            <Badge
              color={getStatusColor(status)}
              className="text-xs md:text-[11px]"
            >
              <span>{capitalizeFirstLetter(status)}</span>
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPaymentCard;
