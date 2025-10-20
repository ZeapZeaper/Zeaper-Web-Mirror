import AddReview from "@/app/products/[product]/AddReview";
import NoPic from "@/images/noPhoto.png";
import { ProductReviewInterface } from "@/interface/interface";
import { displayDate } from "@/utils/helpers";
import { Rating, RatingStar } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

interface PropInterface {
  review: ProductReviewInterface & {
    order: {
      orderId: string;
      deliveryDate: Date;
      images: { name: string; link: string; _id: string }[];
      productId: string;
      title: string;
      color: string;
      size: string;
    };
  };
}

const ReviewCard = ({ review }: PropInterface) => {
 
  const router = useRouter();
  const [openReview, setOpenReview] = useState(false);
  const productId = review?.order?.productId;
  const color = review?.order?.color;
  const productTitle = review?.order?.title;
  const imageLink = review?.order?.images.find((i) => i.link)?.link;
  const deliveryDate = review?.order?.deliveryDate;
  const orderId = review?.order?.orderId;
  const rating = review?.rating;
  return (
    <div
      onClick={() => {
        if (!productId) return;
        if (openReview) return;
        localStorage.setItem("selectedProductId", productId);
        localStorage.setItem("selectedProductColor", color);
        router.push(
          `/products/${productTitle
            .replace(/ /g, "-")
            .replace(/&/g, "and")
            .replace(/\//g, "-")}-${color}`
        );
      }}
      className="grid grid-cols-3 gap-4 p-4 border-b border-gray-300 w-full cursor-pointer hover:bg-slate-50 transition-all duration-200 ease-in-out"
    >
      <div className="flex flex-col gap-1 col-span-1">
        <div className="relative   shrink-0 overflow-hidden rounded-xl">
          <Image
            src={imageLink || NoPic.src}
            alt={productTitle}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "full",
              height: "7rem",
            }}
            className="w-full object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 col-span-2">
        <span className="text-sm font-semibold">
          {productTitle}
          <span className="text-sm font-semibold text-primary">
            {` (${color})`}
          </span>
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs ">Order ID:</span>
          <span className="text-xs">{orderId}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs">Delivered on:</span>
          <span className="text-xs">
            {deliveryDate && displayDate(deliveryDate, false)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {rating && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setOpenReview(true);
              }}
              className="inline-flex gap-2 justify-center items-center bg-slate-100 hover:bg-slate-200 p-2 rounded-md"
            >
              <Rating>
                <RatingStar /> {rating}
              </Rating>
              <span className="inline-flex justify-center items-center gap-2 text-xs text-gray-500">
                View or Edit Rating <FaLongArrowAltRight className="text-xs" />
              </span>
            </span>
          )}
          {!rating && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setOpenReview(true);
              }}
              className="inline-flex cursor-pointer justify-center items-center gap-2 bg-green-100 hover:bg-green-200 p-2 rounded-md"
            >
              <span className="text-xs text-gray-500 ">Rate This Product</span>
              <FaLongArrowAltRight className="" />
            </span>
          )}
        </div>
      </div>
      {openReview && (
        <AddReview
          open={openReview}
          close={() => setOpenReview(false)}
          productId={productId}
          review={review?.rating ? review : undefined}
        />
      )}
    </div>
  );
};

export default ReviewCard;
