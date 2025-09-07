import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useContext, useEffect, useState } from "react";
import { Alert } from "flowbite-react";
import { VariationInterface } from "@/interface/interface";
import CartPop from "@/components/cart/CartPop";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import { AddBodyMeasurementsSize } from "./AddBodyMeasurementsSize";
import { ThemeContext } from "@/contexts/themeContext";
import MobileAddedToCart from "@/components/cart/MobileAddedToCart";
import LoadingDots from "@/components/loading/LoadingDots";
import { useSearchParams } from "next/navigation";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}
type measurementField = {
  field: string;
  value: number;
};
interface bodyMeasurement {
  name: string;
  measurements: measurementField[];
}

const AddToCart = ({
  selectedSize,
  variations,
  isBeskope,
  selectedMaterialColor,
  selectedProductColor,
}: {
  selectedSize: string;
  variations: VariationInterface[];
  isBeskope: boolean;
  selectedMaterialColor: string;
  selectedProductColor: string;
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const token = useSelector(globalSelectors.selectAuthToken);
  const cartQuery = zeapApiSlice.useGetCartQuery({}, { skip: !token });
  const cart = cartQuery?.data?.data;
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions: ColInterface[] = options?.readyMadeClothes?.colorEnums;
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [bodyMeasurements, setBodyMeasurements] = useState<bodyMeasurement[]>(
    []
  );

  const quantity = 1;
  const [addToCart] = zeapApiSlice.useAddProductToCartMutation();

  const [serverError, setServerError] = useState("");

  const getSKU = () => {
    const variation = variations?.find(
      (variation) =>
        variation.colorValue?.toLocaleLowerCase() ===
          selectedProductColor.toLocaleLowerCase() &&
        variation?.size?.toLocaleLowerCase() ===
          selectedSize.toLocaleLowerCase()
    );
   
    return variation?.sku;
  };
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }
  }, [isOpen]);
 
  const handleAddToCart = () => {
    setIsLoading(true);
    setIsOpen(true);
    const payload = {
      productId: productId?.toString(),
      size: selectedSize,
      quantity,
      sku: getSKU(),
    };
    addToCart({ payload })
      .unwrap()
      .then(() => {
        setServerError("");
        setIsLoading(false);
        setTimeout(() => {
          if (showPopover) {
            return;
          }
          setIsOpen(false);
        }, 5000);
      })
      .catch((err) => {
        setServerError(err.data.error);
        setIsLoading(false);
        setIsOpen(false);
        setTimeout(() => {
          setServerError("");
        }, 5000);
      });
  };
  const getButtonLabel = () => {
    if (isBeskope) {
      return "Add to cart";
    }
    return selectedSize ? "Add to cart" : "Select a size";
  };
  const getIsDisabled = () => {
    if (isLoading) {
      return true;
    }
    if (!selectedSize && !isBeskope) {
      return true;
    }
    return false;
  };
  return (
    <div className="mt-5 flex flex-col items-center gap-5">
      {serverError && <Alert color="failure">{serverError}</Alert>}
      {isBeskope && openModal && (
        <AddBodyMeasurementsSize
          openModal={openModal}
          setOpenModal={setOpenModal}
          productId={productId || ""}
          selectedMaterialColor={selectedMaterialColor}
          bodyMeasurements={bodyMeasurements}
          setBodyMeasurements={setBodyMeasurements}
          sku={variations[0].sku}
          setIsOpen={setIsOpen}
        />
      )}

      <ButtonPrimary
        disabled={getIsDisabled()}
        className={`w-full rounded-md ${getIsDisabled() ? "opacity-50" : ""}`}
        onClick={
          !isBeskope
            ? handleAddToCart
            : () => {
                setOpenModal(true);
                setDimBackground(true);
              }
        }
      >
        {" "}
        {isLoading ? <LoadingDots /> : getButtonLabel()}
      </ButtonPrimary>
      <div className="hidden lg:block ">
        {isOpen && (
          <CartPop
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setShowPopover={setShowPopover}
            cart={cart}
            colorOptions={colorOptions}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            className="top-10"
          />
        )}
      </div>

      <div className="block lg:hidden ">
        {isOpen && <MobileAddedToCart isOpen={isOpen} setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
};

export default AddToCart;
