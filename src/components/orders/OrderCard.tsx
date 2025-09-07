import ReactTimeAgo from "react-time-ago";
import { OrderInterface } from "@/interface/interface";




const OrderCard = ({ order }: { order: OrderInterface }) => {
  const productOrders = order?.productOrders;

  return (
    <div className="overflow-scroll cursor-pointer   rounded   light:shadow-slate-200 dark:shadow-slate-800 bg-neutral-100 dark:text-white mt-2 hover:shadow-2xl transition duration-300">
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="dark:text-slate-300 text-slate-500 text-xs">
              Order ID
            </span>
            <span className="text-slate-900 dark:text-slate-200 font-bold">
              {order?.orderId}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="dark:text-slate-300 text-slate-500 text-xs">
              Placed on
            </span>
            <span>
              <ReactTimeAgo date={order?.createdAt} locale="en-US" />
            </span>
          </div>
        </div>
        {productOrders?.length > 0 && (
          <div className="flex justify-between items-center mt-2 ">
            <div className="flex flex-col w-full">
              <span className="dark:text-slate-300 text-slate-500 text-xs">
                Progress - <strong>{order?.progress?.value}%</strong>
              </span>
              <div className="flex items-center  w-full">
                <progress
                  id={order?.orderId}
                  max="100"
                  value={order?.progress?.value}
                  className="block w-full overflow-hidden rounded bg-white [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-value]:bg-emerald-500 [&::-moz-progress-bar]:bg-emerald-500"
                >
                  {order?.progress?.value}%
                </progress>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
