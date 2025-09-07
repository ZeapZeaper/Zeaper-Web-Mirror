"use client";

import Skeleton from "@/components/loading/Skeleton";
import ShopPaymentsNav from "@/components/shop/ShopPaymentsNav";
import { AuthContext } from "@/contexts/authContext";
import { ShopPaymentInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Alert } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShopPaymentCard from "../../ShopPaymentCard";

const ShopPaymentPage = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "all";
  const token = useSelector(globalSelectors.selectAuthToken);
  const { user } = useContext(AuthContext);
  const shopId = user?.shopId;
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [input, setInput] = useState("");
  const shopPaymentsQuery = zeapApiSlice.useGetShopPaymentsQuery(
    { shopId },
    { skip: !token || !shopId }
  );
  const isLoading = shopPaymentsQuery.isLoading;
  const shopPayments = shopPaymentsQuery?.data?.data;
  const isFulfilled = shopPaymentsQuery?.status === "fulfilled";

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
    if (shopPayments) {
      const result = shopPayments?.filter((row: ShopPaymentInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof ShopPaymentInterface]);
        });
      });

      setFilteredPayments(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, shopPayments]);

  const getFilteredPayments = () => {
    if (filter === "all") {
      return filteredPayments;
    }
    return filteredPayments?.filter(
      (payment: ShopPaymentInterface) => payment.shopRevenue?.status === filter
    );
  };

  return (
    <div className="container pb-6 lg:pb-28">
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
          My Shop Payments
        </h2>
        {shopPayments?.length > 0 && (
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
                  placeholder="Search shopPayments"
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
      {shopId && (
        <div className="flex  mt-4">
          <ShopPaymentsNav shopId={shopId} filter={filter} />
        </div>
      )}
      {shopPayments?.length === 0 && isFulfilled && (
        <div className="w-full flex items-center justify-center my-16">
          <Alert className="w-100 " color="info">
            You have no payments yet.
          </Alert>
        </div>
      )}
      {shopPayments?.length > 0 && filteredPayments?.length === 0 && (
        <div className="w-full flex items-center justify-center my-16">
          <Alert className="w-100 " color="info">
            No payments found for your search or filter criteria.
          </Alert>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 my-4">
        {getFilteredPayments().map(
          (payment: ShopPaymentInterface, index: number) => (
            <div
              key={index}
              className="flex justify-center items-center w-full"
            >
              <ShopPaymentCard payment={payment} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ShopPaymentPage;
