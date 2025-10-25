"use client";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import AccountNavBar from "@/components/account/AccountNavBar";
import Skeleton from "@/components/loading/Skeleton";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Alert } from "flowbite-react";

import MyRecommendedProducts from "@/components/products/MyRecommendedProducts";

import { numberWithCommas } from "@/utils/helpers";
import ConvertPoints from "./ConvertPoints";
import { HiGift } from "react-icons/hi";
import { VoucherInterface } from "@/interface/interface";
import VoucherCard from "./VoucherCard";

const MeasurementTemplatesPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const token = useSelector(globalSelectors.selectAuthToken);
  const [tab, setTab] = useState("active");
  const getPointsQuery = zeapApiSlice.useGetPointsQuery({}, { skip: !token });
  const totalPoints = getPointsQuery?.data?.data?.totalPoints;
  const availablePoints = getPointsQuery?.data?.data?.availablePoints;
  const redeemedPoints = getPointsQuery?.data?.data?.redeemedPoints;
  const getActiveVouchersQuery = zeapApiSlice.useGetActiveVouchersQuery(
    {},
    { skip: !token }
  );
  const getInActiveVouchersQuery = zeapApiSlice.useGetInActiveVouchersQuery(
    {},
    { skip: !token }
  );

  const isLoading =
    getActiveVouchersQuery.isLoading ||
    getInActiveVouchersQuery.isLoading ||
    getPointsQuery.isLoading;
  const isFulfilled =
    getActiveVouchersQuery?.status === "fulfilled" &&
    getInActiveVouchersQuery?.status === "fulfilled" &&
    getPointsQuery?.status === "fulfilled";
  const activeVouchers = getActiveVouchersQuery?.data?.data;
  const inActiveVouchers = getInActiveVouchersQuery?.data?.data;

  useEffect(() => {
    if (user?.isGuest) {
      router.push("/account/login");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen md:px-2 h-full overflow-auto ">
      <div className="grid  grid-cols-1 md:grid-cols-4 p-4 md:p-6 md:px-10">
        <div className="hidden md:col-span-1 md:block">
          <AccountNavBar />
        </div>
        <div className="col-span-1 md:col-span-3  w-full flex flex-col gap-4">
          <h1 className="text-2xl  font-bold sm:text-3xl lg:text-4xl mb-4">
            Rewards
          </h1>

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full ">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} />
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2 min-w-[90vw] md:min-w-[40vw] justify-center items-center border border-slate-300 dark:border-slate-700 rounded-lg p-4">
            <h1 className="text-xl font-bold">My Points</h1>
            <Alert color="info">
              <span className="flex flex-col gap-2">
                <p className="text-sm">
                  Hurray! The more you shop, the more points you earn.
                </p>
              </span>
            </Alert>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="bg-white dark:bg-slate-800  rounded-lg p-4 flex flex-col gap-2 items-center">
                <h1 className="text-lg font-bold">Total Points</h1>
                <p className="text-lg bg-blue-100 text-blue-600 rounded-lg p-1">
                  {numberWithCommas(totalPoints)}{" "}
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800  rounded-lg p-4 flex flex-col gap-2 items-center">
                <h1 className="text-lg font-bold">Available Points</h1>
                <p className="text-lg bg-green-100 text-green-600 rounded-lg p-1">
                  {numberWithCommas(availablePoints)}{" "}
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800  rounded-lg p-4 flex flex-col gap-2 items-center">
                <h1 className="text-lg font-bold">Redeemed Points</h1>
                <p className="text-lg bg-red-100 text-red-600 rounded-lg p-1">
                  {numberWithCommas(redeemedPoints)}
                </p>
              </div>
            </div>

            <ConvertPoints availablePoints={availablePoints} />
          </div>
          <div className="flex flex-col gap-2 min-w-[90vw] md:min-w-[40vw] justify-center items-center border border-slate-300 dark:border-slate-700 rounded-lg p-4">
            <h1 className="text-xl font-bold">My vouchers</h1>
            {isFulfilled && (
              <div className="overflow-x-auto mb-4 w-full">
                <ul className="grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow w-full">
                  <li
                    onClick={() => {
                      setTab("active");
                    }}
                    className={`me-2 cursor-pointer text-center   ${
                      tab === "active"
                        ? "text-green-700 border-secondary border-b-8 active bg-green-200"
                        : "bg-slate-50"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center p-4   rounded-t-lg   group  
                    }`}
                    >
                      <HiGift className=" mr-1" />
                      Active
                    </span>
                  </li>
                  <li
                    className={`me-2 cursor-pointer text-center   ${
                      tab === "inActive"
                        ? "text-red-700 border-secondary border-b-8 active bg-red-200"
                        : "bg-slate-50"
                    }`}
                    onClick={() => {
                      setTab("inActive");
                    }}
                  >
                    <span
                      className={`inline-flex items-center justify-center p-4   rounded-t-lg   group  
                      }`}
                      aria-current="page"
                    >
                      <HiGift className=" mr-1" />
                      Inactive
                    </span>
                  </li>
                </ul>
              </div>
            )}
            {isFulfilled && tab === "active" && activeVouchers.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4 p-4 bg-grey7 my-16">
                <div className="flex flex-col items-center gap-1 text-info   rounded-lg">
                  <span className="font-medium">
                    You have no active vouchers yet.
                  </span>
                </div>
              </div>
            )}
            {isFulfilled &&
              tab === "inActive" &&
              inActiveVouchers.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-4 p-4 bg-grey7 my-16">
                  <div className="flex flex-col items-center gap-1 text-info   rounded-lg">
                    <span className="font-medium">
                      You have no inactive vouchers yet.
                    </span>
                  </div>
                </div>
              )}
            {isFulfilled && tab === "active" && activeVouchers?.length > 0 && (
              <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 ">
                {activeVouchers?.map((voucher: VoucherInterface) => (
                  <VoucherCard key={voucher._id} voucher={voucher} />
                ))}
              </div>
            )}
            {isFulfilled &&
              tab === "inActive" &&
              inActiveVouchers?.length > 0 && (
                <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 ">
                  {inActiveVouchers?.map((voucher: VoucherInterface) => (
                    <VoucherCard key={voucher._id} voucher={voucher} />
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
      <MyRecommendedProducts />
    </div>
  );
};

export default MeasurementTemplatesPage;
