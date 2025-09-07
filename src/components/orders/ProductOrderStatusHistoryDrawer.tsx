"use client";

import { Drawer, Timeline } from "flowbite-react";

import { useSelector } from "react-redux";

import { IoIosDoneAll } from "react-icons/io";

import ReactTimeAgo from "react-time-ago";
import { IoMdClose } from "react-icons/io";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "../loading/Loading";
import ProductOrderCancellation from "./ProductOrderCancellation";
import ProductOrderUpdateStatus from "./ProductOrderUpdateStatus";
import { useContext, useState } from "react";
import { ThemeContext } from "@/contexts/themeContext";
import { capitalizeFirstLetter } from "@/utils/helpers";

const drawerTheme = {
  root: {
    base: "fixed z-50  overflow-y-auto bg-slate-100   p-4 transition-transform ",

    position: {
      right: {
        on: "right-0 top:0 md:top-10 h-screen w-screen lg:w-[40vw] transform-none",
        off: "right-0 top-0 h-screen w-80 translate-x-full",
      },
    },
  },
};
const timelineTheme = {
  root: {
    direction: {
      horizontal: "sm:flex",
      vertical: "relative border-l border-gray-200 dark:border-gray-700",
    },
  },
  item: {
    point: {
      horizontal: "flex items-center",
      line: "hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex",
      marker: {
        icon: {
          base: "h-3 w-3 text-cyan-600 dark:text-cyan-300",
          wrapper:
            "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-success ring-8 ring-white  dark:ring-gray-900",
        },
      },
      vertical: "",
    },
  },
};

const vendorActionStatusList = [
  "order placed",
  "order confirmed",
  "order processing",
];

export function ProductOrderStatusHistoryDrawer({
  isOpen,
  setIsOpen,
  productOrder_id,
  isOtherUserOrder = false,
  isMyShopOrder = false,
}: {
  productOrder_id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isOtherUserOrder: boolean;
  isMyShopOrder: boolean;
}) {
  const { setDimBackground } = useContext(ThemeContext);
  const token = useSelector(globalSelectors.selectAuthToken);
  const [serverError, setServerError] = useState("");
  // const [openRevertModal, setOpenRevertModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const productOrderStatusHistoryQuery =
    zeapApiSlice.useGetProductOrderStatusHistoryQuery(
      { productOrder_id },
      { skip: !token || !productOrder_id }
    );
  const history = productOrderStatusHistoryQuery?.data?.data.statusHistory;
  const currentStatus =
    productOrderStatusHistoryQuery?.data?.data.currentStatus;
  const nextStatus = productOrderStatusHistoryQuery?.data?.data.nextStatus;
  const [updateProductOrderStatus, updateProductOrderStatusStatus] =
    zeapApiSlice.useUpdateProductOrderStatusMutation();
  const isLoading =
    productOrderStatusHistoryQuery.isLoading ||
    updateProductOrderStatusStatus.isLoading;

  const handleClose = () => setIsOpen(false);
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

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      position="right"
      theme={drawerTheme}
    >
      <Drawer.Items className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="mb-0 font-bold text-xl text-neutral-900">
            Order Status History
          </span>
          <span>
            <IoMdClose
              className="text-2xl text-gray-500 cursor-pointer"
              onClick={handleClose}
            />
          </span>
        </div>
        {isLoading && <Loading />}

        <Timeline theme={timelineTheme}>
          {history?.map(
            (
              status: { name: string; value: string; date?: Date },
              index: number
            ) => (
              <Timeline.Item key={index}>
                <Timeline.Point icon={IoIosDoneAll} />
                <Timeline.Content>
                  {status?.date && (
                    <Timeline.Time>
                      <ReactTimeAgo date={status?.date} locale="en-US" />
                    </Timeline.Time>
                  )}
                  {/* <Timeline.Title>{status?.name}</Timeline.Title> */}
                  <Timeline.Body
                    className={`${
                      status?.value === currentStatus?.value && "text-success"
                    }`}
                  >
                    {capitalizeFirstLetter(status?.name)}
                    {/*{status?.value !== currentStatus?.value &&
                      isMyShopOrder && (
                        <ProductOrderUpdateStatus
                          status={status}
                          handleUpdateStatus={handleUpdateStatus}
                          serverError={serverError}
                          setServerError={setServerError}
                          openModal={openRevertModal}
                          setOpenModal={setOpenRevertModal}
                          setDimBackground={setDimBackground}
                        />
                      )} */}
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
            )
          )}
        </Timeline>
        {nextStatus &&
          isMyShopOrder &&
          vendorActionStatusList.includes(currentStatus.value) && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <ProductOrderUpdateStatus
                nextStatus={nextStatus}
                handleUpdateStatus={handleUpdateStatus}
                serverError={serverError}
                setServerError={setServerError}
                openModal={openModal}
                setOpenModal={setOpenModal}
                setDimBackground={setDimBackground}
              />
            </div>
          )}
        {!isOtherUserOrder && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <ProductOrderCancellation
              productOrder_id={productOrder_id}
              currentStatus={currentStatus}
            />
          </div>
        )}
      </Drawer.Items>
    </Drawer>
  );
}
