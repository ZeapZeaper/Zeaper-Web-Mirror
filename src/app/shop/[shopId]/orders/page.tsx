"use client";

import Skeleton from "@/components/loading/Skeleton";
import ProductOrderCard from "@/components/orders/ProductOrderCard";
import { ProductOrdersInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Alert } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrdersPage = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const getAuthShopOrders = zeapApiSlice.useGetAuthShopOrdersQuery(
    {},
    { skip: !token }
  );
  const [filteredOrders, setFilteredOrders] = useState<
    ProductOrdersInterface[]
  >([]);
  const orders = getAuthShopOrders?.data?.data;
  const isLoading = getAuthShopOrders.isLoading;
  const isFulfilled = getAuthShopOrders?.status === "fulfilled";

  const [input, setInput] = useState("");

  const escapeRegExp = (value: string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const searchRegex = new RegExp(escapeRegExp(input), "i");
  // recursive search function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const search = (item: any) => {
    let found = false;

    if (typeof item === "string") {
      if (searchRegex.test(item?.toString())) {
        found = true;
        return found;
      }
    }

    if (typeof item === "object" && item !== null) {
      Object.keys(item).forEach((key) => {
        const value = item[key];
        const match = search(value);
        if (match) {
          found = true;
          return found;
        }
      });
    }
    return found;
  };

  useEffect(() => {
    if (orders) {
      const result = orders?.filter((row: ProductOrdersInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof ProductOrdersInterface]);
        });
      });

      setFilteredOrders(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, orders]);

  return (
    <div className="bg-neutral-100">
      <div className="container pb-6 lg:pb-28  pt-2">
        {" "}
        {isLoading && (
          <div className="grid gap-7 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 24 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        )}
        <div className="flex flex-col md:flex-row md:justify-between">
          <h2 className="block text-xl font-medium sm:text-2xl lg:text-3xl">
           My Shop Orders
          </h2>
          {orders?.length > 0 && (
            <div className="flex flex-col justify-center items-center w-full my-4 md:my-0 md:w-auto ">
              <form className=" w-full md:w-[30rem]  ">
                <div className="relative ">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 h-[2.5rem]"
                    placeholder="Search orders"
                    required
                    value={input || ""}
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-1 bg-primary hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        {orders?.length === 0 && isFulfilled && (
          <div className="w-full flex items-center justify-center my-16">
            <Alert className="w-100 " color="info">
              <span className="font-medium">You have no orders yet.</span>
            </Alert>
          </div>
        )}
        <div className="flex flex-col gap-8 mt-2">
          <div className="flex flex-col md:gap-4">
            <div className="md:hidden grid grid-cols-1    gap-4 w-full items-center justify-center cursor-pointer">
              {filteredOrders?.length > 0 &&
                filteredOrders?.map((productOrder: ProductOrdersInterface) => (
                  <div key={productOrder?._id} >
                    <ProductOrderCard productOrder={productOrder} />
                  </div>
                ))}
            </div>
          </div>

          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 w-full  items-center justify-center cursor-pointer ">
            {filteredOrders?.length > 0 &&
              filteredOrders?.map((productOrder: ProductOrdersInterface) => (
                <div key={productOrder?._id} >
                  <ProductOrderCard productOrder={productOrder} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
