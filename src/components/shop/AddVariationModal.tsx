import { useEffect, useState } from "react";
import { Alert, Button, Label, Modal, Dropdown } from "flowbite-react";
import { ProductInterface, VariationInterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "../loading/Loading";
import NumberInput from "@/shared/Input/NumberInput";
import { getCurrencySmallSymbol } from "@/utils/helpers";

const ModalTheme = {
  root: {
    base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full opacity-100",
  },
  content: {
    base: "relative h-full w-full p-4 md:h-auto",
    inner:
      "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
};

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const AddVariationModal = ({
  open,
  close,
  currVariation,
  product,
  allColors,
}: {
  open: boolean;
  close: () => void;
  product: ProductInterface;
  currVariation?: VariationInterface | null;
  allColors: ColInterface[];
}) => {
  const sku = currVariation?.sku;
  const [error, setError] = useState<string | null>(null);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [price, setPrice] = useState<number | undefined | string>(undefined);

  const [quantity, setQuantity] = useState<number | undefined | string>(
    undefined
  );

  const [addVariation, addVariationStatus] =
    zeapApiSlice.useAddProductVariationMutation();
  const [editVariation, editVariationStatus] =
    zeapApiSlice.useEditProductVariationMutation();
  const isLoading =
    addVariationStatus.isLoading || editVariationStatus.isLoading;
  const colors = product?.colors?.map((color) => color.value);
  const sizes = product?.sizes;

  const getTextColor = (hex: string) => {
    const red = parseInt(hex?.substring(1, 3), 16);
    const green = parseInt(hex?.substring(3, 5), 16);
    const blue = parseInt(hex?.substring(5, 7), 16);
    return red * 0.299 + green * 0.587 + blue * 0.114 > 186
      ? "text-black"
      : "text-white";
  };
  const getColorBg = (value: string) => {
    const color = allColors.find((color) => color.name === value);
    return color?.hex || color?.background;
  };

  useEffect(() => {
    if (currVariation) {
      setColor(currVariation?.colorValue || "");
      setSize(currVariation?.size || "");
      setPrice(currVariation?.price);
      setQuantity(currVariation?.quantity || 0);
    }
  }, [currVariation]);

  const validate = () => {
    if (!color) {
      setError("Please select a color");
      return false;
    }
    if (!size) {
      setError("Please select a size");
      return false;
    }
    if (!price) {
      setError("Please enter a price");
      return false;
    }
    if (Number(price) < 0) {
      setError("Price cannot be less than 0");
      return false;
    }
    if (!quantity) {
      setError("Please enter a quantity");
      return false;
    }
    if (Number(price) < 0) {
      setError("Quantity cannot be less than 0");
      return false;
    }
    return true;
  };
  const clear = () => {
    setColor("");
    setSize("");
    setPrice(0);
    setQuantity(0);
  };
  const handleAddVariation = () => {
    setError(null);
    if (!validate()) return;

    const payload = {
      productId: product?.productId,
      variation: {
        colorValue: color,
        size,
        // remove commas from price and quantity string and convert to number
        price: Number(
          typeof price === "string" ? price.replace(/,/g, "") : price
        ),
        quantity: Number(
          typeof quantity === "string" ? quantity.replace(/,/g, "") : quantity
        ),
        ...(currVariation && { sku: currVariation.sku }),
      },
    };
    if (currVariation) {
      editVariation({ payload })
        .unwrap()
        .then(() => {
          clear();
          close();
        })
        .catch((err) => {
          setError(err.data.error);
        });
      return;
    }
    addVariation({ payload })
      .unwrap()
      .then(() => {
        clear();
        close();
      })
      .catch((err) => {
        setError(err.data.error);
      });
  };
  return (
    <Modal size="7xl" theme={ModalTheme} show={open} onClose={() => close()}>
      <Modal.Header>
        {currVariation
          ? `Edit Variation - ${currVariation?.sku}`
          : "Add Variation"}
      </Modal.Header>
      <Modal.Body>
        {isLoading && <Loading />}
        {error && (
          <Alert color="failure" className="mb-4">
            {error}
          </Alert>
        )}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div className="mb-2 flex flex-col gap-1">
            <Label value="Colour" />
            <Dropdown
              label={color || "Select Colour"}
              size="xs"
              color={color ? "success" : "primary"}
              inline={color ? false : true}
            >
              {colors?.map((color, index) => (
                <Dropdown.Item key={index} onClick={() => setColor(color)}>
                  <div
                    style={{
                      background: getColorBg(color),
                    }}
                    className={`w-20 h-6 text-md rounded-md items-center justify-center flex ${getTextColor(
                      getColorBg(color) as string
                    )}`}
                  >
                    {color}
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
          <div className="mb-2 flex flex-col gap-1">
            <Label value="Size" />
            <Dropdown
              label={size || "Select Size"}
              size="xs"
              color={size ? "success" : "primary"}
              inline={size ? false : true}
            >
              {sizes?.map((size, index) => (
                <Dropdown.Item key={index} onClick={() => setSize(size)}>
                  {size}
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
          <div className="mb-2 flex flex-col gap-1 w-fit">
            <Label value="Price" />
            {/* <TextInput
              theme={inputTheme}
              value={price}
              type="text"
              inputMode="numeric"
              onChange={(e) => {
                const value = e.target.value;
                // allow only numbers + optional decimal
                if (validNumberInput(value)) {
                  setPrice(Number(value));
                }
              }}
              addon={product?.currency?.symbol || "₦"}
            /> */}
            <NumberInput
              value={price}
              onChange={(value) => setPrice(value)}
              allowDecimals
              prefix={getCurrencySmallSymbol(currVariation?.currency || "NGN")}
              placeholder={`Enter price in ${currVariation?.currency || "NGN"}`}
            />
          </div>

        {sku !== 'BESPOKE' && (
            <div className="mb-2 flex flex-col gap-1 w-fit">
              <Label value="Quantity" />
              <NumberInput
                value={quantity}
                onChange={(value) => setQuantity(value ? Number(value) : 0)}
                allowDecimals={false}
                showArrows
                placeholder="Enter quantity"
                min={0}
              />
            </div>
          )}
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-500">
            Note: You can add multiple variations for the same color and size.
            Each variation will have a unique SKU.
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddVariation} color="primary">
          {currVariation ? "Update Variation" : "Add Variation"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddVariationModal;
