import {
  BackwardIcon,
  HomeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { Alert, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import StartSelling from "./StartSelling";
import { AuthContext } from "@/contexts/authContext";
import { SignInSignUpDrawer } from "@/authentication/SignInSignUpDrawer";

const drawerTheme = {
  root: {
    base: "fixed z-50 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800",
    backdrop: "fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80",
    edge: "bottom-16",
    position: {
      right: {
        on: "right-0 top-0 h-screen w-screen md:w-[35rem] transform-none",
        off: "right-0 top-0 h-screen w-80 translate-x-full",
      },
    },
  },
};

function Content() {
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
  return (
    <>
      <div className="mb-4 mt-2 text-sm md:text-lg text-cyan-700 dark:text-cyan-800">
        We couldn&#39;t find any shop associated with your account. Please
        create a shop to start selling your products.
      </div>
      <div className="flex items-center justify-between">
        {" "}
        <StartSelling setIsOpen={setIsOpen} />
        <div className="flex">
          <button
            type="button"
            onClick={() => router.back()}
            className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs md:text-lg font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
          >
            <BackwardIcon className="-ml-0.5 mr-2 h-4 w-4" />
            Go Back
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="mr-2 inline-flex items-center  rounded-lg border border-cyan-700 bg-transparent px-3 py-1.5 text-center text-xs md:text-lg font-medium text-cyan-700 hover:bg-cyan-800 hover:text-white focus:ring-4 focus:ring-cyan-300 dark:border-cyan-800 dark:text-cyan-800 dark:hover:text-white"
          >
            <HomeIcon className="-ml-0.5 mr-2 h-4 w-4" />
            Home
          </button>
        </div>
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
            <SignInSignUpDrawer callBack={handleClose} />{" "}
          </DrawerItems>
        </Drawer>
      )}
    </>
  );
}

const NoShop = () => {
  return (
    <div>
      {/* build no Shop found page with intruction on what next */}
      <div className="flex items-center justify-center h-[calc(100vh-15rem)]">
        <div className="text-center">
          <Alert
            color="failure"
            icon={InformationCircleIcon}
            rounded
            withBorderAccent
            additionalContent={<Content />}
          >
            <h1 className="text-2xl font-bold">You don&#39;t have a Shop</h1>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default NoShop;
