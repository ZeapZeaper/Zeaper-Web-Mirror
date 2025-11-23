import { ShopInterface } from "@/interface/interface";

import { useState } from "react";
import { Label, Modal, TextInput } from "flowbite-react";

import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "../loading";

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

const EditShopBankDetails = ({
  shop,
  openModal,
  setOpenModal,
}: {
  shop: ShopInterface;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}) => {
  const [bankDetails, setBankDetails] = useState({
    bankName: shop.bankDetails?.bankName || "",
    accountNumber: shop.bankDetails?.accountNumber || "",
    accountName: shop.bankDetails?.accountName || "",
  });
  const [error, setError] = useState("");
  const [editShop, editShopStatus] = zeapApiSlice.useUpdateShopMutation();
  const isLoading = editShopStatus.isLoading;
  const onCloseModal = () => {
    setOpenModal(false);

    setError("");
  };
  const validateBankDetails = () => {
    if (!bankDetails.bankName) {
      setError("Please enter your bank name");
      return false;
    }
    if (!bankDetails.accountNumber) {
      setError("Please enter your account number");
      return false;
    }
    if (!bankDetails.accountName) {
      setError("Please enter your account name");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validateBankDetails()) return;
    try {
      const payload = { bankDetails, shopId: shop.shopId };
      await editShop({ payload }).unwrap();
      setOpenModal(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error updating bank details:", error);
      setError("Failed to update bank details");
    }
  };

  return (
    <Modal
      show={openModal}
      size="lg"
      popup
      onClose={onCloseModal}
      theme={ModalTheme}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-4 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit Bank Details
          </h3>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="bankName" value="Bank Name" />
            </div>
            <TextInput
              id="bankName"
              type="text"
              placeholder="Enter your bank name"
              required
              value={bankDetails.bankName}
              onChange={(e) =>
                setBankDetails({ ...bankDetails, bankName: e.target.value })
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="accountNumber" value="Account Number" />
            </div>
            <TextInput
              id="accountNumber"
              type="text"
              placeholder="Enter your account number"
              required
              value={bankDetails.accountNumber}
              onChange={(e) =>
                setBankDetails({
                  ...bankDetails,
                  accountNumber: e.target.value,
                })
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="accountName" value="Account Name" />
            </div>
            <TextInput
              id="accountName"
              type="text"
              placeholder="Enter your account name"
              required
              value={bankDetails.accountName}
              onChange={(e) =>
                setBankDetails({
                  ...bankDetails,
                  accountName: e.target.value,
                })
              }
            />
          </div>

          <div className="w-full flex justify-end gap-2">
            <button
              type="button"
              className="rounded-lg bg-gray-200 px-5 py-2 text-sm font-medium text-gray-500 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-800"
              onClick={onCloseModal}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 dark:focus:ring-primary/50"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "Update"}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ShopBankDetails = ({ shop }: { shop: ShopInterface }) => {
  const [openModal, setOpenModal] = useState(false);

  if (!shop) {
    return null;
  }

  return (
    <div className="w-full lg:max-w-md p-4 bg-white border border-gray-200 text-black rounded-lg shadow sm:p-8 dark:bg-slate-800 dark:text-white dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold text-primary">Shop Bank Details</h5>
        <div className="flex items-center gap-2">
          <div
            onClick={() => setOpenModal(!openModal)}
            className="text-sm font-medium text-warning hover:underline cursor-pointer"
          >
            {openModal ? "Close Edit" : "Edit"}
          </div>
        </div>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div>Bank Name</div>
              <div>{shop?.bankDetails?.bankName || "N/P"}</div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div>Account Number</div>
              <div>{shop?.bankDetails?.accountNumber || "N/P"}</div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div>Account Name</div>
              <div>{shop?.bankDetails?.accountName || "N/P"}</div>
            </div>
          </li>
        </ul>
      </div>
      <EditShopBankDetails
        shop={shop}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default ShopBankDetails;
