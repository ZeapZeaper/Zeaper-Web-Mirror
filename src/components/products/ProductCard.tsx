"use client";
import NoPic from "@/images/noPhoto.png";
import { Badge } from "flowbite-react";

import Image from "next/image";
import { ProductInterface } from "@/interface/interface";

import {
  capitalizeFirstLetter,
  getCurrencySmallSymbol,
  getStatusBg,
  numberWithCommas,
} from "@/utils/helpers";
import HeartSolid from "./HeartSolidIcon";
import Heart from "./HeartIcon";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";

const ProductCard = ({
  product,
  colorOptions = [],
  showStatus = false,
  disableLink = false,
  href,
}: {
  product: ProductInterface;
  showStatus?: boolean;
  disableLink?: boolean;
  colorOptions?: { name: string; hex?: string; background?: string }[];
  href?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
    const productGroupPage = searchParams.get("productGroupPage") || "HOME";
  const [clickedColor, setClickedColor] = useState<string>("");
  const [addProductToWishList] = zeapApiSlice.useAddProductToWishListMutation();
  const [removeProductFromWishList] =
    zeapApiSlice.useRemoveProductFromWishListMutation();
  const wishList = useSelector(globalSelectors.selectWishList);
  const [isWLHovered, setIsWLHovered] = useState(false);
  const getBg = (value: string) => {
    if (value.toLocaleLowerCase() === "bespoke")
      return "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(204,23,195,0.09147408963585435) 4%, rgba(205,64,138,0.5172443977591037) 25%, rgba(207,136,39,1) 37%, rgba(13,15,25,1) 44%, rgba(32,37,4,1) 45%, rgba(72,84,9,0.4472163865546218) 100%)";
    const color = colorOptions?.find((color) => color.name === value);
    return color?.hex || color?.background;
  };
  const getDefaultColor = () => {
    if (product?.colors?.length > 0) {
      const colors = product.colors;
      const isDefault = colors.find((color) =>
        color.images.find((image) => image.isDefault)
      );

      if (isDefault) {
        return isDefault.value;
      }
      return colors[0]?.value;
    }
    return "";
  };
  const variation =
    product?.variations?.find(
      (variation) => variation.colorValue === getDefaultColor()
    ) || product?.variations[0];
  const getDefaultImageLink = (product: ProductInterface) => {
    if (product?.colors?.length > 0) {
      const colors = product.colors;
      //array of color images
      const colorImages = colors.map((color) => color.images).flat();
      const isDefault = colorImages.find((image) => image.isDefault);
      if (isDefault) {
        return isDefault.link;
      }
      return colorImages[0]?.link;
    }
    return NoPic.src;
  };
  const getClickedColorImage = (product: ProductInterface) => {
    if (!clickedColor) return "";
    if (product?.colors?.length > 0) {
      const foundColor = product.colors.find(
        (color) => color.value === clickedColor
      );
      if (foundColor) {
        const isDefault = foundColor.images.find((image) => image.isDefault);
        if (isDefault) {
          return isDefault.link;
        }
        return foundColor.images[0]?.link;
      }
    }
    return NoPic.src;
  };
  const getColorNameFromLink = (link: string) => {
    if (product?.colors?.length > 0) {
      const colors = product.colors;
      const colorImages = colors.map((color) => color.images).flat();
      const foundColor = colorImages.find((image) => image.link === link);
      if (foundColor) {
        return colors.find((color) =>
          color.images.find((image) => image.link === link)
        )?.value;
      }
    }
    return "";
  };

  const getAlreadyWishlisted = () => {
    if (clickedColor) {
      return wishList?.find(
        (wish) =>
          wish?.product?.productId === product?.productId &&
          wish?.color === clickedColor
      );
    }
    return wishList?.find(
      (wish) =>
        wish?.product?.productId === product?.productId &&
        wish?.color === getDefaultColor()
    );
  };
  const alreadyWishlisted = getAlreadyWishlisted();

  const handleAddWishlist = async () => {
    const payload = {
      productId: product?.productId,
      color: clickedColor || getDefaultColor(),
    };
    addProductToWishList({ payload }).unwrap();
  };
  const removeWishlist = async () => {
    const payload = {
      wish_id: alreadyWishlisted?._id,
    };
    removeProductFromWishList({ payload }).unwrap();
  };
  const handleWishClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!product) return;
    if (!product?.productId) return;
    if (alreadyWishlisted) {
      removeWishlist();
    } else {
      handleAddWishlist();
    }
  };

  const getWishIcon = () => {
    if (alreadyWishlisted || isWLHovered) {
      return <HeartSolid />;
    }
    return <Heart />;
  };

  return (
    <div key={product?.productId} className="w-full">
      <div className="relative overflow-hidden mb-1 w-full">
        <div>
          <div
            className={`w-full ${
              disableLink ? "cursor-not-allowed" : "cursor-pointer"
            }  `}
            onClick={() => {
              if (disableLink) return;
            
              if (href) {
                return router.push(href);
              }
              router.push(
                `/products/${product?.title
                  .replace(/ /g, "-")
                  .replace(/&/g, "and")
                  .replace(/\//g, "-")}-${
                  clickedColor || getDefaultColor()
                }?productId=${
                  product?.productId
                }&color=${clickedColor || getDefaultColor()}&productGroupPage=${productGroupPage}`
              );
            }}
          >
            <div className=" flex md:hidden flex-col  bg-slate-100 gap-2  my-2  rounded-lg  duration-300 hover:scale-105 transform overflow-hidden  ">
              <Image
                src={
                  getClickedColorImage(product) ||
                  getDefaultImageLink(product) ||
                  String(NoPic.src)
                }
                alt={product?.title || "product"}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "full",
                  height: "20rem",
                }}
                className="w-full object-contain object-cover"
              />

              <button
                type="button"
                className="absolute top-2 right-2 p-1 rounded-full"
                aria-label="Wishlist"
                onClick={handleWishClick}
                onMouseOver={() => setIsWLHovered(true)}
                onMouseLeave={() => setIsWLHovered(false)}
              >
                {getWishIcon()}
                {/* {isWLHovered || alreadyWishlisted ? <HeartSolid /> : <Heart />} */}
              </button>
            </div>
            <div className=" flex hidden md:block lg:hidden flex-col  bg-slate-100 gap-2  my-2  rounded-lg  duration-300 hover:scale-105 transform overflow-hidden  ">
              <Image
                src={
                  getClickedColorImage(product) ||
                  getDefaultImageLink(product) ||
                  String(NoPic.src)
                }
                alt={product?.title || "product"}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "full",
                  height: "37rem",
                }}
                className="w-full  object-contain object-cover"
              />

              <button
                type="button"
                className="absolute top-2 right-2 p-1 rounded-full"
                aria-label="Wishlist"
                onClick={handleWishClick}
                onMouseOver={() => setIsWLHovered(true)}
                onMouseLeave={() => setIsWLHovered(false)}
              >
                {getWishIcon()}
                {/* {isWLHovered || alreadyWishlisted ? <HeartSolid /> : <Heart />} */}
              </button>
            </div>
            <div className="w-72 hidden lg:block  mt-2   overflow-hidden rounded-lg ">
              <Image
                className=" w-72 h-80  object-contain transition-transform transform hover:scale-110 duration-1000"
                src={
                  getClickedColorImage(product) ||
                  getDefaultImageLink(product) ||
                  String(NoPic.src)
                }
                alt={product?.title || "product"}
                width={0}
                height={0}
                sizes="100vw"
              />
              <button
                type="button"
                className="absolute top-2 left-10 p-1 rounded-full"
                aria-label="Wishlist"
                onClick={handleWishClick}
                onMouseOver={() => setIsWLHovered(true)}
                onMouseLeave={() => setIsWLHovered(false)}
              >
                {getWishIcon()}
                {/* {isWLHovered || alreadyWishlisted ? <HeartSolid /> : <Heart />} */}
              </button>
            </div>
          </div>
          <div className="p-4 h-25 xl:h-[7rem] md:w-72">
            <p className=" text-sm   text-gray-900 overflow-auto truncate ">
              {capitalizeFirstLetter(product?.title?.toLowerCase())}-
              {getColorNameFromLink(
                getClickedColorImage(product) ||
                  getDefaultImageLink(product) ||
                  String(NoPic.src)
              )}
            </p>

            <div className="flex  justify-between">
              <span className="flex flex-col">
                {variation?.price ? (
                  <p
                    className={`mr-2 text-xs font-semibold text-gray-900 dark:text-white ${
                      variation?.discount && "line-through"
                    }`}
                  >
                    {getCurrencySmallSymbol(variation?.currency)}
                    {numberWithCommas(variation?.price)}
                  </p>
                ) : (
                  <Badge color="failure">No price set </Badge>
                )}
                {variation?.discount && (
                  <p className="text-xs text-green-500">
                    {product?.promo?.discountPercentage}% off
                  </p>
                )}
              </span>
              <span>
                {variation?.discount && (
                  <p className="text-xs  font-bold text-gray-500  dark:text-gray-300">
                    {getCurrencySmallSymbol(variation?.currency)}
                    {numberWithCommas(variation?.discount)}
                  </p>
                )}
              </span>
            </div>
            {colorOptions?.length > 0 && product?.colors?.length > 1 && (
              <div className="flex gap-2">
                {product?.colors?.map((color) => (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.setItem("selectedProductColor", color.value);
                      setClickedColor(color.value);
                    }}
                    key={color.value}
                    className={`w-4 h-4 rounded-full cursor-pointer border  border-slate-200 ring hover:ring-primary
                    ${
                      color.value === clickedColor
                        ? "ring-primary  ring-offset-1"
                        : "ring-transparent"
                    }
                    `}
                    style={{ background: getBg(color.value) }}
                  ></div>
                ))}
              </div>
            )}
            {showStatus && (
              <div className="absolute right-0 top-0 h-16 w-16 ">
                <div
                  className={`absolute transform rotate-45 ${getStatusBg(
                    product?.status
                  )} text-center  font-semibold py-1 right-[-35px] top-[32px] w-[170px]`}
                >
                  {product?.status}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
