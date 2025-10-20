"use client";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import RecentViewCard from "./RecentViewCard";
import AccountNavBar from "@/components/account/AccountNavBar";
import WishCard from "./WishCard";
import BuyAgainListCard from "./BuyAgainListCard";
import MyRecommendedProducts from "@/components/products/MyRecommendedProducts";

const DashboardPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.isGuest) {
      router.push("/account/login");
    }
  }, [user, router]);
  return (
    <div className="min-h-screen md:px-2 h-full overflow-auto ">
      <div className="grid  grid-cols-1 md:grid-cols-4 p-4 md:p-6 md:px-10">
        <div className="hidden md:col-span-1 md:block">
          <AccountNavBar />
        </div>
        {user && !user?.isGuest && (
          <div className="col-span-1 md:col-span-3 ">
            <h1 className="text-2xl  font-bold sm:text-3xl lg:text-4xl">
              Hi, {user?.firstName}!
            </h1>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <RecentViewCard />
              <WishCard />
              <BuyAgainListCard />
            </div>
          </div>
        )}
      </div>
      <MyRecommendedProducts />
    </div>
  );
};

export default DashboardPage;
