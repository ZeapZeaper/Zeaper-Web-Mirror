"use client";

import React, { useState, useEffect } from "react";
import Logo from "@/images/Zeaper_Main_White_horizontal.png";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaTshirt,
  FaLock,
  FaHandshake,
  FaUsers,
  FaUndo,
  FaInfoCircle,
  FaBullseye,
  FaGift,
} from "react-icons/fa";
import Image from "next/image";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import LoadingDots from "./LoadingDots";

export default function ComingSoon(): React.JSX.Element {
  const savedJoined =
    typeof window !== "undefined"
      ? localStorage.getItem("zeaper_waitlist_joined")
      : null;
  const savedEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("zeaper_waitlist_email")
      : null;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [addToWaitingList, addToWaitingListStatus] =
    zeapApiSlice.useAddToWaitingListMutation();
  const isLoading = addToWaitingListStatus.isLoading;
  useEffect(() => {
    localStorage.setItem("landingPage", "/");
    if (savedJoined === "true") setSubmitted(true);
    if (savedEmail) setEmail(savedEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    const payload = { email };
    addToWaitingList({ payload })
      .unwrap()
      .then(() => {
        if (typeof window !== "undefined") {
          localStorage.setItem("zeaper_waitlist_email", email);
          localStorage.setItem("zeaper_waitlist_joined", "true");
        }
        setSubmitted(true);
      })
      .catch((err) => {
        console.error("Error adding to waiting list:", err);
        setError("Failed to join the waiting list. Please try again later.");
      });
  };
  // when click your entere kyboard, the input should be focused
  // when  the user clickes enter and the email is valid, the form should be submitted
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          handleSubmit(e as unknown as React.FormEvent);
        } else {
          setError("Please enter a valid email address.");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const features = [
    {
      icon: (
        <FaTshirt className="w-6 h-6 text-[#1b5236] transition-transform group-hover:scale-125" />
      ),
      title: "Bespoke & Ready-to-Wear",
      description: "Curated pieces tailored to your unique style.",
    },
    {
      icon: (
        <FaLock className="w-6 h-6 text-[#1b5236] transition-transform group-hover:scale-125" />
      ),
      title: "Escrow Protection",
      description: "Secure transactions with full escrow protection.",
    },
    {
      icon: (
        <FaHandshake className="w-6 h-6 text-[#1b5236] transition-transform group-hover:scale-125" />
      ),
      title: "Creators You Can Trust",
      description: "Verified fashion designers with proven reputations.",
    },
    {
      icon: (
        <FaUsers className="w-6 h-6 text-[#1b5236] transition-transform group-hover:scale-125" />
      ),
      title: "A Caring Community",
      description: "Join a community that values style and sustainability.",
    },
    {
      icon: (
        <FaUndo className="w-6 h-6 text-[#1b5236] transition-transform group-hover:scale-125" />
      ),
      title: "Guaranteed Return & Refund",
      description: "Shop confidently with hassle-free returns.",
    },
    {
      icon: (
        <FaGift className="w-6 h-6 text-[#1b5236] transition-transform group-hover:scale-125" />
      ),
      title: "Get Points While You Shop",
      description:
        "Earn rewards for every purchase and redeem for exclusive items.",
    },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="/video/rtwHome.mov"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <main className="relative z-10 flex flex-col items-center justify-start min-h-screen px-6 py-16 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center bg-[#1b5236]/40 backdrop-blur-md p-4 rounded-lg shadow-lg">
            <Image
              src={Logo}
              alt="Zeaper Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Coming Soon with Glow Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-6xl font-bold uppercase tracking-wide mb-4 text-emerald-300 animate-pulseGlow"
        >
          Coming Soon!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/70 max-w-xl mb-8"
        >
          Discover exclusive, curated fashion collections with secure checkout.
          Join our waitlist and be the first to experience the future of
          shopping.
        </motion.p>

        {/* Waitlist Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md"
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-lg border border-white/20 bg-white/10 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-[#133522]"
          />
          {!isLoading && (
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg font-semibold text-white shadow-lg transition w-[15rem] ${
                email === savedEmail && submitted
                  ? "bg-[#173c29] cursor-not-allowed"
                  : "bg-[#133522] hover:bg-[#1b5236]"
              }`}
            >
              {email === savedEmail && submitted ? "Joined" : "Join Waitlist"}
            </button>
          )}
          {isLoading && <LoadingDots />}
        </motion.form>

        {error && <p className="text-red-400 mt-2">{error}</p>}
        {submitted && (
          <p className="text-emerald-300 mt-2">
            You&#39;re on the waitlist! Thank you.
          </p>
        )}

        {/* Who We Are & Our Mission - Distinct Card Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 w-full max-w-6xl flex flex-col lg:flex-row gap-6 justify-center"
        >
          <div className="flex-1 bg-[#1b5236]/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex flex-col items-start gap-4 hover:scale-105 transition-transform">
            <FaInfoCircle className="w-10 h-10 text-[#fff]" />
            <h2 className="text-2xl font-bold">Who We Are</h2>
            <p className="text-white/70">
              Zeaper is a curated fashion eCommerce brand redefining online
              shopping. We blend elegance, sustainability, and trend-setting
              designs.
            </p>
          </div>

          <div className="flex-1 bg-[#1b5236]/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex flex-col items-start gap-4 hover:scale-105 transition-transform">
            <FaBullseye className="w-10 h-10 text-[#fff]" />
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-white/70">
              We make luxury fashion accessible while promoting sustainability
              and ethical practices. Quality, style, and effortless shopping.
            </p>
          </div>
        </motion.div>

        {/* Features / What to Expect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 w-full max-w-6xl"
        >
          <h2 className="text-3xl font-bold mb-8">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg transition-transform group hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex gap-6 mt-12 text-white/70"
        >
          <a
            href="https://www.instagram.com/officialzeaper"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-6 h-6 hover:text-white transition" />
          </a>
          <a
            href="https://x.com/officialzeaper"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="w-6 h-6 hover:text-white transition" />
          </a>
          <a
            href="https://www.facebook.com/share/14qdYwyjnX/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="w-6 h-6 hover:text-white transition" />
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-12 text-xs text-white/50"
        >
          &copy; {new Date().getFullYear()} Zeaper. All rights reserved.
        </motion.div>
      </main>

      {/* Glow animation style */}
      <style jsx>{`
        @keyframes pulseGlow {
          0%,
          100% {
            text-shadow: 0 0 8px #34d399, 0 0 16px #34d399;
          }
          50% {
            text-shadow: 0 0 16px #34d399, 0 0 32px #34d399;
          }
        }
        .animate-pulseGlow {
          animation: pulseGlow 2s infinite;
        }
      `}</style>
    </div>
  );
}
