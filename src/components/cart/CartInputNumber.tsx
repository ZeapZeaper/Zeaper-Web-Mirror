"use client";

import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useEffect, type FC } from "react";

export interface InputNumberProps {
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  desc?: string;
  _id?: string;
  setServerError: (value: string) => void;
  setIsLoading: (value: boolean) => void;
}

const CartInputNumber: FC<InputNumberProps> = ({
  className = "w-full",
  value = 1,
  min = 1,
  max = 99,
  label,
  desc,
  _id,
  setServerError,
  setIsLoading,
}) => {
  const [increaseQuantity, increaseQuantityStatus] =
    zeapApiSlice.useIncreaseProductQuantityInBasketMutation();
  const [decreaseQuantity, decreaseQuantityStatus] =
    zeapApiSlice.useDecreaseProductQuantityInBasketMutation();
  const isLoading =
    increaseQuantityStatus.isLoading || decreaseQuantityStatus.isLoading;

  useEffect(() => {
    setIsLoading(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleClickDecrement = () => {
    const payload = {
      _id,
    };
    decreaseQuantity({ payload })
      .unwrap()
      .then(() => {
        setServerError("");
      })
      .catch((err) => {
        setServerError(err.data.error);
        setTimeout(() => {
          setServerError("");
        }, 5000);
      });
  };
  const handleClickIncrement = () => {
    const payload = {
      _id,
    };
    increaseQuantity({ payload })
      .unwrap()
      .then(() => {
        setServerError("");
      })
      .catch((err) => {
        setServerError(err.data.error);
        setTimeout(() => {
          setServerError("");
        }, 5000);
      });
  };

  const renderLabel = () => {
    return (
      <div className="flex flex-col">
        <span className="font-medium">{label}</span>
        {desc && (
          <span className="text-xs font-normal text-neutral-500">{desc}</span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`nc-InputNumber flex items-center justify-between space-x-5 ${className}`}
    >
      {label && renderLabel()}

      <div className="nc-NcInputNumber__content flex w-[104px] items-center justify-between sm:w-28">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-xl hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400 cursor-pointer"
          type="button"
          onClick={handleClickDecrement}
          disabled={min >= value}
        >
          -
        </button>
        <span className="block flex-1 select-none text-center leading-none">
          {value}
        </span>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-xl hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400 cursor-pointer"
          type="button"
          onClick={handleClickIncrement}
          disabled={max ? max <= value : false}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartInputNumber;
