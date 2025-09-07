import zeapApiSlice from "@/redux/services/zeapApi.slice";
import React, { useEffect, useState } from "react";
import LoadingDots from "../loading/LoadingDots";
import { Alert } from "flowbite-react";

const ApplyDiscount = ({ voucherCode }: { voucherCode?: string }) => {
  const [code, setCode] = useState<string>("");
  const [applyVoucher, applyVoucherStatus] =
    zeapApiSlice.useApplyVoucherMutation();
  const [removeVoucher, removeVoucherStatus] =
    zeapApiSlice.useRemoveVoucherMutation();
  const [serverError, setServerError] = useState<string | null>(null);
  const [disableInput, setDisableInput] = useState(false);

  useEffect(() => {
    if (voucherCode) {
      setCode(voucherCode);
      setDisableInput(true);
    }
  }, [voucherCode]);

  const handleApplyVoucher = async () => {
    setServerError(null);
    const payload = { code };
    applyVoucher({ payload })
      .unwrap()
      .then(() => {
        setDisableInput(true);
      })
      .catch((error) => {
        setServerError(error.data.error);
        setTimeout(() => {
          setServerError(null);
        }, 5000);
      });
  };
  const handleRemoveVoucher = async () => {
    setServerError(null);
    removeVoucher({})
      .unwrap()
      .then(() => {
        setDisableInput(false);
        setCode("");
      })
      .catch((error) => {
        setServerError(error.data.error);
        setTimeout(() => {
          setServerError(null);
        }, 5000);
      });
  };
  if (applyVoucherStatus.isLoading || removeVoucherStatus.isLoading) {
    return <LoadingDots />;
  }
  return (
    <>
      {serverError && (
        <Alert color="failure" className="mb-4">
          {serverError}
        </Alert>
      )}
      <div className="flex m-2 ">
        <input
          type="text"
          id="discount"
          name="discount"
          disabled={disableInput}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter discount / voucher code"
          className={`block w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-500  border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 ${
            disableInput ? "cursor-not-allowed bg-success" : "bg-white"
          }`}
        />
        <span
          onClick={voucherCode ? handleRemoveVoucher : handleApplyVoucher}
          className={`inline-flex items-center px-3 text-sm text-white bg-green-500 cursor-pointer border border-e-0 border-slate-300 rounded-e-full ${
            disableInput
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {voucherCode ? "Remove" : "Apply"}
        </span>
      </div>
    </>
  );
};

export default ApplyDiscount;
