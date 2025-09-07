"use client";

import MultiRangeSlider from "@/shared/MultiRangeSlider/MultiRangeSlider";
import { Checkbox, Drawer } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { HiAdjustments, HiMinus, HiPlus } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const drawerTmem = {
  root: {
    base: "fixed z-40 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800",
    backdrop: "fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80",
    edge: "bottom-35 h-[80vh] ",
    position: {
      top: {
        on: "left-0 right-0 top-0 w-full transform-none",
        off: "left-0 right-0 top-0 w-full -translate-y-full",
      },
      right: {
        on: "right-0 top-0 h-screen w-80 transform-none",
        off: "right-0 top-0 h-screen w-80 translate-x-full",
      },
      bottom: {
        on: "bottom-0 left-0 right-0 w-full transform-none h-[70vh]  overflow-y-scroll",
        off: "bottom-0 left-0 right-0 w-full translate-y-full",
      },
      left: {
        on: "left-0 top-0 h-screen w-80 transform-none",
        off: "left-0 top-0 h-screen w-80 -translate-x-full",
      },
    },
  },
  header: {
    inner: {
      closeButton:
        "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      closeIcon: "h-4 w-4",
      titleIcon: "me-2.5 h-4 w-4",
      titleText:
        "mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400",
    },
    collapsed: {
      on: "hidden",
      off: "block",
    },
  },
  items: {
    base: "",
  },
};

export function MobileProductFilters({
  dynamicFilters,
  totalCount,
  // setSubTitle,
  colorOptions,
}: {
  dynamicFilters: {
    name: string;
    type: string;
    options: Record<string, { value: string }>;
  }[];
  totalCount: number;
  // setSubTitle: (value: string) => void;
  colorOptions: { name: string; hex?: string; background?: string }[];
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const [showOptionsList, setShowOptionsList] = useState<string[]>(
    dynamicFilters.map((filter) => filter?.name)
  );

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
    console.log("exist", exist);

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
      "superTitle"
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
  
    const params = new URLSearchParams(searchParams.toString());
    allsearchParamsKey.forEach((key) => {
      params.delete(key);
    });
    // setSubTitle("");

    router.push(`?${params.toString()}`);
  };
  const handleClose = () => setIsOpen(false);
  const getBg = (value: string) => {
    if (value.toLocaleLowerCase() === "bespoke")
      return "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(204,23,195,0.09147408963585435) 4%, rgba(205,64,138,0.5172443977591037) 25%, rgba(207,136,39,1) 37%, rgba(13,15,25,1) 44%, rgba(32,37,4,1) 45%, rgba(72,84,9,0.4472163865546218) 100%)";
    const color = colorOptions?.find((color) => color.name === value);
    return color?.hex || color?.background;
  };
  return (
    <>
      {!isOpen && (
        <div
          onClick={() => {
            setIsOpen(!isOpen);
            // setSubTitle("");
          }}
          className="inline-flex items-center  w-full h-8 px-4 text-sm "
        >
          <span className="flex items-center gap-2">
            <HiAdjustments className="text-lg" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              Filters
            </span>
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {getSearchParamsNumber() > 0 ? `(${getSearchParamsNumber()})` : ""}
          </span>
        </div>
      )}
      <Drawer
        theme={drawerTmem}
        // edge
        open={isOpen}
        onClose={handleClose}
        position="bottom"
        className="p-0"
      >
        <Drawer.Header
          title={
            !isOpen
              ? `Filters (${getSearchParamsNumber()})`
              : `See ${getSearchParamsNumber()} items`
          }
          titleIcon={HiAdjustments}
          closeIcon={IoMdClose}
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer text-darkGold px-4 pt-4 hover:bg-gray-50 dark:hover:bg-gray-700"
        />

        <Drawer.Items>
          <div className="flex flex-col h-[78vh] overflow-scroll p-2">
            <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-700">
              <div className="flex justify-between items-center">
                <span
                  className="text-xs border border-darkGold rounded-full cursor-pointer p-1 mt-6 mb-2 "
                  onClick={() => {
                    clearAllAppliedFilters();
                  }}
                >
                  Clear all ({getSearchParamsNumber()})
                </span>
                <span className="text-sm text-success mt-6 mb-2 ">
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
                            showOptionsList.filter(
                              (item) => item !== filter?.name
                            )
                          );
                        } else {
                          setShowOptionsList([
                            ...showOptionsList,
                            filter?.name,
                          ]);
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
                                          style={{
                                            background: getBg(obj?.value),
                                          }}
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
                                      lowerFirstChar(
                                        filter?.name?.replace(/ /g, "")
                                      ),
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
        </Drawer.Items>
      </Drawer>
    </>
  );
}
