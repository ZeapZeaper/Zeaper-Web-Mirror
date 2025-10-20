"use client";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

import AccountNavBar from "@/components/account/AccountNavBar";
import MyProfile from "./MyProfile";


const DashboardPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.isGuest && router) {
      router.push("/account/login");
    }
  }, [user, router]);
  return (
    <div className="min-h-screen md:px-2 h-full overflow-auto">
      <div className="grid  grid-cols-1 md:grid-cols-4 p-4 md:p-6 md:px-10">
        <div className="hidden md:col-span-1 md:block">
          <AccountNavBar />
        </div>
        {user && !user?.isGuest && (
          <div className="col-span-1 md:col-span-3 w-full">
           <MyProfile />
           
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
