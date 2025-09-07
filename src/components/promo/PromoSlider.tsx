"use client";
import { PromoInterface } from "@/interface/interface";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PromoSlider = ({
  promos,
  title,
  subTitle,
}: {
  promos: PromoInterface[];
  title?: string;
  subTitle?: string;
}) => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (promos.length > 0) {
      setStartAnimation(true);
    }
  }, [promos]);

  const getPromoSubtitle = (promo: PromoInterface) => {
    if (promo.discount.fixedPercentage) {
      return `Get ${promo.discount.fixedPercentage}% off`;
    }
    if (promo.discount.rangePercentage) {
      return `Get ${promo.discount.rangePercentage.min}% - ${promo.discount.rangePercentage.max}% off`;
    }
    return "Limited time offer";
  };

  const getDuplicate = () => {
    if (promos.length === 0 || !promos) {
      return [];
    }
    const min = 20;
    if (promos.length < min) {
      const duplicates = Math.ceil(min / promos.length);
      return Array.from({ length: duplicates }, () => promos).flat();
    }
    return promos;
  };

  return (
    <div className="bg-black  flex flex-col items-center justify-center w-full py-4 ">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
        {title?.toUpperCase() || "SALES & PROMOTIONS"}
      </h2>
      <p className="text-md md:text-lg text-slate-300 text-center p-2">
        {subTitle || "Discover our latest sales and promotions"}
      </p>

      <div className="overflow-hidden  flex flex-col items-center justify-center w-full">
        <ul
          className={`flex align-start justify-start gap-0     ${
            startAnimation ? "animate-infinite-scroll" : ""
          } hover:pause-animation`}
        >
          {getDuplicate().map((promo: PromoInterface, index: number) => (
            <li
              key={index}
              className="flex gap-2 items-center w-full cursor-pointer"
            >
              <div className="flex flex-col p-4 text-white min-w-[40rem] hover:bg-white transition-colors duration-300">
                {promo?.largeScreenImageUrl?.type && (
                  <>
                    <Link
                      href={`/promo/${promo?.promoId}/isReadyMade=true?productGroupPage=READY TO WEAR&collectionTitle=${promo?.title}`}
                      className="w-full h-[15rem] rounded-md overflow-hidden "
                    >
                      {promo?.largeScreenImageUrl?.type === "image" ? (
                        <Image
                          src={promo?.largeScreenImageUrl?.link}
                          alt="Promo Image"
                          width={100}
                          height={100}
                          layout="responsive"
                          className="w-[60rem] h-auto  rounded-md"
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `
                        <video
                          
                          src="${promo?.largeScreenImageUrl?.link}"
                          className="w-[60rem] h-auto rounded-md"
                          preload="none"
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{ objectFit: "cover" }}
                        />
                      `,
                          }}
                        />
                      )}
                    </Link>

                    {!promo?.largeScreenImageUrl?.type && (
                      // displate title and subtitle
                      <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold w-full">
                          {promo.title}
                        </h3>
                        <p className="text-sm w-full">
                          {getPromoSubtitle(promo)}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PromoSlider;
