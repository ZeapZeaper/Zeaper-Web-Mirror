import { ShopInterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import React from "react";

const ShopPolicies = ({ shop }: { shop: ShopInterface }) => {
  const getSellerPolicyQuery = zeapApiSlice.useGetSellerPolicyQuery({});
  const isFulfilled = getSellerPolicyQuery?.status === "fulfilled";
  const sellerPolicy: {
    link: string;
    name: string;
  }[] = getSellerPolicyQuery?.data?.data;

  const signedOn = shop?.createdAt
    ? new Date(shop.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 text-black rounded-lg shadow sm:p-8 dark:bg-slate-800 dark:text-white dark:border-gray-700">
      <h5 className="text-xl font-bold text-primary">Documents</h5>
      <div className="flow-root">
        {sellerPolicy?.length === 0 && isFulfilled && (
          <div className="text-sm text-slate-500 dark:text-slate-300">
            No documents available.
          </div>
        )}
        {sellerPolicy?.length > 0 && (
          <>
            <ul className="mt-4">
              {sellerPolicy?.map((doc) => (
                <li key={doc.link} className="py-2">
                  <a
                    href={doc.link}
                    className="text-info underline hover:text-secondary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {doc.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-sm text-slate-500 dark:text-slate-300">
              Signed On: {signedOn}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopPolicies;
