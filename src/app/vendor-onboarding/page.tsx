"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "@/images/Zeaper_White.png";
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

export default function VendorWelcome(): React.JSX.Element {
  const features = [
    { icon: <FaChartLine className="w-6 h-6 text-[#1b5236]" />, title: "Grow Your Revenue", description: "Boost your sales with access to a growing customer base." },
    { icon: <FaGlobe className="w-6 h-6 text-[#1b5236]" />, title: "Global Reach", description: "Expand beyond borders and reach customers worldwide instantly." },
    { icon: <FaCheckCircle className="w-6 h-6 text-[#1b5236]" />, title: "Simple & Efficient", description: "A smooth vendor dashboard designed to save you time and effort." },
    { icon: <FaTruck className="w-6 h-6 text-[#1b5236]" />, title: "Seamless Logistics", description: "We handle the logistics for you — from order to delivery, stress-free." },
    { icon: <FaHeadset className="w-6 h-6 text-[#1b5236]" />, title: "Dedicated Support", description: "Our team is here to guide you at every stage of your journey." },
    { icon: <FaUsers className="w-6 h-6 text-[#1b5236]" />, title: "Community Access", description: "Join a thriving fashion ecosystem of creators and entrepreneurs." },
  ];

  const process = [
    { icon: <FaStore className="w-6 h-6 text-[#1b5236]" />, title: "Easy Setup", description: "Setting up your store on Zeaper is quick and easy. Start selling in no time." },
    { icon: <FaClipboardCheck className="w-6 h-6 text-[#1b5236]" />, title: "Business Activation", description: "Our admin team reviews your application and activates your business." },
    { icon: <FaBoxOpen className="w-6 h-6 text-[#1b5236]" />, title: "List", description: "Add your products and showcase them beautifully to eager shoppers." },
    { icon: <FaUsers className="w-6 h-6 text-[#1b5236]" />, title: "Sell", description: "Share with millions of customers and grow your brand visibility." },
    { icon: <FaCashRegister className="w-6 h-6 text-[#1b5236]" />, title: "Get Paid", description: "Receive your payments quickly and securely after every sale." },
  ];

  const categories = [
    { icon: <FaScissors className="w-8 h-8 text-[#D5B07B]" />, title: "Bespoke Fashion", description: "Tailors, shoemakers, and custom fashion creators can showcase unique, made-to-measure designs." },
    { icon: <FaTshirt className="w-8 h-8 text-[#D5B07B]" />, title: "Ready-to-Wear", description: "Sell stylish, curated collections that are ready to be shipped instantly to customers." },
    { icon: <FaShoePrints className="w-8 h-8 text-[#D5B07B]" />, title: "Accessories & More", description: "From shoes to bags and beyond — our marketplace welcomes all fashion categories." },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#133522] text-white">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Launching Soon Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full z-50 bg-[#D5B07B] text-[#133522] font-semibold text-center py-3 shadow-md"
      >
        🚀 Zeaper is launching soon! Be among the first to join as a vendor.
      </motion.div>

      <main className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="mb-10">
          <Image src={Logo} alt="Zeaper Logo" width={180} height={60} className="object-contain" />
        </motion.div>

        {/* Welcome Header */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-3xl md:text-5xl font-bold uppercase tracking-wide mb-6 text-[#D5B07B]">
          Welcome Vendors
        </motion.h1>
        <p className="max-w-2xl text-white/80 mb-8">
          Join Zeaper and become part of a global fashion marketplace that empowers creators, celebrates diversity, and delivers unmatched value to customers worldwide.
        </p>

        {/* Main CTA */}
        <motion.a href="/vendor/signup" whileHover={{ scale: 1.05 }} className="mb-16 inline-block px-8 py-4 rounded-lg bg-[#D5B07B] text-[#133522] font-bold uppercase shadow-lg hover:bg-[#e6c28c] transition">
          Become a Vendor
        </motion.a>

        {/* Why Partner With Us */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full max-w-6xl mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-[#D5B07B]">Why Partner With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col items-start text-left gap-3">
                {f.icon}
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-white/70">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
          {/* Who Can Join Section */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full max-w-6xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-[#D5B07B]">Who Can Join Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col items-center text-center gap-3">
                {cat.icon}
                <h3 className="text-lg font-semibold">{cat.title}</h3>
                <p className="text-white/70 text-sm">{cat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Selling Simplified Process */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full max-w-6xl mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-[#D5B07B]">Selling Simplified</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((step, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col items-center text-center gap-3">
                {step.icon}
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-white/70 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

      
      </main>

      {/* Floating CTA Button with Pulse Animation */}
      <motion.a
        href="/vendor/signup"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-20 right-6 z-50 px-6 py-3 rounded-full bg-[#D5B07B] text-[#133522] font-bold shadow-2xl hover:bg-[#e6c28c] transition"
      >
        Become a Vendor
      </motion.a>
    </div>
  );
}
