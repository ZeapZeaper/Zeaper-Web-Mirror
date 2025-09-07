"use client";
import Skeleton from "@/components/loading/Skeleton";
import ProductCard from "@/components/products/ProductCard";
import { AuthContext } from "@/contexts/authContext";
import { ProductInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Alert } from "flowbite-react";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const RecentPage = () => {
  const { user } = useContext(AuthContext);
  const token = useSelector(globalSelectors.selectAuthToken);

  const getRecentViewedProductsQuery =
    zeapApiSlice.useGetRecentViewedProductsQuery({}, { skip: !token });

  const recentViewedProducts = getRecentViewedProductsQuery?.data?.data;

  const isLoading = getRecentViewedProductsQuery.isLoading;
  const isFulfilled = getRecentViewedProductsQuery?.status === "fulfilled";
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions: ColInterface[] =
    options?.readyMadeClothes?.colorEnums || [];
  return (
    <div className="p-1  py-6 lg:pb-28">
      <div className="flex justify-between items-center">
        <span className="mb-0 font-bold text-xl text-neutral-900">
          Recently Viewed
        </span>
      </div>
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 ">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
      </div>
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 ">
        {recentViewedProducts?.length > 0 &&
          recentViewedProducts?.map((product: ProductInterface) => (
            <ProductCard
              key={product.productId}
              product={product}
              colorOptions={colorOptions}
            />
          ))}
      </div>
      {recentViewedProducts?.length === 0 && isFulfilled && (
        <div className="w-full h-56 flex flex-col items-center justify-center bg-white ">
          <p className="text-info">No Recent Views</p>
          {user?.isGuest && (
            <Alert
              className="w-full mt-4 max-w-[30rem] flex justify-center items-center"
              color="warning"
            >
              <span className="text-center w-full ">
                You can only view your recent products if you are logged in.
              </span>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentPage;
