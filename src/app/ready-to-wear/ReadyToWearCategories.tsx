"use client";

import WomenImage from "@/images/rtw_women.webp";
import MenImage from "@/images/rtw_men.webp";
import KidsImage from "@/images/rtw_kid.webp";
import DressImage from "@/images/rtw_dress.webp";
import MatchingSetImage from "@/images/rtw_matching.webp";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useEffect, useState } from "react";
import Link from "next/link";
import { StaticImageData } from "next/image";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import ShoesImage from "@/images/sneakers_1.webp";
import { getCurrencySmallSymbol } from "@/utils/helpers";

const categories = [
  {
    id: 1,
    label: "WOMEN",
    matchedHref:
      "/collections/gender=Female/ageGroup=Adults/isReadyMade=true/productType=readyMadeCloth,readyMadeShoe?collectionTitle=ALL%20WOMEN'S%20READY%20TO%20WEAR%20COLLECTIONS&productGroupPage=READY%20TO%20WEAR",
    params: {
      gender: "Female",
      ageGroup: "Adults",
      isReadyMade: true,
    },
    image: WomenImage,
  },

  {
    id: 2,
    label: "MEN",
    matchedHref:
      "/collections/gender=Male/ageGroup=Adults/isReadyMade=true/productType=readyMadeCloth,readyMadeShoe?collectionTitle=ALL%20MEN'S%20READY%20TO%20WEAR%20COLLECTIONS&productGroupPage=READY%20TO%20WEAR",
    params: {
      gender: "Male",
      ageGroup: "Adults",
      isReadyMade: true,
    },
    image: MenImage,
  },
  {
    id: 3,
    label: "KIDS",

    matchedHref:
      "/collections/ageGroup=Kids/isReadyMade=true/productType=readyMadeCloth,readyMadeShoe?collectionTitle=ALL%20KIDS%20READY%20TO%20WEAR%20COLLECTIONS&productGroupPage=READY%20TO%20WEAR",
    params: {
      ageGroup: "Kids",
      isReadyMade: true,
    },
    image: KidsImage,
  },
  {
    id: 4,
    label: "DRESSES",
    matchedHref:
      "/collections/ageGroup=Adults/gender=Female/isReadyMade=true/main=Dress/productType=readyMadeCloth?collectionTitle=ALL%20READY%20TO%20WEAR%20DRESSES&productGroupPage=READY%20TO%20WEAR",
    params: {
      isReadyMade: true,
      main: "Dress",
      ageGroup: "Adults",
      productType: "readyMadeCloth",
      gender: "Female",
    },
    image: DressImage,
  },
  {
    id: 5,
    label: "MATCHING SETS",
    matchedHref:
      "/collections/ageGroup=Adults/isReadyMade=true/main=Matching Set?collectionTitle=ALL%20READY%20TO%20WEAR%20MATCHING%20SETS&productGroupPage=READY%20TO%20WEAR",
    params: {
      isReadyMade: true,
      main: "Matching Set",
      ageGroup: "Adults",
    },
    image: MatchingSetImage,
  },
  {
    id: 6,
    label: "SHOES",
    matchedHref:
      "/collections/ageGroup=Adults/isReadyMade=true/productType=readyMadeShoe?collectionTitle=ALL%20READY%20TO%20WEAR%20SHOES&productGroupPage=READY%20TO%20WEAR",
    params: {
      isReadyMade: true,
      ageGroup: "Adults",
      productType: "readyMadeShoe",
    },
    image: ShoesImage,
  },
];

type CategoryType = {
  id: number;
  label: string;
  matchedHref: string;
  minPrice: number;
  currency: string;
  image: StaticImageData;
};

const ReadyToWearCategories = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [data, setData] = useState<CategoryType[]>();
  const [minPriceTrigger, getMinPriceTriggerStatus] =
    zeapApiSlice.useLazyGetMinProductPriceQuery();
  const isLoading = getMinPriceTriggerStatus.isLoading;
  useEffect(() => {
    if (!token) return;
    const newData: CategoryType[] = [];
    categories.forEach((category) => {
      minPriceTrigger({
        ...category.params,
      })
        .unwrap()
        .then((res) => {
          const minPrice = res.data.minPrice;
          const currency = res.data.currency || "NGN";
          if (!minPrice || minPrice <= 0) {
            return;
          }
          newData.push({
            label: category.label,
            matchedHref: category.matchedHref,
            minPrice: minPrice,
            currency: currency,
            image: category.image,
            id: category.id,
          });
          if (newData.length === categories.length) {
            setData(newData.sort((a, b) => a.id - b.id));
          }
        })
        .catch((err) => {
          console.error("Error fetching min price:", err);
        });
    });
  }, [minPriceTrigger, token]);
  return (
    <>
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {Array.from({ length: 6 }).map((_, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-gray-200 rounded-lg shadow h-[100vh] animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300 rounded mb-2"></div>
              <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
              <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {data?.map((category) => (
          <Link
            key={category.id}
            href={category.matchedHref}
            className="flex flex-col group items-center justify-center p-4 rounded-lg shadow  transition-shadow duration-300 h-[100vh]  relative xl:brightness-95 hover:brightness-105 hover:shadow-lg"
            style={{
              backgroundImage: `url(${category.image.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* <Image
              src={category.image}
              alt={category.label}
              width={200}
              height={200}
              loading="lazy"
              className="w-full h-[45rem] object-cover mb-2 rounded"
            /> */}
            <div className="absolute  bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 rounded-b-lg group-hover:bg-opacity-70  transition-all duration-3000 ease-in-out h-[6rem] group-hover:h-[8rem] ">
              <div className="flex flex-col">
                <h3 className="text-white text-lg font-extrabold mb-2">
                  {category.label}
                </h3>
                <p className="text-white text-sm">
                  From{" "}
                  <span className="font-bold">
                    {getCurrencySmallSymbol(category.currency)}
                    {category.minPrice.toLocaleString()}
                  </span>
                </p>
                <span className="hidden uppercase group-hover:flex justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 text-white text-sm font-semibold mt-2 bg-primary px-2 py-1 rounded animate-slide-up ">
                  Shop Now
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ReadyToWearCategories;
