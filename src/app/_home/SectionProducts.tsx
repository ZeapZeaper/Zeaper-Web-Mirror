"use client";

import React from "react";

// import ProductCard from "@/components/ProductCard";
import { midText } from "@/data/content";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Heading from "@/shared/Heading/Heading";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { ProductInterface } from "@/interface/interface";
import ProductCard from "@/components/products/ProductCard";
import Skeleton from "@/components/loading/Skeleton";
import SectionBespoke from "./SectionBespoke";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const SectionProducts = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const mostPopularProductsQuery = zeapApiSlice.useGetMostPopularProductsQuery(
    {
      limit: 15,
      pageNumber: 1,
    },
    { skip: !token }
  );
  const newestArrivalProductsQuery =
    zeapApiSlice.useGetNewestArrivalProductsQuery(
      {
        limit: 15,
        pageNumber: 1,
      },
      { skip: !token }
    );

  const mostPopularProductData = mostPopularProductsQuery?.data?.data || null;
  const mostPopularProducts = mostPopularProductData?.products || [];

  const newestArrivalProductData =
    newestArrivalProductsQuery?.data?.data || null;
  const newestArrivalProducts = newestArrivalProductData?.products || [];
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions: ColInterface[] =
    options?.readyMadeClothes?.colorEnums || [];

  return (
    <div className="p-2">
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <span className="mb-0 font-bold text-xl text-neutral-900">
            Popular Items
          </span>

          <ButtonPrimary href="/products/most-popular">Shop Now</ButtonPrimary>
        </div>

        <div className="grid gap-2 md:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  ">
          {mostPopularProductsQuery.isLoading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)
            : mostPopularProducts
                .slice(0, 10)
                .map((product: ProductInterface) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                    colorOptions={colorOptions}
                  />
                ))}
        </div>
        <div className="md:m-10">
          <SectionBespoke />
        </div>

        <div className="m-8 h-px w-full bg-neutral-300" />
      </div>

      <Heading showDash className="pb-8 pt-8 container ">
        <p className=""> {midText}</p>
      </Heading>
      <div className="mb-2 h-px w-full bg-neutral-300" />
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <span className="mb-0 font-bold text-xl text-neutral-900">
            Newest Arrivals
          </span>

          <ButtonPrimary href="/products/newest-arrival">
            Shop Now
          </ButtonPrimary>
        </div>

        <div className="grid gap-2 md:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {newestArrivalProductsQuery.isLoading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)
            : newestArrivalProducts
                .slice(0, 10)
                .map((product: ProductInterface) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                    colorOptions={colorOptions}
                  />
                ))}
        </div>
      </div>
    </div>
  );
};

export default SectionProducts;
