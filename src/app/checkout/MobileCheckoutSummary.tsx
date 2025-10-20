import CartItem from "@/components/cart/CartItem";
import { BasketInterface } from "@/interface/interface";

import React from "react";

const MobileCheckoutSummary = ({
  cart,
  colorOptions,
  setServerError,
  setIsLoading,
  getEstimatedDeliveryDates,
}: {
  setServerError: (value: string) => void;
  cart: BasketInterface;
  setIsLoading: (value: boolean) => void;
  colorOptions: { name: string; hex?: string; background?: string }[];
  getEstimatedDeliveryDates: (sku: string, method: string) => string | null;
}) => {
  const basketItems = cart?.basketItems || [];
  const [active, setActive] = React.useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      data-inactive-classes="text-gray-500 dark:text-gray-400"
      className="w-full"
    >
      <h2 id="accordion-flush-heading-1">
        <button
          onClick={handleClick}
          type="button"
          className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500  dark:text-gray-400 gap-3"
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="true"
          aria-controls="accordion-flush-body-1"
        >
          <div className="bg-neutral-100 p-2 font-semibold">
            <span className="text-lg ">Order Summary</span>
          </div>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        className={`py-5  text-sm flex flex-col ${active ? "block" : "hidden"}`}
        aria-labelledby="accordion-flush-heading-1"
      >
        <div className=" divide-y divide-neutral-300 ">
          {basketItems?.length > 0 &&
            [...basketItems].reverse().map((item) => (
              <div
                key={item._id}
                className="flex flex-col mb-2 "
              >
                <CartItem
                  item={item}
                  cart={cart}
                  setServerError={setServerError}
                  setIsLoading={setIsLoading}
                  colorOptions={colorOptions}
                />

                <div className="flex flex-col gap-0 text-sm text-info pl-8">
                  {getEstimatedDeliveryDates(
                    item.sku,
                    "standardDeliveryDate"
                  ) && (
                    <div className="text-xs text-gray-500 flex ">
                      Estimated Standard Delivery:{" "}
                      {getEstimatedDeliveryDates(
                        item.sku,
                        "standardDeliveryDate"
                      )}
                    </div>
                  )}
                  {getEstimatedDeliveryDates(
                    item.sku,
                    "expressDeliveryDate"
                  ) && (
                    <div className="text-xs text-gray-500 flex justify-end">
                      Estimated Express Delivery:{" "}
                      {getEstimatedDeliveryDates(
                        item.sku,
                        "expressDeliveryDate"
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MobileCheckoutSummary;
