import { useEffect, type FC } from "react";
import SizeSelect from "@/app/products/[product]/SizeSelect";
import ProductImage from "./ProductImage";
import {
  ColorInterface,
  ProductCategoryInterface,
  ProductReviewInterface,
  VariationInterface,
} from "@/interface/interface";
import { capitalizeFirstLetter, convertCamelToNormal } from "@/utils/helpers";
import ProductDetailPrice from "./ProductDetailPrice";
import ProductDetailInfo from "./ProductDetailInfo";
import { Rating } from "flowbite-react";
import { allStars } from "@/data/content";
import AddToCart from "./AddToCart";
import ProductDescription from "./ProductDescription";
import ProductTimeline from "./ProductTimeline";
import BespokeMaterialColorSelection from "./BespokeMaterialColorSelection";
import { useRouter, useSearchParams } from "next/navigation";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

interface SectionProductHeaderProps {
  images: string[];
  title: string;
  sizes: string[];
  description: string;
  colors: ColorInterface[];
  colorOptions: ColInterface[];
  setImages: (images: string[]) => void;
  variations: VariationInterface[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  categories: ProductCategoryInterface;
  reviews: ProductReviewInterface[];
  averageRating: number;
  productType: string;
  showReadyMadeSizeGuide: boolean;
  setSelectedMaterialColor: (color: string) => void;
  selectedMaterialColor: string;
  sizeStandard: string;
}

const ProductDetails: FC<SectionProductHeaderProps> = ({
  images,
  title,
  variations,
  sizes,
  description,
  colors,
  setImages,
  colorOptions,
  selectedSize,
  setSelectedSize,
  categories,
  reviews,
  averageRating,
  productType,
  setSelectedMaterialColor,
  selectedMaterialColor,
  showReadyMadeSizeGuide,
  sizeStandard,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedProductColor = searchParams.get("color") || "";
  const getBg = (value: string) => {
    if (value.toLocaleLowerCase() === "bespoke")
      return "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(204,23,195,0.09147408963585435) 4%, rgba(205,64,138,0.5172443977591037) 25%, rgba(207,136,39,1) 37%, rgba(13,15,25,1) 44%, rgba(32,37,4,1) 45%, rgba(72,84,9,0.4472163865546218) 100%)";
    const color = colorOptions?.find((color) => color.name === value);
    return color?.hex || color?.background;
  };
  const bespokeAvailableColors = variations[0]?.bespoke?.availableColors || [];

  const isBeskope = categories?.productGroup === "Bespoke";
  useEffect(() => {
    if (bespokeAvailableColors.length > 0) {
      setSelectedMaterialColor(bespokeAvailableColors[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bespokeAvailableColors]);

  return (
    <div
      // className=" justify-between space-y-10 lg:flex lg:space-y-0"
      className="grid grid-cols-1 gap-10 md:grid-cols-2"
    >
      {/* <div className="basis-[47%]">
        <ImageShowCase shots={shots} />
      </div> */}
      <div className="basis-[48%] space-y-7">
        {images?.length > 0 && <ProductImage images={images || []} />}
      </div>
      <div className="basis-[48%] space-y-7">
        <div className="flex flex-col gap-1">
          <h5 className="mb-0 font-semibold">
            {title}-{capitalizeFirstLetter(selectedProductColor || "")}
          </h5>
          <div className="text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-lightGold dark:bg-darkGold p-1 rounded-md w-fit">
            {convertCamelToNormal(productType).toUpperCase()}
          </div>
        </div>
        {reviews.length > 0 && (
          <div className="flex justify-between">
            <Rating className="mb-2">
              {allStars.map((star) => (
                <Rating.Star key={star} filled={averageRating >= star} />
              ))}

              <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {averageRating}/5
              </p>
            </Rating>
            <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              {reviews?.length} {reviews?.length > 1 ? "Reviews" : "Review"}
            </p>
          </div>
        )}

        <ProductDetailPrice
          variations={variations}
          selectedSize={selectedSize}
        />
        {selectedProductColor !== "Bespoke" && (
          <div>
            <h4 className="mb-5 font-medium">
              {capitalizeFirstLetter(selectedProductColor || "")}
            </h4>
            <div className="flex gap-2 flex-wrap">
              {colors?.map((color: ColorInterface, index: number) => (
                <div
                  onClick={() => {
                    setImages(color?.images.map((image) => image.link));
                    
                    router.push(
                      `/products/${title
                        .replace(/ /g, "-")
                        .replace(/&/g, "and")
                        .replace(/\//g, "-")}-${color?.value}?productId=${searchParams.get("productId") || ""}&color=${color?.value}`
                    );
                  }}
                  key={index}
                  className={`w-8 h-8 rounded-full cursor-pointer border  border-slate-200 ring hover:ring-primary
                   ${
                     color?.value === selectedProductColor
                       ? "ring-primary  ring-offset-4"
                       : "ring-transparent"
                   }`}
                  style={{ background: getBg(color?.value) }}
                ></div>
              ))}
            </div>
          </div>
        )}
        {!isBeskope && (
          <SizeSelect
            sizes={sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            variations={variations}
            selectedProductColor={selectedProductColor}
            showReadyMadeSizeGuide={showReadyMadeSizeGuide}
            categories={categories}
            sizeStandard={sizeStandard}
          />
        )}
        {categories?.productGroup === "Bespoke" && (
          <BespokeMaterialColorSelection
            availableColors={bespokeAvailableColors}
            setSelectedMaterialColor={setSelectedMaterialColor}
            selectedMaterialColor={selectedMaterialColor}
            colorOptions={colorOptions}
          />
        )}
        <AddToCart
          selectedSize={selectedSize}
          variations={variations}
          isBeskope={isBeskope}
          selectedMaterialColor={selectedMaterialColor}
          selectedProductColor={selectedProductColor}
        />
        <div className="mt-5 flex flex-col gap-4">
          <ProductDescription description={description} />
          <ProductDetailInfo categories={categories} />

          <ProductTimeline categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
