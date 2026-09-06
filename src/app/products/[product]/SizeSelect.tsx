import ReadyMadeSizeGuideModal from "@/components/products/ReadyMadeSizeGuideModal";
import {
  ProductCategoryInterface,
  VariationInterface,
} from "@/interface/interface";
import { useEffect, useState } from "react";
// import { useEffect } from "react";

const SizeSelect = ({
  sizes,
  sizeStandard,
  selectedSize,
  setSelectedSize,
  variations,
  selectedProductColor,
  showReadyMadeSizeGuide,
  categories,
}: {
  sizes: string[];
  selectedSize: string;
  sizeStandard: string;
  setSelectedSize: (size: string) => void;
  variations: VariationInterface[];
  selectedProductColor: string;
  showReadyMadeSizeGuide: boolean;
  categories: ProductCategoryInterface;
}) => {
  const gender = categories.gender || [];
  const defaultGender = gender?.find((gen) => gen === "Female")
    ? "female"
    : "male";
  const main = categories?.main || [];
  const [openModal, setOpenModal] = useState(false);
  const selectedColorVariations = variations.filter(
    (variation) =>
      variation.colorValue?.toLocaleLowerCase() ===
      selectedProductColor.toLocaleLowerCase()
  );
  const variationSizes = selectedColorVariations.map((variation) => {
    if (!variation.quantity) {
      return null;
    }
    if (variation.quantity <= 0) {
      return null;
    }
    return variation.size;
  });
  useEffect(() => {
    if (!selectedSize || sizes?.length === 1) {
      const assumedVariation = variations.find(
        (variation) =>
          variation.colorValue?.toLocaleLowerCase() ===
            selectedProductColor.toLocaleLowerCase() &&
          variation.quantity &&
          variation.quantity > 0
      );
      const initialSize = assumedVariation?.size;
      if (initialSize) {
        setSelectedSize(initialSize);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizes, selectedSize]);
  const getSizeGuideDefaultTitle = () => {
    if (main?.includes("Footwear")) {
      return "footwear";
    }
    if (main?.includes("Top")) {
      return "top";
    }
    if (main?.includes("Bottom")) {
      return "bottom";
    }
    return "top";
  };
  const checkIfSelectedColorOutOfStock = () => {
    const inStockVariations = variations.filter(
      (variation) =>
        variation.colorValue?.toLocaleLowerCase() ===
          selectedProductColor.toLocaleLowerCase() &&
        variation.quantity &&
        variation.quantity > 0
    );
    return inStockVariations.length === 0;
  };

  return (
    <div className="flex flex-col  gap-4">
      <div className="flex items-center justify-between w-full">
        <span className="text-md font-semibold">
          Size {sizeStandard && `(${sizeStandard})`}
        </span>
        {showReadyMadeSizeGuide && (
          <span
            className="underline cursor-pointer"
            onClick={() => setOpenModal(true)}
          >
            View Size guide
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            disabled={!variationSizes.includes(size)}
            onClick={() => setSelectedSize(size)}
            className={`min-w-20 flex items-center justify-center bg-center bg-no-repeat bg-contain rounded-lg px-3 py-2   ${
              selectedSize === size
                ? "bg-primary text-white"
                : "border border-neutral-400"
            } ${size === "Custom" ? "w-fit" : ""}${
              !variationSizes.includes(size) ? "opacity-65" : ""
            }`}
            style={{
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "40px 40px", // 🔥 fixed icon size
              backgroundImage: !variationSizes.includes(size)
                ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="%23666"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>')`
                : undefined,
            }}
          >
            {size === "One Size" ? "OS" : size}
          </button>
        ))}
      </div>
      {checkIfSelectedColorOutOfStock() && (
        <div className="text-red-500 text-sm">Out of stock</div>
      )}
      {openModal && (
        <ReadyMadeSizeGuideModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          defaultGender={defaultGender}
          defaultTitle={getSizeGuideDefaultTitle()}
        />
      )}
    </div>
  );
};

export default SizeSelect;
