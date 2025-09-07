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

const BuyAgainPage = () => {
  const { user } = useContext(AuthContext);
  const token = useSelector(globalSelectors.selectAuthToken);

  const getBuyAgainProductsQuery = zeapApiSlice.useGetBuyAgainProductsQuery(
    {},
    { skip: !token }
  );

  const products = getBuyAgainProductsQuery?.data?.data || [];

  const isLoading = getBuyAgainProductsQuery.isLoading;
  const isFulfilled = getBuyAgainProductsQuery?.status === "fulfilled";
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data || null;
  const colorOptions: ColInterface[] =
    options?.readyMadeClothes?.colorEnums || [];
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="mb-0 font-bold text-xl text-neutral-900">
          Recently Viewed
        </span>
      </div>
      <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-4 lg:grid-cols-5 ">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
      </div>
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 ">
        {products?.length > 0 &&
          products?.map((product: ProductInterface) => (
            <ProductCard
              key={product.productId}
              product={product}
              colorOptions={colorOptions}
            />
          ))}
      </div>
      {products?.length === 0 && isFulfilled && (
        <div className="w-full h-56 flex flex-col items-center justify-center bg-white ">
          <p className="text-info">
            You are yet to buy anything or none of your delivered orders are
            available for re-order
          </p>
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

export default BuyAgainPage;
