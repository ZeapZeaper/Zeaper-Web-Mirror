"use client";
import { globalSelectors } from "@/redux/services/global.slice";
import { useSelector } from "react-redux";
import EmptyWishList from "./EmptyWishList";
import ProductCard from "@/components/products/ProductCard";
import zeapApiSlice from "@/redux/services/zeapApi.slice";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const WishListPage = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const wishList = useSelector(globalSelectors.selectWishList);
  const isLoading = useSelector(globalSelectors.selectIsWishListLoading);
  const products = wishList?.map((item) => item.product);
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions: ColInterface[] =
    options?.readyMadeClothes?.colorEnums || [];

  return (
    <div>
      <main className=" p-4 lg:pb-28  ">
        <div className="mb-7">
          <h2 className="block text-2xl font-medium sm:text-3xl lg:text-4xl">
            Wish List
          </h2>
        </div>

        {wishList?.length === 0 && !isLoading && (
          <div className="w-screen h-[65vh] flex items-center justify-center">
            {" "}
            <EmptyWishList />{" "}
          </div>
        )}

        {wishList?.length > 0 && (
          <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 ">
            {products?.map((item) => (
              <ProductCard
                product={item}
                key={item._id}
                colorOptions={colorOptions}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
export default WishListPage;
