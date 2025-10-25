"use client";
// import { TbBrandPaypal } from "react-icons/tb";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
// import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { globalSelectors } from "@/redux/services/global.slice";
import { useSelector } from "react-redux";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import CartItem from "@/components/cart/CartItem";
import { useState } from "react";
import { Alert } from "flowbite-react";
import LoadingDots from "@/components/loading/LoadingDots";
import { getCurrencySmallSymbol, numberWithCommas } from "@/utils/helpers";
import ApplyDiscount from "@/components/cart/ApplyDiscount";
import EmptyBasket from "@/components/cart/EmptyBasket";
import { useRouter } from "next/navigation";
import LoadingImageBars from "@/components/loading/LoadingImageBars";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const CartPage = () => {
  const router = useRouter();
  const token = useSelector(globalSelectors.selectAuthToken);

  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions: ColInterface[] =
    options?.readyMadeClothes?.colorEnums || [];
  const cartQuery = zeapApiSlice.useGetCartQuery({}, { skip: !token });
  const cart = cartQuery?.data?.data || null;
  const isFulfilled = cartQuery?.status === "fulfilled";

  const basketItems = cart?.basketItems || [];
  const voucherCode = cart?.voucher?.code || "";
  const subTotal = cart?.subTotal || 0;

  const currency = cart?.currency || "NGN";
  const appliedVoucherAmount = cart?.appliedVoucherAmount || 0;
  const total = cart?.total || 0;

  return (
    <div>
      <main className="container py-6 lg:pb-28  ">
        <div className="mb-7">
          <h2 className="block text-2xl font-medium sm:text-3xl lg:text-4xl">
            My Cart
          </h2>
        </div>

        <hr className="my-10 border-neutral-300 xl:my-12" />

        <div className="flex flex-col lg:flex-row">
          {serverError && <Alert color="failure">{serverError}</Alert>}

          <div className="w-full divide-y divide-neutral-300 lg:w-[60%] xl:w-[55%]">
            {(cartQuery.isLoading || productOptionsQuery.isLoading) && (
              <div className="grid grid-cols-1 gap-4">
                {Array.from({ length: 24 }).map((_, i) => (
                  <LoadingImageBars key={i} />
                ))}
              </div>
            )}
            {isFulfilled && basketItems?.length === 0 && <EmptyBasket />}
            {basketItems?.length > 0 &&
              [...basketItems]
                .reverse()
                .map((item, index) => (
                  <CartItem
                    key={index}
                    item={item}
                    cart={cart}
                    setServerError={setServerError}
                    setIsLoading={setIsLoading}
                    colorOptions={colorOptions}
                  />
                ))}
          </div>
          <div className="my-10 shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:mx-16 2xl:mx-20" />
          <div className="flex-1">
            <div className="sticky top-28">
              <h3 className="text-2xl font-semibold">Summary</h3>
              <div className="mt-7 divide-y divide-neutral-300 text-sm">
                {(cartQuery.isLoading || productOptionsQuery.isLoading) && (
                  <div className="grid grid-cols-1 gap-4">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <LoadingImageBars key={i} showImage={false} />
                    ))}
                  </div>
                )}
                <div className="flex justify-between pb-4">
                  <span>Subtotal</span>

                  <span className="font-semibold">
                    {getCurrencySmallSymbol(currency)}
                    {numberWithCommas(subTotal)}
                  </span>
                </div>
                {appliedVoucherAmount > 0 && (
                  <div className="flex justify-between pb-4">
                    <span>Voucher Discount</span>
                    <span className="font-semibold text-red-600">
                      -{getCurrencySmallSymbol(currency)}
                      {numberWithCommas(appliedVoucherAmount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-4">
                  <span>Estimated Delivery & Handling</span>
                  <span className="font-semibold">Calculated at Checkout</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span>
                  {getCurrencySmallSymbol(currency)}
                  {numberWithCommas(total)}
                </span>
              </div>
              <hr className="my-10 border-neutral-300" />
              <ApplyDiscount voucherCode={voucherCode} />
              <hr className="my-10 border-neutral-300" />

              <ButtonPrimary
                disabled={isLoading || basketItems?.length === 0}
                onClick={() => {
                  router.push("/checkout");
                }}
                className={`mt-8 w-full ${
                  isLoading || basketItems?.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isLoading ? <LoadingDots /> : "Checkout Now"}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
