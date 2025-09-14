"use client";
import { useState, useEffect, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShopInterface, SocialInterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { ThemeContext } from "@/contexts/themeContext";
import { AuthContext } from "@/contexts/authContext";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import CountrySelector from "@/shared/Select/CountrySelector";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ShopSuccessModal from "./ShopSuccessModal";
import Loading from "../loading/Loading";
import { Checkbox, Dropdown, Label, Modal, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";

const ModalTheme = {
  root: {
    base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900/50 dark:bg-gray-900/80",
      off: "hidden",
    },
    sizes: {
      lg: "w-[100vw] md:max-w-lg",
    },
  },
  content: {
    base: "fixed  w-full md:p-4 md:h-auto",
    inner:
      "relative flex h-[100vh] md:h-full md:max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
};

const inputTheme = {
  field: {
    input: {
      colors: {
        primary:
          "border-darkGold  text-dark placeholder-darkGold focus:border-darkGold focus:ring-darkGold dark:bg-darkGold dark:border-darkGold dark:focus:border-darkGold dark:focus:ring-darkGold",
      },
    },
  },
};

const checkBoxTheme = {
  root: {
    base: "h-4 w-4 rounded border border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700",
    color: {
      primary:
        "text-darkGold focus:ring-darkGold dark:ring-offset-darkGold dark:focus:ring-darkGold border-darkGold",
    },
  },
};
const sourceOptions = [
  { label: "Google", value: "google" },
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "Twitter", value: "twitter" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "TikTok", value: "tiktok" },
  { label: "Friend or Family", value: "friend_or_family" },
  { label: "Other", value: "other" },
];
const steps = [
  {
    label: "Business Info",
    key: "businessInfo",
    header: "Lets Get Your Shop Registered",
  },
  {
    label: "Business Type",
    key: "businessType",
    header: "Lets Get To Know Your Business",
  },
  {
    label: "Contact Info",
    key: "contactInfo",
    header: "How Can We Reach You?",
  },
  {
    label: "Location",
    key: "location",
    header: "Where is Your Business Located?",
  },
  {
    label: "Bank Details",
    key: "bankDetails",
    header: "How Do You Want to Get Paid?",
  },
  {
    label: "Social Links",
    key: "socialLinks",
    header: "Your Social Media Links",
  },

  {
    label: "Policy & Terms",
    key: "policyTerms",
    header: "Vendor Policy & Terms",
  },
  {
    label: "Source",
    key: "source",
    header: "How Did You Hear About Us?",
  },
];

export default function AddShopElegant({
  openModal,
  setOpenModal,
  mode = "create",
  shop,
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  mode?: "create" | "edit";
  shop?: ShopInterface;
}) {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const { setDimBackground } = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [isTailor, setIsTailor] = useState<"yes" | "no" | "">("");

  const [isShoeMaker, setIsShoeMaker] = useState<"yes" | "no" | "">("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [social, setSocial] = useState<SocialInterface>({
    website: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    tikTok: "",
  });
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    bankName: "",
    accountName: "",
  });
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [source, setSource] = useState("");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [createShop, createShopStatus] = zeapApiSlice.useCreateShopMutation();
  const [editShop, editShopStatus] = zeapApiSlice.useUpdateShopMutation();
  const [triggerGetAuthUser] = zeapApiSlice.useLazyGetAuthUserQuery();
  const getSellerPolicyQuery = zeapApiSlice.useGetSellerPolicyQuery({});
  const sellerPolicy: {
    link: string;
    name: string;
  }[] = getSellerPolicyQuery?.data?.data;
  const isLoading = createShopStatus.isLoading || editShopStatus.isLoading;

  useEffect(() => {
    setDimBackground(openModal);
  }, [openModal, setDimBackground]);

  useEffect(() => {
    if (shop) {
      setShopName(shop.shopName || "");
      setEmail(shop.email || "");
      setPhoneNumber(shop.phoneNumber || "");
      setAddress(shop.address || "");
      setRegion(shop.region);
      setCountry(shop.country);
      setSocial(shop.social || {});
      setIsTailor(shop.isTailor ? "yes" : "no");
      setIsShoeMaker(shop.isShoeMaker ? "yes" : "no");
      setSource(shop.source || "");
      setAcceptedPolicy(true);
      setBankDetails(
        shop.bankDetails || { accountNumber: "", bankName: "", accountName: "" }
      );
    }
  }, [shop]);

  const onCloseModal = () => {
    setOpenModal(false);
    router.push("/vendor-onboarding");
    setCurrentStep(0);
    setError("");
  };

  const validateStep = () => {
    switch (currentStep) {
      case 0:
        if (!shopName) return "Please enter your business name";
        break;
      case 1:
        if (isTailor !== "yes" && isTailor !== "no")
          return "Please choose if you offer tailoring services";
        if (isShoeMaker !== "yes" && isShoeMaker !== "no")
          return "Please choose if you offer shoe making services";
        break;
      case 2:
        if (!email) return "Please enter your email";
        if (!phoneNumber) return "Please enter your phone number";
        break;
      case 3:
        if (!address) return "Please enter your address";
        if (!region) return "Please select your region";
        if (!country) return "Please select your country";
        break;
      case 4:
        if (!bankDetails.accountNumber)
          return "Please enter your account number";
        if (!bankDetails.bankName) return "Please enter your bank name";
        if (!confirmAccountNumber) return "Please confirm your account number";
        if (bankDetails.accountNumber !== confirmAccountNumber)
          return "Account numbers entered do not match";
        break;
      case 5:
        // optional  social validation
        break;

      case 6:
        if (!acceptedPolicy) return "Please accept the vendor policy & terms";
        break;
      case 7:
        if (!source) return "Please select how you heard about us";
        break;
      default:
        break;
    }
    return "";
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) return setError(err);
    setError("");
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSave();
    }
  };

  const handleSave = async () => {
    setError("");
    const payload = {
      shopName,
      email,
      phoneNumber,
      address,
      region,
      country,
      social,
      isTailor: isTailor === "yes",
      isShoeMaker: isShoeMaker === "yes",
      bankDetails,
      source,
      ...(mode === "edit" && { shopId: shop?.shopId }),
    };
    try {
      if (mode === "create") {
        await createShop({ payload }).unwrap();
      } else {
        await editShop({ payload }).unwrap();
      }
      const uid = user?.uid;
      const response = await triggerGetAuthUser({ uid });
      setUser(response?.data?.data);
      setShowSuccess(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.data?.error || "Something went wrong");
    }
  };

  const stepContent = [
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <label className="block text-gray-700 font-semibold">Business Name</label>
      <TextInput
        theme={inputTheme}
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
        type="text"
        placeholder="Enter your business name"
        required
        shadow
        color="primary"
      />
    </motion.div>,

    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg shadow-sm">
        <p className="text-xs font-medium">
          By default, you are allowed to sell{" "}
          <span className="font-bold ">Ready-to-wear Items </span>
          and <span className="font-bold">Accessories</span> regardless of your
          responses below.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Tailoring Services */}
        <div className="flex flex-col gap-2">
          <label className="block text-gray-700 font-semibold">
            Do you offer <span className="font-extrabold ">bespoke</span>{" "}
            tailoring services?
          </label>
          <p className="text-sm text-gray-500">
            Selecting <span className="font-semibold">No</span> means you won’t
            be verified to render tailoring services.
          </p>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              className={`px-4 py-2 rounded-md border transition ${
                isTailor === "yes"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setIsTailor("yes")}
            >
              Yes
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md border transition ${
                isTailor === "no"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setIsTailor("no")}
            >
              No
            </button>
          </div>
        </div>

        {/* Shoe Making Services */}
        <div className="flex flex-col gap-2">
          <label className="block text-gray-700 font-semibold">
            Do you offer <span className="font-extrabold ">bespoke</span> shoe
            making services?
          </label>
          <p className="text-sm text-gray-500">
            Selecting <span className="font-semibold">No</span> means you won’t
            be verified to render shoe making services.
          </p>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              className={`px-4 py-2 rounded-md border transition ${
                isShoeMaker === "yes"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setIsShoeMaker("yes")}
            >
              Yes
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md border transition ${
                isShoeMaker === "no"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setIsShoeMaker("no")}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </motion.div>,

    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
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
            className: "w-full h-12 border border-darkGold rounded-md p-2",
          }}
          international
          placeholder="Enter phone number"
          required
        />
      </div>
    </motion.div>,
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <label className="block text-gray-700 font-semibold">Address</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:border-darkGold focus:ring-2 focus:ring-darkGold transition"
      />
      <CountrySelector
        country={country || ""}
        setCountry={setCountry}
        region={region || ""}
        setRegion={setRegion}
      />
    </motion.div>,
    <motion.div
      key="step5"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-lg shadow-sm">
        <p className="text-xs font-medium">
          Your account name must match your full name or business name as it appears on your profile. Otherwise, your payments will not be processed.
        </p>
      </div>
      <label className="block text-gray-700 font-semibold">Bank Name</label>
      <input
        type="text"
        value={bankDetails.bankName}
        onChange={(e) =>
          setBankDetails({ ...bankDetails, bankName: e.target.value })
        }
        className="w-full p-3 rounded-lg border border-gray-300 focus:border-darkGold focus:ring-2 focus:ring-darkGold transition"
      />
      <label className="block text-gray-700 font-semibold">Account Name</label>
      <input
        type="text"
        value={bankDetails.accountName}
        onChange={(e) =>
          setBankDetails({ ...bankDetails, accountName: e.target.value })
        }
        className="w-full p-3 rounded-lg border border-gray-300 focus:border-darkGold focus:ring-2 focus:ring-darkGold transition"
      />
      <label className="block text-gray-700 font-semibold">
        Account Number
      </label>
      <input
        type="text"
        value={bankDetails.accountNumber}
        onChange={(e) => {
          const re = /^[0-9\b]+$/;
          if (e.target.value === "" || re.test(e.target.value)) {
            setBankDetails({ ...bankDetails, accountNumber: e.target.value });
          }
        }}
        accept="numeric"
        className="w-full p-3 rounded-lg border border-gray-300 focus:border-darkGold focus:ring-2 focus:ring-darkGold transition"
      />
      <label className="block text-gray-700 font-semibold">
        Confirm Account Number
      </label>
      <input
        type="text"
        value={confirmAccountNumber}
        onChange={(e) => setConfirmAccountNumber(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:border-darkGold focus:ring-2 focus:ring-darkGold transition"
      />
    </motion.div>,
    <motion.div
      key="step6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4 max-h-[30rem] md:max-h-[27rem] overflow-auto"
    >
      <label className="block text-gray-700 font-semibold">Website</label>
      <input
        type="text"
        value={social.website}
        onChange={(e) => setSocial({ ...social, website: e.target.value })}
        className="w-full p-3 rounded-lg border border-gray-300 focus:border-darkGold focus:ring-2 focus:ring-darkGold transition"
      />
      <label className="block text-gray-700 font-semibold">TikTok</label>
      <input
        type="text"
        value={social.tikTok}
        onChange={(e) => setSocial({ ...social, tikTok: e.target.value })}
        className="w-full p-3 rounded-lg border border-gray-300 focus:border-darkGold focus:ring-2 focus:ring-darkGold transition"
      />
      <label className="block text-gray-700 font-semibold">Instagram</label>
      <input
        type="text"
        value={social.instagram}
        onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
        className="w-full p-3 rounded-lg border border-gray-300 focus:border-darkGold focus:ring-2 focus:ring-darkGold transition"
      />
      <label className="block text-gray-700 font-semibold">Facebook</label>
      <input
        type="text"
        value={social.facebook}
        onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
        className="w-full p-3 rounded-lg border border-gray-300 focus:border-darkGold focus:ring-2 focus:ring-darkGold transition"
      />
      <label className="block text-gray-700 font-semibold">Twitter</label>
      <input
        type="text"
        value={social.twitter}
        onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
        className="w-full p-3 rounded-lg border border-gray-300 focus:border-darkGold focus:ring-2 focus:ring-darkGold transition"
      />
      <label className="block text-gray-700 font-semibold">LinkedIn</label>
      <input
        type="text"
        value={social.linkedin}
        onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
        className="w-full p-3 rounded-lg border border-gray-300 focus:border-darkGold focus:ring-2 focus:ring-darkGold transition"
      />
    </motion.div>,

    <motion.div
      key="step7"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4 max-h-[40vh] overflow-y-auto"
    >
      <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
        <div className="text-sm text-gray-700 whitespace-pre-line">
          {getSellerPolicyQuery.isLoading && <p>Loading policy...</p>}
          {getSellerPolicyQuery.isError && (
            <p className="text-red-500">
              Failed to load policy. Please try again later or contact admin.
            </p>
          )}

          {sellerPolicy && sellerPolicy.length > 0 ? (
            sellerPolicy.map((policy, index) => (
              <div key={index} className="mb-4">
                <a
                  href={policy.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-info underline hover:text-darkGold transition cursor-pointer"
                >
                  {policy.name}
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No policies found.</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          theme={checkBoxTheme}
          color={acceptedPolicy ? "success" : "primary"}
          checked={acceptedPolicy}
          onChange={(e) => setAcceptedPolicy(e.target.checked)}
        />
        <span className="text-sm text-gray-700">
          I have read and agree to the Vendor Contract, Policy & Term
        </span>
      </div>
    </motion.div>,
    <motion.div
      key="step8"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4 flex justify-center"
    >
      <Dropdown
        color="primary"
        label={
          source
            ? sourceOptions.find((option) => option.value === source)?.label
            : "Select an option"
        }
        value={source}
      >
        {sourceOptions.map((option) => (
          <Dropdown.Item
            key={option.value}
            onClick={() => setSource(option.value)}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </motion.div>,
  ];

  return (
    <>
      <Modal
        theme={ModalTheme}
        show={openModal}
        size="lg"
        popup
        onClose={onCloseModal}
      >
        <Modal.Body>
          <AnimatePresence>
            <motion.div
              className={` flex  items-center justify-center  text-black max-h-[90vh] overflow-y-auto px-4`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className=" rounded-xl p-6 w-full max-w-md  overflow-hidden "
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    className="text-danger hover:text-gray-700 dark:hover:text-slate-300 transition cursor-pointer"
                    onClick={onCloseModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex justify-center gap-3 mb-6">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.key}
                      className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600"
                      animate={{
                        backgroundColor:
                          index <= currentStep
                            ? "rgb(202 138 4)"
                            : "rgb(209 213 219)", // darkGold / gray-300
                        scale: index === currentStep ? 1.4 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
                {isLoading && <Loading />}
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {mode === "create"
                    ? `${steps[currentStep].header}`
                    : "Edit Shop"}
                </h2>
                {error && (
                  <div className="mb-4 text-red-500 font-medium">{error}</div>
                )}

                <AnimatePresence mode="wait">
                  <div className=" overflow-auto">
                    <div className="flex flex-col align-center justify-center min-h-[40vh] ">
                      {stepContent[currentStep]}
                    </div>
                    <div className="mt-12 flex justify-between ">
                      <div className="flex gap-2">
                        {currentStep > 0 ? (
                          <ButtonPrimary
                            textClassName="text-slate-700"
                            className="hover:bg-slate-200  text-slate-700 border border-slate-300 disabled:border-slate-200 hover:text-slate-900"
                            outline
                            onClick={() => setCurrentStep(currentStep - 1)}
                          >
                            Back
                          </ButtonPrimary>
                        ) : (
                          <div />
                        )}
                      </div>
                      <ButtonPrimary onClick={handleNext}>
                        {currentStep === steps.length - 1
                          ? mode === "create"
                            ? "Join"
                            : "Save"
                          : "Next"}
                      </ButtonPrimary>
                    </div>
                  </div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </Modal.Body>
      </Modal>

      {showSuccess && (
        <ShopSuccessModal
          showShopSuccessModal={showSuccess}
          setShowShopSuccessModal={setShowSuccess}
        />
      )}
    </>
  );
}
