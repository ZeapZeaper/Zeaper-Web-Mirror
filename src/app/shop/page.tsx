"use client";
import Skeleton from "@/components/loading/Skeleton";
import DisabledShop from "@/components/shop/DisabledShop";
import NoShop from "@/components/shop/NoShop";
import { AuthContext } from "@/contexts/authContext";
import { ShopInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import TopSection from "./TopSection";
import ShopOverview from "./ShopOverview";
import ShopProductOrders from "./ShopProductOrders";
import ShopProfile from "./ShopProfile";
import ShopPayments from "./ShopPayments";
import ShopProducts from "./ShopProducts";

const ShopPage = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const { user } = useContext(AuthContext);
  const shopId = user?.shopId;
  const getShopQuery = zeapApiSlice.useGetShopQuery(
    {},
    { skip: !token || !shopId }
  );

  const shop: ShopInterface = getShopQuery?.data?.data || null;
  const shopAnalyticsQuery = zeapApiSlice.useGetShopAnalyticsQuery(
    { shopId },
    { skip: !shop || !token || !shopId }
  );
  const shopAnalytics = shopAnalyticsQuery?.data?.data;
  const isFulfilled = getShopQuery?.status === "fulfilled";
  const isLoading = getShopQuery.isLoading || shopAnalyticsQuery.isLoading;
  return (
    <>
      {isLoading && (
        <div className="grid gap-7 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      )}
      <div className="container pb-6 lg:pb-28">
        {user && shop && shopAnalytics && (
          <>
            <TopSection shop={shop} shopAnalytics={shopAnalytics} />
            <ShopOverview shopAnalytics={shopAnalytics} />
            <ShopProductOrders shop_id={shop._id} />
            <div className="grid grid-cols-1 md:grid-cols-8 md:gap-4 w-full">
              <div className="col-span-3">
                <ShopProfile user={user} shop={shop} />
                <ShopPayments shopId={shop.shopId} />
              </div>
              <div className="col-span-5 w-full">
                <ShopProducts shopId={shop.shopId} />
                
              </div>
            </div>
          </>
        )}
      </div>
      <div className="container py-6 lg:pb-28">
        {isFulfilled && !shop?._id && <NoShop />}
        {isFulfilled && shop?.disabled && <DisabledShop />}
      </div>
    </>
  );
};

export default ShopPage;
