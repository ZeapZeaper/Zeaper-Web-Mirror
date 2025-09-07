import { useSelector } from "react-redux";

import { useState } from "react";

import { Alert, Button } from "flowbite-react";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "../loading";
import { ProductOrdersInterface } from "@/interface/interface";
import ProductOrderCard from "@/components/orders/ProductOrderCard";

const ShopProductOrders = ({ shop_id }: { shop_id: string }) => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [limit, setLimit] = useState(3);

  const productOrdersQuery = zeapApiSlice.useGetProductOrdersQuery(
    {
      limit,
      pageNumber: 1,
      shop: shop_id,
    },
    { skip: !token || !shop_id }
  );
  const productOrders = productOrdersQuery?.data?.data?.productOrders;
  const totalCount = productOrdersQuery?.data?.data?.totalCount;

  const isLoading = productOrdersQuery.isLoading;

  return (
    <div>
      {isLoading && <Loading />}

      <div className="flex flex-col  md:gap-4 w-full mt-4 bg-grey8 dark:bg-grey2 p-4">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-darkGold">Orders</h5>
          {productOrders?.length > 0 && (
            <Button
              color="primary"
              size="xs"
              onClick={() => {
                setLimit(limit === 3 ? totalCount : 3);
              }}
              outline
              className="text-primary"
              disabled={
                isLoading ||
                !productOrders ||
                productOrders.length === 0 ||
                totalCount < 3
              }
            >
              {limit < totalCount ? `View all ${totalCount}` : `View less`}
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-8 ">
          <div className="flex flex-col md:gap-4">
            <div className="md:hidden grid grid-cols-1    gap-4 w-full items-center justify-center cursor-pointer">
              {productOrders?.length > 0 &&
                productOrders?.map((productOrder: ProductOrdersInterface) => (
                  <div key={productOrder?._id} className="shadow-md">
                    <ProductOrderCard productOrder={productOrder} />
                  </div>
                ))}
            </div>
          </div>

          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 w-full  items-center justify-center cursor-pointer ">
            {productOrders?.length > 0 &&
              productOrders?.map((productOrder: ProductOrdersInterface) => (
                <div key={productOrder?._id} className="shadow-md">
                  <ProductOrderCard productOrder={productOrder} />
                </div>
              ))}
          </div>
          {productOrders?.length === 0 && (
            <div className="w-full ">
              <Alert className="w-100 " color="info">
                This shop has no orders yet
              </Alert>
            </div>
          )}

          <div className="flex justify-center">
            {totalCount > limit && (
              <Button
                onClick={() => {
                  setLimit(limit + 3);
                }}
                className="m-4 text-primary"
                color="primary"
                size="xs"
                outline
              >
                Load More
              </Button>
            )}
            {limit > 3 && (
              <Button
                onClick={() => {
                  setLimit(limit - 3);
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

export default ShopProductOrders;
