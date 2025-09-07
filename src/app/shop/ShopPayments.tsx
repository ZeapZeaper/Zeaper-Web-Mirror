import { useState } from "react";
import { useSelector } from "react-redux";
import { Alert } from "flowbite-react";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "../loading";
import { ShopPaymentInterface } from "@/interface/interface";
import ShopPaymentCard from "./ShopPaymentCard";

const ShopPayments = ({ shopId }: { shopId: string }) => {
  const [limit, setLimit] = useState(3);
  const token = useSelector(globalSelectors.selectAuthToken);
  const shopPaymentsQuery = zeapApiSlice.useGetShopPaymentsQuery(
    { shopId },
    { skip: !token || !shopId }
  );
  const isLoading = shopPaymentsQuery.isLoading;
  const shopPayments = shopPaymentsQuery?.data?.data;
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 text-black rounded-lg shadow sm:p-8 dark:bg-slate-800 dark:text-white dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        {isLoading && <Loading />}
        <h5 className="text-xl font-bold text-primary">
          Shop Payments ({shopPayments?.length})
        </h5>
        <button
          type="button"
          color="primary"
          className="text-sm font-medium text-info hover:underline cursor-pointer disabled:opacity-50"
          onClick={() => setLimit(limit === 3 ? shopPayments?.length : 3)}
          disabled={isLoading || !shopPayments || shopPayments.length < 3}
        >
          {limit < shopPayments?.length ? "View All" : "View Less"}
        </button>
      </div>
      {shopPaymentsQuery?.status === "fulfilled" &&
        shopPayments.length === 0 && (
          <Alert color="info" className="mb-4">
            No payments yet
          </Alert>
        )}
      <div className="flex flex-col gap-3">
        {shopPayments
          ?.slice(0, limit)
          .map((payment: ShopPaymentInterface, index: number) => (
            <div
              key={index}
              className="flex justify-center items-center w-full"
            >
              <ShopPaymentCard payment={payment} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShopPayments;
