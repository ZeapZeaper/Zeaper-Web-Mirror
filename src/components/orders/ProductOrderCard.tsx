import { ProductOrdersInterface } from "@/interface/interface";
import Image from "next/image";
import NoPic from "@/images/noPhoto.png";
import {
  capitalizeFirstLetter,
  getProductOrderStatusBg,
} from "@/utils/helpers";
import Link from "next/link";
import { ProductOrderStatusHistoryDrawer } from "./ProductOrderStatusHistoryDrawer";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/authContext";

const ProductOrderCard = ({
  productOrder,
}: {
  productOrder: ProductOrdersInterface;
}) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const status = productOrder?.status;

  const isOtherUserOrder = productOrder?.user?._id !== user?._id;
  const isMyShopOrder =
    (productOrder?.shop.shopId && productOrder?.shop.shopId === user?.shopId) ||
    false;
  return (
    <>
      <div
        onClick={() => {
          router.push(`/account/orders/${productOrder?._id}`);
        }}
        className="flex relative gap-4 bg-white p-4 rounded-lg"
      >
        <div className="relative  w-40 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={
              productOrder?.images.find(
                (image) => image.link && image.link.length > 0
              )?.link || NoPic.src
            }
            alt={productOrder?.itemNo.toString()}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "full",
              height: "7rem",
            }}
            className="w-full object-contain "
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold">No {productOrder?.itemNo}</span>
            <span className="text-xs text-slate-500 w-[8rem] md:w-[9rem] lg:w-[11.5rem] overflow-hidden  truncate text-ellipsis">
              {productOrder?.product?.title}
            </span>
            <span
              className={`text-xs w-[100px] text-center border p-1 rounded-md  ${getProductOrderStatusBg(
                status?.value
              )}`}
            >
              {capitalizeFirstLetter(status.name)}{" "}
            </span>
          </div>
        </div>
        <div className="absolute flex gap-4 right-2 bottom-4 text-xs text-info hover:text-info/80 underline ">
          <Link href={`/account/orders/${productOrder?._id}`}>
            {" "}
            view details
          </Link>
          <div>
            <span
              className="text-success cursor-pointer hover:text-success/80"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsOpen(true);
              }}
            >
              view history
            </span>
          </div>
        </div>
      </div>
      {isOpen && (
        <span>
          <ProductOrderStatusHistoryDrawer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            productOrder_id={productOrder?._id}
            isOtherUserOrder={isOtherUserOrder}
            isMyShopOrder={isMyShopOrder}
          />
        </span>
      )}
    </>
  );
};

export default ProductOrderCard;
