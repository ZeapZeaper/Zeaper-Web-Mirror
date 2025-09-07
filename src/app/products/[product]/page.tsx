"use client";

import React, { useEffect, useRef, useState } from "react";
import { MdArrowBack } from "react-icons/md";

import ButtonCircle3 from "@/shared/Button/ButtonCircle3";

import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import Skeleton from "@/components/loading/Skeleton";
import { Alert } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ColorInterface,
  ImageUrlInterface,
  ProductReviewInterface,
} from "@/interface/interface";
import ProductDetails from "./ProductDetails";

import ProductReview from "./ProductReview";
import SimilarProducts from "./SimilarProducts";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const ProductPage = () => {
  const topRef = useRef<HTMLHRElement>(null);

  const router = useRouter();
  const token = useSelector(globalSelectors.selectAuthToken);
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";
  const color = searchParams.get("color") || "";

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedMaterialColor, setSelectedMaterialColor] =
    useState<string>("");
  const productQuery = zeapApiSlice.useGetProductQuery(
    { productId: productId?.toString() },
    { skip: !token || !productId }
  );
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions: ColInterface[] = options?.readyMadeClothes?.colorEnums;
  const isLoading = productQuery.isLoading || productOptionsQuery.isLoading;
  const product = productQuery?.data?.data;

  const [images, setImages] = useState<string[]>([]);
  const [reviews, setReviews] = useState<ProductReviewInterface[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (product && !color) {
      setImages(
        product?.colors[0]?.images?.map((i: ImageUrlInterface) => i.link) || []
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    if (product) {
      const colorExist = product.colors.find(
        (col: ColorInterface) => col.value === color
      );
      if (colorExist) {
        setImages(
          colorExist?.images.map((image: { link: string }) => image.link)
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);
  return (
    <>
      <span className="sr-only absolute inset-0 top-0 left-0 w-full h-full" ref={topRef}></span>{" "}
      <hr className="border-neutral-300 mb-1" />
      <div className="container">
        <ButtonCircle3
          onClick={() => router.back()}
          size="w-10 h-10 mb-2"
          className="border border-neutral-300"
        >
          <MdArrowBack className="text-2xl" />
        </ButtonCircle3>

        {isLoading &&
          Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} />)}
        {productQuery.isSuccess && !product && (
          <div>
            <Alert color="failure">Product not found</Alert>
          </div>
        )}
        {product && (
          <div className="mb-20">
            <ProductDetails
              images={images || []}
              title={product?.title || ""}
              description={product?.description || ""}
              sizes={product?.sizes || []}
              colorOptions={colorOptions}
              categories={product.categories}
              setImages={setImages}
              colors={product.colors}
              variations={product.variations}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              reviews={reviews}
              averageRating={averageRating}
              productType={product.productType}
              setSelectedMaterialColor={setSelectedMaterialColor}
              selectedMaterialColor={selectedMaterialColor}
              showReadyMadeSizeGuide={product?.showReadyMadeSizeGuide}
              sizeStandard={product?.sizeStandard}
            />
          </div>
        )}
        {product && (
          <div className="mb-20">
            <ProductReview
              product={product}
              setReviews={setReviews}
              setAverageRating={setAverageRating}
            />
          </div>
        )}

        <div className="mb-28">
          <SimilarProducts productId={productId || ""} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
