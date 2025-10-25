"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import StartSelling from "../../components/shop/StartSelling";
import OurDifference from "./OurDifference";
import SellingSimplified from "./SellingSimplified";
import SellingProducts from "./SellingProducts";
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { SignInSignUpDrawer } from "@/authentication/SignInSignUpDrawer";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { UserInterface } from "@/interface/interface";
const drawerTheme = {
  root: {
    base: "fixed z-50 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800",
    backdrop: "fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80",
    edge: "bottom-16",
    position: {
      right: {
        on: "right-0 top-0 h-[100vh] w-[100vw] md:w-[35rem] transform-none text-black",
        off: "right-0 top-0 h-[100vh] w-80 translate-x-full",
      },
    },
  },
};

const SellPage = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    document.body.classList.remove("overflow-y-hidden");
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isAuthenticated && !user?.isGuest) {
      handleClose();
    }
  }, [isAuthenticated, user?.isGuest, handleClose]);

  const callback = (userData?: UserInterface) => {
    console.log("Callback called");
    handleClose();
    console.log("userData is", userData);
    if (userData && !userData?.isGuest && !userData?.shopId) {

      return router.push("/vendor-onboarding?addShop=true");
    }
    if (userData && !userData?.isGuest && userData?.shopId) {
      return router.push("/shop");
    }
  };
  return (
    <>
      <div
        className={`flex flex-col p-4 md:p-12 lg:p-16 ${
          isOpen && "brightness-[20%] bg-neutral-50 blur-sm"
        }`}
      >
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Earn More With Us
        </h1>
        <span>
          <p className="text-md md:text-lg mt-4 font-semibold text-center text-slate-600 ">
            Join our platform and start selling your products to a wider
            audience.
          </p>
          <p className="text-md md:text-lg  font-semibold text-center text-slate-600">
            We offer a simple and efficient way to manage your sales and reach
            customers around the world.
          </p>

          <span className="flex justify-center mt-4 ">
            <StartSelling setIsOpen={setIsOpen} />
          </span>
        </span>
        <div className="md:p-6 lg:p-12">
          <OurDifference setIsOpen={setIsOpen} />
        </div>
        <div className="md:p-6 lg:p-12">
          <SellingSimplified setIsOpen={setIsOpen} />
        </div>
        <div className="md:p-6 lg:p-12">
          <SellingProducts />
        </div>

        <span className="flex justify-center mt-4 ">
          <StartSelling setIsOpen={setIsOpen} />
        </span>
      </div>
      {isOpen && (
        <Drawer
          theme={drawerTheme}
          open={isOpen}
          onClose={handleClose}
          position="right"
        >
          <DrawerHeader />
          <DrawerItems>
            <SignInSignUpDrawer callBack={callback} />{" "}
          </DrawerItems>
        </Drawer>
      )}
    </>
  );
};

export default SellPage;
