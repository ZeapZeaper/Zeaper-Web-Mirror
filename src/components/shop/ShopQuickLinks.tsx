import { useRouter } from "next/navigation";
import React from "react";
import { FaLuggageCart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";

const ShopQuickLinks = ({ shopId }: { shopId: string }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center gap-2 md:gap-4 flex-wrap md:flex-nowrap">
      <button
        onClick={() => router.push(`shop/add-product`)}
        className="flex  md:w-[9rem] h-fit items-center justify-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="hidden md:block md:size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Add Product
      </button>
      <button
        onClick={() =>
          router.push(`/shop/${shopId}/products?status=live&page=1`)
        }
        className="flex md:w-[9rem justify-center h-fit items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90"
      >
        <FaLuggageCart className="hidden md:block md:size-6" />
        Products
      </button>
      <button
        onClick={() => router.push(`shop/${shopId}/orders`)}
        className="flex justify-center  md:w-[9rem h-fit items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90"
      >
        <BsCart4 className="hidden md:block md:size-6" />
        Orders
      </button>
      <button
        onClick={() => router.push(`shop/${shopId}/payments?filter=all`)}
        className="flex justify-center  md:w-[9rem h-fit items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90"
      >
        <MdOutlinePayments className=" hidden md:block md:size-6" />
        Payments
      </button>
    </div>
  );
};

export default ShopQuickLinks;
