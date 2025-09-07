import { List, ListItem } from "flowbite-react";
import {
  HiDatabase,
  HiGift,
  HiBell,
  HiLogout,
  HiScissors,
  HiShoppingBag,
  HiUserCircle,
} from "react-icons/hi";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import { HiHandThumbUp } from "react-icons/hi2";
import Link from "next/link";

const AccountNavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  return (
    <div className="md:w-64 text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-2 bg-white mb-4 md:mb-0">
      <div className="flex flex-col items-center gap-2 w-full ">
        <div className="flex w-full p-2 ">
          <List className="w-full flex md:flex-col gap-4 flex-wrap">
            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              icon={() => <HiDatabase className="text-info mr-3" />}
              onClick={() => {
                router.push("/account/dashboard");
              }}
            >
              Dashboard
            </ListItem>
            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              icon={() => <HiUserCircle className="text-info mr-3" />}
              onClick={() => {
                router.push("/account/profile");
              }}
            >
              My Info
            </ListItem>
            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              icon={() => <HiShoppingBag className="text-info mr-3" />}
              onClick={() => {
                router.push("/account/orders");
              }}
            >
              Orders
            </ListItem>
            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              icon={() => <HiScissors className="text-info mr-3" />}
              onClick={() => {
                router.push("/account/measurement-templates");
              }}
            >
              Measurement Templates
            </ListItem>
            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              icon={() => <HiHandThumbUp className="text-info mr-3" />}
              onClick={() => {
                router.push("/account/reviews");
              }}
            >
              Reviews & Ratings
            </ListItem>

            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              icon={() => <HiBell className="text-info mr-3" />}
              onClick={() => {
                router.push("/account/notifications");
              }}
            >
              Notifications
            </ListItem>
            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              icon={() => <HiGift className="text-info mr-3" />}
              onClick={() => {
                router.push("/account/rewards");
              }}
            >
              Points / Vouchers
            </ListItem>
          </List>
        </div>
        {user && !user?.isGuest && (
          <div onClick={logout} className="hidden md:flex flex-col w-full ">
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

export default AccountNavBar;
