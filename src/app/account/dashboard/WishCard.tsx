"use client";
import Skeleton from "@/components/loading/Skeleton";
import { ProductInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import { useSelector } from "react-redux";
import NoPic from "@/images/noPhoto.png";
import Image from "next/image";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";


const WishCard = () => {


  const wishList = useSelector(globalSelectors.selectWishList);
  const isLoading = useSelector(globalSelectors.selectIsWishListLoading);
  const products = wishList?.map((item) => item.product) || [];
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
    <div className="flex flex-col  w-full items-center md:items-start border-2 border-lightGold rounded-md p-4">
      <div className="">
        <h2 className="block text-xl font-semibold">Wish List</h2>
      </div>
      <div className="mb-4 w-[20rem]    min-h-[20rem] p-4 rounded-md">
        {isLoading && (
          <div>
            <Skeleton />
          </div>
        )}
        {products?.length === 0 && !isLoading && (
          <div className="w-full h-56 flex items-center justify-center bg-white ">
            <p className="text-info">No Product in your Wish List</p>
          </div>
        )}
        {products?.length > 0 && (
          <div className="grid grid-cols-6 gap-4 w-full">
            <div className="col-span-4 ">
              <Image
                src={getDefaultImageLink(products[0]) || NoPic.src}
                alt="recent-view"
                width={100}
                height={100}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              {products?.slice(1, 3).map((product, index) => (
                <Image
                  key={index}
                  src={getDefaultImageLink(product) || NoPic.src}
                  alt="recent-view"
                  width={100}
                  height={100}
                  className="object-cover  rounded-md"
                />
              ))}
            </div>
          </div>
        )}
        {products?.length > 0 && (
          <ButtonSecondary
            className="mt-4 w-full bg-lightGold"
            href="/wishlist"
          >
            View All
          </ButtonSecondary>
        )}
      </div>
    </div>
  );
};

export default WishCard;
