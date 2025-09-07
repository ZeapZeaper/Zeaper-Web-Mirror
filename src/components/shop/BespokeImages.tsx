"use client"
import { ThemeContext } from "@/contexts/themeContext";
import { ProductInterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Alert, Badge, Button, Label } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import Loading from "../loading/Loading";
import Image from "next/image";
import AddImageToColor from "./AddImageToColor";
import DeleteProductColor from "./DeleteProductColor";

const BadgeThem = {
  root: {
    base: "flex h-fit w-fit items-center gap-1 font-semibold cursor-pointer",
    color: {
      primary:
        "border border-darkGold text-black dark:text-white  hover:bg-gold hover:text-black ",
    },

    size: {
      xxs: "p-1 text-[0.6rem]",
    },
  },
};

const BespokeImages = ({ product }: { product: ProductInterface }) => {
  const images = product?.colors?.map((color) => color.images).flat();
  const currColor = product?.colors?.find(
    (color) => color.value.toLocaleLowerCase() === "bespoke"
  );
  const { setDimBackground } = useContext(ThemeContext);

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [error, setError] = useState("");

  const [setAsDefault, setAsDefaultStatus] =
    zeapApiSlice.useSetProductImageAsDefaultMutation();
  const [deleteProductImage, deleteProductImageStatus] =
    zeapApiSlice.useDeleteProductImageMutation();
  const isLoading =
    setAsDefaultStatus.isLoading || deleteProductImageStatus.isLoading;
  useEffect(
    () => {
      setDimBackground(openModal);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openModal]
  );
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <div className="">
      {isLoading && <Loading />}
      {images?.length === 0 && (
        <Alert color="info" className="col-span-2">
          No images found for this product. You can start by adding one below
        </Alert>
      )}

      <div className="p-2">
        {error && (
          <Alert color="failure" className="mb-4">
            {error}
          </Alert>
        )}

        {images?.length > 0 && (
          <div className="mb-2 block">
            <Label value="Selected Images" />
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-2">
          {images?.map((image, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 items-center justify-center"
            >
              <div className="relative   my-2 p-2">
                <Image
                  key={index}
                  src={image?.link}
                  alt={image?.name}
                  width={100}
                  height={100}
                  className="w-full h-50 object-contain"
                />
                <button
                  onClick={() => {
                    const payload = {
                      productId: product?.productId,
                      color: "Bespoke",
                      imageName: image?.name,
                    };
                    deleteProductImage({ payload })
                      .unwrap()
                      .then()
                      .catch((err) => {
                        setError(err?.data?.error);
                      });
                  }}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <Badge
                theme={BadgeThem}
                onClick={
                  image?.isDefault
                    ? () => {}
                    : () => {
                        const payload = {
                          productId: product?.productId,
                          color: "Bespoke",
                          imageName: image?.name,
                        };
                        setAsDefault({ payload })
                          .unwrap()
                          .then()
                          .catch((err) => {
                            setError(err?.data?.error);
                          });
                      }
                }
                color={image?.isDefault ? "success" : "primary"}
                size="xxs"
              >
                {image?.isDefault ? "Default" : "Set Default"}
              </Badge>
            </div>
          ))}
        </div>
      </div>
      <div className="flex my-4">
        <Button
          size="xs"
          color="primary"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          {/* check if images are added */}
          {images?.length > 0 ? "Add More Images" : "Add Image"}
        </Button>
      </div>
      {openModal && (
        <AddImageToColor
          openModal={openModal}
          productId={product ? product?.productId : ""}
          close={() => {
            setOpenModal(false);
          }}
          title="Add Image"
          currColor={currColor}
          color="Bespoke"
        />
      )}
      {openDeleteModal && (
        <DeleteProductColor
          open={openDeleteModal}
          productId={product ? product?.productId : ""}
          close={() => {
            setDimBackground(false);
            setOpenDeleteModal(false);
          }}
          color={currColor}
        />
      )}
    </div>
  );
};

export default BespokeImages;
