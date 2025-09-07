import { Alert, Badge } from "flowbite-react";
import { ProductInterface } from "../../../interface/interface";
import { Avatar } from "flowbite-react";
import {
  capitalizeFirstLetter,
  shortenLongString,
} from "../../../utils/helpers";
import NoPic from "@/images/noPhoto.png";
import { HiChevronRight } from "react-icons/hi";
import Link from "next/link";
import { productTypeOptions } from "@/data/content";

const getProductTypeLabel = (type: string) => {
  const found = productTypeOptions.find((option) => option.value === type);
  if (found) {
    return found.name;
  }
  return "";
};
const getProductTypeSlug = (type: string) => {
  const found = productTypeOptions.find((option) => option.value === type);
  if (found) {
    return found.slug;
  }
  return "";
};

const DraftProductList = ({
  draftProducts = [],
}: {
  draftProducts: ProductInterface[];
}) => {
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

  return (
    <div className="flex flex-col">
      {draftProducts?.length === 0 && (
        <Alert color="info">
          No draft products found for this shop. You can start by selecting one
          of the below options
        </Alert>
      )}
      <div className="flex text-md text-warning font-bold mt-6 mb-2">
        Draft Products
      </div>
      {draftProducts?.length > 0 && (
        <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 ">
          {draftProducts?.map((product: ProductInterface) => (
            <Link
              href={`add-product/${getProductTypeSlug(product?.productType)}?id=${product?.productId}`}
              key={product?.productId}
              className="relative py-3 sm:py-4 px-2  bg-blue-100 rounded-lg my-2 cursor-pointer"
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Avatar
                  img={getDefaultImageLink(product)}
                  alt="Neil image"
                  rounded
                  size="sm"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {shortenLongString(product?.title, 35)}
                  </p>
                  <p className="truncate text-sm text-slate-500 dark:text-gray-400">
                    {getProductTypeLabel(product?.productType)}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <HiChevronRight className="text-darkGold text-2xl" />
                </div>
              </div>
              <div className="absolute -top-3 right-2 px-2 py-1 text-xs font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-white">
                <Badge color="warning" className="text-xs font-medium">
                  {capitalizeFirstLetter(product?.status)}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DraftProductList;
