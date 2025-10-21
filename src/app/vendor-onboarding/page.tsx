"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

import Logo from "@/images/Zeaper_Main_White_horizontal.png";

import {
  FaChartLine,
  FaGlobe,
  FaCheckCircle,
  FaHeadset,
  FaUsers,
  FaTruck,
  FaStore,
  FaClipboardCheck,
  FaBoxOpen,
  FaCashRegister,
  FaTshirt,
  FaShoePrints,
} from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";
import { UserMenuBar } from "./components/UserMenuBar";
import StartSelling from "@/components/shop/StartSelling";
import { Drawer, DrawerItems } from "flowbite-react";
import { SignInSignUpDrawer } from "@/authentication/SignInSignUpDrawer";
import { UserInterface } from "@/interface/interface";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import DropdownNotification from "@/components/Header/DropdownNotification";
import Image from "next/image";

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

export default function VendorWelcome(): React.JSX.Element {
  const isVendorOnboarding =
    process.env.NEXT_PUBLIC_VENDOR_ONBOARDING === "true";
  const router = useRouter();
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const [userDetails, setUserDetails] = useState<UserInterface | null>(
    user || null
  );

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
    localStorage.setItem("landingPage", "/vendor-onboarding");
    if (user) {
      setUserDetails(user);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && !user?.isGuest) {
      handleClose();
    }
  }, [isAuthenticated, user?.isGuest, handleClose]);

  const callback = (userData?: UserInterface) => {
    handleClose();

    if (userData && !userData?.isGuest && !userData?.shopId) {
      setUserDetails(userData);
      return router.push("/vendor-onboarding?addShop=true");
    }
    if (userData && !userData?.isGuest && userData?.shopId) {
      setUserDetails(userData);
      return router.push("/shop");
    }
  };

  const features = [
    {
      icon: <FaChartLine className="w-6 h-6 text-[#D5B07B]" />,
      title: "Grow Your Revenue",
      description: "Boost your sales with access to a growing customer base.",
    },
    {
      icon: <FaGlobe className="w-6 h-6 text-[#D5B07B]" />,
      title: "Global Reach",
      description:
        "Expand beyond borders and reach customers worldwide instantly.",
    },
    {
      icon: <FaCheckCircle className="w-6 h-6 text-[#D5B07B]" />,
      title: "Simple & Efficient",
      description:
        "A smooth vendor dashboard designed to save you time and effort.",
    },
    {
      icon: <FaTruck className="w-6 h-6 text-[#D5B07B]" />,
      title: "Seamless Logistics",
      description:
        "We handle the logistics for you — from order to delivery, stress-free.",
    },
    {
      icon: <FaHeadset className="w-6 h-6 text-[#D5B07B]" />,
      title: "Dedicated Support",
      description:
        "Our team is here to guide you at every stage of your journey.",
    },
    {
      icon: <FaUsers className="w-6 h-6 text-[#D5B07B]" />,
      title: "Community Access",
      description:
        "Join a thriving fashion ecosystem of creators and entrepreneurs.",
    },
  ];

  const steps = [
    {
      icon: <FaStore className="w-6 h-6 text-[#D5B07B]" />,
      title: "Easy Setup",
      description:
        "Setting up your store on Zeaper is quick and easy. Start selling in no time.",
    },
    {
      icon: <FaClipboardCheck className="w-6 h-6 text-[#D5B07B]" />,
      title: "Business Activation",
      description:
        "Our admin team reviews your application and activates your business.",
    },
    {
      icon: <FaBoxOpen className="w-6 h-6 text-[#D5B07B]" />,
      title: "List",
      description:
        "Add your products and showcase them beautifully to eager shoppers.",
    },
    {
      icon: <FaUsers className="w-6 h-6 text-[#D5B07B]" />,
      title: "Sell",
      description:
        "Share with millions of customers and grow your brand visibility.",
    },
    {
      icon: <FaTruck className="w-6 h-6 text-[#D5B07B]" />,
      title: "We Deliver",
      description:
        "Sit back and relax while we handle the delivery logistics for you.",
    },
    {
      icon: <FaCashRegister className="w-6 h-6 text-[#D5B07B]" />,
      title: "Get Paid",
      description:
        "Receive your payments quickly and securely after every sale.",
    },
  ];

  const categories = [
    {
      icon: <FaScissors className="w-8 h-8 text-[#D5B07B]" />,
      title: "Bespoke Fashion",
      description:
        "Tailors, shoemakers, and custom fashion creators can showcase unique, made-to-measure designs.",
    },
    {
      icon: <FaTshirt className="w-8 h-8 text-[#D5B07B]" />,
      title: "Ready-to-Wear",
      description:
        "Sell stylish, curated collections that are ready to be shipped instantly to customers.",
    },
    {
      icon: <FaShoePrints className="w-8 h-8 text-[#D5B07B]" />,
      title: "Accessories & More",
      description:
        "From shoes to bags and beyond — our marketplace welcomes all fashion categories.",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#133522] ">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/60 "></div>
      {isVendorOnboarding && (
        <>
          {/* Launching Soon Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 w-full z-20 bg-[#D5B07B] text-[#133522] font-semibold text-center py-3 shadow-md text-xs md:text-sm"
          >
            <span className="hidden md:block">
              🚀 Zeaper is launching soon! Be among the first to join as a
              vendor.{" "}
            </span>
            <span className="md:hidden">
              🚀 Zeaper is launching soon! Join as a vendor.{" "}
            </span>
          </motion.div>

          {/* Top bar with logo and profile menu */}
          <div className="  z-20 flex justify-between items-center px-4 pb-4 align-center mt-16">
            <Image
              src={Logo}
              alt="Zeaper Logo"
              width={150}
              height={50}
              className="object-contain relative z-10 w-28 md:w-36 lg:w-48 cursor-pointer"
            />

            {/* Profile menu */}
            <div className="flex items-center gap-4 ">
              {/* User Menu Bar */}
              {user && (
                <span className="inline-block mt-3">
                  <DropdownNotification />
                </span>
              )}

              <UserMenuBar />
            </div>
          </div>
        </>
      )}

      <main className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
        {/* Welcome Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-5xl font-bold uppercase tracking-wide mb-6 text-[#D5B07B]"
        >
          Welcome Vendors
        </motion.h1>
        <p className="max-w-xl text-white/80 mb-8">
          Join Zeaper and become part of a global fashion marketplace that
          empowers creators, celebrates diversity, and delivers unmatched value
          to customers worldwide.
        </p>
        {loading && <Loading />}
        {/* Launch Offer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 mb-12 px-6 py-3 bg-white text-[#133522] rounded-full shadow-lg font-semibold text-sm md:text-base tracking-wide inline-block"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 10, -10, 0], y: [0, -4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            className="inline-block mr-2"
          >
            🎉
          </motion.span>
          0% Commission — Keep <span className="text-success">100%</span> of
          your earnings during our launch phase! 
          <motion.span
            animate={{ rotate: [0, 15, -15, 10, -10, 0], y: [0, -4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            className="inline-block mr-2 ml-2"
          >
            🎉
          </motion.span>
        </motion.div>

        {/* Start Selling Button */}

        <StartSelling setIsOpen={setIsOpen} userDetails={userDetails} />

        {/* Why Partner With Us */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-[#D5B07B]">
            Why Partner With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col items-start text-left gap-3"
              >
                {f.icon}
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-white/70">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Selling Simplified steps */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-[#D5B07B]">
            Selling Simplified
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 2lg:grid-cols-6 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col items-center text-center gap-3"
              >
                {step.icon}
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-white/70 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Who Can Join Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-[#D5B07B]">
            Who Can Join Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col items-center text-center gap-3"
              >
                {cat.icon}
                <h3 className="text-lg font-semibold">{cat.title}</h3>
                <p className="text-white/70 text-sm">{cat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Floating Start Selling Button */}
      <StartSelling setIsOpen={setIsOpen} userDetails={userDetails} floating />

      {isOpen && (
        <Drawer
          theme={drawerTheme}
          open={isOpen}
          onClose={handleClose}
          position="right"
        >
          <div className="flex justify-end mb-4">
            <button
              type="button"
              className="text-danger hover:text-gray-700 dark:hover:text-slate-300 transition cursor-pointer"
              onClick={handleClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <DrawerItems>
            <SignInSignUpDrawer callBack={callback} />{" "}
          </DrawerItems>
        </Drawer>
      )}
    </div>
  );
}
