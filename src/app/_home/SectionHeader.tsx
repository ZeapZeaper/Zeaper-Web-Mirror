"use client";

import { Carousel } from "flowbite-react";

import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { PromoInterface } from "@/interface/interface";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";

import Image from "next/image";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import Skeleton from "@/components/loading/Skeleton";

const carouselTheme = {
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth ",
    snap: "snap-x",
  },
};

const SectionHeader = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const searchParams = useSearchParams();
  const productGroupPage = searchParams.get("productGroupPage") || "HOME";
  const promosQuery = zeapApiSlice.useGetPromosQuery(
    {},
    {
      skip: !token,
    }
  );
  const promos = promosQuery?.data?.data || [];

  const isLoading = promosQuery.isLoading;

  return (
    <div className="h-fit min-h-[30vh]  relative">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <Skeleton />
        </div>
      ) : (
        <>
          <div className="h-full hidden md:block">
            {promos?.length > 1 && (
              <Carousel
                slideInterval={5000}
                leftControl={<span></span>}
                rightControl={<span></span>}
                theme={carouselTheme}
              >
                {promos?.map((promo: PromoInterface) => (
                  <div key={promo?.promoId} className="relative h-full">
                    <Link
                      href={`/promo/${promo?.promoId}?productGroupPage=${productGroupPage}&collectionTitle=${promo?.title}`}
                    >
                      <div className="text-white bg-primary text-xl font-bold absolute bottom-10 left-10 border-2 border-white px-5 py-2 hover:bg-white hover:text-primary cursor-pointer rounded-md z-10">
                        Shop Now
                      </div>
                    </Link>
                    {promo?.largeScreenImageUrl?.type === "image" ? (
                      <Image
                        key={promo?.promoId}
                        src={promo?.largeScreenImageUrl?.link}
                        alt="..."
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full"
                      />
                    ) : (
                      <video
                        key={promo?.promoId}
                        src={promo?.largeScreenImageUrl?.link}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                ))}
              </Carousel>
            )}
            {promos?.length === 1 && (
              <div className="relative h-full">
                <Link
                  href={`/promo/${promos[0]?.promoId}?productGroupPage=${productGroupPage}&collectionTitle=${promos[0]?.title}`}
                >
                  <div className="text-white bg-primary text-xl font-bold absolute bottom-10 left-10 border-2 border-white px-5 py-2 hover:bg-white hover:text-primary cursor-pointer rounded-md z-10">
                    Shop Now
                  </div>
                </Link>
                {promos[0]?.largeScreenImageUrl?.type === "image" ? (
                  <Image
                    key={promos[0]?.promoId}
                    src={promos[0]?.largeScreenImageUrl?.link}
                    alt="..."
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                ) : (
                  <video
                    key={promos[0]?.promoId}
                    src={promos[0]?.largeScreenImageUrl?.link}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            )}
          </div>
          <div className=" block md:hidden">
            {promos?.length > 1 && (
              <Carousel
                slideInterval={5000}
                className="h-[70vh]"
                leftControl={<span></span>}
                rightControl={<span></span>}
              >
                {promos?.map((promo: PromoInterface) => (
                  <div key={promo?.promoId} className="relative h-full">
                     <Link
                      href={`/promo/${promo?.promoId}?productGroupPage=${productGroupPage}&collectionTitle=${promo?.title}`}
                    >
                      <div className="text-white z-50 bg-transparent text-sm font-bold absolute bottom-2 left-1 border-2 border-white px-5 py-2 hover:bg-white hover:text-primary cursor-pointer rounded-md">
                        Shop Now
                      </div>
                    </Link>
                    {promo?.smallScreenImageUrl?.type === "image" ? (
                      <Image
                        key={promo?.promoId}
                        src={promo?.smallScreenImageUrl?.link}
                        alt="..."
                        objectFit="cover"
                        width={500}
                        height={500}
                        className="w-full h-full"
                      />
                    ) : (
                      <video
                        key={promo?.promoId}
                        src={promo?.smallScreenImageUrl?.link}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                ))}
              </Carousel>
            )}
            {promos?.length === 1 && (
              <Link
                href={`/promo/${promos[0]?.promoId}?productGroupPage=${productGroupPage}&collectionTitle=${promos[0]?.title}`}
                className="relative h-full"
              >
                <div className="">
                  <div className="text-white z-50 bg-transparent text-sm font-bold absolute bottom-2 left-1 border-2 border-white px-5 py-2 hover:bg-white hover:text-primary cursor-pointer rounded-md">
                    Shop Now
                  </div>
                </div>
                {promos[0]?.smallScreenImageUrl?.type === "image" ? (
                  <Image
                    key={promos[0]?.promoId}
                    src={promos[0]?.smallScreenImageUrl?.link}
                    alt="..."
                    layout="responsive"
                    width={500}
                    height={500}
                    objectFit="cover"
                  />
                ) : (
                  <video
                    key={promos[0]?.promoId}
                    src={promos[0]?.smallScreenImageUrl?.link}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="object-cover w-full h-full"
                  />
                )}
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SectionHeader;
