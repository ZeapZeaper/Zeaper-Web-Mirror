"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { getProductDisplaySubMenus } from "@/utils/helpers";
import { useCallback } from "react";
import ProductList from "@/components/products/ProductList";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const Page = () => {
  const token = useSelector(globalSelectors.selectAuthToken);

  //const limit = 4;
  const limit = 100;
  const slug = "promo";
  const { promoId } = useParams();
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("pageNumber");
  const param: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    param[key] = value;
  });
  const getPromoId = useCallback(() => {
    if (promoId && Array.isArray(promoId)) {
      return promoId[0];
    }
    return promoId;
  }, [promoId]);
  const getOtherParamsFromPromoId = useCallback(() => {
    // remove first item from promoId if it is an array
    // return rest as object with keys and value split with =
    if (promoId && Array.isArray(promoId)) {
      const promoParams = promoId
        .slice(1)
        .reduce<Record<string, string>>((acc, item) => {
          const [key, value] = item.split("%3D");
          acc[key] = value;
          return acc;
        }, {});

      return promoParams;
    }
    return {};
  }, [promoId]);
  const productsQuery = zeapApiSlice.useGetPromoProductsQuery(
    {
      promoId: getPromoId(),
      ...getOtherParamsFromPromoId(),
      limit,
      pageNumber: pageNumber ? parseInt(pageNumber) : 1,
    },
    {
      skip: !token || !promoId,
    }
  );

  const products = productsQuery?.data?.data?.products || [];
  const promo = productsQuery?.data?.data?.promo || {};
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
             title={promo?.title || ""}
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
