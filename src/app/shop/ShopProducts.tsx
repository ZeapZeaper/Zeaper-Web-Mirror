import { useSelector } from "react-redux";

import { useState } from "react";

import { Alert, Button } from "flowbite-react";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";

import ProductCard from "@/components/products/ProductCard";
import { ProductInterface } from "@/interface/interface";
import Link from "next/link";
import Loading from "../Loader";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const ShopProducts = ({ shopId }: { shopId: string }) => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [limit, setLimit] = useState(6);

  const productsQuery = zeapApiSlice.useGetShopProductsQuery(
    {
      limit,
      pageNumber: 1,
      currency: "NGN",
    },
    { skip: !token || !shopId }
  );
  const products = productsQuery?.data?.data?.products;
  const totalCount = productsQuery?.data?.data?.totalCount;
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions: ColInterface[] =
    options?.readyMadeClothes?.colorEnums || [];
  const isLoading = productsQuery.isLoading;

  return (
    <div className="w-full">
      {isLoading && <Loading />}

      <div className="flex flex-col md:flex-row md:gap-4 w-full mt-4 bg-grey8 dark:bg-grey2 p-4 bg-neutral-100">
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h5 className="text-xl font-bold text-darkGold">Products</h5>
              {products?.length > 0 && (
                <Button
                  color="primary"
                  size="xs"
                  onClick={() => {
                    setLimit(limit === 6 ? totalCount : 6);
                  }}
                  className="text-primary"
                  outline
                  disabled={
                    isLoading ||
                    !products ||
                    products.length === 0 ||
                    totalCount < 6
                  }
                >
                  {limit < totalCount ? `View all ${totalCount}` : `View less`}
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col md:gap-4 w-full">
            <div className="md:hidden grid grid-cols-1    gap-5 w-full items-center justify-center cursor-pointer ">
              {products?.length > 0 &&
                products?.map((product: ProductInterface) => (
                  <div
                    key={product?.productId}
                    className="flex flex-col items-center justify-center mb-6"
                  >
                   <ProductCard
                    product={product}
                    showStatus
                    colorOptions={colorOptions}
                    // disableLink
                    href = {`/shop/${shopId}/products/product/${product?.productId.replaceAll("/", "-")}`}
                  />
                    <Link
                      href={`/shop/${shopId}/products/product/${product?.productId.replaceAll("/", "-")}`}
                      className="text-center text-xs text-white bg-primary cursor-pointer p-2 rounded-full"
                    >
                      Manage Product
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          <div className="hidden md:grid grid-cols-2     w-full  gap-4 cursor-pointer ">
            {products?.length > 0 &&
              products?.map((product: ProductInterface) => (
                <div
                  key={product?.productId}
                  className="flex flex-col items-center justify-center mb-6"
                >
                  <ProductCard
                    product={product}
                    showStatus
                    colorOptions={colorOptions}
                    // disableLink
                    href = {`/shop/${shopId}/products/product/${product?.productId.replaceAll("/", "-")}`}
                  />
                  <Link
                    href={`/shop/${shopId}/products/product/${product?.productId.replaceAll("/", "-")}`}
                    className="text-center text-xs text-white bg-primary cursor-pointer p-2 rounded-full"
                  >
                    Manage Product
                  </Link>
                </div>
              ))}
          </div>
          {products?.length === 0 && (
            <div className="w-full f">
              <Alert className="w-100 " color="info">
                This shop has no products
              </Alert>
            </div>
          )}

          <div className="flex justify-center">
            {totalCount > limit && (
              <Button
                onClick={() => {
                  setLimit(limit + 6);
                }}
                className="m-4 text-primary"
                color="primary"
                size="xs"
                outline
              >
                Load More
              </Button>
            )}
            {limit > 6 && (
              <Button
                onClick={() => {
                  setLimit(limit - 6);
                }}
                className="m-4"
                color="primary"
                size="xs"
              >
                Load Less
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;
