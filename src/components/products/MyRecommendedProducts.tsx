"use client";
import Skeleton from "@/components/loading/Skeleton";
import ProductCard from "@/components/products/ProductCard";
import { ProductInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useSelector } from "react-redux";
import { Carousel } from "flowbite-react";

const caruselTheme = {
  indicators: {
    active: {
      off: "bg-slate-500 hover:bg-slate-600",
      on: "bg-slate-800",
    },
    base: "h-3 w-3 rounded-full",
    wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
  },
  item: {
    base: "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-full shrink-0 transform cursor-default snap-center",
      on: "w-full shrink-0 transform cursor-grab snap-center",
    },
  },
  control: {
    base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-600 group-hover:bg-slate-400 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10  ",
    icon: "h-5 w-5 text-white sm:h-6 sm:w-6 dark:text-gray-800 ",
  },
};

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const MyRecommendedProducts = () => {
  const token = useSelector(globalSelectors.selectAuthToken);

  const getRecommendedProductsQuery =
    zeapApiSlice.useGetRecommendedProductsQuery({}, { skip: !token });

  const recommendedProducts = getRecommendedProductsQuery?.data?.data;

  const isLoading = getRecommendedProductsQuery.isLoading;
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions: ColInterface[] =
    options?.readyMadeClothes?.colorEnums || [];

  const getGroupedProducts = (count: number) => {
    const groupedProducts: ProductInterface[][] = [];
    for (let i = 0; i < recommendedProducts.length; i += count) {
      groupedProducts.push(recommendedProducts.slice(i, i + count));
    }

    return groupedProducts;
  };
  return (
    <div className="bg-lightGold container mt-4">
      {recommendedProducts?.length > 0 && (
        <div className="p-1  py-8 lg:pb-28">
          <div className="flex justify-between items-center">
            <span className=" font-bold text-xl text-neutral-900 ">
              Picked For You
            </span>
          </div>
          <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4   lg:grid-cols-5 ">
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
          </div>
          {/* <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-5 2xl:grid-cols-5 ">
            {recommendedProducts?.map((product: ProductInterface) => (
              <ProductCard
                key={product.productId}
                product={product}
                colorOptions={colorOptions}
              />
            ))}
          </div> */}
          {recommendedProducts?.length > 0 && (
            <>
              <div className=" hidden 2xl:flex  h-[35rem] w-full  items-center justify-center">
                <Carousel theme={caruselTheme} slide={false} className="w-full">
                  {getGroupedProducts(5).map((group, index) => (
                    <div
                      key={index}
                      className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 "
                    >
                      {group.map((product: ProductInterface) => (
                        <ProductCard
                          key={product.productId}
                          product={product}
                          colorOptions={colorOptions}
                        />
                      ))}
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className=" hidden lg:flex 2xl:hidden h-[35rem] w-full  items-center justify-center">
                <Carousel theme={caruselTheme} slide={false} className="w-full">
                  {getGroupedProducts(4).map((group, index) => (
                    <div
                      key={index}
                      className="grid gap-2 md:gap-4 grid-cols-2  lg:grid-cols-4 2xl:grid-cols-5 "
                    >
                      {group.map((product: ProductInterface) => (
                        <ProductCard
                          key={product.productId}
                          product={product}
                          colorOptions={colorOptions}
                        />
                      ))}
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className=" hidden md:flex lg:hidden 2xl:hidden h-[35rem] w-full  items-center justify-center">
                <Carousel theme={caruselTheme} slide={false} className="w-full">
                  {getGroupedProducts(2).map((group, index) => (
                    <div
                      key={index}
                      className="grid gap-2 md:gap-4 grid-cols-2   "
                    >
                      {group.map((product: ProductInterface) => (
                        <ProductCard
                          key={product.productId}
                          product={product}
                          colorOptions={colorOptions}
                        />
                      ))}
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className=" flex md:hidden h-[35rem] w-full  items-center justify-center">
                <Carousel
                  theme={caruselTheme}
                  slide={false}
                  className="w-full "
                >
                  {getGroupedProducts(2).map((group, index) => (
                    <div
                      key={index}
                      className="grid gap-2 lg:gap-4 grid-cols-2  lg:grid-cols-4 2xl:grid-cols-5 "
                    >
                      {group.map((product: ProductInterface) => (
                        <ProductCard
                          key={product.productId}
                          product={product}
                          colorOptions={colorOptions}
                        />
                      ))}
                    </div>
                  ))}
                </Carousel>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyRecommendedProducts;
