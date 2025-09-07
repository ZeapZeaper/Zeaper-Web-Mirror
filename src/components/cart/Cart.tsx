import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ButtonCircle3 from "@/shared/Button/ButtonCircle3";
import { MdClose } from "react-icons/md";
import { getCurrencySmallSymbol, numberWithCommas } from "@/utils/helpers";
import { BasketInterface } from "@/interface/interface";

import { useState } from "react";
import { Alert } from "flowbite-react";
import LoadingDots from "../loading/LoadingDots";
import CartItem from "./CartItem";
import { useRouter } from "next/navigation";

const Cart = ({
  cart,
  colorOptions,
  isLoading,
  setIsLoading,
  setIsOpen,
}: {
  cart: BasketInterface;
  colorOptions: { name: string; hex?: string; background?: string }[];
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}) => {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const cartItems = cart?.basketItems;

  return (
    <div>
      <div className="relative ">
        <div>
          <div className="relative ">
            <div className="hiddenScrollbar  overflow-y-auto p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Shopping cart</h3>
                <ButtonCircle3
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-neutral-100"
                >
                  <MdClose className="text-2xl" />
                </ButtonCircle3>
              </div>

              {serverError && <Alert color="failure">{serverError}</Alert>}
              <div className="divide-y divide-neutral-300 max-h-[65vh] overflow-y-auto">
                {cartItems?.length > 0 &&
                  [...cartItems]
                    .reverse()
                    .map((item) => (
                      <CartItem
                        key={item._id}
                        item={item}
                        cart={cart}
                        setServerError={setServerError}
                        setIsLoading={setIsLoading}
                        colorOptions={colorOptions}
                      />
                    ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="flex justify-between">
                <span>
                  <span className="font-medium">Subtotal</span>
                  <span className="block text-sm text-neutral-500">
                    Shipping calculated at checkout.
                  </span>
                </span>
                <span className="text-xl font-medium">
                  {" "}
                  {getCurrencySmallSymbol(cart?.currency)}
                  {numberWithCommas(cart?.subTotal)}
                </span>
              </p>
              <div className="mt-5 flex items-center gap-5">
                <ButtonPrimary
                  onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                    if (e) {
                      e.stopPropagation();
                      e.preventDefault();
                    }

                    router.push("/checkout");
                  }}
                  className={`w-full flex-1 transition delay-700 duration-300 ease-in-out cursor-pointer ${
                    isLoading && "bg-white border-2 border-primary"
                  }`}
                >
                  {isLoading ? <LoadingDots /> : "Checkout"}
                </ButtonPrimary>
                <ButtonSecondary
                  onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                    if (e) {
                      e.stopPropagation();
                      e.preventDefault();
                    }

                    router.push("/cart");
                  }}
                  className="w-full flex-1 border-2 border-primary text-primary cursor-pointer"
                >
                  View cart
                </ButtonSecondary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
