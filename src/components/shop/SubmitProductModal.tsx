"use client";
import { useContext, useState } from "react";
import { Alert, Button, Modal } from "flowbite-react";
import {
  HiInformationCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { ThemeContext } from "@/contexts/themeContext";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "../loading/Loading";

import AddproductSuccessModal from "./AddproductSuccessModal";
import { ProductInterface } from "@/interface/interface";

const SubmitProductModal = ({
  close,
  open,
  productId,
}: {
  close: (open: boolean) => void;
  open: boolean;
  productId: string;
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const [showShopSuccessModal, setShowShopSuccessModal] =
    useState<boolean>(false);
  const [submittedProduct, setSubmittedProduct] =
    useState<ProductInterface | null>(null);
 
  const [submitVariation, submitVariationStatus] =
    zeapApiSlice.useSubmitProductMutation();

  const isLoading = submitVariationStatus.isLoading;
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const payload = {
      productId,
    };

    submitVariation({ payload })
      .unwrap()
      .then((data) => {
        setDimBackground(false);
        setShowShopSuccessModal(true);
        console.log("data", data);
        setSubmittedProduct(data.data);
        // router.back();
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
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-info" />
            <div className="flex flex-col mb-4">
              <p className=" text-md font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to submit this product?
              </p>
              <p className="text-xs text-slate-500">
                This will change the status of the product to{" "}
                <span className="text-gray-500">under review</span> and seller
                will not be able to edit the product without contacting the
                admin except for the variation
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={handleSubmit}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => close(false)}>
                No, cancel
              </Button>
            </div>
          </div>
          {showShopSuccessModal && submittedProduct && (
            <AddproductSuccessModal
              showShopSuccessModal={showShopSuccessModal}
              setShowShopSuccessModal={setShowShopSuccessModal}
              product={submittedProduct}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SubmitProductModal;
