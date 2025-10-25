import { DeliveryAddressInterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import FormItem from "@/shared/FormItem";
import Input from "@/shared/Input/Input";
import { Alert, Modal, ModalBody, ModalHeader, Select } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import { CountryRegionData } from "react-country-region-selector";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import LoadingDots from "@/components/loading/LoadingDots";

const ModalTheme = {
  root: {
    base: "fixed inset-x-0-[20%] top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900/50 dark:bg-gray-900/80",
      off: "hidden",
    },
    sizes: {
      lg: "w-[100vw] md:max-w-xl ",
    },
  },
  content: {
    base: "relative  w-full md:p-4 md:h-auto",
    inner:
      "relative flex h-[100vh] md:h-full md:max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
};

const AddNewDeliveryAddress = ({
  addNewMode,
  setAddNewMode,
  selectedDeliveryAddress,
  setDimBackground,
}: {
  addNewMode: boolean;
  setAddNewMode: (value: boolean) => void;
  selectedDeliveryAddress?: DeliveryAddressInterface;
  setDimBackground: (value: boolean) => void;
}) => {
  
  const [serverError, setServerError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [postCode, setPostCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [regionFields, setRegionFields] = useState<any>();
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    address?: string;
    region?: string;
    country?: string;
    phoneNumber?: string;
  }>({});

  const [addDeliveryAddress, addDeliveryAddressStatus] =
    zeapApiSlice.useAddDeliveryAddressMutation();
  const [updateDeliveryAddress, updateDeliveryAddressStatus] =
    zeapApiSlice.useUpdateDeliveryAddressMutation();
  const isLoading =
    addDeliveryAddressStatus.isLoading || updateDeliveryAddressStatus.isLoading;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const regionsData: any = useMemo(
    () => CountryRegionData.find((data) => data[0] === country),
    [country]
  );

  useEffect(() => {
    if (country) {
      setRegionFields(regionsData);
    }
  }, [country, regionsData]);

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
  }, [selectedDeliveryAddress]);
  const validate = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      address?: string;
      region?: string;
      country?: string;
      phoneNumber?: string;
    } = {};
    if (!firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!address) {
      newErrors.address = "Address is required";
    }
    if (!region) {
      newErrors.region = "Region is required";
    }
    if (!country) {
      newErrors.country = "Country is required";
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddDeliveryAddress = () => {
    if (!validate()) return;
    const address_id = selectedDeliveryAddress?._id;
    const payload = {
      firstName,
      lastName,
      address,
      postCode,
      region,
      country,
      phoneNumber,
      ...(address_id && { address_id }),
    };
    if (selectedDeliveryAddress) {
      updateDeliveryAddress({ payload })
        .unwrap()
        .then(() => {
          setAddNewMode(false);
          setDimBackground(false);
          setFirstName("");
          setLastName("");
          setAddress("");
          setPostCode("");
          setRegion("");
          setCountry("Nigeria");
          setPhoneNumber("");
        })
        .catch((err) => {
          setServerError(err.data.error);
          setTimeout(() => {
            setServerError("");
          }, 5000);
        });
      return;
    }
    addDeliveryAddress({ payload })
      .unwrap()
      .then(() => {
        setAddNewMode(false);
        setDimBackground(false);
        setFirstName("");
        setLastName("");
        setAddress("");
        setPostCode("");
        setRegion("");
        setCountry("Nigeria");
        setPhoneNumber("");
      })
      .catch((err) => {
        setServerError(err.data.error);
        setTimeout(() => {
          setServerError("");
        }, 5000);
      });
  };

  const handleClose = () => {
    setAddNewMode(false);
    setDimBackground(false);
  };

  return (
    <Modal
      theme={ModalTheme}
      show={addNewMode}
      onClose={handleClose}
      size="lg"
      popup
    >
      <ModalHeader>
        {selectedDeliveryAddress
          ? "Update delivery address"
          : "Add new delivery address"}
      </ModalHeader>

      <ModalBody>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <div
              className={`space-y-4 border-t border-neutral-300 px-6 py-7 sm:space-y-6 block`}
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
                    <span className="text-sm text-red-500">
                      {errors.firstName}
                    </span>
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
                    <span className="text-sm text-red-500">
                      {errors.lastName}
                    </span>
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
                    <span className="text-sm text-red-500">
                      {errors.address}
                    </span>
                  )}
                </div>
              </div>

              {/* ============ */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
                <div>
                  <FormItem label="Country *">
                    <Select
                      className={`h-12   border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-gold ${
                        errors.country && !country ? "border-red-500" : ""
                      }`}
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        setRegion("");
                      }}
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="United States">USA</option>
                      <option value="United Kingdom">UK</option>
                      <option value="Canada">Canada</option>
                    </Select>
                  </FormItem>
                  {errors.country && !country && (
                    <span className="text-sm text-red-500">
                      {errors.country}
                    </span>
                  )}
                </div>
                <div>
                  <FormItem label="Region *">
                    <Select
                      className={`h-12   border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-gold ${
                        errors.country && !region ? "border-red-500" : ""
                      }`}
                      value={region}
                      onChange={(e) => {
                        setRegion(e.target.value);
                      }}
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      ></option>
                      {regionFields &&
                        regionFields[2]
                          ?.split("|")
                          ?.map((region: string, index: number) => (
                            <option
                              key={index}
                              value={region}
                              className="text-body dark:text-bodydark"
                            >
                              {" "}
                              {region.split("~")[0]}
                            </option>
                          ))}
                    </Select>
                  </FormItem>
                  {errors.region && !region && (
                    <span className="text-sm text-red-500">
                      {errors.region}
                    </span>
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
                    <PhoneInput
                      value={phoneNumber}
                      onChange={(value) => setPhoneNumber(value || "")}
                      numberInputProps={{
                        className: `border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-gold rounded-lg ${
                          errors.phoneNumber && !phoneNumber
                            ? "border-red-500"
                            : ""
                        }`,
                      }}
                      international
                      placeholder="Enter phone number"
                      required
                    />
                  </FormItem>
                  {errors.phoneNumber && !phoneNumber && (
                    <span className="text-sm text-red-500">
                      {errors.phoneNumber}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 w-full mt-4">
              <button
                type="button"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                onClick={() => {
                  setAddNewMode(false);
                  setDimBackground(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-lg bg-success px-4 py-2 text-sm font-medium text-white hover:bg-success-100"
                onClick={handleAddDeliveryAddress}
              >
                {isLoading ? (
                  <LoadingDots />
                ) : selectedDeliveryAddress ? (
                  "Update delivery address"
                ) : (
                  "Add delivery address"
                )}
              </button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddNewDeliveryAddress;
