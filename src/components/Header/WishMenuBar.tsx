"use client";

import { globalActions, globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/authContext";

const WishMenuBar = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector(globalSelectors.selectAuthToken);
  const [animate, setAnimate] = useState("");

  const wishListQuery = zeapApiSlice.useGetWishListQuery(
    {},
    { skip: !token || !user?._id }
  );
  const wishList = wishListQuery?.data?.data;
  const totalItems = wishList?.length || 0;

  // Animate Wishlist Number
  const handleAnimate = useCallback(() => {
    if (totalItems === 0) return;
    setAnimate("animate-bounce");
  }, [totalItems, setAnimate]);

  // Set animate when no of wishlist changes
  useEffect(() => {
    handleAnimate();
    setTimeout(() => {
      setAnimate("");
    }, 1000);
  }, [handleAnimate]);

  const dispatchWishList = useCallback(() => {
    if (wishList) {
      dispatch(globalActions.setWishList(wishList));
      dispatch(globalActions.setIsWishListLoading(false));
    }
  }, [wishList, dispatch]);

  useEffect(() => {
    if (wishList) {
      dispatchWishList();
    }
  }, [wishList, dispatchWishList]);

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        router.push("/wishlist");
      }}
    >
      <button
        type="button"
        className="relative inline-flex items-center p-2 text-sm  text-center  rounded-full hover:bg-slate-200  focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>

        <span className="sr-only">Wish List</span>
        {totalItems > 0 && (
          <div
            className={`absolute inline-flex items-center justify-center w-5 h-5 md:w-6 md:w-6  text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full top-1 md:-top-0  -end-0 dark:border-gray-900 ${animate}`}
          >
            {totalItems}
          </div>
        )}
      </button>
    </div>
  );
};

export default WishMenuBar;
