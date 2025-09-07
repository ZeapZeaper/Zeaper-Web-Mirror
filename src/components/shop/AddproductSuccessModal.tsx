import { ThemeContext } from "@/contexts/themeContext";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { Modal, ModalBody } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import SuccessPic from "@/images/success_modal_image.png";
import Image from "next/image";
import { ProductInterface } from "@/interface/interface";

const AddproductSuccessModal = ({
  showShopSuccessModal,
  setShowShopSuccessModal,
  product
}: {
  showShopSuccessModal: boolean;
  setShowShopSuccessModal: (value: boolean) => void;
  product:ProductInterface
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  
  const router = useRouter();

  useEffect(
    () => {
      setDimBackground(showShopSuccessModal);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showShopSuccessModal]
  );
  return (
    <Modal
      show={showShopSuccessModal}
      onClose={() => {
        setShowShopSuccessModal(false);
        setDimBackground(false);
        router.push("/");
      }}
    >
      {/* <ModalHeader /> */}
      <ModalBody>
        <div className="p-8 bg-grey7 rounded-lg shadow-xl min-h-[90vh]">
          <Image src={SuccessPic} alt="success" className="w-1/2 mx-auto" />

          <h2 className="text-2xl font-semibold text-center">Congratulations</h2>
          <p className="text-center mt-4">
            You have successfully added a product to your shop.
          </p>
          <p className="text-center mt-4">
            It will be reviewed by our team before it goes live.
          </p>
          <p className="text-center mt-4">
            Keep an eye on the product status in your shop dashboard.
          </p>
          <div className="flex flex:col md:flex-row justify-center mt-4 gap-2">
            <ButtonPrimary
              onClick={() => {
                setShowShopSuccessModal(false);
                setDimBackground(false);
                router.push(`/shop/${product?.shopId}/products/${product?.productId.replaceAll("/", "-")}`);
              }}
              className="w-full rounded-lg h-[3rem] "
            >
              View Product
            </ButtonPrimary>

            <ButtonSecondary
              onClick={() => {
                setShowShopSuccessModal(false);
                setDimBackground(false);
                router.push("/");
              }}
              className="w-full rounded-lg h-[3rem] bg-secondary text-white"
            >
              Go to Home
            </ButtonSecondary>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddproductSuccessModal;
