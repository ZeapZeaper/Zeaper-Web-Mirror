"use client";
import _ from "lodash";
import { Alert, Label, Modal, TextInput, Checkbox } from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";

import { HiInformationCircle } from "react-icons/hi";

import { ShopInterface, SocialInterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "../loading/Loading";
import CountrySelector from "@/shared/Select/CountrySelector";
import { ThemeContext } from "@/contexts/themeContext";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { AuthContext } from "@/contexts/authContext";
import ShopSuccessModal from "./ShopSuccessModal";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const inputTheme = {
  field: {
    input: {
      colors: {
        primary:
          "border-secondary  text-dark placeholder-secondary focus:border-secondary focus:ring-secondary dark:bg-secondary dark:border-secondary dark:focus:border-secondary dark:focus:ring-secondary",
      },
    },
  },
};
const checkBoxTheme = {
  root: {
    base: "h-4 w-4 rounded border border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700",
    color: {
      primary:
        "text-secondary focus:ring-secondary dark:ring-offset-secondary dark:focus:ring-secondary border-secondary",
    },
  },
};

export function AddShop({
  openModal,
  setOpenModal,
  mode = "create",
  shop,
  setAddNewShop,
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  mode?: "create" | "edit";
  shop?: ShopInterface;
  setAddNewShop?: (value: boolean) => void;
}) {
  const { user, setUser } = useContext(AuthContext);
  const topRef = useRef<HTMLDivElement>(null);
  const { setDimBackground } = useContext(ThemeContext);
  const [showOrderSuccessModal, setShowOrderSuccessModal] =
    useState<boolean>(false);
  const [shopName, setShopName] = useState<string>("");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [isTailor, setIsTailor] = useState<boolean>(false);
  const [isShoeMaker, setIsShoeMaker] = useState<boolean>(false);
  const [social, setSocial] = useState<SocialInterface>({
    website: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    tikTok: "",
  });

  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phoneNumber || ""
  );
  const [address, setAddress] = useState<string>("");
  const [region, setRegion] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [error, setError] = useState<string>("");
  const [createShop, createShopStatus] = zeapApiSlice.useCreateShopMutation();
  const [editShop, editShopStatus] = zeapApiSlice.useUpdateShopMutation();
  const [triggerGetAuthUser] = zeapApiSlice.useLazyGetAuthUserQuery();
  const isLoading = createShopStatus.isLoading || editShopStatus.isLoading;

  useEffect(() => {
    setDimBackground(openModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  useEffect(() => {
    if (shop) {
      setShopName(shop?.shopName);
      setEmail(shop?.email || "");
      setPhoneNumber(shop?.phoneNumber);
      setAddress(shop?.address);
      setRegion(shop?.region);
      setCountry(shop?.country);
      setSocial(shop?.social || {});
      setIsTailor(shop?.isTailor || false);
      setIsShoeMaker(shop?.isShoeMaker || false);
      if (setAddNewShop) setAddNewShop(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop]);

  function onCloseModal() {
    setOpenModal(false);
  }

  const validateForm = () => {
    console.log("shopName", shopName);
    // if (!shopName) {
    //   setError("Please enter your business name");
    //   return false;
    // }
    if (!email) {
      setError("Please enter your email");
      return false;
    }
    if (!phoneNumber) {
      setError("Please enter your phone number");
      return false;
    }
    if (!address) {
      setError("Please enter your address");
      return false;
    }
    if (!region) {
      setError("Please select your region");
      return false;
    }
    if (!country) {
      setError("Please select your country");
      return false;
    }
    return true;
  };
  // call handle save on enter key
  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === "Enter") {
  //       event.preventDefault();
  //       handleSave();
  //     }
  //   };
  //   if (openModal) {
  //     window.addEventListener("keydown", handleKeyDown);
  //   }
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [openModal]);

  const handleSave = async () => {
    setError("");

    if (!validateForm()) {
      // scroll to top
      if (topRef.current) {
        topRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
      return;
    }
    let payload;
    if (mode === "create") {
      payload = {
        shopName,
        email,
        phoneNumber,
        address,
        region,
        country,
        social,
        isTailor,
        isShoeMaker,
      };

      await createShop({ payload })
        .unwrap()
        .then(async () => {
          setShopName("");
          const uid = user?.uid;

          const response = await triggerGetAuthUser({ uid });

          const userData = response?.data?.data;

          if (userData) {
            setDimBackground(false);

            setUser(userData);
            if (setAddNewShop) setAddNewShop(false);

            setShowOrderSuccessModal(true);
          }
        })
        .catch((err) => {
          setError(err?.data?.error);
        });
    } else {
      payload = {
        ...(address !== shop?.address && { address }),
        ...(phoneNumber !== shop?.phoneNumber && { phoneNumber }),
        ...(email !== shop?.email && { email }),
        ...(region !== shop?.region && { region }),
        ...(country !== shop?.country && { country }),
        ...(_.isEqual(social, shop?.social)
          ? {}
          : { social: JSON.stringify(social) }),
        ...(isTailor !== shop?.isTailor && { isTailor }),
        ...(isShoeMaker !== shop?.isShoeMaker && { isShoeMaker }),
        shopId: shop?.shopId,
        ...(shopName !== shop?.shopName && { shopName }),
      };
      editShop({ payload })
        .unwrap()
        .then(() => {
          setDimBackground(false);
          if (setAddNewShop) setAddNewShop(false);
          setOpenModal(false);
        })
        .catch((err) => {
          setError(err?.data?.error);
        });
    }
  };
  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          {isLoading && <Loading />}
          <div className="space-y-6">
            <h3
              ref={topRef}
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              {mode === "create" ? "Join Zeaper" : "Edit Shop Details"}
            </h3>
            <div>
              {error && (
                <Alert
                  color="failure"
                  icon={HiInformationCircle}
                  className="my-4"
                >
                  {error}
                </Alert>
              )}

              <div className="mb-4">
                <div className="mb-2 block">
                  <Label value="Business Name" />
                </div>
                <TextInput
                  theme={inputTheme}
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  type="text"
                  required
                  shadow
                  color="primary"
                />
              </div>
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-2">
                  <Checkbox
                    theme={checkBoxTheme}
                    color={isTailor ? "success" : "primary"}
                    checked={isTailor}
                    onChange={(e) => setIsTailor(e.target.checked)}
                  />
                  <Label value="Are you a Tailor?" />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Checkbox
                    checked={isShoeMaker}
                    onChange={(e) => setIsShoeMaker(e.target.checked)}
                    theme={checkBoxTheme}
                    color={isShoeMaker ? "success" : "primary"}
                  />
                  <Label value="Are you a Shoe Maker?" />
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-2 block">
                  <Label value="Business Email" />
                </div>
                <TextInput
                  theme={inputTheme}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  shadow
                  color="primary"
                />
              </div>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label value="Business Phone Number" />
                </div>

                <PhoneInput
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value || "")}
                  numberInputProps={{
                    className:
                      "w-full h-12 border border-secondary rounded-md p-2",
                  }}
                  international
                  placeholder="Enter phone number"
                  required
                />

                {/* <TextInput
                  theme={inputTheme}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  required
                  shadow
                  color="primary"
                /> */}
              </div>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label value=" Business Address" />
                </div>
                <TextInput
                  theme={inputTheme}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  required
                  shadow
                  color="primary"
                />
              </div>
              <CountrySelector
                country={country || ""}
                setCountry={setCountry}
                region={region || ""}
                setRegion={setRegion}
              />
              <div>
                <div className="mb-2 block">
                  <Label value="Website" />
                </div>
                <TextInput
                  theme={inputTheme}
                  value={social?.website}
                  onChange={(e) =>
                    setSocial({ ...social, website: e.target.value })
                  }
                  type="text"
                  required
                  shadow
                  color="primary"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Facebook" />
                </div>
                <TextInput
                  theme={inputTheme}
                  value={social?.facebook}
                  onChange={(e) =>
                    setSocial({ ...social, facebook: e.target.value })
                  }
                  type="text"
                  required
                  shadow
                  color="primary"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Instagram" />
                </div>
                <TextInput
                  theme={inputTheme}
                  value={social?.instagram}
                  onChange={(e) =>
                    setSocial({ ...social, instagram: e.target.value })
                  }
                  type="text"
                  required
                  shadow
                  color="primary"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Twitter" />
                </div>
                <TextInput
                  theme={inputTheme}
                  value={social?.twitter}
                  onChange={(e) =>
                    setSocial({ ...social, twitter: e.target.value })
                  }
                  type="text"
                  required
                  shadow
                  color="primary"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Linkedin" />
                </div>
                <TextInput
                  theme={inputTheme}
                  value={social?.linkedin}
                  onChange={(e) =>
                    setSocial({ ...social, linkedin: e.target.value })
                  }
                  type="text"
                  required
                  shadow
                  color="primary"
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label value="tikTok" />
                </div>
                <TextInput
                  theme={inputTheme}
                  value={social?.tikTok}
                  onChange={(e) =>
                    setSocial({ ...social, tikTok: e.target.value })
                  }
                  type="text"
                  required
                  shadow
                  color="primary"
                />
              </div>

              <div className="w-full my-4 mt-6">
                <ButtonPrimary className="w-full" onClick={handleSave}>
                  {mode === "create" ? "Join" : "Save Changes"}
                </ButtonPrimary>
              </div>
            </div>
          </div>
          {showOrderSuccessModal && (
            <ShopSuccessModal
              showShopSuccessModal={showOrderSuccessModal}
              setShowShopSuccessModal={setShowOrderSuccessModal}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
