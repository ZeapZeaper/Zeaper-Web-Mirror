"use client";

import Skeleton from "@/components/loading/Skeleton";
import ProductCard from "@/components/products/ProductCard";
import ShopProductNav from "@/components/shop/ShopProductNav";
import { AuthContext } from "@/contexts/authContext";
import { ProductInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { toCamelCaseWithoutSpaces } from "@/utils/helpers";
import { Alert, Pagination } from "flowbite-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const ShopProductsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "live";
  const pageNumber = searchParams.get("page") || "1";
  const token = useSelector(globalSelectors.selectAuthToken);
  const { user } = useContext(AuthContext);
  const shopId = user?.shopId;
  const limit = 20;
  const [filteredProduct, setFilteredProduct] = useState([]);

  const [input, setInput] = useState("");
  const productsQuery = zeapApiSlice.useGetShopProductsQuery(
    {
      limit,
      status: toCamelCaseWithoutSpaces(status),
      pageNumber,
      currency: "NGN",
    },
    { skip: !token || !shopId || !status }
  );
  const products = productsQuery?.data?.data?.products;
  const isFulfilled = productsQuery?.status === "fulfilled";

  const totalCount = productsQuery?.data?.data?.totalCount || 0;
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions: ColInterface[] =
    options?.readyMadeClothes?.colorEnums || [];
  const isLoading = productsQuery.isLoading;

  const escapeRegExp = (value: string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const searchRegex = new RegExp(escapeRegExp(input), "i");
  // recursive search function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const search = (item: any) => {
    let found = false;

    if (typeof item === "string") {
      if (searchRegex.test(item?.toString())) {
        found = true;
        return found;
      }
    }

    if (typeof item === "object" && item !== null) {
      Object.keys(item).forEach((key) => {
        const value = item[key];
        const match = search(value);
        if (match) {
          found = true;
          return found;
        }
      });
    }
    return found;
  };

  useEffect(() => {
    if (products) {
      const result = products?.filter((row: ProductInterface) => {
        const keys = Object.keys(row);
        return keys.some((field) => {
          return search(row[field as keyof ProductInterface]);
        });
      });

      setFilteredProduct(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, products]);

  const changePage = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    params.set("status", status);
    router.push(`/shop/${shopId}/products?${params.toString()}`);
  };
  return (
    <div className="container pb-6 lg:pb-28">
      {" "}
      {isLoading && (
        <div className="grid gap-7 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      )}
      <div className="flex flex-col md:flex-row md:justify-between">
        <h2 className="block text-xl font-medium sm:text-2xl lg:text-3xl">
          My Shop Products
        </h2>
        {products?.length > 0 && (
          <div className="flex flex-col justify-center items-center w-full my-4 md:my-0 md:w-auto ">
            <form className=" w-full md:w-[30rem]  ">
              <div className="relative ">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 h-[2.5rem]"
                  placeholder="Search products"
                  required
                  value={input || ""}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-1 bg-primary hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {shopId && (
        <div className="flex  mt-4">
          <ShopProductNav shopId={shopId} status={status} />
        </div>
      )}
      {products?.length === 0 && isFulfilled && (
        <div className="w-full flex items-center justify-center my-16">
          <Alert className="w-100 " color="info">
            You have no &quot;<strong>{status}</strong>&quot; products.
          </Alert>
        </div>
      )}
 {products?.length > 0 && filteredProduct?.length === 0 && (
        <div className="w-full flex items-center justify-center my-16">
          <Alert className="w-100 " color="info">
            No product found for your search or filter criteria.
          </Alert>
        </div>
      )}      

      <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 w-full  gap-4 cursor-pointer  justify-center">
        {filteredProduct?.length > 0 &&
          filteredProduct?.map((product: ProductInterface) => (
            <div
              key={product?.productId}
              className="flex flex-col items-center justify-center mb-6 w-full"
            >
              <ProductCard
                product={product}
                colorOptions={colorOptions}
                // disableLink
                href={`/shop/${shopId}/products/product/${product?.productId.replaceAll(
                  "/",
                  "-"
                )}`}
              />
              <Link
                href={`/shop/${shopId}/products/product/${product?.productId.replaceAll(
                  "/",
                  "-"
                )}`}
                className="text-center text-xs text-white bg-primary cursor-pointer p-2 rounded-full"
              >
                Manage Product
              </Link>
            </div>
          ))}
      </div>
      <div className="flex flex-col md:gap-4 w-full">
        <div className="md:hidden grid grid-cols-2    gap-2 w-full items-center justify-center cursor-pointer ">
          {filteredProduct?.length > 0 &&
            filteredProduct?.map((product: ProductInterface) => (
              <div
                key={product?.productId}
                className="flex flex-col items-center justify-center mb-6"
              >
                <ProductCard
                  product={product}
                  colorOptions={colorOptions}
                  // disableLink
                  href={`/shop/${shopId}/products/product/${product?.productId.replaceAll(
                    "/",
                    "-"
                  )}`}
                />
                <Link
                  href={`/shop/${shopId}/products/product/${product?.productId.replaceAll(
                    "/",
                    "-"
                  )}`}
                  className="text-center text-xs text-white bg-primary cursor-pointer p-2 rounded-full"
                >
                  Manage Product
                </Link>
              </div>
            ))}
        </div>
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            currentPage={pageNumber ? parseInt(pageNumber) : 1}
            totalPages={Math.ceil(totalCount / limit)}
            onPageChange={(page) => {
              changePage(page);
            }}
            showIcons
          />
        </div>
      </div>
    </div>
  );
};

export default ShopProductsPage;
