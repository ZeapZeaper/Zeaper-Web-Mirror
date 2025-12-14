"use client";

import MultiRangeSlider from "@/shared/MultiRangeSlider/MultiRangeSlider";
import { Checkbox, Drawer } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { HiAdjustments, HiMinus, HiPlus } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

export function MobileProductFilters({
  dynamicFilters,
  totalCount,
  // setSubTitle,
  colorOptions,
}: {
  dynamicFilters: {
    name: string;
    type: string;
    options: Record<string, { value: string; slug?: string }>;
  }[];
  totalCount: number;
  // setSubTitle: (value: string) => void;
  colorOptions: { name: string; hex?: string; background?: string }[];
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const [showOptionsList, setShowOptionsList] = useState<string[]>(
    dynamicFilters?.map((filter) => filter?.name)
  );

  const lowerFirstChar = (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };
  const checkIfFilterExist = (key: string, slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const exist = params.get(key);
    if (exist) {
      return exist.split(",").includes(slug);
    }
    return false;
  };
  const handleFilterChange = (key: string, slug: string, replace?: boolean) => {
    if (replace) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, slug);
      router.push(`?${params.toString()}`);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    const exist = params.get(key);

    // join the values with comma if exist
    if (exist) {
      // remove the value if exist
      if (exist.split(",").includes(slug)) {
        const values = exist.split(",").filter((item) => item !== slug);
        if (values.length > 0) {
          params.set(key, values.join(","));
        } else {
          params.delete(key);
        }
      } else {
        params.set(key, `${exist},${slug}`);
      }
    } else {
      params.set(key, slug);
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
        open={isOpen}
        onClose={handleClose}
        position="bottom"
        className="p-0 z-[9999]"

        // theme={drawerTheme}
      >
        {/* HEADER */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <HiAdjustments />
            <span className="text-sm font-semibold">
              Filters ({getSearchParamsNumber()})
            </span>
          </div>

          <IoMdClose className="text-xl cursor-pointer" onClick={handleClose} />
        </div>

        {/* SCROLL AREA (ONLY SCROLL CONTAINER) */}
        <div
          className="
      h-[calc(100dvh-56px-64px)]
      overflow-y-auto
      overscroll-contain
      px-4
      pb-6
      [-webkit-overflow-scrolling:touch]
    "
        >
          {/* CLEAR / COUNT */}
          <div className="flex justify-between items-center py-4">
            <button
              onClick={clearAllAppliedFilters}
              className="text-xs border border-secondary rounded-full px-3 py-1"
            >
              Clear all ({getSearchParamsNumber()})
            </button>

            <span className="text-sm text-success">
              {totalCount} {totalCount > 1 ? "Products" : "Product"}
            </span>
          </div>

          {/* FILTER LIST */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {dynamicFilters.map((filter) => {
              const paramKey = lowerFirstChar(filter.name.replace(/ /g, ""));

              return (
                <div key={filter.name} className="py-2">
                  {/* FILTER HEADER */}
                  <button
                    className="flex w-full items-center justify-between py-3"
                    onClick={() =>
                      setShowOptionsList((prev) =>
                        prev.includes(filter.name)
                          ? prev.filter((n) => n !== filter.name)
                          : [...prev, filter.name]
                      )
                    }
                  >
                    <span className="text-sm font-medium text-secondary">
                      {filter.name}
                    </span>

                    {showOptionsList.includes(filter.name) ? (
                      <HiMinus />
                    ) : (
                      <HiPlus />
                    )}
                  </button>

                  {/* FILTER CONTENT */}
                  {showOptionsList.includes(filter.name) && (
                    <div className="pl-1 pb-3 space-y-2">
                      {/* COLOR */}
                      {filter.name === "Color" &&
                        filter.type === "checkbox" && (
                          <div className="grid grid-cols-2 gap-3">
                            {Object.keys(filter.options)
                              .map((key) => filter.options[key])
                              .map((obj) => (
                                <label
                                  key={obj.value}
                                  className="flex items-center gap-2 text-sm cursor-pointer"
                                >
                                  <Checkbox
                                    checked={checkIfFilterExist(
                                      paramKey,
                                      obj.slug || obj.value
                                    )}
                                    onChange={() =>
                                      handleFilterChange(
                                        paramKey,
                                        obj.slug || obj.value
                                      )
                                    }
                                  />

                                  <span
                                    className="w-4 h-4 rounded-full border"
                                    style={{
                                      background: getBg(obj.value),
                                    }}
                                  />

                                  {obj.value}
                                </label>
                              ))}
                          </div>
                        )}

                      {/* CHECKBOX */}
                      {filter.type === "checkbox" &&
                        filter.name !== "Color" &&
                        Object.keys(filter.options)
                          .map((key) => filter.options[key])
                          .map((obj) => (
                            <label
                              key={obj.value}
                              className="flex items-center gap-2 text-sm cursor-pointer"
                            >
                              <Checkbox
                                checked={checkIfFilterExist(
                                  paramKey,
                                  obj.slug || obj.value
                                )}
                                onChange={() =>
                                  handleFilterChange(
                                    paramKey,
                                    obj.slug || obj.value
                                  )
                                }
                              />
                              {obj.value}
                            </label>
                          ))}

                      {/* RANGE */}
                      {filter.type === "range" && (
                        <MultiRangeSlider
                          min={Number(filter.options?.min ?? 0)}
                          max={Number(filter.options?.max ?? 100)}
                          onChange={({ min, max }) =>
                            handleFilterChange(paramKey, `${min}-${max}`, true)
                          }
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 z-20 bg-white dark:bg-gray-800 border-t px-4 py-3">
          <button
            onClick={handleClose}
            className="w-full rounded-lg bg-secondary py-2 text-white font-semibold"
          >
            See results ({totalCount})
          </button>
        </div>
      </Drawer>
    </>
  );
}
