"use client";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

import AccountNavBar from "@/components/account/AccountNavBar";

import MyRecommendedProducts from "@/components/products/MyRecommendedProducts";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "@/app/loading";
import ReviewCard from "./ReviewCard";
import { ProductReviewInterface } from "@/interface/interface";

interface ReviewInterface extends ProductReviewInterface {
  order: {
    orderId: string;
    deliveryDate: Date;
    images: { name: string; link: string; _id: string }[];
    productId: string;
    title: string;
    color: string;
    size: string;
  };
}

const ReviewsPage = () => {
  const router = useRouter();
  const token = useSelector(globalSelectors.selectAuthToken);
  const { user } = useContext(AuthContext);
  const getUserReviewsQuery = zeapApiSlice.useGetUserReviewsQuery(
    {},
    { skip: !token }
  );
  const reviews = getUserReviewsQuery?.data?.data;
  const givenReviews = reviews?.givenReviews || [];
  const pendingReviews = reviews?.pendingReviews || [];
  const isLoading = getUserReviewsQuery.isLoading;
  const isFulfilled = getUserReviewsQuery?.status === "fulfilled";
  const [tab, setTab] = useState("given");

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
        {user && !user?.isGuest && (
          <div className="col-span-1 md:col-span-3 ">
            <h1 className="text-2xl  font-bold sm:text-3xl lg:text-4xl mb-4">
              My Reviews
            </h1>
            {reviews && (
              <div className="overflow-x-auto mb-4">
                <ul className="grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow">
                  <li
                    onClick={() => {
                      setTab("given");
                    }}
                    className={`me-2 cursor-pointer text-center   ${
                      tab === "given"
                        ? "text-green-500 border-secondary border-b-8 active bg-slate-200"
                        : "bg-slate-50"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center p-4   rounded-t-lg   group  
                    }`}
                    >
                      <svg
                        className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                      Given
                    </span>
                  </li>
                  <li
                    className={`me-2 cursor-pointer text-center   ${
                      tab === "pending"
                        ? "text-green-500 border-secondary border-b-8 active bg-slate-200"
                        : "bg-slate-50"
                    }`}
                    onClick={() => {
                      setTab("pending");
                    }}
                  >
                    <span
                      className={`inline-flex items-center justify-center p-4   rounded-t-lg   group  
                      }`}
                      aria-current="page"
                    >
                      <svg
                        className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                      Pending
                    </span>
                  </li>
                </ul>
              </div>
            )}
            {pendingReviews?.length === 0 &&
              isFulfilled &&
              tab === "pending" && (
                <div className="flex flex-col items-center justify-center min:h-[15rem] md:h-full ">
                  <h2 className="text-xl font-semibold">No Pending Reviews</h2>
                  <p className="text-slate-500">
                    Start shopping and share your thoughts when your order gets
                    delivered.
                  </p>
                </div>
              )}
            {givenReviews?.length === 0 && isFulfilled && tab === "given" && (
              <div className="flex flex-col items-center justify-center min:h-[15rem] md:h-full ">
                <h2 className="text-xl font-semibold">No Reviews Yet</h2>
                <p className="text-slate-500">
                  You can have a look on the pending reviews to see delivered
                  orders waiting for your review.
                </p>
              </div>
            )}
            {isLoading && <Loading />}
            {tab === "given" && givenReviews?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {givenReviews.map((review: ReviewInterface) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            )}
            {tab === "pending" && pendingReviews?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {pendingReviews.map((review: ReviewInterface) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <MyRecommendedProducts />
    </div>
  );
};

export default ReviewsPage;
