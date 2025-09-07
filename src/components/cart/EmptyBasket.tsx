import { AuthContext } from "@/contexts/authContext";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const EmptyBasket = () => {
  const { user } = useContext(AuthContext);
  console.log("user in basket", user);
  const router = useRouter();
  return (
    <div className="bg-slate-100 h-[20rem] flex flex-col justify-center items-center px-6 w-full md:w-[40rem]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center ">
          <p className="text-md text-center text-info">Your cart is empty</p>
        </div>
        {(!user || user?.isGuest) && (
          <div className="flex items-center justify-center">
            <p className="text-md text-center text-gray-500">
              Have an account? Sign in to see items you may have added
              previously.
            </p>
          </div>
        )}
      </div>
      <div
        className={`flex flex-col md:flex-row w-full justify-center ${
          !user || user?.isGuest ? "md:justify-between" : "justify-center"
        }  mt-4 gap-2 w-full`}
      >
        <ButtonPrimary
          onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
            if (e) {
              e.stopPropagation();
              e.preventDefault();
            }

            router.push("/products/newest-arrival");
          }}
          className="md:w-1/2 "
        >
          Continue Shopping
        </ButtonPrimary>
        {(!user || user?.isGuest) && (
          <ButtonSecondary
            onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
              if (e) {
                e.stopPropagation();
                e.preventDefault();
              }
              
              router.push("/account/login");
            }}
            className="md:w-1/2 bg-gold"
          >
            Sign In
          </ButtonSecondary>
        )}
      </div>
    </div>
  );
};

export default EmptyBasket;
