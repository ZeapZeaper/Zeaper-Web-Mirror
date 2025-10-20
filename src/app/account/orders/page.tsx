"use client";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import AccountNavBar from "@/components/account/AccountNavBar";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { globalSelectors } from "@/redux/services/global.slice";
import { useSelector } from "react-redux";
import Skeleton from "@/components/loading/Skeleton";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { OrderInterface } from "@/interface/interface";
import OrderCard from "@/components/orders/OrderCard";
import { OrderDrawer } from "@/components/orders/OrderDrawer";


const OrderPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [filteredOrder, setFilteredOrder] = useState([]);

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderInterface | null>(
    null
  );
  const token = useSelector(globalSelectors.selectAuthToken);
  const getBuyerOrdersQuery = zeapApiSlice.useGetBuyerOrdersQuery(
    {},
    { skip: !token || !user?._id }
  );
  const orders = getBuyerOrdersQuery?.data?.data;
  const isLoading = getBuyerOrdersQuery.isLoading;
  const isFulfilled = getBuyerOrdersQuery?.status === "fulfilled";

  useEffect(() => {
    if (user?.isGuest) {
      router.push("/account/login");
    }
  }, [user, router]);

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
    if (orders?.length > 0) {
      const result = orders?.filter((row: OrderInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof OrderInterface]);
        });
      });

      setFilteredOrder(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, orders]);
  return (
    <div className="min-h-screen md:px-2 h-full overflow-auto ">
      <div className="grid  grid-cols-1 md:grid-cols-4 p-4 md:p-6 md:px-10">
        <div className="hidden md:col-span-1 md:block">
          <AccountNavBar />
        </div>

        {user && !user?.isGuest && (
          <div className="col-span-1 md:col-span-3  w-full">
            <h1 className="text-2xl  font-bold sm:text-3xl lg:text-4xl mb-4">
              My Orders
            </h1>
            {isLoading && (
              <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4 2xl:grid-cols-5  ">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} />
                ))}
              </div>
            )}
            {orders?.length === 0 && isFulfilled && (
              <div className="w-full   h-56 flex flex-col items-center justify-center bg-white gap-4">
                <p className="text-info">
                  You have no orders yet. Please check back later or shop now!
                </p>
                <ButtonPrimary
                  onClick={() => {
                    router.push("/");
                  }}
                  className="w-full md:w-[20rem] rounded-lg h-[3rem]"
                >
                  Continue Shopping
                </ButtonPrimary>
              </div>
            )}
            {orders?.length > 0 && (
              <div className="flex flex-col">
                <div className="flex flex-col justify-center items-center w-full">
                  <form className=" w-full md:w-[30rem] ">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                      Search
                    </label>
                    <div className="relative">
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
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                        placeholder="Search orders"
                        required
                        value={input || ""}
                        onChange={(e) => {
                          setInput(e.target.value);
                        }}
                      />
                      <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
                <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 mt-4">
                  {filteredOrder?.map((order: OrderInterface) => (
                    <div
                      key={order?.orderId}
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsOpen(true);
                      }}
                    >
                      <OrderCard order={order} />
                    </div>
                  ))}
                </div>
                {isOpen && selectedOrder && (
                  <OrderDrawer
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    order={selectedOrder}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
