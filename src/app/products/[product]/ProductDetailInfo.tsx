import { ProductCategoryInterface } from "@/interface/interface";
import { useSearchParams } from "next/navigation";
import {  useState } from "react";

const ProductDetailInfo = ({
  categories,
}: {
  categories: ProductCategoryInterface;
}) => {
  const searchParams = useSearchParams();
   const productId = searchParams.get("productId") || "";

  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  const productGroup = categories?.productGroup || "";
  const main = categories?.main || [];
  const design = categories?.design || [];
  const style = categories?.style || [];
  const occasion = categories?.occasion || [];
  const fit = categories?.fit || [];
  const sleeveLength = categories?.sleeveLength || "";
  const fastening = categories?.fastening || [];
  const heelType = categories?.heelType || "";
  const heelHeight = categories?.heelHeight || "";
  const brand = categories?.brand || "";
  const accessoryType = categories?.accessoryType || "";
 

  return (
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      data-inactive-classes="text-gray-500 dark:text-gray-400"
    >
      <h2 id="accordion-flush-heading-1">
        <button
          onClick={handleClick}
          type="button"
          className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="true"
          aria-controls="accordion-flush-body-1"
        >
          <span className="text-lg">Product Details</span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        className={`py-5 border-b border-gray-200 dark:border-gray-700 text-sm flex flex-col  bg-neutral-100 p-2 ${
          active ? "block" : "hidden"
        }`}
        aria-labelledby="accordion-flush-heading-1"
      >
        {productId && (
          <div className="inline-flex gap-8">
            <span className="text-gray-500 dark:text-gray-400 font-semibold w-12">
              ID
            </span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span className="text-gray-500 dark:text-gray-400">
              {productId.substring(12)}
            </span>
          </div>
        )}
        {productGroup && (
          <div className="inline-flex gap-8">
            <span className="text-gray-500 dark:text-gray-400 font-semibold w-12">
              Group
            </span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span className="text-gray-500 dark:text-gray-400">
              {productGroup}
            </span>
          </div>
        )}
        {accessoryType && (
          <div className="inline-flex gap-8">
            <span className="text-gray-500 dark:text-gray-400 font-semibold w-12">
              Accessory
            </span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span className="text-gray-500 dark:text-gray-400">
              {accessoryType}
            </span>
          </div>
        )}

        {main?.length > 0 && (
          <div className="inline-flex gap-8">
            <span className="text-gray-500 dark:text-gray-400 font-semibold w-12">
              Main
            </span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span className="text-gray-500 dark:text-gray-400">
              {main?.map((category) => category).join(", ")}
            </span>
          </div>
        )}
        {design?.length > 0 && (
          <div className="inline-flex gap-8">
            <span className="text-gray-500 dark:text-gray-400 font-semibold w-12">
              Design
            </span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span className="text-gray-500 dark:text-gray-400">
              {design?.map((category) => category).join(", ")}
            </span>
          </div>
        )}
        {style?.length > 0 && (
          <div className="inline-flex gap-8">
            <span className="text-gray-500 dark:text-gray-400 font-semibold w-12">
              Style
            </span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span className="text-gray-500 dark:text-gray-400">
              {style?.map((category) => category).join(", ")}
            </span>
          </div>
        )}
        {occasion?.length > 0 && (
          <div className="inline-flex gap-8">
            <span className="text-gray-500 dark:text-gray-400 font-semibold w-12">
              Occasion
            </span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span className="text-gray-500 dark:text-gray-400">
              {occasion?.map((category) => category).join(", ")}
            </span>
          </div>
        )}
        {fit?.length > 0 && (
          <div className="inline-flex gap-8">
            <span className="text-gray-500 dark:text-gray-400 font-semibold w-12">
              Fit
            </span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span className="text-gray-500 dark:text-gray-400">
              {fit?.map((category) => category).join(", ")}
            </span>
          </div>
        )}
        {sleeveLength && (
          <div className="inline-flex gap-8">
            <span className="text-gray-500 dark:text-gray-400 font-semibold w-12">
              Sleeve
            </span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span className="text-gray-500 dark:text-gray-400">
              {sleeveLength}
            </span>
          </div>
        )}
        {fastening?.length > 0 && (
          <div className="inline-flex gap-8">
            <span className="text-gray-500 dark:text-gray-400 font-semibold w-12">
              Fastening
            </span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span className="text-gray-500 dark:text-gray-400">
              {fastening?.map((category) => category).join(", ")}
            </span>
          </div>
        )}
        {heelType && (
          <div className="inline-flex gap-8">
            <span className="text-gray-500 dark:text-gray-400 font-semibold w-12">
              Heel Type
            </span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span className="text-gray-500 dark:text-gray-400">{heelType}</span>
          </div>
        )}
        {heelHeight && (
          <div className="inline-flex gap-8">
            <span className="text-gray-500 dark:text-gray-400 font-semibold w-12">
              Heel Height
            </span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span className="text-gray-500 dark:text-gray-400">
              {heelHeight}
            </span>
          </div>
        )}
        {brand && (
          <div className="inline-flex gap-8">
            <span className="text-gray-500 dark:text-gray-400 font-semibold w-12">
              Brand
            </span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span className="text-gray-500 dark:text-gray-400">{brand}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailInfo;
