"use client";

import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { getProductDisplaySubMenus } from "@/utils/helpers";
import { useEffect, useState } from "react";

import ProductList from "@/components/products/ProductList";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const Page = () => {
  const [search, setSearch] = useState<string>("");
  const token = useSelector(globalSelectors.selectAuthToken);

  //const limit = 4;
  const limit = 100;
  const slug = "search";
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("pageNumber");
  const param: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    param[key] = value;
  });
  const productsQuery = zeapApiSlice.useGetSearchProductsQuery(
    {
      limit,
      pageNumber: pageNumber ? parseInt(pageNumber) : 1,
      ...param,
      search,
    },
    {
      skip: !token,
    }
  );
  const products = productsQuery?.data?.data?.products || [];
  const productListDynamicFiltersQuery =
    zeapApiSlice.useGetProductListDynamicFiltersQuery(
      { ...param },
      { skip: !token }
    );
  const dynamicFilters =
    productListDynamicFiltersQuery?.data?.data?.dynamicFilters;
  const totalCount = productListDynamicFiltersQuery?.data?.data?.totalCount;
  const isLoading = productsQuery.isLoading || false;
  const filtersLoading = productListDynamicFiltersQuery.isLoading || false;
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions: ColInterface[] =
    options?.readyMadeClothes?.colorEnums || [];

  useEffect(() => {
    const localStoredSearch = localStorage.getItem("search");
    setSearch(localStoredSearch || "");
  }, []);

  return (
    <ProductList
      products={products}
      colorOptions={colorOptions}
      showMobileFilters={true}
      filtersLoading={filtersLoading}
      dynamicFilters={dynamicFilters}
      totalCount={totalCount}
      pageNumber={pageNumber ? parseInt(pageNumber) : 1}
      limit={limit}
      isLoading={isLoading}
      isSuccess={productsQuery.isSuccess}
      title={`Search Results for "${search}"`}
      subMenus={getProductDisplaySubMenus(
        dynamicFilters,
        slug,
        undefined,
        products
      ).filter((menu) => menu !== null)}
    />
  );
};

export default Page;
