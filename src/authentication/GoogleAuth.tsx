import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import googleIconImage from "@/images/googleIcon.png";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";

import LoadingDots from "@/components/loading/LoadingDots";

const GoogleAuth = ({ callBack }: { callBack?: () => void }) => {

  const { loading,  loginWithGoogle } = useContext(AuthContext);

 

  const isLoading =  loading;

  
  const handleLoginWithGoogle = async () => {
    await loginWithGoogle(callBack);
  };
  return (
    <>
      {" "}
      <ButtonSecondary
        onClick={handleLoginWithGoogle}
        className="flex w-full items-center gap-3 border-2 border-primary text-primary !bg-lightGold"
      >
        <Image
          src={googleIconImage}
          alt="Google"
          width={20}
          height={20}
          className="h-5 w-5"
        />
        {isLoading ? <LoadingDots /> : "Continue with Google"}
      </ButtonSecondary>
    </>
  );
};

export default GoogleAuth;
