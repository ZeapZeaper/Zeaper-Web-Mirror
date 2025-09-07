"use client";
import Logo from "@/shared/Logo/Logo";

// import CartSideBar from "../CartSideBar";
// import NavigationItem from '../NavItem';
import MenuBar from "./MenuBar";
// import DesktopMenuBar from "./DesktopMenuBar";
import SearchHeader from "./SearchHeader";
import CartMenuBar from "./CartMenuBar";
import WishMenuBar from "./WishMenuBar";
import { UserMenuBar } from "./UserMenuBar";
import { MobileUserMenuBar } from "./MobileUserMenuBar";
import Link from "next/link";
import DropdownNotification from "./DropdownNotification";
import CurrencyPrefence from "./CurrencyPrefence";
import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";

import ProductGroupNav from "./ProductGroupNav";

import SubMenu from "./SubMenu";
import { ThemeContext } from "@/contexts/themeContext";

const MainNav = () => {
  const { isSideBarOpen, toggleSideBar } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  return (
    <div className="flex h-full flex-col gap-0">
      <div className="px-2 flex items-center md:justify-between">
        <div
          onClick={() => {
            if (isSideBarOpen) {
              toggleSideBar();
            }
          }}
          className=" flex items-center gap-4 w-full"
        >
          <Logo className="hidden xl:block" />
        </div>
        <div className=" hidden xl:flex     justify-end gap-1 md:gap-2 xl:gap-4 items-center w-full xl:px-2 my-2">
          {" "}
          {!user?.shopId && (
            <Link
              href={"/sell-on-zeap"}
              className="hidden xl:block  font-semibold bg-lightSuccess  p-2 rounded-md cursor-pointer text-sm"
            >
              Sell on Zeaper
            </Link>
          )}
          {user?.shopId && (
            <Link
              href="/shop"
              className="hidden xl:block  font-semibold bg-lightSuccess  p-2 rounded-md cursor-pointer text-sm "
            >
              My Shop
            </Link>
          )}
          <SearchHeader />
          <CurrencyPrefence />
          <WishMenuBar />
          <DropdownNotification />
          <CartMenuBar />
          <UserMenuBar />
        </div>

        <div
            onClick={() => {
            if (isSideBarOpen) {
              toggleSideBar();
            }
          }}
          className="hidden md:flex flex-1  xl:hidden  h-[3rem]  justify-end gap-1 md:gap-7 flex items-center w-full"
        >
          <SearchHeader />
          <CurrencyPrefence />
          <WishMenuBar />
          <DropdownNotification />
          <CartMenuBar />
          <MobileUserMenuBar />
          <MenuBar isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar}/>
        </div>
        <div
           onClick={() => {
            if (isSideBarOpen) {
              toggleSideBar();
            }
          }}
          className=" flex-1  md:hidden  h-[3rem]  justify-end gap-1 md:gap-7 flex items-center w-full"
        >
          <SearchHeader />
          {/* <CurrencyPrefence /> */}
          <WishMenuBar />
          {/* <DropdownNotification /> */}
          <CartMenuBar />
          <MobileUserMenuBar />
          <MenuBar isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
        </div>
      </div>
      <span
         onClick={() => {
            if (isSideBarOpen) {
              toggleSideBar();
            }
          }}
        className="block xl:hidden w-full p-1 py-2 bg-primary text-white  font-extrabold my-2 md:px-4"
      >
        <ProductGroupNav />
      </span>
      {!isSideBarOpen && (
        <div className=" ">
          <SubMenu />
        </div>
      )}
      
      {/* <div className="hidden items-center gap-4 xl:flex justify-center">
        

        <DesktopMenuBar />
      </div> */}
    </div>
  );
};

export default MainNav;
