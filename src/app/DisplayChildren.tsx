"use client";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ToastContainer from "@/shared/toast";
import { usePathname } from "next/navigation";
import en from "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";
import InputZoomFix from "@/shared/InputZoomFixGlobal";

import MobileNavBar from "@/components/Header/MobileNavBar";
import InputZoomFixGlobal from "@/shared/InputZoomFixGlobal";
import { useContext, useEffect } from "react";
import { ThemeContext } from "@/contexts/themeContext";
import Whatsapp from "@/components/contact/Whatsapp";
TimeAgo.addDefaultLocale(en);

const DisplayChildren = ({ children }: { children: React.ReactNode }) => {
  const isVendorOnboarding =
    process.env.NEXT_PUBLIC_VENDOR_ONBOARDING === "true";
  const pathname = usePathname();
  const {
    theme,
    dimBackground,
    setDimBackground,
    isSideBarOpen,
    toggleSideBar,
  } = useContext(ThemeContext);
  const isAuthPage = pathname.startsWith("/account/login");
  useEffect(
    () => {
      setDimBackground(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );
  if (isVendorOnboarding) {
    return (
      <>
        <InputZoomFix />
        <div>{children}</div>

        <a
          href="https://wa.me/447518465207"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-2 right-4 bg-green-400 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-20"
        >
          <FaWhatsapp size={24} />
          <span className="sr-only">Chat with us on WhatsApp</span>
          <span className="absolute bottom-1 right-1 w-2 h-2 bg-green-900 rounded-full animate-ping"></span>
        </a>
      </>
    );
  }
  return (
    <>
      <InputZoomFixGlobal />

      {!isAuthPage && <Header />}
      <div className="flex flex-col min-h-screen">
        <div
          className={`flex-1 ${
            isSideBarOpen ? "hidden" : "flex-grow"
          } overflow-hidden ${theme} 
         ${
           dimBackground &&
           "brightness-[20%] bg-neutral-50 blur-sm transition-all duration-300 ease-in-out"
         }`}
        >
          {children}
        </div>

        <MobileNavBar isVisable={isSideBarOpen} setIsVisable={toggleSideBar} />

        <Footer />
      </div>
      <ToastContainer />
      <Whatsapp />
    </>
  );
};

export default DisplayChildren;
