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
    base: "flex h-full snap-mandatory overflow-hidden scroll-smooth",
    snap: "snap-x",
  },
};

// ✅ Helper component for consistent media display
const MediaDisplay = ({
  type,
  link,
  alt,
  href,
}: {
  type: string | undefined;
  link: string;
  alt?: string;
  href: string;
}) => (
  <Link href={href} className="absolute inset-0 w-full h-full">
    {type === "image" ? (
      <Image
        src={link}
        alt={alt || "promo"}
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
    ) : (
      <video
        src={link}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="object-cover object-center w-full h-full"
      />
    )}
  </Link>
);

const SectionHeader = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const searchParams = useSearchParams();
  const productGroupPage = searchParams.get("productGroupPage") || "HOME";
  const promosQuery = zeapApiSlice.useGetPromosQuery({}, { skip: !token });
  const promos = promosQuery?.data?.data || [];
  const isLoading = promosQuery.isLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Skeleton />
      </div>
    );
  }

  return (
    <>
      {promos?.length > 1 && (
        <>
          <div className="relative w-full hidden md:block">
            {promos.length > 0 && (
              <Carousel
                slideInterval={5000}
                leftControl={<span />}
                rightControl={<span />}
                theme={carouselTheme}
                className="relative w-full"
              >
                {promos.map((promo: PromoInterface) => (
                  <div
                    key={promo.promoId}
                    className="
                relative w-full 
                aspect-[16/9]        /* ✅ consistent width/height ratio */
                md:aspect-[21/9]     /* wider for tablets/desktops */
                overflow-hidden 
                flex items-center justify-center
              "
                  >
                    <MediaDisplay
                      type={promo.largeScreenImageUrl?.type}
                      link={promo.largeScreenImageUrl?.link}
                      href={`/promo/${promo.promoId}?productGroupPage=${productGroupPage}&collectionTitle=${promo.title}`}
                    />

                    {/* <Link
                      href={`/promo/${promo.promoId}?productGroupPage=${productGroupPage}&collectionTitle=${promo.title}`}
                      className="absolute bottom-6 left-6 z-10"
                    >
                      <div className="text-white bg-primary text-base sm:text-lg md:text-xl font-bold border-2 border-white px-4 sm:px-5 py-2 hover:bg-white hover:text-primary cursor-pointer rounded-md transition">
                        Shop Now
                      </div>
                    </Link> */}
                  </div>
                ))}
              </Carousel>
            )}
          </div>
          <div className=" block md:hidden">
            <Carousel
              slideInterval={5000}
              className="h-[70vh]"
              leftControl={<span></span>}
              rightControl={<span></span>}
            >
              {promos?.map((promo: PromoInterface) => (
                <Link
                  href={`/promo/${promo?.promoId}?productGroupPage=${productGroupPage}&collectionTitle=${promo?.title}`}
                  key={promo?.promoId}
                  className="relative h-full"
                >
                  {/* <Link
                    href={`/promo/${promo?.promoId}?productGroupPage=${productGroupPage}&collectionTitle=${promo?.title}`}
                  >
                    <div className="text-white z-50 bg-transparent text-sm font-bold absolute bottom-2 left-1 border-2 border-white px-5 py-2 hover:bg-white hover:text-primary cursor-pointer rounded-md">
                      Shop Now
                    </div>
                  </Link> */}
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
                </Link>
              ))}
            </Carousel>
          </div>
        </>
      )}
      <div className=" block md:hidden">
        {promos?.length === 1 && (
          <Link
            href={`/promo/${promos[0]?.promoId}?productGroupPage=${productGroupPage}&collectionTitle=${promos[0]?.title}`}
            className="relative h-full"
          >
            {/* <div className="">
              <div className="text-white z-50 bg-transparent text-sm font-bold absolute bottom-2 left-1 border-2 border-white px-5 py-2 hover:bg-white hover:text-primary cursor-pointer rounded-md">
                Shop Now
              </div>
            </div> */}
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
  );
};

export default SectionHeader;
