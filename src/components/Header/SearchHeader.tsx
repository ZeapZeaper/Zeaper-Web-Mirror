"use client";

import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Drawer } from "flowbite-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { ProductInterface } from "@/interface/interface";
import ProductCard from "../products/ProductCard";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { debounce } from "lodash";
import Loading from "../loading/Loading";
import { ThemeContext } from "@/contexts/themeContext";
import { useRouter } from "next/navigation";

interface UseDebounce {
  (callback: () => void, delay?: number): () => void;
}

export const useDebounce: UseDebounce = (callback, delay = 1000) => {
  const ref = useRef<() => void>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, delay);
  }, [delay]);

  return debouncedCallback;
};

const drawerTheme = {
  root: {
    base: "fixed z-50 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800 overflow-auto",
    position: {
      top: {
        on: "left-0 right-0 top-0 w-screen lg:w-[55%] lg:left-[35%]  h-[52rem] lg:h-[55rem] transform-none overflow-auto z-50",
        off: "left-0 right-0 top-0 w-full   -translate-y-full",
      },
    },
  },
};

interface StyleOption extends Option {
  value: string;
}

interface StyleFilter extends Filter {
  options: StyleOption[];
}
interface Filter {
  name: string;
  values: string[];
}
interface Option {
  count: number;
  [key: string]: string | number | boolean;
}
const styleList = [
  "Dress",
  "T-Shirt",
  "Trousers",
  "Necklaces",
  "African Traditional",
  "Shoes",
  "Skirt",
  "Jean",
  "Hoodie",
  "Ties",
  "Top & Skirt",
  "Jumpsuit",
  "Lingerie",
  "Two Piece",
  "Sneakers",
  "Cap",
  "Boots",
  "Sandals",
  "Heels",
  "Sliders",
  "Shoulder Bags",
  "Tote Bags",
  "Square Sunglasses",
  "Headband",
  "Ring",
  "Handbags",
  "Bracelets",
  "Rings",
  "Watches",
  "Anklets",
  "Pendants",
  "Top & Trouser",
  "Top & Shorts",
  "Top & Jacket",
  "Cufflinks",
  "Bow Ties",
  "Scarves",
];

const SearchHeader = () => {
  const router = useRouter();
  const { setDimBackground } = useContext(ThemeContext);
  const token = useSelector(globalSelectors.selectAuthToken);
  const [search, setSearch] = useState<string>();
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [delay, setDelay] = useState<number>(1000);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);
  const limit = 10;
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [trigger] = zeapApiSlice.useLazyGetSearchProductsQuery();

  // const productsQuery = zeapApiSlice.useGetSearchProductsQuery(
  //   {
  //     limit,
  //     pageNumber: 1,
  //     search,
  //   },
  //   {
  //     skip: !token || !search,
  //   }
  // );
  // const products = productsQuery?.data?.data?.products || [];
  const allProductsDynamicFiltersQuery =
    zeapApiSlice.useGetProductsDynamicFiltersQuery({}, { skip: !token });
  const allProductsDynamicFilters =
    allProductsDynamicFiltersQuery?.data?.data || [];
  const styleOptions: string[] =
    allProductsDynamicFilters
      ?.find((filter: Filter): filter is StyleFilter => filter.name === "Style")
      ?.options?.filter((opt: StyleOption) => opt?.count > 0)
      ?.map((item: StyleOption) => item.value) || [];

  const styleSuggestions = styleList
    .filter((style) => styleOptions.includes(style))
    .slice(0, 10);

  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions = options?.readyMadeClothes?.colorEnums || [];

  useEffect(
    () => {
      setDimBackground(isOpen);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen]
  );
  const handleClose = () => {
    setIsOpen(false);
  };
  const debouncedRequest = useDebounce(() => {
    handleSearch();
  }, delay);

  const handleSearch = async () => {
    localStorage.removeItem("search");
    if (search) {
      setIsLoading(true);
      await trigger(
        {
          search,
          limit,
          pageNumber: 1,
          ...(selectedStyle && { style: selectedStyle }),
        },
        true
      )
        .unwrap()
        .then((result) => {
          const data = result?.data;
          setProducts(data?.products);
          setNoResults(data?.products?.length === 0);
          setIsLoading(false);
          localStorage.setItem("search", search);
        })
        .catch((err) => {
          console.log(err);
          setNoResults(true);
          setIsLoading(false);
        });
    }
    setIsLoading(false);
  };

  return (
    <>
      <button
        type="button"
        className="relative inline-flex items-center  text-sm  text-center   hover:bg-slate-200  focus:outline-none"
      >
        <div
          onClick={() => setIsOpen(true)}
          className="flex  gap-3 cursor-pointer items-center bg-white dark:bg-gray-800 rounded-full p-2   transition-all duration-200 ease-in-out"
        >
          <span className="hidden md:block ">Search</span>
          <RiSearch2Line className="text-2xl" />
        </div>
      </button>
      <Drawer
        theme={drawerTheme}
        open={isOpen}
        onClose={handleClose}
        position="top"
      >
        <Drawer.Items>
          <div className="p-4  flex  justify-between items-center w-full">
            <form className=" w-[80%]">
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Search products,id,styles,brands and more"
                  required
                  value={search || ""}
                  onChange={(e) => {
                    setSelectedStyle("");
                    setNoResults(false);
                    setDelay(1000);
                    setSearch(e.target.value);
                    debouncedRequest();
                  }}
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Search
                </button>
              </div>
            </form>
            <span onClick={handleClose} className="text-lg cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.586l-4.293 4.293-1.414-1.414L8.586 11 4.293 6.707l1.414-1.414L10 9.172l4.293-4.293 1.414 1.414L11.414 11l4.293 4.293-1.414 1.414L10 12.586z"
                />
              </svg>
            </span>
          </div>
          {styleOptions?.length > 0 && styleSuggestions?.length > 0 && (
            <div className="p-4">
              <h5 className="text-sm font-medium mb-1">Popular Styles</h5>
              <div className="flex flex-wrap gap-2">
                {styleSuggestions.map((style) => (
                  <button
                    onClick={() => {
                      setSelectedStyle(style);
                      setNoResults(false);
                      setDelay(0);
                      setSearch(style);
                      debouncedRequest();
                    }}
                    key={style}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 rounded-lg text-xs border border-slate-100 hover:bg-primary hover:text-white"
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          )}
          {noResults && (
            <div className="p-4">
              <h5 className="text-sm font-medium mb-1 text-center">
                No Results Found for {search}. Please try another search term.
              </h5>
            </div>
          )}
          {isLoading && <Loading />}
          {products?.length > 0 && (
            <div
              className="grid gap-2 lg:gap-4 grid-cols-2  lg:grid-cols-4 lg:grid-cols-4 overflow-auto "
              onClick={handleClose}
            >
              {products.slice(0, 4).map((item: ProductInterface) => (
                <ProductCard
                  product={item}
                  key={item._id}
                  colorOptions={colorOptions}
                />
              ))}
            </div>
          )}
          {products?.length > 2 && (
            <div
              // href={
              //   !selectedStyle
              //     ? `/products/search`
              //     : `/products/search?style=${selectedStyle}`
              // }
              className="flex justify-center items-center mt-4"
              onClick={() => {
                handleClose();
                router.push(
                  !selectedStyle
                    ? `/products/search`
                    : `/products/search?style=${selectedStyle}`
                );
              }}
            >
              <ButtonPrimary>View All Search Results</ButtonPrimary>
            </div>
          )}
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default SearchHeader;
