import { ThemeContext } from "@/contexts/themeContext";
import { PromoInterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Alert,  Button, Modal, } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { HiInformationCircle } from 'react-icons/hi';


const LeavePromoModal = ({
  promo,
  openModal,
  setOpenModal,
  productId,
}: {
  promo: PromoInterface;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  productId: string;
}) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { setDimBackground } = useContext(ThemeContext);
  const [leavePromo, leavePromoStatus] = zeapApiSlice.useLeavePromoMutation();
  const isLoading = leavePromoStatus.isLoading;

  useEffect(() => {
    setDimBackground(openModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);
  const handleLeavePromo = () => {
    const payload = { promoId: promo.promoId, productId };
    leavePromo({ payload })
      .unwrap()
      .then(() => {
        setDimBackground(false);
        setOpenModal(false);
      })
      .catch((err) => {
        console.log('err', err);
        setErrorMsg(err.data.error);
      });
  };

  return (
    <Modal
      show={openModal}
      size="xl"
      onClose={() => {
        setDimBackground(false);
        setOpenModal(false);
      }}
      popup
    >
      <Modal.Header className="text-darkGold">Leave Promo</Modal.Header>
      <Modal.Body>
        {isLoading && <Loading />}
        <div className="text-center">
          {errorMsg && (
            <Alert color="failure" icon={HiInformationCircle} className="my-4">
              {errorMsg}
            </Alert>
          )}
          <span className="flex flex-col gap-1">
            <p className=" text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to leave
            </p>
            <p className="text-success">
              {promo?.title} / {promo?.promoId}?
            </p>
          </span>
          <div className="flex justify-center  my-6">
            <Button color="failure" onClick={handleLeavePromo}>
              Yes, I&apos;m sure
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LeavePromoModal;
