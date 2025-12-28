import Image from "next/image";
import ReactTimeAgo from "react-time-ago";
import { OrderInterface } from "@/interface/interface";
import {
  capitalizeFirstLetter,
  getProductOrderStatusBg,
} from "@/utils/helpers";

const OrderCard = ({ order }: { order: OrderInterface }) => {
  const productOrders = order?.productOrders ?? [];
  const itemCount = productOrders.length;

  return (
    <div className="cursor-pointer rounded bg-neutral-100 dark:bg-neutral-900 dark:text-white mt-2 hover:shadow-2xl transition duration-300">
      <div className="p-2 space-y-3">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="dark:text-slate-300 text-slate-500 text-xs">
              Order ID
            </span>
            <span className="text-slate-900 dark:text-slate-200 font-bold">
              {order?.orderId}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="dark:text-slate-300 text-slate-500 text-xs">
              Placed on
            </span>
            <span className="text-sm">
              <ReactTimeAgo date={order?.createdAt} locale="en-US" />
            </span>

            {/* ITEM COUNT */}
            <span className="text-xs text-slate-500 mt-1">
              {itemCount} item{itemCount !== 1 && "s"}
            </span>
          </div>
        </div>

        {/* PRODUCT IMAGES STRIP */}
        {itemCount > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
            {productOrders.map((po) => {
              const image = po?.images?.[0]?.link || "/placeholder.png";

              return (
                <div
                  key={po._id}
                  className=" flex flex-col items-center justify-center"
                >
                  <div className="relative h-14 w-14 flex-shrink-0 rounded overflow-hidden bg-white">
                    <Image
                      src={image}
                      alt={po.product?.title ?? "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p
                    className={`text-[7px] mt-1 text-center ${getProductOrderStatusBg(
                      po?.status?.value
                    )}`}
                  >
                    {capitalizeFirstLetter(po?.status?.name || "")}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* PROGRESS */}
        {order?.progress && (
          <div className="space-y-1">
            <span className="dark:text-slate-300 text-slate-500 text-xs">
              Progress – <strong>{order.progress.value}%</strong>
            </span>

            <progress
              id={order.orderId}
              max={100}
              value={order.progress.value}
              className="block w-full overflow-hidden rounded bg-white
              [&::-webkit-progress-bar]:bg-white
              [&::-webkit-progress-value]:bg-emerald-500
              [&::-moz-progress-bar]:bg-emerald-500"
            >
              {order.progress.value}%
            </progress>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
