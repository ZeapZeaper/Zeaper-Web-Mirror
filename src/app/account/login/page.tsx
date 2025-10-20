"use client";
import { SignInSignUpDrawer } from "@/authentication/SignInSignUpDrawer";
import Image from "next/image";
import logo from "@/images/app_logo.png";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-neutral-50 gap-8">
      <div className="flex cursor-pointer items-center gap-2 text-primary">
        <Image
          className="rounded-md"
          src={logo}
          alt="logo"
          width={100}
          height={100}
        />
        {/* <span className={` text-2xl font-bold`}>Zeaper Fashion</span> */}
      </div>
      <SignInSignUpDrawer
        callBack={() => {
         
            router.push("/");
        
          return true;
        }}
      />
    </div>
  );
};

export default LoginPage;
