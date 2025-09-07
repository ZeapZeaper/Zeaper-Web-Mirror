import { Alert, Button, Modal } from "flowbite-react";
import React, { useContext, useEffect, useRef, useState } from "react";

import LogoIcon from "@/images/app_logo.png";
import { useReactToPrint } from "react-to-print";
import { HiDownload, HiPrinter } from "react-icons/hi";

import {
  displayDate,
  formatCurrency,
  getCurrencySmallSymbol,
  numberWithCommas,
} from "@/utils/helpers";
import { SocketContext } from "@/contexts/webSocketContext";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import FileDownloadProgressCardDIsplay from "@/shared/ProgressBar/FileDownloadProgressCardDIsplay copy";
import Image from "next/image";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import { ProductOrdersInterface } from "@/interface/interface";

const modalTheme = {
  root: {
    base: "fixed inset-x-0 top-0 z-999999 w-screen h-screen overflow-y-auto overflow-x-auto ",
  },
};

const Reciept = ({
  orderId,
  openReciept,
  setOpenReciept,
}: {
  orderId: string;
  openReciept: boolean;
  setOpenReciept: (value: boolean) => void;
}) => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const getOrderByOrderIdQuery = zeapApiSlice.useGetOrderByOrderIdQuery(
    { orderId },
    { skip: !token || !orderId }
  );
  const order = getOrderByOrderIdQuery?.data?.data;

  const order_id = order?._id;
  const receiptRef = useRef<HTMLDivElement>(null);
  const currency = order?.payment?.currency;
  const webSocket = useContext(SocketContext);
  const thisSessionId = webSocket?.thisSessionId;
  const type = "receipt";

  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [showDowloadModal, setShowDowloadModal] = useState(false);
  const [progressStatus, setProgressStatus] = useState("pending");
  const [fileName, setFileName] = useState("");

  const [downloadOrderReceipt] = zeapApiSlice.useDownloadOrderReceiptMutation();

  useEffect(() => {
    if (order?.orderId && type) {
      const today = new Date();
      setFileName(
        `${type.charAt(0).toUpperCase() + type.slice(1)}-${
          order?.orderId
        }-${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
      );
    }
  }, [order, type]);

  const getProductOrderAmount = (
    amount: [{ value: number; currency: string }]
  ) => {
    const found = amount.find((item) => item.currency === currency);
    return `${getCurrencySmallSymbol(found?.currency || "")}${numberWithCommas(
      found?.value || 0
    )}`;
  };
  const reactToPrintContent = () => {
    return receiptRef.current;
  };

  const handlePrint = useReactToPrint({
    documentTitle: "Receipt",
  });

  const handleDownload = () => {
    const payload = {
      order_id,
      fileName,
      socketId: thisSessionId,
    };
    downloadOrderReceipt({ payload })
      .then((res) => {
        const pdf = res?.data?.pdf;
        console.log("pdf", pdf);
        let buffer;
        if (typeof pdf === "object") {
          buffer = new Uint8Array(Object.values(pdf));
        } else {
          buffer = new Uint8Array(Object.values(pdf));
        }
        if (buffer.length === 0) {
          setError(
            "Error downloading file. Please try again later or contact support."
          );
          return;
        }
        setError("");
        setProgressStatus("received file...");
        setProgress(98);
        const blob = new Blob([buffer], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${fileName}.pdf`;
        link.click();
        setProgress(100);
        setProgressStatus("downloading now...");
        setTimeout(() => {
          setProgress(0);
          setProgressStatus("pending");
          setShowDowloadModal(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {openReciept && (
        <Modal
          className="bg-black bg-opacity-50 z-50"
          theme={modalTheme}
          title="Delete Image"
          onClose={() => setOpenReciept(false)}
          show={openReciept}
        >
          <Modal.Header>
            <div className="text-sm md:text-lg font-bold">Reciept</div>
          </Modal.Header>
          <Modal.Body className="w-full overflow-auto">
            {error && <Alert color="failure">Error - {error}</Alert>}
            {showDowloadModal && (
              <FileDownloadProgressCardDIsplay
                progress={progress}
                progressStatus={progressStatus}
                setProgress={setProgress}
                setProgressStatus={setProgressStatus}
                thisSessionId={thisSessionId}
                title="Downloading Receipt"
                showModal={showDowloadModal}
                setShowModal={setShowDowloadModal}
              />
            )}
            <div
              className="w-full mx-auto p-6 bg-white rounded shadow-sm my-6 overflow-auto min-w-[30rem]"
              id="receipt"
              ref={receiptRef}
            >
              <div className="flex justify-between items-center w-full overflow-auto ">
                <div>
                  <Image
                    src={LogoIcon}
                    alt="company-logo"
                    className="object-contain rounded-lg w-24 h-24"
                  />
                </div>

                <div className="text-right">
                  <p>Zona Empires & Partners LTD .</p>
                  <p className="text-gray-500 text-sm">admin@zeaper.com</p>
                  <p className="text-gray-500 text-sm mt-1">+44-442341232</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-8 w-full overflow-auto">
                <div>
                  <p className="font-bold text-gray-800">Receipt to :</p>
                  <p className="text-gray-500">
                    {order?.user?.firstName} {order?.user?.lastName}
                    <br />
                    {order?.user?.address}
                  </p>
                  <p className="text-gray-500">
                    {order?.user?.region &&
                      order?.user?.region?.split("~")[0] + ","}{" "}
                    {order?.user?.country}
                  </p>
                  <p className="text-gray-500">{order?.user?.email}</p>
                </div>

                <div className="text-right w-100 overflow-auto">
                  <p className="">
                    Order ID:
                    <span className="text-gray-500">{order?.orderId}</span>
                  </p>
                  <p>
                    Date:{" "}
                    <span className="text-gray-500">
                      {displayDate(order?.createdAt, false)}
                    </span>
                  </p>
                </div>
              </div>

              <div className=" mt-8 flow-root mx-0 w-full overflow-auto">
                <table className="w-full overflow-auto">
                  <thead className="border-b border-gray-300 text-gray-900">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 pl-0"
                      >
                        Items
                      </th>
                      <th
                        scope="col"
                        className=" px-3 py-3.5 text-right text-sm font-semibold text-gray-900 table-cell"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className=" px-3 py-3.5 text-right text-sm font-semibold text-gray-900 table-cell"
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.productOrders?.map(
                      (productOrder: ProductOrdersInterface, index: number) => (
                        <tr
                          className="border-b border-gray-200 w-full overflow-auto"
                          key={index}
                        >
                          <td className=" w-full overflow-auto py-5 pr-3 text-sm pl-0">
                            <div className="font-medium text-gray-900">
                              {productOrder?.product?.title}
                            </div>
                            <div className="mt-1 truncate text-gray-500">
                              {productOrder?.sku}
                            </div>
                          </td>
                          <td className="px-3 py-5 text-right text-sm text-gray-500 table-cell w-full overflow-auto">
                            {productOrder?.quantity}
                          </td>
                          <td className="px-3 py-5 text-right text-sm text-gray-500 table-cell w-full overflow-auto">
                            <p>{getProductOrderAmount(productOrder?.amount)}</p>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        scope="row"
                        className="  pr-3 pt-6 text-right text-sm font-normal text-gray-500 table-cell pl-0"
                      >
                        Subtotal
                      </th>

                      <td className="pl-3  pt-6 text-right text-sm text-gray-500 pr-0">
                        {formatCurrency(
                          order?.payment?.itemsTotal / 100,
                          order?.payment?.currency
                        )}
                      </td>
                    </tr>

                    <tr>
                      <th
                        scope="row"
                        className="  pr-3 pt-4 text-right text-sm font-normal text-gray-500 table-cell pl-0"
                      >
                        Delivery Fee
                      </th>

                      <td className="pl-3 pt-4 text-right text-sm text-gray-500 pr-0">
                        {formatCurrency(
                          order?.payment?.deliveryFee / 100,
                          order?.payment?.currency
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className=" pr-3 pt-4 text-right text-sm font-normal text-gray-500 table-cell pl-0"
                      >
                        Applied Voucher Discount
                      </th>

                      <td className="pl-3  pt-4 text-right text-sm text-gray-500 pr-0">
                        {formatCurrency(
                          order?.payment?.appliedVoucherAmount / 100,
                          order?.payment?.currency
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className=" pr-3 pt-4 text-right text-sm font-semibold text-gray-900 table-cell pl-0"
                      >
                        Total
                      </th>

                      <td className="pl-3 pt-4 text-right text-sm font-semibold text-gray-900 pr-0">
                        {formatCurrency(
                          order?.payment?.total / 100,
                          order?.payment?.currency
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="flex gap-4">
            <Button
              color="info"
              onClick={() => handlePrint(reactToPrintContent)}
            >
              <HiPrinter className="mr-2 h-5 w-5" />
              Print
            </Button>
            <Button
              color="success"
              onClick={() => {
                setShowDowloadModal(true);
                handleDownload();
              }}
            >
              <HiDownload className="mr-2 h-5 w-5" />
              Download
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Reciept;
