"use client";

import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { PromoInterface } from "@/interface/interface";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SalesPage = () => {
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
  const getPageTitle = () => {
    switch (productGroupPage) {
      case "HOME":
        return "ALL SALES PROMOTIONS";
      case "READY TO WEAR":
        return "READY TO WEAR SALES PROMOTIONS";
      case "BESPOKE":
        return "BESPOKE SALES PROMOTIONS";
      case "ACCESSORIES":
        return "ACCESSORIES SALES PROMOTIONS";
      default:
        return "ALL SALES PROMOTIONS";
    }
  };

  return (
    <div className="  mx-auto  py-8">
      <h1 className="text-2xl font-bold  text-center">{getPageTitle()}</h1>
      <div className="grid grid-cols-1 gap-2  my-6">
        {isLoading &&
          Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="h-[40vh] p-4 border rounded-lg animate-pulse"
            >
              <div className="h-6 bg-slate-200 rounded mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            </div>
          ))}
      </div>

      {promos?.length > 0 && (
        <div className="flex flex-col items-center justify-center w-full py-4">
          <div className="h-full hidden md:block">
            {promos?.map((promo: PromoInterface) => (
              <div key={promo?.promoId} className="relative h-full">
                <Link
                  key={promo?.promoId}
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
                    width={500}
                    height={500}
                    layout="responsive"
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
          </div>
          <div className=" block md:hidden">
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
                    src={promo?.smallScreenImageUrl?.link}
                    alt="..."
                    objectFit="cover"
                    width={500}
                    height={500}
                    className="w-full h-full"
                  />
                ) : (
                  <video
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
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;
