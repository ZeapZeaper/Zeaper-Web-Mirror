import { Alert, Button, Modal, TextInput } from "flowbite-react";

import { HiOutlineExclamationCircle, HiTrash } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/contexts/themeContext";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import LoadingDots from "../loading/LoadingDots";

const ProductOrderRejection = ({
  productOrder_id,
  currentStatus,
}: {
  productOrder_id: string;
  currentStatus: {
    name: string;
    value: string;
  };
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState(false);
  const [serverError, setServerError] = useState("");
  const [reason, setReason] = useState("");
  const [rejectProductOrder, rejectProductOrderStatus] =
    zeapApiSlice.useRejectProductOrderMutation();
  const isLoading = rejectProductOrderStatus.isLoading;

  useEffect(
    () => {
      setDimBackground(openModal);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openModal]
  );

  const handleRejection = () => {
    const payload = {
      productOrder_id,
      reason,
    };
    rejectProductOrder({ payload })
      .unwrap()
      .then(() => {
        setServerError("");
        setDimBackground(false);
        setOpenModal(false);
      })
      .catch((err) => {
        setServerError(err.data.error);
        setTimeout(() => {
          setServerError("");
        }, 5000);
      });
  };
  return (
    <>
      <Button
        color="failure"
        size="sm"
        outline
        onClick={() => {
          setServerError("");

          setOpenModal(true);
        }}
        disabled={
          isLoading ||
          currentStatus?.value === "order cancelled" ||
          currentStatus?.value === "order dispatched" ||
          currentStatus?.value === "order delivered"
        }
        className=" text-danger hover:text-white w-full flex justify-center items-center"
      >
        <HiTrash className="mr-2 h-5 w-5" />
        Reject Order
      </Button>

      {openModal && (
        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)}>
          <Modal.Header />
          <Modal.Body>
            {serverError && <Alert color="failure">{serverError}</Alert>}
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-danger" />
              <div className="flex flex-col mb-4">
                <p className=" text-lg font-normal text-danger">
                  Are you sure you want to reject this order? Once rejected, this cannot be reversed
                </p>
              </div>

              <div className="flex flex-col gap-4 my-6">
                <div className="flex flex-col gap-2">
                  <span>Please provide a reason for rejection</span>
                  <TextInput
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  color="success"
                  onClick={() => {
                    handleRejection();
                  }}
                  disabled={reason.length === 0 || isLoading}
                >
                  {isLoading ? <LoadingDots /> : "Yes, Reject Order"}
                </Button>
                <Button color="failure" onClick={() => setOpenModal(false)}>
                  No
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ProductOrderRejection;
