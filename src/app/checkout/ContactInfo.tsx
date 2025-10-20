import type { FC } from "react";
import React, { useContext, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Checkbox from "@/shared/Checkbox/Checkbox";
import FormItem from "@/shared/FormItem";
import Input from "@/shared/Input/Input";
import { AuthContext } from "@/contexts/authContext";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Alert } from "flowbite-react";
import LoadingDots from "@/components/loading/LoadingDots";

interface Props {
  isActive: boolean;
  onOpenActive: () => void;
  onCloseActive: () => void;
  email: string;
  setEmail: (value: string) => void;
  acceptMarketing: boolean;
  setAcceptMarketing: (value: boolean) => void;
}

const ContactInfo: FC<Props> = ({
  isActive,
  onCloseActive,
  onOpenActive,
  email,
  setEmail,
  acceptMarketing,
  setAcceptMarketing,
}) => {
  const { user } = useContext(AuthContext);
  const [serverError, setServerError] = useState("");
  const [inputError, setInputError] = useState("");
  const [updateUser, updateUserStatus] = zeapApiSlice.useUpdateUserMutation();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleUpdateUser = () => {
    if (!validateEmail(email)) {
      setInputError("Invalid email address");
      return;
    }
    setInputError("");
    const payload = {
      email,
      acceptMarketing,
      _id: user?._id,
    };
    updateUser({ payload })
      .unwrap()
      .then(() => {
        onCloseActive();
      })
      .catch((err) => {
        setServerError(err.data.error);
        setTimeout(() => {
          setServerError("");
        }, 5000);
      });
  };

  return (
    <div className="z-0 overflow-hidden rounded-xl border border-neutral-300">
      {user?.isGuest && (
        <span className="flex justify-end px-4 underline cursor-pointer">
          Log in
        </span>
      )}
      <div className="flex flex-col items-start p-6 sm:flex-row ">
        <span className="hidden sm:block">
          <FaRegCircleUser className="text-3xl text-gold" />
        </span>
        <div className="flex w-full items-center justify-between">
          <div className="sm:ml-8">
            <div className="uppercase tracking-tight font-bold ">CONTACT</div>
            {serverError && <Alert color="failure">{serverError}</Alert>}
            <div className="mt-1 text-sm">
              <span className="">{email}</span>
              {/* <span className="ml-3 tracking-tighter">{email}</span> */}
            </div>
          </div>
          <ButtonPrimary
            className="border-2 border-gold bg-transparent text-gold"
            textClassName="text-gold"
            sizeClass="px-4 py-2"
            onClick={() => onOpenActive()}
          >
            Edit
          </ButtonPrimary>
        </div>
      </div>
      <div
        className={`space-y-4 border-t border-neutral-300 px-6 py-7 sm:space-y-6 ${
          isActive ? "block" : "hidden"
        }`}
      >
        {/* <h3 className="text-lg font-semibold">Contact infomation</h3> */}

        <div className="max-w-lg">
          <FormItem label="Email address *">
            <Input
              rounded="rounded-lg"
              sizeClass="h-12 px-4 py-3"
              className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-gold ${
                inputError && !email ? "border-red-500" : ""
              }`}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              readOnly={!user?.isGuest}
              disabled={!user?.isGuest}
              required
            />
          </FormItem>
          {inputError && !email && (
            <p className="text-red-500 text-sm m-2">{inputError}</p>
          )}
        </div>
        <div>
          <Checkbox
            className="!text-sm"
            name="uudai"
            label="Email me news and offers"
            checked={acceptMarketing as boolean}
            onChange={(checked: boolean) => setAcceptMarketing(checked)}
          />
        </div>

        {/* ============ */}
        <div className="flex flex-col pt-6 sm:flex-row">
          <ButtonPrimary
            className="shadow-none sm:!px-7"
            onClick={handleUpdateUser}
          >
            {updateUserStatus?.isLoading ? (
              <LoadingDots />
            ) : (
              "Save and go to Shipping"
            )}
          </ButtonPrimary>
          <ButtonSecondary
            className="mt-3 sm:ml-3 sm:mt-0"
            onClick={() => onCloseActive()}
          >
            Cancel
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
