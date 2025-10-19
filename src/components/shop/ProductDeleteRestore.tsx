import { useState } from "react";
import { Alert, Button, Modal } from "flowbite-react";
import {
  HiInformationCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { ProductInterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "../loading/Loading";

const ProductDeleteRestore = ({
  close,
  open,
  mode = "disable",
  product,
}: {
  close: (open: boolean) => void;
  open: boolean;
  mode?: "disable" | "enable";
  product: ProductInterface;
}) => {
  const [disableProduct, diableProductStatus] =
    zeapApiSlice.useDisableProductMutation();
  const [enableProduct, enableProductStatus] =
    zeapApiSlice.useEnableProductMutation();
  const isLoading =
    diableProductStatus.isLoading || enableProductStatus.isLoading;
  const [error, setError] = useState<string | null>(null);

  const disable = () => {
    const payload = {
      productIds: [product.productId],
    };

    disableProduct({ payload })
      .unwrap()
      .then(() => {
        close(false);
      })
      .catch((err) => {
        console.log("err", err);
        setError(err.data.error);
      });
  };

  const enable = () => {
    const payload = {
      productIds: [product.productId],
    };

    enableProduct({ payload })
      .unwrap()
      .then(() => {
        close(false);
      })
      .catch((err) => {
        console.log("err", err);
        setError(err.data.error);
      });
  };

  return (
    <>
      <Modal show={open} size="md" onClose={() => close(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {isLoading && <Loading />}
            {error && (
              <Alert
                color="failure"
                icon={HiInformationCircle}
                className="my-4"
              >
                {error}
              </Alert>
            )}
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400 " />

            {mode === "disable" && (
              <h3 className="mb-5 text-sm text-red-500 ">
                Are you sure you want to delete <br />
                <span className="font-semibold text-gray-900 text-italic">
                  {product.title}
                </span>{" "}
              </h3>
            )}
            {mode === "disable" && (
              <p className="mb-5 text-sm text-red-500 ">
                This action will remove the product from your shop and cannot be
                undone.
              </p>
            )}
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={mode === "disable" ? disable : enable}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => close(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductDeleteRestore;
