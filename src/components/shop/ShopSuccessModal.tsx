import { ThemeContext } from "@/contexts/themeContext";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { Modal, ModalBody } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import SuccessPic from "@/images/success_modal_image.png";
import Image from "next/image";

const ShopSuccessModal = ({
  showShopSuccessModal,
  setShowShopSuccessModal,
  setOpenModal,
}: {
  showShopSuccessModal: boolean;
  setShowShopSuccessModal: (value: boolean) => void;
  setOpenModal?: (value: boolean) => void;
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
        if (setOpenModal) {
          setOpenModal(false);
        }
        router.push("/vendor-onboarding");
        setDimBackground(false);
      }}
    >
      {/* <ModalHeader /> */}
      <ModalBody>
        <div className="p-8 bg-grey7 rounded-lg shadow-xl min-h-[90vh]">
          <Image src={SuccessPic} alt="success" className="w-1/2 mx-auto" />

          <h2 className="text-2xl font-semibold text-center">Hurrah!!!</h2>
          <p className="text-center mt-4">
            Welcome to Zeaper! Your sublime vendor platform for all bespoke and
            ready to wears.
          </p>
          <p className="text-center mt-4">
            We’re excited to have you on board. Your registration has been
            received, and currently being processed.
          </p>
          <p className="text-center mt-4">
            Keep an eye on your email for updates and next steps.
          </p>
          <div className="flex flex:col md:flex-row justify-center mt-4 gap-2">
            <ButtonPrimary
              onClick={() => {
                setShowShopSuccessModal(false);
                setDimBackground(false);
                router.push(`/shop/`);
              }}
              className="w-full rounded-lg h-[3rem] "
            >
              View Shop
            </ButtonPrimary>

            <ButtonSecondary
              onClick={(e) => {
                if (e) {
                  e.preventDefault();
                  e.stopPropagation();
                }

                setShowShopSuccessModal(false);
                setDimBackground(false);
                if (setOpenModal) {
                  setOpenModal(false);
                }
                router.push("/vendor-onboarding");
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

export default ShopSuccessModal;
