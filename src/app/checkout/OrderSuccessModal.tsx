import { ThemeContext } from "@/contexts/themeContext";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { Alert, Modal, ModalBody } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import SuccessPic from "@/images/success_modal_image.png";
import Image from "next/image";
import Reciept from "../../components/orders/Reciept";
import Loading from "../loading";

const OrderSuccessModal = ({
  orderId,
  showOrderSuccessModal,
  setShowOrderSuccessModal,
  serverError,
  isLoading,
  gainedPoints,
}: {
  orderId: string;
  showOrderSuccessModal: boolean;
  setShowOrderSuccessModal: (value: boolean) => void;
  serverError: string;
  isLoading: boolean;
  gainedPoints?: number | null;
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const router = useRouter();
  const [openReciept, setOpenReciept] = useState(false);
  useEffect(
    () => {
      setDimBackground(showOrderSuccessModal);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showOrderSuccessModal]
  );
  return (
    <Modal
      show={showOrderSuccessModal}
      onClose={() => {
        setShowOrderSuccessModal(false);
        setDimBackground(false);
        router.push("/");
      }}
    >
      {/* <ModalHeader /> */}
      <ModalBody>
        {isLoading && <Loading />}
        {isLoading && (
          <div className="w-full text-center font-bold h-[10rem] flex items-center justify-center">
            Placing Order...
          </div>
        )}
        {serverError && <Alert color="failure">{serverError}</Alert>}
        {orderId && (
          <Reciept
            orderId={orderId}
            openReciept={openReciept}
            setOpenReciept={setOpenReciept}
          />
        )}
        {orderId && (
          <div className="p-8 bg-grey7 rounded-lg shadow-xl">
            <Image src={SuccessPic} alt="success" className="w-1/2 mx-auto" />

            <h2 className="text-2xl font-semibold text-center">
              Congratulations
            </h2>
            <p className="text-center mt-4">
              Your order has been placed successfully. Your order ID is{" "}
              <span className="font-semibold text-info">{orderId}</span>
            </p>
            {gainedPoints && (
              <p className="text-center mt-4">
                You have gained{" "}
                <span className="font-semibold">{gainedPoints}</span> points
                from this order.
              </p>
            )}
            <p className="text-center mt-4">
              Take note of your order ID as it might be required for collection.
            </p>
            <div className="flex flex:col md:flex-row justify-center mt-4 gap-2">
              <div className="w-full md:w-1/2">
                <ButtonSecondary
                  onClick={() => {
                    setOpenReciept(true);
                  }}
                  className="w-full rounded-lg h-[3rem] bg-lightSuccess text-primary"
                >
                  View Reciept
                </ButtonSecondary>
              </div>
              <div className="w-full md:w-1/2">
                <ButtonSecondary
                  onClick={() => {
                    setShowOrderSuccessModal(false);
                    setDimBackground(false);
                    router.push("/account/orders");
                  }}
                  className="w-full rounded-lg h-[3rem] text-primary bg-lightGold "
                >
                  View Orders
                </ButtonSecondary>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-4 mx-auto">
              <ButtonPrimary
                onClick={() => {
                  setShowOrderSuccessModal(false);
                  setDimBackground(false);
                  router.push("/");
                }}
                className="w-full rounded-lg h-[3rem]"
              >
                Continue Shopping
              </ButtonPrimary>
            </div>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default OrderSuccessModal;
