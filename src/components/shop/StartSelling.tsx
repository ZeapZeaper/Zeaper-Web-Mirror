"use client";

// import { AddShop } from "@/components/shop/AddShop";

import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
//import { useRouter } from "next/navigation";
import { useEffect, useState, } from "react";
import AddShopElegant from "./AddShopElegant";
import { UserInterface } from "@/interface/interface";

const StartSelling = ({
  setIsOpen,
  floating = false,
  userDetails,

}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  floating?: boolean;
  userDetails?: UserInterface | null;

}) => {
  const user = userDetails;
 const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams();
  const addShop = searchParams.get("addShop") || false;
  const pathname = usePathname();
 
  const classStyle = floating
    ? `fixed bottom-2 left-4 ${
        openModal ? "z-0" : "z-40"
      } px-6 py-3 rounded-full bg-[#D5B07B] text-[#133522] font-bold shadow-2xl hover:bg-[#e6c28c] transition cursor-pointer`
    : "mb-16 inline-block px-8 py-4 rounded-lg bg-[#D5B07B] text-[#133522] font-bold uppercase shadow-lg hover:bg-[#e6c28c] transition cursor-pointer";
  // const router = useRouter();

  useEffect(() => {
    if (addShop && !floating && user && !user?.isGuest && !user?.shopId) {
      setOpenModal(true);
    }
  }, [addShop, floating, user]);

  return (
    <>
      {!user?.shopId && (
        <motion.div
          animate={floating ? { scale: [1, 1.1, 1] } : {}}
          transition={
            floating ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}
          }
          whileHover={{ scale: 1.05 }}
          className={classStyle}
          onClick={() => {
            if (!user || user?.isGuest) {
              localStorage.setItem(
                "redirectSignInPath",
                `${pathname}?addShop=true`
              );
              console.log("redirectSignInPath is", `${pathname}?addShop=true`);
              return setIsOpen(true);
            }

            return setOpenModal(true);
            // router.push("/account/dashboard");
          }}
        >
          Become a Vendor
        </motion.div>
      )}

      {user?.shopId && (
        <motion.a
          href="/shop"
          whileHover={{ scale: 1.05 }}
          className={classStyle}
        >
          My Shop
        </motion.a>
      )}

      {openModal && (
        <AddShopElegant setOpenModal={setOpenModal} openModal={openModal} />
      )}
      {/* {openModal && (
        <AddShop
          setOpenModal={setOpenModal}
          openModal={openModal}
          setAddNewShop={setAddNewShop}
        />
      )} */}
    </>
  );
};

export default StartSelling;
