import { AuthContext } from "@/contexts/authContext";

import ButtonSecondary from "@/shared/Button/ButtonSecondary";
// import { useRouter } from "next/navigation";
import { useContext } from "react";

const EmptyWishList = () => {
  const { user } = useContext(AuthContext);

  // const router = useRouter();
  return (
    <div className=" container bg-slate-100 h-[20rem] flex flex-col justify-center items-center px-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center ">
          <p className="text-md text-center text-gray-500">
            Your wish list is empty
          </p>
        </div>
        {(!user || user?.isGuest) && (
          <div className="flex  items-center justify-center">
            <p className="text-md text-center text-gray-500">
              Have an account? Sign in to share your wish list and sync across
              all your devices..
            </p>
          </div>
        )}
        {(!user || user?.isGuest) && (
          <div className="flex  items-center justify-center">
            <p className="text-md text-center text-warning">
              Note that we can only save your wish list for 30 days if you are
              not signed in.
            </p>
          </div>
        )}
      </div>
      <div className="flex w-full justify-center mt-4 gap-2">
        {(!user || user?.isGuest) && (
          <ButtonSecondary href="/account/login" className="w-1/2 ">
            Sign In
          </ButtonSecondary>
        )}
      </div>
    </div>
  );
};

export default EmptyWishList;
