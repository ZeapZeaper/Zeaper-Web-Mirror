"use client";

import type { FC } from "react";
import React, { useContext, useEffect, useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";

import FormItem from "@/shared/FormItem";
import Input from "@/shared/Input/Input";
// import Radio from '@/shared/Radio/Radio';
import Select from "@/shared/Select/Select";
import ExistingShippingAddress from "./ExistingShippingAddress";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { AuthContext } from "@/contexts/authContext";
import { Alert } from "flowbite-react";
import { ThemeContext } from "@/contexts/themeContext";
import { globalSelectors } from "@/redux/services/global.slice";
import { useSelector } from "react-redux";
import { DeliveryAddressInterface } from "@/interface/interface";

interface Props {
  isActive: boolean;
  onCloseActive: () => void;
  onOpenActive: () => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  postCode: string;
  setPostCode: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  errors: {
    firstName?: string;
    lastName?: string;
    address?: string;
    region?: string;
    country?: string;
    phoneNumber?: string;
  };
  validateShipping: () => boolean;
}

const ShippingAddress: FC<Props> = ({
  isActive,
  // onCloseActive,
  onOpenActive,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  address,
  setAddress,
  postCode,
  setPostCode,
  region,
  setRegion,
  country,
  setCountry,
  phoneNumber,
  setPhoneNumber,
  errors,
  validateShipping,
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const token = useSelector(globalSelectors.selectAuthToken);
  const { user } = useContext(AuthContext);
  const [serverError, setServerError] = useState("");
  const [saveForNextTime, setSaveForNextTime] = useState(false);
  const user_id = user?._id;
  const getDeliveryAddressesQuery = zeapApiSlice.useGetDeliveryAddressesQuery(
    { user_id },
    { skip: !token || !user_id }
  );

  const deliveryAddresses = getDeliveryAddressesQuery?.data?.data || [];
  const [addDeliveryAddress] = zeapApiSlice.useAddDeliveryAddressMutation();

  const [openExistingShippingAddress, setOpenExistingShippingAddress] =
    useState(false);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] =
    useState<DeliveryAddressInterface | null>(null);

  useEffect(() => {
    if (selectedDeliveryAddress) {
      setFirstName(selectedDeliveryAddress.firstName);
      setLastName(selectedDeliveryAddress.lastName);
      setAddress(selectedDeliveryAddress.address);
      setPostCode(selectedDeliveryAddress.postCode);
      setRegion(selectedDeliveryAddress.region);
      setCountry(selectedDeliveryAddress.country);
      setPhoneNumber(selectedDeliveryAddress.phoneNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDeliveryAddress]);

  const handleAddDeliveryAddress = () => {
    if (!validateShipping()) return;
    const payload = {
      firstName,
      lastName,
      address,
      postCode,
      region,
      country,
      phoneNumber,
    };
    addDeliveryAddress({ payload })
      .unwrap()
      .then(() => {
        setSaveForNextTime(true);
      })
      .catch((err) => {
        setServerError(err.data.error);
        setTimeout(() => {
          setServerError("");
        }, 5000);
      });
  };
  useEffect(() => {
    const defaultAddress = deliveryAddresses.find(
      (address: DeliveryAddressInterface) => address.isDefault === true
    );
    if (defaultAddress) {
      setFirstName(defaultAddress.firstName);
      setLastName(defaultAddress.lastName);
      setAddress(defaultAddress.address);
      setPostCode(defaultAddress.postCode);
      setRegion(defaultAddress.region);
      setCountry(defaultAddress.country);
      setPhoneNumber(defaultAddress.phoneNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryAddresses]);

  return (
    <div
      className={`rounded-xl border border-neutral-300 ${
        isActive ? "" : "opacity-50"
      }`}
    >
      {deliveryAddresses?.length > 0 && (
        <div
          className="flex justify-end px-4 underline cursor-pointer"
          onClick={() => {
            setOpenExistingShippingAddress(true);
            setDimBackground(true);
          }}
        >
          Select existing delivery address
        </div>
      )}

      <div className="flex flex-col items-start p-6 sm:flex-row">
        <span className="hidden sm:block">
          <TbTruckDelivery className="text-3xl text-gold" />
        </span>

        <div className="flex w-full items-center justify-between">
          <div className="sm:ml-8">
            <span className="uppercase font-semibold">DELIVERY ADDRESS</span>
            <div className="mt-1 text-sm">
              <span className="">
                {address} {region ? region + "," : ""} {country}
              </span>
            </div>
          </div>
          <ButtonPrimary
            className="border-2 border-gold bg-transparent text-gold"
            textClassName="text-gold"
            sizeClass="px-4 py-2"
            onClick={() => onOpenActive()}
            disabled={!isActive}
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
        {serverError && <Alert color="failure">{serverError}</Alert>}
        {/* ============ */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
          <div>
            <FormItem label="First name *">
              <Input
                rounded="rounded-lg"
                sizeClass="h-12 px-4 py-3"
                className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-gold ${
                  errors.firstName && !firstName ? "border-red-500" : ""
                }`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormItem>
            {errors.firstName && !firstName && (
              <span className="text-sm text-red-500">{errors.firstName}</span>
            )}
          </div>
          <div>
            <FormItem label="Last name *">
              <Input
                rounded="rounded-lg"
                sizeClass="h-12 px-4 py-3"
                className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-gold ${
                  errors.lastName && !lastName ? "border-red-500" : ""
                }`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormItem>
            {errors.lastName && !lastName && (
              <span className="text-sm text-red-500">{errors.lastName}</span>
            )}
          </div>
        </div>

        {/* ============ */}
        <div className="space-y-4 sm:flex sm:space-x-3 sm:space-y-0">
          <div className="flex-1">
            <FormItem label="Address *">
              <Input
                rounded="rounded-lg"
                sizeClass="h-12 px-4 py-3"
                className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-gold ${
                  errors.address && !address ? "border-red-500" : ""
                }`}
                placeholder=""
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
              />
            </FormItem>
            {errors.address && !address && (
              <span className="text-sm text-red-500">{errors.address}</span>
            )}
          </div>
        </div>

        {/* ============ */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
          <div>
            <FormItem label="Region *">
              <Input
                rounded="rounded-lg"
                sizeClass="h-12 px-4 py-3"
                className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-gold ${
                  errors.region && !region ? "border-red-500" : ""
                }`}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </FormItem>
            {errors.region && !region && (
              <span className="text-sm text-red-500">{errors.region}</span>
            )}
          </div>
          <div>
            <FormItem label="Country *">
              <Select
                sizeClass="h-12 px-4 py-3"
                className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-gold ${
                  errors.country && !country ? "border-red-500" : ""
                }`}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="Nigeria">Nigeria</option>
                <option value="United States">USA</option>
                <option value="United Kingdom">UK</option>
                <option value="Canada">Canada</option>
              </Select>
            </FormItem>
            {errors.country && !country && (
              <span className="text-sm text-red-500">{errors.country}</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
          <div>
            <FormItem label="Postal code">
              <Input
                rounded="rounded-lg"
                sizeClass="h-12 px-4 py-3"
                className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-gold"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
              />
            </FormItem>
          </div>
          <div>
            <FormItem label="Phone number *">
              <Input
                rounded="rounded-lg"
                sizeClass="h-12 px-4 py-3"
                className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-gold ${
                  errors.phoneNumber && !phoneNumber ? "border-red-500" : ""
                }`}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormItem>
            {errors.phoneNumber && !phoneNumber && (
              <span className="text-sm text-red-500">{errors.phoneNumber}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1  mb-5">
          <div className="flex gap-2">
            <label
              className={`inline-flex items-center cursor-pointer ${
                user?.isGuest && "opacity-60"
              }`}
            >
              <input
                className="peer sr-only"
                type="checkbox"
                id="saveForNextTime"
                name="saveForNextTime"
                checked={saveForNextTime}
                disabled={user?.isGuest}
                onChange={handleAddDeliveryAddress}
              />

              <div className="relative w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Save this delivery details for next time (optional)
              </span>
            </label>
          </div>
          {user?.isGuest && (
            <span className="text-blue-400 text-xs">
              You need to login to save delivery details for next time
            </span>
          )}
        </div>
      </div>

      {/* ============ */}
      {/* <div className="px-6">
        <FormItem label="Address type">
          <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
            <Radio
              label="Home(All Day Delivery)"
              id="Address-type-home"
              name="Address-type"
              defaultChecked
            />
            <Radio
              label="Office(Delivery 9 AM - 5 PM)"
              id="Address-type-office"
              name="Address-type"
            />
          </div>
        </FormItem>
      </div> */}
      {openExistingShippingAddress && (
        <ExistingShippingAddress
          setDimBackground={setDimBackground}
          setOpenExistingShippingAddress={setOpenExistingShippingAddress}
          openExistingShippingAddress={openExistingShippingAddress}
          deliveryAddresses={deliveryAddresses}
          setSelectedDeliveryAddress={setSelectedDeliveryAddress}
        />
      )}

      {/* ============ */}
      <div className="flex flex-col p-6 sm:flex-row">
        {/* <ButtonPrimary
          className="shadow-none sm:!px-7"
          disabled={!isActive}
          onClick={handleAddDeliveryAddress}
        >
          {addDeliveryAddressStatus?.isLoading ? (
            <LoadingDots />
          ) : (
            "Save and go to Payment"
          )}
        </ButtonPrimary> */}
        {/* <ButtonSecondary
          className="mt-3 sm:ml-3 sm:mt-0"
          onClick={onCloseActive}
        >
          Cancel
        </ButtonSecondary> */}
      </div>
    </div>
  );
};

export default ShippingAddress;
