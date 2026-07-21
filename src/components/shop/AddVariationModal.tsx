import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Label,
  Modal,
  Dropdown,
  ToggleSwitch,
} from "flowbite-react";
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

interface AvailableVariationInterface {
  sku: string;
  size: string;
  colorValue: string;
}

interface SelectedVariationValueInterface {
  price?: string | number;
  quantity?: string | number;
}

interface ApiErrorShape {
  data?: {
    error?: string;
  };
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
  const [useQuickVariationPicker, setUseQuickVariationPicker] =
    useState<boolean>(true);
  const [selectedQuickVariations, setSelectedQuickVariations] = useState<
    Record<string, SelectedVariationValueInterface>
  >({});
  const [bulkPrice, setBulkPrice] = useState<string>("");
  const [useDefaultPrice, setUseDefaultPrice] = useState<boolean>(false);

  const [quantity, setQuantity] = useState<number | undefined | string>(
    undefined,
  );

  const [addVariation, addVariationStatus] =
    zeapApiSlice.useAddProductVariationMutation();
  const [addVariations, addVariationsStatus] =
    zeapApiSlice.useAddProductVariationsMutation();
  const [editVariation, editVariationStatus] =
    zeapApiSlice.useEditProductVariationMutation();
  const [getRemainingVariations, getRemainingVariationsStatus] =
    zeapApiSlice.useLazyGetRemainingProductVariationsQuery();

  const isLoading =
    addVariationStatus.isLoading ||
    addVariationsStatus.isLoading ||
    editVariationStatus.isLoading ||
    getRemainingVariationsStatus.isLoading ||
    getRemainingVariationsStatus.isFetching;

