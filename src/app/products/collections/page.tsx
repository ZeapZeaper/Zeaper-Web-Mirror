"use client";
import ProductList from "@/components/products/ProductList";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { getProductDisplaySubMenus } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}
const CollectionPage = () => {
  // const linkSubTitle =
  //   typeof window !== "undefined" && localStorage.getItem("selectedMenuChild");
  const searchParams = useSearchParams();
  const collectTionTitle = searchParams.get("collectionTitle");

  const token = useSelector(globalSelectors.selectAuthToken);

  //const limit = 4;
  const limit = 100;
  const slug = "";
  const slugUrl = `/products/collections`;
  const pageNumber = searchParams.get("pageNumber");
  const param: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    param[key] = value;
  });
  const productsQuery = zeapApiSlice.useGetProductsQuery(
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
  // useEffect(() => {
  //   if (linkSubTitle) {
  //     setSubTitle(linkSubTitle);
  //   }
  // }, [linkSubTitle]);

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
      title={collectTionTitle || "Collections"}
      subMenus={getProductDisplaySubMenus(
        dynamicFilters,
        slug,
        slugUrl,
        products
      ).filter((menu) => menu !== null)}
    />
  );
};

export default CollectionPage;
