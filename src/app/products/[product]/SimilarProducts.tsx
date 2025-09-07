import ProductCard from "@/components/products/ProductCard";
import Skeleton from "@/components/loading/Skeleton";
import { ProductInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Heading from "@/shared/Heading/Heading";
import React from "react";
import { useSelector } from "react-redux";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const SimilarProducts = ({ productId }: { productId: string }) => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const limit = 100;
  const productsQuery = zeapApiSlice.useGetSimilarProductsQuery(
    {
      limit,
      productId,
    },
    {
      skip: !token || !productId,
    }
  );

  const products = productsQuery?.data?.data || [];

  const isLoading = productsQuery.isLoading || false;
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions: ColInterface[] =
    options?.readyMadeClothes?.colorEnums || [];

  return (
    <div>
      {products?.length > 0 && (
        <>
          <Heading className="mb-0">Similar Products</Heading>
          <div className="grid gap-7 md:grid-cols-3 lg:grid-cols-4">
            {isLoading &&
              Array.from({ length: 24 }).map((_, i) => <Skeleton key={i} />)}
          </div>

          <div className="grid gap-2 md:gap-4 grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 ">
            {products.map((item: ProductInterface) => (
              <ProductCard
                product={item}
                key={item._id}
                colorOptions={colorOptions}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SimilarProducts;
