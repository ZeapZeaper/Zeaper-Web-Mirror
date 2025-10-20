"use client";
import { useSelector } from "react-redux";

import { Alert, Button } from "flowbite-react";

import ReactTimeAgo from "react-time-ago";

import { useContext, useState } from "react";

import {
  capitalizeFirstLetter,
  displayDate,
  getProductOrderStatusBg,
} from "@/utils/helpers";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useParams, useRouter } from "next/navigation";
import { globalSelectors } from "@/redux/services/global.slice";
import Skeleton from "@/components/loading/Skeleton";

import { ProductInterface } from "@/interface/interface";
import ProductImage from "@/app/products/[product]/ProductImage";
import ProductOrderBodyMeasurementDisplay from "@/components/orders/ProductOrderBodyMeasurementDisplay";
import { ProductOrderStatusHistoryDrawer } from "@/components/orders/ProductOrderStatusHistoryDrawer";
import MyRecommendedProducts from "@/components/products/MyRecommendedProducts";
import { AuthContext } from "@/contexts/authContext";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ProductOrderUpdateStatus from "@/components/orders/ProductOrderUpdateStatus";
import { ThemeContext } from "@/contexts/themeContext";
import { FaEye } from "react-icons/fa";

const vendorActionStatusList = [
  "order placed",
  "order confirmed",
  "order processing",
];

