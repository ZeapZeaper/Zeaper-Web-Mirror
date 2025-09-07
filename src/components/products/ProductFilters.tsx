import { Checkbox } from "flowbite-react";

import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useRouter, useSearchParams } from "next/navigation";
import MultiRangeSlider from "@/shared/MultiRangeSlider/MultiRangeSlider";

interface ProductFiltersProps {
  dynamicFilters: {
    name: string;
    type: string;
    options: Record<string, { value: string }>;
  }[];
  totalCount: number;
  // setSubTitle: (value: string) => void;
  colorOptions: { name: string; hex?: string; background?: string }[];
}

const ProductFilters = ({
  dynamicFilters,
  totalCount,
  // setSubTitle,
  colorOptions,
}: ProductFiltersProps) => {
  const router = useRouter();
  const [showOptionsList, setShowOptionsList] = useState<string[]>(
    // dynamicFilters.map((filter) => filter?.name)
    []
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    console.log("params", params);
    const keys = Array.from(params.keys());
    const newShowOptionsList: string[] = ["Color", "Style", "Size"];
    keys.forEach((key) => {
      const filter = dynamicFilters.find(
        (filter) => lowerFirstChar(filter?.name?.replace(/ /g, "")) === key
      );
      if (filter) {
        newShowOptionsList.push(filter?.name);
      }
    });
    setShowOptionsList(newShowOptionsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const lowerFirstChar = (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };
  const checkIfFilterExist = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const exist = params.get(key);
    if (exist) {
      return exist.split(",").includes(value);
    }
    return false;
  };
  const handleFilterChange = (
    key: string,
    value: string,
    replace?: boolean
  ) => {
    if (replace) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      router.push(`?${params.toString()}`);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    const exist = params.get(key);

    // join the values with comma if exist
    if (exist) {
      // remove the value if exist
      if (exist.split(",").includes(value)) {
        const values = exist.split(",").filter((item) => item !== value);
        if (values.length > 0) {
          params.set(key, values.join(","));
        } else {
          params.delete(key);
        }
      } else {
        params.set(key, `${exist},${value}`);
      }
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };
  const getSearchParamsNumber = () => {
    const excludeKeys = [
      "page",
      "sort",
      "limit",
      "productGroupPage",
      "subProductGroupPage",
      "collectionTitle",
      "superTitle",
    ];
    const allsearchParamsKey = Array.from(searchParams.keys());
    return allsearchParamsKey.filter((key) => !excludeKeys.includes(key))
      .length;
  };
  const clearAllAppliedFilters = () => {
    const excludeKeys = [
      "page",
      "sort",
      "limit",
      "productGroupPage",
      "subProductGroupPage",
      "collectionTitle",
    ];
    const allsearchParamsKey = Array.from(searchParams.keys()).filter(
      (key) => !excludeKeys.includes(key)
    );
    console.log("allsearchParamsKey", allsearchParamsKey);
    const params = new URLSearchParams(searchParams.toString());
    allsearchParamsKey.forEach((key) => {
      params.delete(key);
    });
    // setSubTitle("");

    router.push(`?${params.toString()}`);
  };

  const getBg = (value: string) => {
    if (value.toLocaleLowerCase() === "bespoke")
      return "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(204,23,195,0.09147408963585435) 4%, rgba(205,64,138,0.5172443977591037) 25%, rgba(207,136,39,1) 37%, rgba(13,15,25,1) 44%, rgba(32,37,4,1) 45%, rgba(72,84,9,0.4472163865546218) 100%)";
    const color = colorOptions.find((color) => color.name === value);
    return color?.hex || color?.background;
  };

  return (
    <div className="flex   flex-col h-[150vh] overflow-scroll bg-white w-[16rem] ">
      {getSearchParamsNumber() > 0 && (
        <div
          onClick={clearAllAppliedFilters}
          className="flex items-center  mb-2 border rounded-full justify-center w-40 text-md cursor-pointer hover:border-darkGold "
        >
          Clear all ({getSearchParamsNumber()})
        </div>
      )}
      <div className=" grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-lg text-darkGold  mb-2 ">Refine by</span>
          <span className="text-sm text-success  mb-2 ">
            {totalCount} {totalCount > 1 ? "Products" : "Product"}
          </span>
        </div>
        <div className="flex flex-col">
          {dynamicFilters.map((filter) => (
            <div key={filter?.name} className="flex flex-col p-2">
              <div
                className="flex w-full h-12 items-center rounded-md justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-2"
                onClick={() => {
                  if (showOptionsList.includes(filter?.name)) {
                    setShowOptionsList(
                      showOptionsList.filter((item) => item !== filter?.name)
                    );
                  } else {
                    setShowOptionsList([...showOptionsList, filter?.name]);
                  }
                }}
              >
                <span className="text-sm text-darkGold mt-6 mb-2 ">
                  {filter?.name}
                </span>
                <div className="text-lg text-darkGold mt-6 mb-2 cursor-pointer hover:text-darkGold">
                  {showOptionsList.includes(filter?.name) ? (
                    <HiMinus />
                  ) : (
                    <HiPlus />
                  )}
                </div>
              </div>
              {showOptionsList.includes(filter?.name) && (
                <>
                  {filter?.name === "Color" ? (
                    <div className="grid grid-cols-2 gap-4 max-h-70 overflow-scroll">
                      {filter?.type === "checkbox" && (
                        <>
                          {Object.keys(filter?.options)
                            .map((key) => filter?.options[key])
                            .map((obj: { value: string }) => (
                              <div
                                key={obj?.value}
                                className="flex items-center cursor-pointer mt-2"
                              >
                                <Checkbox
                                  id={obj?.value}
                                  name={obj?.value}
                                  color="success"
                                  checked={checkIfFilterExist(
                                    lowerFirstChar(
                                      filter?.name?.replace(/ /g, "")
                                    ),
                                    obj?.value
                                  )}
                                  onChange={() =>
                                    handleFilterChange(
                                      lowerFirstChar(
                                        filter?.name?.replace(/ /g, "")
                                      ),
                                      obj?.value
                                    )
                                  }
                                />
                                <label
                                  onClick={() =>
                                    handleFilterChange(
                                      lowerFirstChar(
                                        filter?.name?.replace(/ /g, "")
                                      ),
                                      obj?.value
                                    )
                                  }
                                  htmlFor={obj?.value}
                                  className="ml-2 text-sm text-gray-900 dark:text-white items-center inline-flex gap-2 cursor-pointer"
                                >
                                  <div
                                    className="w-4 h-4 rounded-full border  border-slate-200"
                                    style={{ background: getBg(obj?.value) }}
                                  ></div>

                                  {obj?.value}
                                </label>
                              </div>
                            ))}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col max-h-60 overflow-y-scroll">
                      {filter?.type === "checkbox" && (
                        <>
                          {Object.keys(filter?.options)
                            .map((key) => filter?.options[key])
                            .map((obj: { value: string }) => (
                              <div
                                key={obj?.value}
                                className="flex items-center cursor-pointer mt-2"
                              >
                                <Checkbox
                                  id={obj?.value}
                                  name={obj?.value}
                                  color="success"
                                  checked={checkIfFilterExist(
                                    lowerFirstChar(
                                      filter?.name?.replace(/ /g, "")
                                    ),
                                    obj?.value
                                  )}
                                  onChange={() =>
                                    handleFilterChange(
                                      lowerFirstChar(
                                        filter?.name?.replace(/ /g, "")
                                      ),
                                      obj?.value
                                    )
                                  }
                                />
                                <label
                                  onClick={() =>
                                    handleFilterChange(
                                      lowerFirstChar(
                                        filter?.name?.replace(/ /g, "")
                                      ),
                                      obj?.value
                                    )
                                  }
                                  htmlFor={obj?.value}
                                  className="ml-2 text-sm text-gray-900 dark:text-white items-center inline-flex gap-2 cursor-pointer"
                                >
                                  {obj?.value}
                                </label>
                              </div>
                            ))}
                        </>
                      )}
                      {filter?.type === "range" && (
                        <div className="relative mb-6">
                          <MultiRangeSlider
                            min={
                              filter?.options?.min?.value
                                ? Number(filter?.options?.min?.value)
                                : 0
                            }
                            max={
                              filter?.options?.max?.value
                                ? Number(filter?.options?.max?.value)
                                : 100
                            }
                            onChange={({ min, max }) =>
                              handleFilterChange(
                                lowerFirstChar(filter?.name?.replace(/ /g, "")),
                                `${min}-${max}`,
                                true
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