  const colors = product?.colors?.map((color) => color.value);
  const sizes = product?.sizes;
  const availableVariations: AvailableVariationInterface[] =
    getRemainingVariationsStatus?.data?.data?.availableVariations || [];

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
      setUseQuickVariationPicker(false);
      setColor(currVariation?.colorValue || "");
      setSize(currVariation?.size || "");
      setPrice(currVariation?.price);
      setQuantity(currVariation?.quantity || 0);
      return;
    }
    setUseQuickVariationPicker(true);
    setColor("");
    setSize("");
    setPrice(undefined);
    setQuantity(undefined);
    setSelectedQuickVariations({});
  }, [currVariation]);

  useEffect(() => {
    if (
      !open ||
      currVariation ||
      !useQuickVariationPicker ||
      !product?.productId
    ) {
      return;
    }
    getRemainingVariations({ productId: product.productId });
  }, [
    open,
    currVariation,
    useQuickVariationPicker,
    product?.productId,
    getRemainingVariations,
  ]);

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

  const validateQuickVariations = () => {
    const selectedSkus = Object.keys(selectedQuickVariations);
    if (!selectedSkus?.length) {
      setError("Please toggle at least one variation");
      return false;
    }

    for (const skuValue of selectedSkus) {
      const selectedVariation = selectedQuickVariations[skuValue];
      const variationPrice = Number(
        typeof selectedVariation?.price === "string"
          ? selectedVariation.price.replace(/,/g, "")
          : selectedVariation?.price,
      );
      const variationQuantity = Number(
        typeof selectedVariation?.quantity === "string"
          ? selectedVariation.quantity.replace(/,/g, "")
          : selectedVariation?.quantity,
      );

      if (!variationPrice) {
        setError(`Please enter a valid price for ${skuValue}`);
        return false;
      }
      if (variationPrice < 0) {
        setError(`Price cannot be less than 0 for ${skuValue}`);
        return false;
      }
      if (!variationQuantity) {
        setError(`Please enter a valid quantity for ${skuValue}`);
        return false;
      }
      if (variationQuantity < 0) {
        setError(`Quantity cannot be less than 0 for ${skuValue}`);
        return false;
      }
    }

    return true;
  };

  const clear = () => {
    setColor("");
    setSize("");
    setPrice(undefined);
    setQuantity(undefined);
    setSelectedQuickVariations({});
    setBulkPrice("");
    setUseDefaultPrice(false);
  };

  const getApiErrorMessage = (err: unknown, fallback: string) => {
    const error = err as ApiErrorShape;
    return error?.data?.error || fallback;
  };

  const handleBulkPriceChange = (value: string) => {
    setBulkPrice(value);
    setSelectedQuickVariations((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((sku) => {
        updated[sku] = {
          ...updated[sku],
          price: value,
        };
      });
      return updated;
    });
  };

  const handleQuickVariationToggle = (
    variation: AvailableVariationInterface,
    checked: boolean,
  ) => {
    setSelectedQuickVariations((prev) => {
      const updated = { ...prev };
      if (checked) {
        updated[variation.sku] = updated[variation.sku] || {
          price: bulkPrice || "",
          quantity: "",
        };
      } else {
        delete updated[variation.sku];
      }
      return updated;
    });
  };

  const updateQuickVariationValue = (
    skuValue: string,
    field: "price" | "quantity",
    value: string,
  ) => {
    setSelectedQuickVariations((prev) => ({
      ...prev,
      [skuValue]: {
        ...prev[skuValue],
        [field]: value,
      },
    }));
  };

  const handleAddVariation = async () => {
    setError(null);
    if (
      !currVariation &&
      useQuickVariationPicker &&
      !validateQuickVariations()
    ) {
      return;
    }
    if ((!useQuickVariationPicker || currVariation) && !validate()) return;

    const payload = {
      productId: product?.productId,
      variation: {
        colorValue: color,
        size,
        // remove commas from price and quantity string and convert to number
        price: Number(
          typeof price === "string" ? price.replace(/,/g, "") : price,
        ),
        quantity: Number(
          typeof quantity === "string" ? quantity.replace(/,/g, "") : quantity,
        ),
        ...(currVariation && { sku: currVariation.sku }),
      },
    };

    if (!currVariation && useQuickVariationPicker) {
      const selectedSkus = Object.keys(selectedQuickVariations);
      const selectedVariations = availableVariations.filter((variation) =>
        selectedSkus.includes(variation.sku),
      );

      const bulkPayload = {
        productId: product?.productId,
        variations: selectedVariations.map((variation) => {
          const selectedVariation = selectedQuickVariations[variation.sku];
          return {
            size: variation.size,
            colorValue: variation.colorValue,
            price: Number(
              typeof selectedVariation?.price === "string"
                ? selectedVariation.price.replace(/,/g, "")
                : selectedVariation?.price,
            ),
            quantity: Number(
              typeof selectedVariation?.quantity === "string"
                ? selectedVariation.quantity.replace(/,/g, "")
                : selectedVariation?.quantity,
            ),
          };
        }),
      };

      try {
        await addVariations({ payload: bulkPayload }).unwrap();
        clear();
        close();
      } catch (err: unknown) {
        setError(
          getApiErrorMessage(err, "Unable to add one or more variations"),
        );
      }
      return;
    }

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
    try {
      await addVariation({ payload }).unwrap();
      clear();
      close();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Unable to add variation"));
    }
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

        {!currVariation && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-3 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">
                Quick variation picker
              </span>
              <span className="text-xs text-gray-500">
                Toggle to auto-generate remaining SKUs instead of selecting
                colour &amp; size manually
              </span>
            </div>
            <ToggleSwitch
              checked={useQuickVariationPicker}
              color="success"
              onChange={(checked) => {
                setError(null);
                setUseQuickVariationPicker(checked);
                setSelectedQuickVariations({});
              }}
            />
          </div>
        )}

        {!currVariation && useQuickVariationPicker && (
          <div className="mb-4 rounded-lg border border-primary/30 bg-primary/5 p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  ₦
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800">
                    Default price
                  </span>
                  <span className="text-xs text-gray-500">
                    Optionally set one price for every selected variation
                  </span>
                </div>
              </div>
              <ToggleSwitch
                checked={useDefaultPrice}
                color="success"
                onChange={(checked) => {
                  setUseDefaultPrice(checked);
                  if (!checked) {
                    handleBulkPriceChange("");
                  }
                }}
              />
            </div>
            {useDefaultPrice && (
              <div className="w-full sm:max-w-xs">
                <NumberInput
                  value={bulkPrice}
                  onChange={(value) => handleBulkPriceChange(value)}
                  allowDecimals
                  prefix={getCurrencySmallSymbol(
                    product?.currency?.name || "NGN",
                  )}
                  placeholder={`Enter price in ${
                    product?.currency?.name || "NGN"
                  }`}
                  className="!mx-0 !max-w-none"
                />
              </div>
            )}
          </div>
        )}

        {!currVariation && useQuickVariationPicker && (
          <div className="mb-6 border rounded-md p-3 max-h-[45dvh] overflow-auto flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                  {availableVariations?.length || 0} available
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {Object.keys(selectedQuickVariations).length} selected
                </span>
              </div>
              {availableVariations?.length > 0 && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="text-xs font-semibold text-primary hover:underline"
                    onClick={() => {
                      setSelectedQuickVariations((prev) => {
                        const updated = { ...prev };
                        availableVariations.forEach((variation) => {
                          updated[variation.sku] = updated[variation.sku] || {
                            price: bulkPrice || "",
                            quantity: "",
                          };
                        });
                        return updated;
                      });
                    }}
                  >
                    Select all
                  </button>
                  <button
                    type="button"
                    className="text-xs font-semibold text-gray-500 hover:underline disabled:opacity-40"
                    disabled={
                      Object.keys(selectedQuickVariations).length === 0
                    }
                    onClick={() => setSelectedQuickVariations({})}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {availableVariations?.length === 0 && !isLoading && (
              <Alert color="warning">
                No remaining variations found. Make sure the product has sizes
                and colors, and existing combinations are not exhausted.
              </Alert>
            )}

            {availableVariations.map((variation) => {
              const isSelected = !!selectedQuickVariations[variation.sku];
              const colorBg = getColorBg(variation.colorValue);
              return (
                <div
                  key={variation.sku}
                  className={`rounded-md p-3 transition-colors ${
                    isSelected
                      ? "border border-primary bg-primary/5"
                      : "border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-gray-400">
                        SKU Preview
                      </div>
                      <div className="font-semibold text-sm">
                        {variation.sku}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span
                          style={{
                            background: colorBg,
                          }}
                          className={`text-xs font-extrabold tracking-wide px-3 py-1.5 rounded-md border shadow-sm ${
                            colorBg
                              ? getTextColor(colorBg)
                              : "text-slate-800 bg-slate-100 border-slate-300"
                          }`}
                        >
                          {variation.size} • {variation.colorValue}
                        </span>
                      </div>
                    </div>
                    <ToggleSwitch
                      checked={isSelected}
                      label={isSelected ? "Selected" : "Select"}
                      color="success"
                      onChange={(checked) =>
                        handleQuickVariationToggle(variation, checked)
                      }
                    />
                  </div>

                  {isSelected && (
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="flex flex-col gap-1">
                        <Label value="Price" />
                        <NumberInput
                          value={selectedQuickVariations[variation.sku]?.price}
                          onChange={(value) =>
                            updateQuickVariationValue(
                              variation.sku,
                              "price",
                              value,
                            )
                          }
                          allowDecimals
                          prefix={getCurrencySmallSymbol(
                            product?.currency?.name || "NGN",
                          )}
                          placeholder={`Enter price in ${
                            product?.currency?.name || "NGN"
                          }`}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label value="Qty" />
                        <NumberInput
                          value={
                            selectedQuickVariations[variation.sku]?.quantity
                          }
                          onChange={(value) =>
                            updateQuickVariationValue(
                              variation.sku,
                              "quantity",
                              value,
                            )
                          }
                          allowDecimals={false}
                          showArrows
                          placeholder="Qty"
                          min={0}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {(!useQuickVariationPicker || currVariation) && (
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
                        getColorBg(color) as string,
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
                prefix={getCurrencySmallSymbol(
                  currVariation?.currency || "NGN",
                )}
                placeholder={`Enter price in ${currVariation?.currency || "NGN"}`}
              />
            </div>

            {sku !== "BESPOKE" && (
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
        )}
        <div className="mt-4">
          <div className="text-sm text-gray-500">
            {!currVariation && useQuickVariationPicker
              ? "Toggle combinations to add them quickly. SKU is previewed immediately before saving."
              : "Note: You can add multiple variations for the same color and size. Each variation will have a unique SKU."}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full items-center justify-between gap-3">
          {!currVariation && useQuickVariationPicker && (
            <span className="text-sm text-gray-500">
              {Object.keys(selectedQuickVariations).length} variation
              {Object.keys(selectedQuickVariations).length === 1
                ? ""
                : "s"}{" "}
              ready to add
            </span>
          )}
          <Button
            onClick={handleAddVariation}
            color="primary"
            className="ml-auto"
          >
            {currVariation
              ? "Update Variation"
              : !useQuickVariationPicker
                ? "Add Variation"
                : `Add ${
                    Object.keys(selectedQuickVariations).length || ""
                  } Variation${
                    Object.keys(selectedQuickVariations).length === 1
                      ? ""
                      : "s"
                  }`}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddVariationModal;
