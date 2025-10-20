"use client";
import Skeleton from "@/components/loading/Skeleton";
import MyRecommendedProducts from "@/components/products/MyRecommendedProducts";
import NoProduct from "@/components/products/NoProduct";
import ProductCollectionDisplay from "@/components/products/ProductCollectionDisplay";
import ProductFilters from "@/components/products/ProductFilters";
import ProductPagination from "@/components/products/ProductPagination";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import {
  toCamelCaseWithoutSpaces,
  getProductDisplaySubMenus,
} from "@/utils/helpers";
import { usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

type ParamObj = {
  [key: string]: string | boolean | number;
};

const excludeKeys = [
  "productGroupPage",
  "subProductGroupPage",
  "collectionTitle",
  "superTitle",
];
const DisplayCollections = ({ paramObj }: { paramObj?: ParamObj }) => {
  const pathName = usePathname();

  const searchParams = useSearchParams();
  const collectTionTitle = searchParams.get("collectionTitle");

  const token = useSelector(globalSelectors.selectAuthToken);
  // const [subTitle, setSubTitle] = useState<string>("");
  //const limit = 4;
  const limit = 100;
  const slug = "";
  const slugUrl = pathName || `/collections`;
  const pageNumber = searchParams.get("pageNumber");
  const param: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    if (!excludeKeys.includes(key)) {
      param[key] = value;
    }
    // param[key] = value;
  });
  const productsQuery = zeapApiSlice.useGetProductsQuery(
    {
      limit,
      pageNumber: pageNumber ? parseInt(pageNumber) : 1,
      ...param,
      ...paramObj,
    },
    {
      skip: !token,
    }
  );

  const products = productsQuery?.data?.data?.products || [];
  const filters = productsQuery?.data?.data?.dynamicFilters;
  const totalCount = productsQuery?.data?.data?.totalCount;
  const isLoading = productsQuery.isLoading || false;
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

  const filterOutParamsObjFromDynamicFilters = () => {
    return (
      filters?.filter(
        (filter: {
          name: string;
          type: string;
          options: Record<string, { value: string }>;
        }) => {
          return !Object.keys(paramObj || {}).includes(
            toCamelCaseWithoutSpaces(filter.name || "")
          );
        }
      ) || []
    );
  };
  const dynamicFilters = filterOutParamsObjFromDynamicFilters() || [];

  return (
    <>
   
      <div className="md:p-4 h-full">
        <div className="grid gap-7 md:grid-cols-3 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 24 }).map((_, i) => <Skeleton key={i} />)}
        </div>
        {products?.length > 0 && (
          <div className="flex flex-col lg:flex-row lg:gap-4">
            <div className="hidden lg:flex flex-none md:w-64">
              <ProductFilters
                dynamicFilters={dynamicFilters}
                totalCount={totalCount}
                // setSubTitle={setSubTitle}
                colorOptions={colorOptions}
              />
            </div>
            <div className="flex flex-col gap-8">
              <ProductCollectionDisplay
                products={products}
                title={collectTionTitle || "Collections"}
                subMenus={getProductDisplaySubMenus(
                  dynamicFilters,
                  slug,
                  slugUrl,
                  products
                ).filter((menu) => menu !== null)}
                // subTitle={subTitle}
                // setSubTitle={setSubTitle}
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
    </>
  );
};

export default DisplayCollections;
