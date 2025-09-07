import { Alert, Badge } from "flowbite-react";
// import Reciept from './Reciept';
import { OrderInterface, ProductOrdersInterface } from "@/interface/interface";
import { formatCurrency } from "@/utils/helpers";
import ProductOrderCard from "./ProductOrderCard";

const Order = ({ order }: { order: OrderInterface }) => {
  const productOrders = order?.productOrders;
  const gainedPoints = order?.gainedPoints || null;
  const deliveryDetails = order?.deliveryDetails;
  const isCancelled = order?.cancel?.isCancelled;
  const payment = order?.payment;

  return (
    <div className="flex flex-col text-black gap-4">
      <div className="flex flex-col gap-2 shadow-md w-full p-2">
        <span className="font-bold">Order ID: {order.orderId}</span>
        <div className="flex justify-between">
          <div className="flex flex-col ">
            <span className=" text-xs">
              Progress - <strong>{order?.progress?.value}%</strong>
            </span>
            <div className="flex items-center">
              <progress
                id={order?.orderId}
                max="100"
                value={order?.progress?.value}
                className="block w-100% overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-value]:bg-emerald-500 [&::-moz-progress-bar]:bg-emerald-500"
              >
                {order?.progress?.value}%
              </progress>
            </div>
            {gainedPoints && (
              <Alert className="mt-2" color="info">
                <span className="text-xs">
                  You have gained <strong>{gainedPoints}</strong> points from
                  this order.
                </span>
              </Alert>
            )}
          </div>
          {/* <Reciept order={order} /> */}
        </div>
        <span className="dark:text-slate-300 text-slate-500 text-xs">
          {isCancelled && <Badge color="red">Cancelled</Badge>}
        </span>
      </div>
      <div className="flex flex-col gap-2 shadow-md w-full p-2">
        <span className="font-bold">Delivery Details</span>
        <div className="flex flex-col gap-2 bg-grey8 p-2">
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

      <div className="flex flex-col gap-2 shadow-md w-full p-2">
        <span className="font-bold">Payment</span>
        <span className="text-md ">{payment.reference}</span>
        <div className="flex justify-between p-2 cursor-pointer bg-grey8">
          {payment?.amount && payment?.currency && (
            <span className="text-md ">
              {formatCurrency(payment.amount / 100, payment.currency)}
            </span>
          )}
          <span className="text-md ">
            <Badge color="success">{payment.status}</Badge>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 shadow-md w-full p-2">
        <span className="font-bold">Order Items</span>
        <div className="grid grid-cols-1 gap-4   ">
          {productOrders.map((productOrder: ProductOrdersInterface) => (
            <div key={productOrder?._id}>
              <ProductOrderCard productOrder={productOrder} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
