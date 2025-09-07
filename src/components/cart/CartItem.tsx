import { BasketInterface, BasketItemIterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { getCurrencySmallSymbol, numberWithCommas } from "@/utils/helpers";
import Image from "next/image";
import LikeButton from "../LikeButton";
import { useRouter } from "next/navigation";
import CartInputNumber from "./CartInputNumber";
import { AiOutlineDelete } from "react-icons/ai";
import NoPic from "@/images/noPhoto.png";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import { useState } from "react";
import { AddBodyMeasurementsSize } from "@/app/products/[product]/AddBodyMeasurementsSize";

type measurementField = {
  field: string;
  value: number;
};
interface bodyMeasurement {
  name: string;
  measurements: measurementField[];
}

const CartItem = ({
  item,
  setServerError,
  cart,
  setIsLoading,
  colorOptions,
}: {
  item: BasketItemIterface;
  setServerError: (value: string) => void;
  cart: BasketInterface;
  setIsLoading: (value: boolean) => void;
  colorOptions: { name: string; hex?: string; background?: string }[];
}) => {
  const router = useRouter();
  const isBespoke = item?.size === "Custom";
  const [openModal, setOpenModal] = useState(false);
  const [bodyMeasurements, setBodyMeasurements] = useState<bodyMeasurement[]>(
    item.bodyMeasurements || []
  );
  const [addProductToWishList] = zeapApiSlice.useAddProductToWishListMutation();
  const [removeProductFromWishList] =
    zeapApiSlice.useRemoveProductFromWishListMutation();
  const wishList = useSelector(globalSelectors.selectWishList);
  const [removeProductFromBasket] =
    zeapApiSlice.useRemoveProductFromBasketMutation();

  const handleRemoval = (_id: string) => {
    setIsLoading(true);
    const payload = {
      _id,
    };
    removeProductFromBasket({ payload })
      .unwrap()
      .then(() => {
        setServerError("");
        setIsLoading(false);
      })
      .catch((err) => {
        setServerError(err.data.error);
        setIsLoading(false);
        setTimeout(() => {
          setServerError("");
        }, 5000);
      });
  };
  const getBg = (value: string) => {
    if (value.toLocaleLowerCase() === "bespoke")
      return "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(204,23,195,0.09147408963585435) 4%, rgba(205,64,138,0.5172443977591037) 25%, rgba(207,136,39,1) 37%, rgba(13,15,25,1) 44%, rgba(32,37,4,1) 45%, rgba(72,84,9,0.4472163865546218) 100%)";
    const color = colorOptions.find((color) => color.name === value);
    return color?.hex || color?.background;
  };

  const getAlreadyWishlisted = () => {
    return wishList?.find(
      (wish) =>
        wish?.product?.productId === item?.productId &&
        wish?.color === item.color
    );
  };
  const alreadyWishlisted = getAlreadyWishlisted();

  const handleAddWishlist = async () => {
    const payload = {
      productId: item?.productId,
      color: item.color,
    };
    addProductToWishList({ payload }).unwrap();
  };
  const removeWishlist = async () => {
    const payload = {
      wish_id: alreadyWishlisted?._id,
    };
    removeProductFromWishList({ payload }).unwrap();
  };
  const handleWishClick = () => {
    if (!item) return;
    if (!item?.productId) return;
    if (alreadyWishlisted) {
      removeWishlist();
    } else {
      handleAddWishlist();
    }
  };

  return (
    <div key={item?.sku} className="flex py-5 last:pb-0">
      <div
        className="relative  w-40 shrink-0 overflow-hidden rounded-xl"
        onClick={() => {
          localStorage.setItem("selectedProductId", item?.productId);
          localStorage.setItem("selectedProductColor", item?.color);
          router.push(
            `/products/${item?.title
              .replace(/ /g, "-")
              .replace(/&/g, "and")
              .replace(/\//g, "-")}-${item.color}`
          );
        }}
      >
        <Image
          src={item?.image || NoPic.src}
          alt={item?.title}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "full",
            height: "7rem",
          }}
          className="w-full object-contain "
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex flex-col gap-2 ">
            <div
              onClick={() => {
                localStorage.setItem("selectedProductId", item?.productId);
                localStorage.setItem("selectedProductColor", item?.color);
                router.push(
                  `/products/${item?.title
                    .replace(/ /g, "-")
                    .replace(/&/g, "and")
                    .replace(/\//g, "-")}-${item.color}`
                );
              }}
            >
              <h3 className="font-medium ">{item.title}</h3>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <label className="md:ml-2 text-sm text-gray-900 dark:text-white items-center inline-flex gap-2 cursor-pointer">
                <div
                  className="w-4 h-4 rounded-full border  border-slate-200"
                  style={{ background: getBg(item.color) }}
                ></div>

                {item.color}
              </label>
              {!isBespoke && (
                <div className="flex items-center gap-3 text-sm">
                  Size : <span className="font-semibold">{item.size}</span>
                </div>
              )}
              {isBespoke && (
                <div className="flex items-center gap-3 text-sm">
                  Size :{" "}
                  <span
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className="font-semibold underline text-info cursor-pointer"
                  >
                    {item.size}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm">
              {item?.discountedAmount && (
                <span className="text-primary font-semibold">
                  {getCurrencySmallSymbol(cart?.currency)}
                  {numberWithCommas(item.discountedAmount)}
                </span>
              )}

              <span
                className={`${
                  item?.discountedAmount
                    ? "line-through text-slate-500 font-semibold"
                    : "text-primary font-semibold"
                }`}
              >
                {getCurrencySmallSymbol(item?.currency)}
                {numberWithCommas(item.originalAmount)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full items-end justify-between text-sm">
          <div className="flex items-center gap-3">
            <LikeButton
              isLiked={!!alreadyWishlisted}
              onClick={handleWishClick}
            />
            <AiOutlineDelete
              onClick={() => handleRemoval(item._id)}
              className="text-2xl cursor-pointer"
            />
          </div>
          <div>
            <CartInputNumber
              value={item.quantity}
              setServerError={setServerError}
              _id={item._id}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
      </div>
      {isBespoke && item.bodyMeasurements && openModal && (
        <AddBodyMeasurementsSize
          openModal={openModal}
          setOpenModal={setOpenModal}
          productId={item.productId}
          selectedMaterialColor={item.bespokeColor}
          bodyMeasurements={bodyMeasurements}
          setBodyMeasurements={setBodyMeasurements}
          sku={item.sku}
          _id={item._id}
          mode="update"
          defaultBespokeInstruction={item.bespokeInstruction || ""}
        />
      )}
    </div>
  );
};

export default CartItem;
