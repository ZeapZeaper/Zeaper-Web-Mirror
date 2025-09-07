"use client";
import { BasketItemIterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartPop from "../cart/CartPop";
import { useDebounce } from "./SearchHeader";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/authContext";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const CartMenuBar = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const token = useSelector(globalSelectors.selectAuthToken);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token || !user }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions: ColInterface[] = options?.readyMadeClothes?.colorEnums;
  const cartQuery = zeapApiSlice.useGetCartQuery(
    {},
    { skip: !token || !user?._id }
  );
  const cart = cartQuery?.data?.data;
  const basketItems = cart?.basketItems || [];
  const totalItems = basketItems.reduce(
    (acc: number, item: BasketItemIterface) => acc + item.quantity,
    0
  );
  const handleClose = useDebounce(() => {
    if (showPopover) {
      return;
    }

    setIsOpen(false);
  }, 100);
  const handleOpen = useDebounce(() => {
    setIsOpen(true);
  }, 0);

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

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onClick={() => {
        handleClose();
        router.push("/cart");
      }}
    >
      <button
        type="button"
        className="relative inline-flex items-center p-2 text-sm  text-center  rounded-full hover:bg-slate-200  focus:outline-none "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>

        <span className="sr-only">Cart</span>
        {totalItems > 0 && (
          <div
            className={`absolute inline-flex items-center justify-center w-5 h-5 md:w-6 md:w-6  text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full top-1 md:-top-0 -end-0 dark:border-gray-900 ${animate}`}
          >
            {totalItems}
          </div>
        )}
      </button>
      <div className="hidden md:block">
        {isOpen && (
          <CartPop
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setShowPopover={setShowPopover}
            cart={cart}
            colorOptions={colorOptions}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
    </div>
  );
};

export default CartMenuBar;
