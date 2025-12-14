"use client";
import Skeleton from "@/components/loading/Skeleton";
import MyRecommendedProducts from "@/components/products/MyRecommendedProducts";
import NoProduct from "@/components/products/NoProduct";
import { useEffect, useRef, useState } from "react";
import ProductFilters from "./ProductFilters";
import ProductCollectionDisplay from "./ProductCollectionDisplay";
import ProductPagination from "./ProductPagination";
import { ProductInterface } from "@/interface/interface";

const ProductList = ({
  isLoading,
  products,
  dynamicFilters,
  totalCount,
  colorOptions,
  filtersLoading,
  collectTionTitle,
  subMenus,
  limit,
  pageNumber,
  isSuccess,
  title,
}: {
  isLoading: boolean;

  products: ProductInterface[];
  title?: string;
  subMenus?: {
    value: string;
    link: string;
    exampleProduct: ProductInterface;
  }[];
  colorOptions: { name: string; hex?: string; background?: string }[];
  showMobileFilters?: boolean;
  filtersLoading?: boolean;
  dynamicFilters: {
    name: string;
    type: string;
    options: Record<string, { value: string }>;
  }[];
  totalCount: number;
  collectTionTitle?: string | null;
  pageNumber: number;
  limit: number;
  isSuccess: boolean;
}) => {
  const lastProductRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    if (!lastProductRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFixed(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(lastProductRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="md:p-4 h-full">
        <div className="grid gap-7 md:grid-cols-3 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 24 }).map((_, i) => <Skeleton key={i} />)}
        </div>
        {products?.length > 0 && (
          <div className="relative flex flex-col lg:flex-row lg:gap-4">
            <aside className={`hidden xl:flex flex-none md:w-64 `}>
              {filtersLoading ? (
                <Skeleton />
              ) : (
                <ProductFilters
                  dynamicFilters={dynamicFilters}
                  totalCount={totalCount}
                  colorOptions={colorOptions}
                  isFixed={isFixed}
                />
              )}
            </aside>
            <div className="flex flex-col gap-8">
              <ProductCollectionDisplay
                products={products}
                title={title || collectTionTitle || "Collections"}
                subMenus={subMenus}
                colorOptions={colorOptions}
                showMobileFilters={true}
                filtersLoading={filtersLoading}
                dynamicFilters={dynamicFilters}
                totalCount={totalCount}
                // setIsFixed={setIsFixed}
              />
              {/* <ProductTileList products={filteredProducts} /> */}

              <div className="flex overflow-x-auto justify-center">
                <ProductPagination
                  pageNumber={pageNumber || 1}
                  totalCount={totalCount}
                  limit={limit}
                  showIcons
                />
              </div>
            </div>
          </div>
        )}
        {isSuccess && products?.length === 0 && <NoProduct />}
      </div>
      <div ref={lastProductRef}>
        <MyRecommendedProducts />
      </div>
    </>
  );
};

export default ProductList;
