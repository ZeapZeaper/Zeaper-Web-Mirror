import { AuthContext } from "@/contexts/authContext";
import { BasketInterface } from "@/interface/interface";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import React from "react";
import Cart from "./Cart";

const CartPop = ({
  setIsOpen,
  setShowPopover,
  cart,
  colorOptions,
  isLoading,
  setIsLoading,
  className,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setShowPopover?: (value: boolean) => void;
  cart: BasketInterface;
  colorOptions: { name: string; hex?: string; background?: string }[];
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  className?: string;
}) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const isGuest = user?.isGuest;

  const cartItems = cart?.basketItems || [];
  const handleClose = () => {
    if (setShowPopover) {
      setShowPopover(false);
    }
    setIsOpen(false);
  };

  return (
    <div
      className={`cursor-pointer fixed  overflow-y-auto bg-white p-4 transition-transform  right-5 top-30 h-100 w-100 transform-none z-50 shadow-xl rounded-md ${className}`}
      onMouseEnter={() => {
        setShowPopover?.(true);
        setIsOpen(true);
      }}
      onMouseLeave={handleClose}
      //   onMouseOut={handleClose}
    >
      {cartItems.length === 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center ">
            <p className="text-md text-center text-gray-500 text-info">
              Your cart is empty
            </p>
          </div>
          {isGuest && (
            <div className="flex items-center justify-center">
              <p className="text-md text-center text-gray-500">
                Have an account? Sign in to see items you may have added
                previously.
              </p>
            </div>
          )}
          <div className="flex   justify-between">
            <ButtonPrimary
              onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                if (e) {
                  e.stopPropagation();
                  e.preventDefault();
                }
                handleClose();
                router.push("/products/newest-arrival");
              }}
            >
              Continue Shopping
            </ButtonPrimary>
            {isGuest && (
              <ButtonSecondary
                onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                  if (e) {
                    e.stopPropagation();
                    e.preventDefault();
                  }
                  handleClose();
                  router.push("/account/login");
                }}
                className="w-1/2 bg-gold"
              >
                Sign In
              </ButtonSecondary>
            )}
          </div>
        </div>
      )}
      {cartItems.length > 0 && (
        <Cart
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          cart={cart}
          colorOptions={colorOptions}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default CartPop;
