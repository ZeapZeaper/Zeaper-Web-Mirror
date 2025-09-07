"use client";
import Skeleton from "@/components/loading/Skeleton";
import { AuthContext } from "@/contexts/authContext";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useContext } from "react";
import { useSelector } from "react-redux";
import DraftProductList from "./DraftProductList";
import AddNewProductOptions from "./AddNewProductOptions";

const AddProductPage = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const { user } = useContext(AuthContext);
  const shopId = user?.shopId;

  const shopDraftProductQuery = zeapApiSlice.useGetShopDraftProductsQuery(
    {
      shopId: shopId,
    },
    { skip: !token || !shopId }
  );
  const draftProducts = shopDraftProductQuery?.data?.data;
  const isLoading = shopDraftProductQuery.isLoading;
  return (
    <div className="container py-6 lg:pb-28">
      <span className="text-xl md:text-2xl font-bold ">Add New Product</span>
      <div className="grid gap-7 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {isLoading &&
          Array.from({ length: 24 }).map((_, i) => <Skeleton key={i} />)}
      </div>
      {shopDraftProductQuery?.status === "fulfilled" && (
        <DraftProductList draftProducts={draftProducts} />
      )}
      <div className="my-4">
        <AddNewProductOptions />
      </div>
    </div>
  );
};

export default AddProductPage;
