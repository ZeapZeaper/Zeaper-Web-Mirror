"use client";
import { List, ListItem } from "flowbite-react";
import {
  HiBell,
  HiChevronRight,
  HiDatabase,
  HiGift,
  HiLogout,
  HiScissors,
  HiShoppingBag,
  HiUserCircle,
} from "react-icons/hi";

import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import { HiHandThumbUp } from "react-icons/hi2";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const MobileAccountNavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const pathname = usePathname();
  return (
    <div className=" text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-2 bg-white mb-4 min-h-screen">
      <div className="flex flex-col items-center gap-2 w-full ">
        <div className="flex w-full p-2 ">
          <List className="w-full flex flex-col gap-4 ">
            <Link
              href={
                !user || user?.isGuest ? "/account/login" : "/account/dashboard"
              }
              className="flex items-center justify-between w-full"
            >
              <ListItem
                className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
                icon={() => <HiDatabase className="text-info mr-3" />}
              >
                Dashboard
              </ListItem>

              <HiChevronRight className="text-info mr-3 text-xl" />
            </Link>
            <Link
              href={
                !user || user?.isGuest ? "/account/login" : "/account/profile"
              }
              className="flex items-center justify-between w-full"
            >
              <ListItem
                className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
                icon={() => <HiUserCircle className="text-info mr-3" />}
              >
                My Info
              </ListItem>
              <HiChevronRight className="text-info mr-3 text-xl" />
            </Link>
            <Link
              href={
                !user || user?.isGuest ? "/account/login" : "/account/orders"
              }
              className="flex items-center justify-between w-full"
            >
              <ListItem
                className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
                icon={() => <HiShoppingBag className="text-info mr-3" />}
              >
                Orders
              </ListItem>
              <HiChevronRight className="text-info mr-3 text-xl" />
            </Link>
            <Link
              href={
                !user || user?.isGuest
                  ? "/account/login"
                  : "/account/measurements"
              }
              className="flex items-center justify-between w-full"
            >
              <ListItem
                className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
                icon={() => <HiScissors className="text-info mr-3" />}
              >
                Measurement Templates
              </ListItem>
              <HiChevronRight className="text-info mr-3 text-xl" />
            </Link>
            <Link
              href={
                !user || user?.isGuest ? "/account/login" : "/account/reviews"
              }
              className="flex items-center justify-between w-full"
            >
              <ListItem
                className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
                icon={() => <HiHandThumbUp className="text-info mr-3" />}
              >
                Reviews & Ratings
              </ListItem>
              <HiChevronRight className="text-info mr-3 text-xl" />
            </Link>

            <Link
              href={
                !user || user?.isGuest
                  ? "/account/login"
                  : "/account/notifications"
              }
              className="flex items-center justify-between w-full"
            >
              <ListItem
                className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
                icon={() => <HiBell className="text-info mr-3" />}
              >
                Notifications
              </ListItem>
              <HiChevronRight className="text-info mr-3 text-xl" />
            </Link>
            <Link
              href={
                !user || user?.isGuest
                  ? "/account/login"
                  : "/account/rewards"
              }
              className="flex items-center justify-between w-full"
            >
              <ListItem
                className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
                icon={() => <HiGift className="text-info mr-3" />}
              >
                Points / Vouchers
              </ListItem>
              <HiChevronRight className="text-info mr-3 text-xl" />
            </Link>
          </List>
        </div>
        {user && !user?.isGuest && (
          <div
            onClick={logout ? () => logout() : undefined} // Ensure logout is called
            className="flex flex-col w-full "
          >
            <hr className="border-b border-slate-300 w-full my-2" />
            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer text-danger"
              icon={() => <HiLogout className=" mr-3" />}
            >
              Logout
            </ListItem>
            <hr className="border-b border-slate-300 w-full mb-2" />
          </div>
        )}
        {(!user || user?.isGuest) && (
          <div className="flex flex-col gap-1 w-full ">
            <div className="flex justify-center gap-2 w-full p-2">
              <span
                onClick={() => {
                  if (!user || user?.isGuest) {
                    localStorage.setItem("redirectSignInPath", pathname);
                    return router.push("/account/login");
                  }
                  return;
                }}
                className="font-semibold text-sm border bg-primary text-white px-6 py-2 rounded-full items-center justify-center flex cursor-pointer"
              >
                Sign In
              </span>
              <span
                onClick={() => {
                  if (!user || user?.isGuest) {
                    // save the current pathname to local storage
                    localStorage.setItem("redirectSignInPath", pathname);
                    return router.push("/account/login");
                  }
                  return;
                }}
                className="font-semibold text-sm border bg-lightGold text-black px-6 py-2 rounded-full items-center justify-center flex cursor-pointer"
              >
                Sign Up
              </span>
            </div>
            <hr className="border-b border-slate-300 w-full" />
          </div>
        )}
        { !user?.shopId && (
          <Link
            href={"/sell-on-zeap"}
            className="flex w-full p-2 justify-center mt-6"
          >
            <span className="block  font-semibold bg-lightSuccess  p-2 rounded-md cursor-pointer text-sm w-full text-center">
              Sell on Zeaper
            </span>
          </Link>
        )}
        {user?.shopId && (
          <Link
            href="/shop"
            className="flex w-full p-2 justify-center mt-6"
          >
            <span className="block  font-semibold bg-lightSuccess  p-2 rounded-md cursor-pointer text-sm w-full text-center">
              My Shop
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileAccountNavBar;
