import LoadingDots from "@/components/loading/LoadingDots";
import { ThemeContext } from "@/contexts/themeContext";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { numberWithCommas } from "@/utils/helpers";
import { Alert, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useContext, useState } from "react";

const CovertPoints = ({ availablePoints }: { availablePoints: number }) => {
  const { setDimBackground } = useContext(ThemeContext);
  const [error, setError] = useState<string>("");
  const [pointToConvert, setPointToConvert] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);

  const [convertPointToVoucher, convertPointToVoucherStatus] =
    zeapApiSlice.useConvertPointToVoucherMutation();
  const isConverting = convertPointToVoucherStatus.isLoading;

  const handleClose = () => {
    setDimBackground(false);
    setOpenModal(false);
  };

  const handleConvert = () => {
    if (pointToConvert > availablePoints) {
      setError("You don't have enough points");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    const payload = {
      pointToConvert
    };
    convertPointToVoucher({ payload })
      .unwrap()
      .then(() => {
        setPointToConvert(0);
        setDimBackground(false);
        setOpenModal(false);
      })
      .catch((err) => {
        console.log("err", err);
        setError(err.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };
  return (
    <div className="flex flex-col gap-2 mt-4 ">
      <h1 className="text-lg font-bold">Convert Points to Vouchers</h1>
      <p className="text-sm">
        You can convert your points into vouchers and redeem them for discounts
        on your next purchase.
      </p>{" "}
      <button
        onClick={() => {
          setDimBackground(true);
          setOpenModal(true);
        }}
        disabled={isConverting}
        className={`${
          isConverting
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-primary hover:bg-green-700"
        } text-white font-bold py-2 px-4 rounded`}
      >
        {isConverting ? <LoadingDots /> : "Convert"}
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={handleClose}
        popup
        position="center"
      >
        <ModalHeader>
          <div className="flex flex-col gap-0">
            <h1 className="text-lg font-bold">Convert Points to Voucher</h1>
            <p className="text-sm text-info">
              ({numberWithCommas(availablePoints)}{" "}
              {availablePoints > 1 ? "points" : "point"} available)
            </p>
          </div>
        </ModalHeader>
        <ModalBody>
          {error && (
            <div className="p-4 mb-2">
              <Alert color="failure">Error - {error}</Alert>{" "}
            </div>
          )}
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="pointToConvert" className="text-sm font-semibold">
                Points to Convert
              </label>
              <input
                type="number"
                id="pointToConvert"
                value={pointToConvert || ""}
                onChange={(e) => setPointToConvert(Number(e.target.value))}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter points to convert"
              />
            </div>
            <div>
              <button
                onClick={handleConvert}
                disabled={isConverting}
                className={`${
                  isConverting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary hover:bg-green-700"
                } text-white font-bold py-2 px-4 rounded`}
              >
                {isConverting ? <LoadingDots /> : "Convert"}
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CovertPoints;
