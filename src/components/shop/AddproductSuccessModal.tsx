import { ThemeContext } from "@/contexts/themeContext";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { Alert, Modal, ModalBody } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Image from "next/image";
import SuccessPic from "@/images/success_modal_image.png";
import { ProductInterface } from "@/interface/interface";
import ProductPromo from "../promo/ProductPromo";

const AddproductSuccessModal = ({
  showShopSuccessModal,
  setShowShopSuccessModal,
  product,
}: {
  showShopSuccessModal: boolean;
  setShowShopSuccessModal: (value: boolean) => void;
  product: ProductInterface;
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const router = useRouter();

  useEffect(() => {
    setDimBackground(showShopSuccessModal);
  }, [showShopSuccessModal, setDimBackground]);

  const handleClose = () => {
    setShowShopSuccessModal(false);
    setDimBackground(false);
  };

  return (
    <Modal
      show={showShopSuccessModal}
      onClose={() => {
        handleClose();
        router.push("/");
      }}
    >
      <ModalBody>
        <div className="p-8 bg-grey7 rounded-lg shadow-xl min-h-[90vh] flex flex-col items-center justify-center">
          {/* ✅ Success Image */}
          <Image
            src={SuccessPic}
            alt="Product added successfully"
            className="w-1/2 mx-auto mb-6"
            priority
          />

          {/* ✅ Success Message */}
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            🎉 Congratulations!
          </h2>
          <p className="text-center mt-4 text-gray-700">
            Your product has been successfully added to your shop.
          </p>
          <p className="text-center mt-2 text-gray-700">
            Our team will review it shortly before it goes live.
          </p>
          <p className="text-center mt-2 text-gray-700">
            You can check its status anytime in your shop dashboard.
          </p>

          {/* ✅ Encouragement for Promo */}
          <Alert color="success" className="mt-8 w-full text-center">
            <p className="text-gray-800 font-medium">
              🚀 Want to boost your new product’s visibility?
            </p>
            <p className="text-gray-600 text-sm">
              Join our latest promotional campaign to reach more customers and
              drive early sales!
            </p>
            <div className="mt-4 flex justify-center">
              <ProductPromo productId={product?.productId} hideProductPromoStatus/>
            </div>
          </Alert>

          {/* ✅ Action Buttons */}
          <div className="flex flex-col md:flex-row justify-center mt-8 gap-3 w-full">
            <ButtonPrimary
              onClick={() => {
                handleClose();
                router.push(
                  `/shop/${product?.shopId}/products/product/${product?.productId.replaceAll("/", "-")}`
                );
              }}
              className="w-full rounded-lg h-[3rem]"
            >
              View Product
            </ButtonPrimary>

            <ButtonSecondary
              onClick={() => {
                handleClose();
                router.push("/shop");
              }}
              className="w-full rounded-lg h-[3rem] bg-secondary text-white"
            >
              Go to Shop
            </ButtonSecondary>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddproductSuccessModal;
