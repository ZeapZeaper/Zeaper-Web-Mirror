"use client";

import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import ProductFilters from "@/components/products/ProductFilters";

import ProductCollectionDisplay from "@/components/products/ProductCollectionDisplay";
import Skeleton from "@/components/loading/Skeleton";
import ProductPagination from "@/components/products/ProductPagination";
import { getProductDisplaySubMenus } from "@/utils/helpers";
import NoProduct from "@/components/products/NoProduct";
import MyRecommendedProducts from "@/components/products/MyRecommendedProducts";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const Page = () => {
  const token = useSelector(globalSelectors.selectAuthToken);

  //const limit = 4;
  const limit = 100;
  const slug = "bespoke";
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("pageNumber");
  const param: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    param[key] = value;
  });
  const productsQuery = zeapApiSlice.useGetBespokeProductsQuery(
    {
      limit,
      pageNumber: pageNumber ? parseInt(pageNumber) : 1,
      ...param,
    },
    {
      skip: !token,
    }
  );

  const products = productsQuery?.data?.data?.products || [];
  const dynamicFilters = productsQuery?.data?.data?.dynamicFilters;
  const totalCount = productsQuery?.data?.data?.totalCount;
  const isLoading = productsQuery.isLoading || false;
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions: ColInterface[] =
    options?.readyMadeClothes?.colorEnums || [];

  return (
    <div className="p-1 md:p-0 py-6 lg:pb-28">
      {" "}
      <hr className="border-neutral-300" />
      <div className="md:p-4 min-h-screen ">
        <div className="grid gap-7 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 24 }).map((_, i) => <Skeleton key={i} />)}
        </div>
        {products?.length > 0 && (
          <div className="flex flex-col md:flex-row md:gap-4 ">
            <div className="hidden lg:flex h-[100%] md:w-64">
              <ProductFilters
                dynamicFilters={dynamicFilters}
                totalCount={totalCount}
               
                colorOptions={colorOptions}
              />
            </div>
            <div className="flex flex-col gap-8  ">
              <ProductCollectionDisplay
                products={products}
                title="Bespoke Collection"
                subMenus={getProductDisplaySubMenus(
                  dynamicFilters,
                  slug,
                  undefined,
                  products
                ).filter((menu) => menu !== null)}
               
                colorOptions={colorOptions}
                showMobileFilters={true}
                dynamicFilters={dynamicFilters}
                totalCount={totalCount}
              />
              {/* <ProductTileList products={filteredProducts} /> */}

              <div className="flex overflow-x-auto justify-center">
                <ProductPagination
                  pageNumber={pageNumber ? parseInt(pageNumber) : 1}
                  totalCount={totalCount}
                  limit={limit}
                  showIcons
                />
              </div>
            </div>
          </div>
        )}

        {productsQuery.isSuccess && products?.length === 0 && <NoProduct />}
      </div>
      <MyRecommendedProducts />
    </div>
  );
};

export default Page;
