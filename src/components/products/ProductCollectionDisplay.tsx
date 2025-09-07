import { ProductInterface } from "@/interface/interface";
import pluralize from "pluralize";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { MobileProductFilters } from "./MobileProductFilters";
import Image from "next/image";
import NoPic from "@/images/noPhoto.png";
import { useSearchParams } from "next/navigation";

const ProductCollectionDisplay = ({
  products,
  title = "Collections",
  subMenus,
  // subTitle,
  // setSubTitle,
  colorOptions,
  showMobileFilters = false,
  dynamicFilters,
  totalCount,
}: {
  products: ProductInterface[];
  title?: string;
  subMenus?: {
    value: string;
    link: string;
    exampleProduct: ProductInterface;
  }[];
  // subTitle?: string;
  // setSubTitle: (value: string) => void;
  colorOptions: { name: string; hex?: string; background?: string }[];
  showMobileFilters?: boolean;
  dynamicFilters: {
    name: string;
    type: string;
    options: Record<string, { value: string }>;
  }[];
  totalCount: number;
}) => {
  const searchParams = useSearchParams();
  const subProductGroupPage = searchParams.get("subProductGroupPage");
  const collectTionTitle = searchParams.get("collectionTitle");
  const productGroupPage = searchParams.get("productGroupPage") || "HOME";
  const superTitle = searchParams.get("superTitle");

  const getDefaultImageLink = (product: ProductInterface) => {
    if (product?.colors?.length > 0) {
      const colors = product.colors;
      //array of color images
      const colorImages = colors.map((color) => color.images).flat();
      const isDefault = colorImages.find((image) => image.isDefault);

      if (isDefault) {
        return isDefault.link;
      }
      return colorImages[0]?.link;
    }
    return NoPic.src;
  };

  return (
    <div className="max-h-full md:max-h-[100vh] 2xl:max-h-[150vh]  overflow-auto  flex flex-col gap-4 w-full ">
      <div className="flex flex-col gap-2 md:gap-4  md:p-6 ">
        <span className="flex gap-2 items-center">
          {title && (
            <p className="text-sm md:text-lg px-4 pt-4  font-extrabold text-gray-800 mb-4 overflow-auto">
              {title.toLocaleUpperCase()}
              {superTitle && <span> - {superTitle.toUpperCase()}</span>}
            </p>
          )}

          {/* {subTitle && (
            <p className="text-md  text-gray-800 mb-4">- {subTitle}</p>
          )} */}
        </span>

        <div className="flex xl:hidden  gap-2 md:gap-4 w-[calc(100vw-2px)] overflow-x-auto no-scrollbar">
          {subMenus?.slice(0, 10)?.map((menu, index) => (
            <Link
              href={
                menu?.link?.replace("&", "%26") +
                `&productGroupPage=${productGroupPage}&subProductGroupPage=${subProductGroupPage}&collectionTitle=${collectTionTitle}&superTitle=${menu.value}`
              }
              key={index}
              // href={`/${menu?.link}`}
              // onClick={() => setSubTitle(menu.value)}
            >
              <div className=" flex md:h-10 min-w-[6rem]  w-full rounded-md border p-1 md:p-2 justify-center  items-center bg-slate-100 cursor-pointer hover:bg-slate-200 whitespace-nowrap text-xs">
                {pluralize(menu?.value || "")}
              </div>
            </Link>
          ))}
        </div>
        <div className="hidden xl:flex gap-2 md:gap-4  overflow-x-auto scrollbar-hide">
          {subMenus?.slice(0, 10)?.map((menu, index) => (
            <Link
              href={
                menu?.link?.replace("&", "%26") +
                `&productGroupPage=${productGroupPage}&subProductGroupPage=${subProductGroupPage}&collectionTitle=${collectTionTitle}&superTitle=${menu.value}`
              }
              key={index}
              // onClick={() => setSubTitle(menu.value)}

              className="flex flex-col items-center justify-center cursor-pointer w-full"
            >
              <Image
                src={getDefaultImageLink(menu.exampleProduct)}
                alt={menu.value}
                width={200}
                height={200}
                className="object-contain w-[8rem] h-[8rem]  border p-1 md:p-2 mb-1"
              />
              <div className="flex w-full items-center justify-center text-xs lg:text-sm font-extrabold text-nowrap">
                {pluralize(menu?.value || "")}
              </div>
            </Link>
          ))}
        </div>
      </div>
      {showMobileFilters && (
        <div className="flex lg:hidden">
          <MobileProductFilters
            dynamicFilters={dynamicFilters}
            totalCount={totalCount}
            // setSubTitle={setSubTitle}
            colorOptions={colorOptions}
          />
        </div>
      )}
      <div className="grid gap-1 lg:gap-4 grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 w-full ">
        {products.map((item) => (
          <ProductCard
            product={item}
            key={item._id}
            colorOptions={colorOptions}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCollectionDisplay;
