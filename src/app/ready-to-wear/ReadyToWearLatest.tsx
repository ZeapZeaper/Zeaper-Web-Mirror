"use client";

import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { ProductInterface } from "@/interface/interface";
import ProductCard from "@/components/products/ProductCard";
import Skeleton from "@/components/loading/Skeleton";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useState } from "react";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const ReadyToWearLatest = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [max, setMax] = useState(8);
  const newestArrivalProductsQuery =
    zeapApiSlice.useGetNewestArrivalProductsQuery(
      {
        limit: 100,
        pageNumber: 1,
        isReadyMade: true,
      },
      { skip: !token }
    );

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
    <div className="p-2 py-8">
      <div className="flex justify-between items-center mb-4">
        <span className="mb-0 font-extrabold text-xl md:text-2xl lg:text-3xl text-neutral-900">
          Ready to Wear Latest Arrivals
        </span>
        <ButtonPrimary href="/products/newest-arrival/readyToWear">
          View All
        </ButtonPrimary>
      </div>
      <div className="grid gap-2 md:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
        {newestArrivalProductsQuery.isLoading
          ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)
          : newestArrivalProducts
              .slice(0, max)
              .map((product: ProductInterface) => (
                <ProductCard
                  product={product}
                  key={product._id}
                  colorOptions={colorOptions}
                />
              ))}
      </div>
      {newestArrivalProducts.length > max && (
        <div className="flex justify-center mt-4">
          <ButtonPrimary onClick={() => setMax((prev) => prev + 8)}>
            Load More
          </ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default ReadyToWearLatest;
