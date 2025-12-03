import { useState } from "react";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import LoadingDots from "@/app/LoadingDots";
import { Alert } from "flowbite-react";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [addToNewsletter, addToNewsletterStatus] =
    zeapApiSlice.useAddToNewsletterMutation();
  const isLoading = addToNewsletterStatus.isLoading;

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubscribe = () => {
    if (!email) {
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    const payload = {
      email,
    };
    addToNewsletter({ payload })
      .unwrap()
      .then(() => {
        setSuccessMessage("Thank you for subscribing!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
        setEmail("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="space-y-5">
      <h1
        className="text-4xl font-semibold md:text-[80px]"
        style={{ lineHeight: "1em" }}
      >
        Newsletter
      </h1>
      <p className="w-[80%] text-sm text-neutral-200">
        Get the latest news about us. Never miss a single promotion or discount.
      </p>
      {successMessage ? (
        <Alert color="success">{successMessage}</Alert>
      ) : (
        <div className="flex items-center rounded-full border border-neutral-500">
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sizeClass="h-12 px-4 py-3"
            rounded="rounded-none"
            className="border-transparent bg-transparent placeholder:text-sm
           placeholder:text-neutral-200 focus:border-transparent"
            placeholder="Your email"
          />
          {isLoading ? (
            <LoadingDots />
          ) : (
            <ButtonPrimary onClick={handleSubscribe}>SUBSCRIBE</ButtonPrimary>
          )}
        </div>
      )}
      {emailError && <p className="text-sm text-red-500">{emailError}</p>}
    </div>
  );
};

export default Subscribe;
