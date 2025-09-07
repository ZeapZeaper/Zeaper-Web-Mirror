"use client"
import { ProductInterface } from '@/interface/interface';
import { getTextColor } from '@/utils/helpers';
import { Alert, Checkbox, Dropdown, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';


// import Multiselect from 'multipleselect-react-dropdown';

const inputTheme = {
  field: {
    input: {
      colors: {
        primary:
          'border-darkGold  text-dark placeholder-darkGold focus:border-darkGold focus:ring-darkGold dark:bg-darkGold dark:border-darkGold dark:focus:border-darkGold dark:focus:ring-darkGold',
      },
    },
  },
};

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
}: {
  product: ProductInterface;
  allColors: ColInterface[];
  colorType: string;
  availableColors: string[];
  setAvailableColors: (availableColors: string[]) => void;
  setColorType: (colorType: string) => void;
  price: number;
  setPrice: (price: number) => void;
}) => {
  const [colors, setColors] = useState<ColInterface[]>([]);

  useEffect(() => {
    if (colorType === 'single') {
      const bespoke = product?.variations[0]?.bespoke;

      if (bespoke?.availableColors) {
        setAvailableColors(bespoke?.availableColors);
        const removables = allColors.filter(
          (color) => !bespoke?.availableColors.includes(color.name),
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
        (variation) => variation.bespoke,
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
        <div className="mb-2 flex flex-col gap-1 w-fit">
          <Label value="Price" />
          <TextInput
            theme={inputTheme}
            value={price || 0}
            type="number"
            min={0}
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
            }}
            addon={product?.currency?.symbol || '₦'}
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
              checked={colorType === 'single'}
              onChange={() => {
                setColorType('single');
              }}
            />
          </div>
          <div className="flex gap-2">
            <Label value="Multi-colour Design" />
            <Checkbox
              checked={colorType === 'multiple'}
              onChange={() => {
                setColorType('multiple');
              }}
            />
          </div>
        </div>
      </div>
      {colorType === 'single' && (
        <div className="flex flex-col gap-2 my-4 border rounded-md p-4">
          <Alert color="info" className="w-fit">
            <span className="block text-sm ">
              please select all colours you can source their materials on user
              request. This option will be available to buyers when they are
              making a purchase.
            </span>
            <span>
              Note that this is available only for single plain color products
            </span>
          </Alert>
          <div className="flex flex-wrap gap-4">
            {availableColors?.map((color) => (
              <div
                key={color}
                style={{
                  background: getAvailableColorBg(color),
                }}
                className={`min-w-20 h-6 rounded-md items-center  flex justify-between py-4 p-1 ${getTextColor(getAvailableColorBg(color) as string)}`}
              >
                <span className="text-sm w-full">{color}</span>
                <span
                  className="cursor-pointer text-sm  bg-danger text-white rounded-full p-1 h-4 w-4 flex items-center justify-center"
                  onClick={() => {
                    const removedColor = allColors.find(
                      (col) => col.name === color,
                    );
                    if (removedColor) {
                      const sortedColors = [...colors, removedColor].sort(
                        (a, b) => a.name.localeCompare(b.name),
                      );
                      setColors(sortedColors);
                    }
                    setAvailableColors(
                      availableColors.filter((col) => col !== color),
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
                  ? 'Select more colours a buyer can choose from'
                  : 'Select all colours a buyer can choose from'
              }
              color={'primary'}
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
                    className={`w-20 h-6 rounded-md items-center justify-center flex ${getTextColor(color?.hex || color?.background || '')}`}
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
