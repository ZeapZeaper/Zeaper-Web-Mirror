"use client";
import { AuthContext } from "@/contexts/authContext";
import { Avatar, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { SignInSignUpDrawer } from "../../authentication/SignInSignUpDrawer";
import { ThemeContext } from "@/contexts/themeContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

export function MobileUserMenuBar() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const router = useRouter();
  const { setDimBackground } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = useCallback(() => {
    document.body.classList.remove("overflow-y-hidden");
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setDimBackground(true);
    } else {
      setDimBackground(false);
    }
  }, [isOpen, setDimBackground]);

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
    <div className="flex gap-2">
      <button
        type="button"
        className="relative  inline-flex items-center  text-sm  text-center  rounded-full hover:bg-slate-200  focus:outline-none"
        onClick={() => {
          // if (!user || user?.isGuest) {
          //   return setIsOpen(true);
          // }
          router.push("/account/mobile");
        }}
      >
        {user?.imageUrl?.link ? (
          <span className="w-9 h-9 rounded-full overflow-hidden">
            <Image
              src={user?.imageUrl?.link}
              alt="user image"
              width={100}
              height={100}
              className="object-cover w-full h-full rounded-full"
            />
          </span>
        ) : (
          <>
            {" "}
            {!user?.isGuest && user?.firstName ? (
              <Avatar
                placeholderInitials={user?.firstName?.charAt(0).toUpperCase()}
                rounded
                className="bg-primary text-white w-9 h-9 rounded-full"
              />
            ) : (
              <Avatar
                rounded
                className="bg-primary text-white w-9 h-9 rounded-full"
              />
            )}
          </>
        )}
      </button>

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
    </div>
  );
}