const OrderItemPage = () => {
  const { setDimBackground } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const token = useSelector(globalSelectors.selectAuthToken);
  const { productOrder_id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [serverError, setServerError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const productOrderQuery = zeapApiSlice.useGetProductOrderQuery(
    {
      productOrder_id,
    },
    { skip: !token || !productOrder_id }
  );

  const productOrder = productOrderQuery?.data?.data;

  const isOtherUserOrder = productOrder?.user?._id !== user?._id;

  const isMyShopOrder =
    productOrder?.shop.shopId && productOrder?.shop.shopId === user?.shopId;

  const product: ProductInterface = productOrder?.product;
  const sku = productOrder?.sku;
  // const order = productOrder?.order;
  const color = productOrder?.color;
  const bespokeColor = productOrder?.bespokeColor;
  const quantity = productOrder?.quantity;
  const size = productOrder?.size;
  const status = productOrder?.status;
  const deliveryDetails = productOrder?.deliveryDetails;
  const bodyMeasurements = productOrder?.bodyMeasurements || [];

  const images = productOrder?.images.map(
    (image: { name: string; link: string }) => image.link
  );

  const productOrderStatusHistoryQuery =
    zeapApiSlice.useGetProductOrderStatusHistoryQuery(
      { productOrder_id },
      { skip: !token || !productOrder_id }
    );

  const nextStatus = productOrderStatusHistoryQuery?.data?.data.nextStatus;
  const [updateProductOrderStatus, updateProductOrderStatusStatus] =
    zeapApiSlice.useUpdateProductOrderStatusMutation();
  const isLoading =
    productOrderQuery.isLoading ||
    productOrderStatusHistoryQuery.isLoading ||
    updateProductOrderStatusStatus.isLoading;

  const handleUpdateStatus = (status: string) => {
    const payload = {
      status,
      productOrder_id,
    };
    updateProductOrderStatus({ payload })
      .unwrap()
      .then(() => {
        setServerError("");
        setDimBackground(false);
        // setOpenRevertModal(false);
        setOpenModal(false);
      })
      .catch((err) => {
        setServerError(err.data.error);
        setTimeout(() => {
          setServerError("");
        }, 5000);
      });
  };

  const getDefaultColor = () => {
    if (product?.colors?.length > 0) {
      const colors = product.colors;
      const isDefault = colors.find((color) =>
        color.images.find((image) => image.isDefault)
      );

      if (isDefault) {
        return isDefault.value;
      }
      return colors[0]?.value;
    }
    return "";
  };

  return (
    <div className=" px-4 md:px-12 lg:pb-28">
      {productOrder && (
        <div className="flex flex-col lg:flex-row  lg:items-center lg:justify-between  p-4 bg-white dark:bg-boxdark  rounded-lg   hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div>
            {" "}
            <h1 className="font-bold text-xl text-neutral-900">
              Order : {productOrder?.orderId}/{productOrder?.itemNo}
            </h1>
          </div>
          <div className="flex flex-col md:flex-row  items-center gap-2 w-full  lg:w-[40rem] my-2 lg:my-0">
            {isMyShopOrder && vendorActionStatusList.includes(status.value) && (
              <ProductOrderUpdateStatus
                nextStatus={nextStatus}
                handleUpdateStatus={handleUpdateStatus}
                serverError={serverError}
                setServerError={setServerError}
                openModal={openModal}
                setOpenModal={setOpenModal}
                setDimBackground={setDimBackground}
              />
            )}
            <Button
              className="w-full  lg:w-[40rem]"
              color="info"
              size="sm"
              onClick={() => setIsOpen(true)}
            >
              <FaEye className="mr-2 h-5 w-5" />
              View Status History
            </Button>
          </div>
        </div>
      )}
      <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-4 lg:grid-cols-5 ">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
      </div>
      {productOrderQuery.status === "fulfilled" && !productOrder && (
        <div className="bg-slate-100 h-[20rem] flex flex-col justify-center items-center px-6 w-full">
          <div className="flex flex-col gap-4">
            <Alert color="failure">
              Oops! We couldn&apos;t find the order you are looking for.
              <br />
              Please contact support if you believe this is an error.
            </Alert>
            <div className="flex gap-2 justify-center">
              <ButtonPrimary
                onClick={() => {
                  router.push("/account/orders");
                }}
              >
                Go to My Orders
              </ButtonPrimary>
              {user?.shopId && user?.shopEnabled && (
                <ButtonSecondary
                  onClick={() => {
                    router.push(`/shop/${user?.shopId}/orders`);
                  }}
                >
                  Go to My Shop Orders
                </ButtonSecondary>
              )}
            </div>
          </div>
        </div>
      )}

      {productOrder && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div
              onClick={() => {
                router.push(
                  `/products/${product?.title
                    .replace(/ /g, "-")
                    .replace(/&/g, "and")
                    .replace(/\//g, "-")}-${
                    color || getDefaultColor()
                  }?productId=${
                    product?.productId
                  }&color=${color || getDefaultColor()}`
                );
              }}
              className="text-lg font-semibold cursor-pointer underline underline-thickness-thin underline-offset-small text-info hover:text-darkGold"
            >
              {product.title}
            </div>
          </div>
          <div className="grid grid-cols-1  sm:grid-cols-2  ">
            <div className="flex flex-col gap-4">
              {/* <span className="text-lg font-semibold">{product?.title}</span> */}
              <ProductImage images={images || []} />

              {/* <div className="hidden md:block">
                <span className="font-bold">Customer</span>
                <div className=" bg-grey8 p-2 ">
                  <div>
                    <UserTile user={user} />
                  </div>
                </div>
              </div> */}
            </div>
            <div className="flex flex-col gap-8  divide-y divide-slate-300 m-2 p-4 bg-grey8 dark:bg-boxdark">
              <div className="flex justify-between items-center">
                <span className="text-md ">Status</span>
                <span
                  className={`text-md w-[100px] text-center border p-2 rounded-md font-bold  ${getProductOrderStatusBg(
                    status?.value
                  )}`}
                >
                  {capitalizeFirstLetter(status.name)}{" "}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-md ">SKU</span>
                <span className="text-lg font-semibold">{sku}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Colour</span>
                <span className="text-lg font-semibold">
                  {color || "Not Specified"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Size</span>
                <span className="text-lg font-semibold">{size}</span>
              </div>
              {bespokeColor && (
                <div className="flex justify-between items-center">
                  <span className="text-md ">
                    Single Plain bespoke Material Colour
                  </span>
                  <span className="text-lg font-semibold">
                    {bespokeColor || "N/A"}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-md ">Quantity</span>
                <span className="text-lg font-semibold">{quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Ordered on</span>
                <span className="text-lg font-semibold">
                  {" "}
                  <ReactTimeAgo date={productOrder?.createdAt} locale="en-US" />
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-md ">Last Updated on</span>
                <span className="text-lg font-semibold">
                  {" "}
                  <ReactTimeAgo date={productOrder?.updatedAt} locale="en-US" />
                </span>
              </div>
              {productOrder?.expectedVendorCompletionDate && (
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <span className="text-md ">
                    Expected Vendor Completion Date
                  </span>
                  <span className="text-lg font-semibold">
                    {productOrder?.expectedVendorCompletionDate ? (
                      <span>
                        {" "}
                        {displayDate(
                          productOrder?.expectedVendorCompletionDate?.min,
                          false
                        )}{" "}
                        -{" "}
                        {displayDate(
                          productOrder?.expectedVendorCompletionDate?.max,
                          false
                        )}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </span>
                </div>
              )}
              {productOrder?.expectedDeliveryDate && (
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <span className="text-md ">Expected Delivery Date</span>
                  <span className="text-lg font-semibold">
                    {productOrder?.expectedDeliveryDate ? (
                      <span>
                        {displayDate(
                          productOrder?.expectedDeliveryDate?.min,
                          false
                        )}{" "}
                        -{" "}
                        {displayDate(
                          productOrder?.expectedDeliveryDate?.max,
                          false
                        )}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </span>
                </div>
              )}
              {productOrder?.deliveryCompany && (
                <div className="flex justify-between items-center">
                  <span className="text-md ">Delivery Company</span>
                  <span className="text-lg font-semibold">
                    {productOrder?.deliveryCompany || "N/A"}
                  </span>
                </div>
              )}
              {productOrder?.deliveryTrackingNumber && (
                <div className="flex justify-between items-center">
                  <span className="text-md ">Delivery Tracking Number</span>
                  <span className="text-lg font-semibold">
                    {productOrder?.deliveryTrackingNumber || "N/A"}
                  </span>
                </div>
              )}
              {productOrder?.deliveryTrackingLink && (
                <div className="flex justify-between items-center">
                  <span className="text-md ">Delivery Tracking Link</span>
                  <span className="text-lg font-semibold">
                    <a
                      href={productOrder?.deliveryTrackingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-darkGold"
                    >
                      {productOrder?.deliveryTrackingLink || "N/A"}
                    </a>
                  </span>
                </div>
              )}
              {bodyMeasurements?.length > 0 && (
                <div className="py-4">
                  <span className="font-bold">Body Measurements</span>
                  <div className="flex flex-col gap-2  ">
                    {bodyMeasurements?.length > 0 ? (
                      <ProductOrderBodyMeasurementDisplay
                        bodyMeasurements={bodyMeasurements}
                      />
                    ) : (
                      <Alert color="info">No body measurements</Alert>
                    )}
                  </div>
                </div>
              )}
              {!isOtherUserOrder && (
                <div>
                  <span className="font-bold">Delivery Details</span>
                  <div className=" bg-grey8 p-2 ">
                    <div className="flex flex-col gap-2 bg-grey8 p-2 dark:bg-boxdark">
                      <div className="flex justify-between">
                        <span>Method: </span>
                        <span>
                          {capitalizeFirstLetter(
                            productOrder?.deliveryMethod || ""
                          ) || "N/P"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Address: </span>
                        <span>{deliveryDetails?.address || "N/P"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Region: </span>
                        <span>{deliveryDetails?.region || "N/P"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Post Code: </span>
                        <span>{deliveryDetails?.postCode || "N/P"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Country: </span>
                        <span>{deliveryDetails?.country || "N/P"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contact No: </span>
                        <span>{deliveryDetails?.phoneNumber || "N/P"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <ProductOrderStatusHistoryDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          productOrder_id={productOrder?._id}
          isOtherUserOrder={isOtherUserOrder}
          isMyShopOrder={isMyShopOrder}
        />
      )}
      <MyRecommendedProducts />
    </div>
  );
};

export default OrderItemPage;
