"use client";
import { VariationInterface } from "@/interface/interface";
import { getCurrencySmallSymbol, numberWithCommas } from "@/utils/helpers";
import { useEffect, useState } from "react";

const ProductDetailPrice = ({
  variations,
  selectedSize,
}: {
  variations: VariationInterface[];
  selectedSize: string;
}) => {
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    const localStorageColor = localStorage.getItem("selectedProductColor");
    setColor(localStorageColor || "");
  }, []);
  const variation =
    variations?.find(
      (variation) =>
        variation.colorValue === color && variation?.size === selectedSize
    ) ||
    variations?.find((variation) => variation.colorValue === color) ||
    variations[0];
  const getPrice = () => {
    // check if variation prices are the same
    const prices = variations.map((variation) => variation.price);
    const isSame = prices.every((price) => price === prices[0]);
    if (isSame) {
      return `${getCurrencySmallSymbol(variation?.currency)}${numberWithCommas(
        prices[0]
      )}`;
    }
    // return from min to max
    return `${getCurrencySmallSymbol(variation?.currency)}${numberWithCommas(
      Math.min(...prices)
    )} - ${getCurrencySmallSymbol(variation?.currency)}${numberWithCommas(
      Math.max(...prices)
    )}`;
  };
  const getDiscount = () => {
    const discounts = variations.map((variation) => variation.discount);

    const isSame = discounts.every((discount) => discount === discounts[0]);
    if (isSame) {
      return `${getCurrencySmallSymbol(variation?.currency)}${numberWithCommas(
        discounts[0] || 0
      )}`;
    }
    return `${getCurrencySmallSymbol(variation?.currency)}${numberWithCommas(
      Math.min(...discounts.filter((discount) => discount !== undefined))
    )} - ${getCurrencySmallSymbol(variation?.currency)}${numberWithCommas(
      Math.max(...discounts.filter((discount) => discount !== undefined))
    )}`;
  };
  return (
    <>
      {!selectedSize && (
        <div className="flex flex-col md:flex-row gap-2 mad: gap-4">
          <p
            className={`text-xl font-semibold ${
              variation?.discount ? "line-through text-slate-400" : ""
            }`}
          >
            {getPrice()}
          </p>
          {variation?.discount && (
            <p className="text-lg font-semibold text-primary">
              {getDiscount()}
            </p>
          )}
        </div>
      )}
      {selectedSize && variation && (
        <div className="flex flex-col md:flex-row gap-2 mad: gap-4">
          <p
            className={`text-xl font-semibold ${
              variation?.discount ? "line-through text-slate-400" : ""
            }`}
          >
            {`${getCurrencySmallSymbol(variation?.currency)}${numberWithCommas(
              variation?.price
            )}`}
          </p>
          {variation?.discount && (
            <p className="text-lg font-semibold text-primary">
              {`${getCurrencySmallSymbol(
                variation?.currency
              )}${numberWithCommas(variation?.discount)}`}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetailPrice;
