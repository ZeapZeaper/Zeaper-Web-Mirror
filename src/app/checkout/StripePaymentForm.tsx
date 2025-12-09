// StripePaymentForm.tsx
import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LoadingDots from "@/components/loading/LoadingDots";
import { Alert } from "flowbite-react";

export default function StripePaymentForm({
  closeStripeModal,
  setShowOrderSuccessModal,
  handleVerifyPayment,
  reference,
  serverError,
  setServerError,
  setIsLoading,
}: {
  showStripeModal: boolean;
  closeStripeModal: () => void;
  setShowOrderSuccessModal: (value: boolean) => void;
  handleVerifyPayment: (reference: string) => void;
  reference: string;
  setServerError: (value: string) => void;
  serverError: string;
  setIsLoading: (value: boolean) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleStripePayment = async () => {
    if (!stripe || !elements) {
      console.log("Stripe.js has not yet loaded.");
      return;
    }

    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // ✅ no redirect, stay inline
    });

    if (error) {
      setServerError(error.message || "An error occurred");
      setIsLoading(false);
      setTimeout(() => setServerError(""), 5000);
      setProcessing(false);
      return;
    }

    // If no error, Stripe may have redirected OR succeeded
    if (paymentIntent && paymentIntent.status === "succeeded") {
      closeStripeModal();
      setShowOrderSuccessModal(true);
      handleVerifyPayment(reference);
      setProcessing(false);
    } else {
      console.log("Unexpected state:", paymentIntent?.status);
      setServerError("An unexpected error occurred.");
      setIsLoading(false);
      setTimeout(() => setServerError(""), 5000);
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 mb-4">
      {serverError && <Alert color="failure">{serverError}</Alert>}
      <PaymentElement />
      <ButtonPrimary
        className="mt-8 w-full"
        onClick={handleStripePayment}
        disabled={processing || !stripe || !elements}
      >
        {processing ? <LoadingDots /> : "Pay Now"}
      </ButtonPrimary>
    </div>
  );
}
