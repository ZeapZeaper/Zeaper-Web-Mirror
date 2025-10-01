"use client";
import { FaWhatsapp } from "react-icons/fa";
// import Footer from "@/components/Footer/Footer";
// import Header from "@/components/Header/Header";
// import ToastContainer from "@/shared/toast";
// import { usePathname } from "next/navigation";
import en from "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";
import { useEffect } from "react";
// import MobileNavBar from "@/components/Header/MobileNavBar";
TimeAgo.addDefaultLocale(en);

const DisplayChildren = ({ children }: { children: React.ReactNode }) => {
  // const pathname = usePathname();

  // const isAuthPage = pathname.startsWith("/account/login");
  // useEffect(
  //   () => {
  //     setDimBackground(false);
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [pathname]
  // );

  useEffect(() => {
 
  const inputs = document.querySelectorAll("input, textarea");
  const metu = document.querySelector('meta[name=viewport]');
  if (metu) metu.setAttribute("content", "width=device-width, initial-scale=1.0");
  console.log("metu", metu);
  const handleFocus = () => {
    const meta = document.querySelector('meta[name=viewport]');
    console.log("meta", meta);
    if (meta) meta.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0");
  };
  const handleBlur = () => {
    const meta = document.querySelector('meta[name=viewport]');
    if (meta) meta.setAttribute("content", "width=device-width, initial-scale=1.0");
  };

  inputs.forEach((input) => {
    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);
  });

  return () => {
    inputs.forEach((input) => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    });
  };
}, []);
  return (
    <>
      {/* {!isAuthPage && <Header />} */}

      <div>{children}</div>

      {/* <MobileNavBar isVisable={isSideBarOpen} setIsVisable={toggleSideBar} />

      <Footer />
      <ToastContainer /> */}
      <a
        href="https://wa.me/447375387114"
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
};

export default DisplayChildren;
