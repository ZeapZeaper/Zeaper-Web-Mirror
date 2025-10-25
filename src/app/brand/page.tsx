"use client";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

type BrandType = {
  brand: string;
  count: number;
};
const excludeKeys = [
  "productGroupPage",
  "subProductGroupPage",
  "collectionTitle",
  "superTitle",
];
const BrandPage = () => {
  const searchParams = useSearchParams();
  const productGroupPage = searchParams.get("productGroupPage") || "HOME";
  const subProductGroupPage = "BRANDS";

  const token = useSelector(globalSelectors.selectAuthToken);
  const param: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    if (!excludeKeys.includes(key)) {
      param[key] = value;
    }
    // param[key] = value;
  });

  const getProductBrands = zeapApiSlice.useGetProductBrandsQuery(
    {
      ...param,
    },
    { skip: !token }
  );
  const productBrands = getProductBrands?.data?.data || [];
  const isLoading = getProductBrands.isLoading;

  const getPageTitle = () => {
    if (productGroupPage === "READY TO WEAR") {
      return "READY TO WEAR BRANDS";
    }
    if (productGroupPage === "BESPOKE") {
      return "BESPOKE BRANDS";
    }
    return "BRANDS";
  };
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{getPageTitle()}</h1>
        <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-6">
          {isLoading &&
            Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg animate-pulse">
                <div className="h-6 bg-slate-200 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              </div>
            ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productBrands.map((brand: BrandType) => (
            <Link
              key={brand.brand}
              href={`/collections/brand=${brand.brand}?productGroupPage=${productGroupPage}&subProductGroupPage=${subProductGroupPage}&collectionTitle=${brand.brand} Collections`}
              className="p-4 border rounded-lg hover:bg-slate-100 transition-colors"
            >
              <h2 className="text-lg font-semibold">{brand.brand}</h2>
              <p className="text-sm text-slate-600">{brand.count} products</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrandPage;
