// StripePaymentFormModal.tsx
import React, { useContext, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { ThemeContext } from "@/contexts/themeContext";
import StripePaymentForm from "./StripePaymentForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function StripePaymentFormModal({
  clientSecret,
  showStripeModal,
  closeStripeModal,
  serverError,
  setServerError,
  setShowOrderSuccessModal,
  handleVerifyPayment,
  reference,
  setIsLoading,
}: {
  clientSecret: string;
  showStripeModal: boolean;
  closeStripeModal: () => void;
  setShowOrderSuccessModal: (value: boolean) => void;
  handleVerifyPayment: (reference: string) => void;
  reference: string;
  setServerError: (value: string) => void;
  serverError: string;
  setIsLoading: (value: boolean) => void;
}) {
  const { setDimBackground } = useContext(ThemeContext);

  const closeModal = () => {
    setDimBackground(false);
    closeStripeModal();
  };

  useEffect(() => {
    setDimBackground(showStripeModal && clientSecret !== "");
  }, [showStripeModal, clientSecret, setDimBackground]);

  return (
    <Modal show={showStripeModal} onClose={closeModal}>
      <ModalHeader>Complete Payment</ModalHeader>
      <ModalBody>
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripePaymentForm
              showStripeModal={showStripeModal}
              closeStripeModal={closeStripeModal}
              setShowOrderSuccessModal={setShowOrderSuccessModal}
              handleVerifyPayment={handleVerifyPayment}
              reference={reference}
              serverError={serverError}
              setServerError={setServerError}
              setIsLoading={setIsLoading}
            />
          </Elements>
        )}
      </ModalBody>
    </Modal>
  );
}
