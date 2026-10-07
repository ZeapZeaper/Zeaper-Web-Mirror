"use client";
import { ProductInterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { globalSelectors } from "@/redux/services/global.slice";
import NumberInput from "@/shared/Input/NumberInput";
import { getCurrencySmallSymbol, getTextColor } from "@/utils/helpers";
import { Alert, Checkbox, Dropdown, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const BespokeVariation = ({
  product,
  allColors,
  colorType,
  setColorType,
  availableColors,
  setAvailableColors,
  price,
  setPrice,
  commissionRate,
  sellerKeepRate,
  showCommissionAlert = true,
}: {
  product: ProductInterface;
  allColors: ColInterface[];
  colorType: string;
  availableColors: string[];
  setAvailableColors: (availableColors: string[]) => void;
  setColorType: (colorType: string) => void;
  price: number | undefined | string;
  setPrice: (price: number | undefined | string) => void;
  commissionRate?: number;
  sellerKeepRate?: number | null;
  showCommissionAlert?: boolean;
}) => {
  const [colors, setColors] = useState<ColInterface[]>([]);
  const token = useSelector(globalSelectors.selectAuthToken);
  const currency = product?.variations[0]?.currency || "NGN";
  const commissionRatesQuery = zeapApiSlice.useGetZeaperCommissionRatesQuery(
    undefined,
    { skip: !token },
  );
  const resolvedCommissionRate =
    typeof commissionRate === "number"
      ? commissionRate
      : commissionRatesQuery?.data?.data?.bespoke;
  const resolvedSellerKeepRate =
    typeof sellerKeepRate === "number"
      ? sellerKeepRate
      : typeof resolvedCommissionRate === "number"
        ? 100 - resolvedCommissionRate
        : null;
  useEffect(() => {
    if (colorType === "single") {
      const bespoke = product?.variations[0]?.bespoke;

      if (bespoke?.availableColors) {
        setAvailableColors(bespoke?.availableColors);
        const removables = allColors.filter(
          (color) => !bespoke?.availableColors.includes(color.name)
        );
        setColors(removables);
      } else {
        setAvailableColors([]);
        setColors(allColors);
      }
    } else {
      setAvailableColors([]);
      setColors(allColors);
    }
  }, [product, allColors, setAvailableColors, colorType]);

  useEffect(() => {
    if (product) {
      const bespoke = product?.variations.find(
        (variation) => variation.bespoke
      );
      if (bespoke) {
        setPrice(bespoke.price);
        if (bespoke?.bespoke) {
          setColorType(bespoke?.bespoke?.colorType);
          setAvailableColors(bespoke?.bespoke?.availableColors || []);
        }
      }
      if (product?.variations[0]?.bespoke?.colorType) {
        setColorType(product?.variations[0]?.bespoke?.colorType);
      }
    }
  }, [product, setColorType, setAvailableColors, setPrice]);

  const getAvailableColorBg = (value: string) => {
    const color = allColors.find((color) => color.name === value);
    return color?.hex || color?.background;
  };
  return (
    <>
      <div>
        {showCommissionAlert &&
          typeof resolvedCommissionRate === "number" &&
          typeof resolvedSellerKeepRate === "number" && (
            <Alert color="warning" className="mb-4 w-fit">
              <span className="font-medium">Pricing heads-up. </span>
              Zeaper commission for this product type is {resolvedCommissionRate}%.
              You keep {resolvedSellerKeepRate}% for each sale.
            </Alert>
          )}
        <div className="mb-2 flex flex-col gap-1 w-fit">
          <Label value="Price" />
          <NumberInput
            value={price}
            onChange={(value) => setPrice(value)}
            allowDecimals
            prefix={getCurrencySmallSymbol(currency)}
            placeholder={`Enter price in ${currency}`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 my-4 border rounded-md p-4">
        <span className="text-sm font-semibold">
          Is your product a plain single color or a multiple-color design?
        </span>
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:gap-8">
          <div className="flex gap-2">
            <Label value="Plain Single Colour" />
            <Checkbox
              checked={colorType === "single"}
              onChange={() => {
                setColorType("single");
              }}
            />
          </div>
          <div className="flex gap-2">
            <Label value="Multi-colour Design" />
            <Checkbox
              checked={colorType === "multiple"}
              onChange={() => {
                setColorType("multiple");
              }}
            />
          </div>
        </div>
      </div>
      {colorType === "single" && (
        <div className="flex flex-col gap-2 my-4 border rounded-md p-4">
          <Alert color="info" className="w-fit">
            <span className="block text-sm ">
              Please select all colours you can source their materials on user
              request. This option will be available to buyers when they are
              making a purchase.
            </span>
            <span>
              Note that this is available only for single plain colour products.
            </span>
          </Alert>
          <div className="flex flex-wrap gap-4">
            {availableColors?.map((color) => (
              <div
                key={color}
                style={{
                  background: getAvailableColorBg(color),
                }}
                className={`min-w-20 h-6 rounded-md items-center  flex justify-between py-4 p-1  border border-neutral-300 ${getTextColor(
                  getAvailableColorBg(color) as string
                )}`}
              >
                <span className="text-sm w-full">{color}</span>
                <span
                  className="cursor-pointer text-sm  bg-danger text-white rounded-full p-1 h-4 w-4 flex items-center justify-center"
                  onClick={() => {
                    const removedColor = allColors.find(
                      (col) => col.name === color
                    );
                    if (removedColor) {
                      const sortedColors = [...colors, removedColor].sort(
                        (a, b) => a.name.localeCompare(b.name)
                      );
                      setColors(sortedColors);
                    }
                    setAvailableColors(
                      availableColors.filter((col) => col !== color)
                    );
                  }}
                >
                  x
                </span>
              </div>
            ))}
          </div>
          <div className="flex my-4">
            <Dropdown
              label={
                availableColors?.length > 0
                  ? "Select more colours"
                  : "Select all colours"
              }
              color={"primary"}
              className=" h-80 overflow-scroll"
            >
              {colors?.map((color) => (
                <Dropdown.Item
                  className="text-black"
                  key={color?.name}
                  value={color?.name}
                  onClick={() => {
                    setAvailableColors([...availableColors, color?.name]);
                    setColors(colors.filter((col) => col.name !== color?.name));
                  }}
                >
                  <div
                    style={{
                      background: color?.hex || color?.background,
                    }}
                    className={`w-20 h-6 rounded-md items-center justify-center flex border border-neutral-300 ${getTextColor(
                      color?.hex || color?.background || ""
                    )}`}
                  >
                    {color?.name}
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
          {/* <Multiselect
            options={allColors}
            displayValue="name"
            onSelect={(selectedList) => {
              const value = selectedList.map((item: any) => item.name);
              setAvailableColors([...availableColors, ...value]);
            }}
            onRemove={(selectedList) =>
              setAvailableColors(
                availableColors.filter(
                  (color) => !selectedList.includes(color),
                ),
              )
            }
            selectedValues={allColors.filter((color) =>
              availableColors.includes(color.name),
            )}
            placeholder="Select all colors a buyer can choose from"
            style={{
              chips: {
                background: '#219653',
              },

              searchBox: {
                border: 'none',
                'border-bottom': '1px solid #a17f1a',
                'border-radius': '0px',
              },
            }}
          /> */}
        </div>
      )}
    </>
  );
};

export default BespokeVariation;
