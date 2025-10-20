import { DeliveryAddressInterface } from "@/interface/interface";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import DeliveryAddress from "../account/profile/DeliveryAddress";

const ModalTheme = {
  root: {
    base: "fixed inset-x-0-[20%] top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900/50 dark:bg-gray-900/80",
      off: "hidden",
    },
    sizes: {
      lg: "w-[100vw] md:max-w-lg ",
    },
  },
  content: {
    base: "relative  w-full md:p-4 md:h-auto",
    inner:
      "relative flex h-[100vh] md:h-full md:max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
};

const ExistingShippingAddress = ({
  setDimBackground,
  openExistingShippingAddress,
  setOpenExistingShippingAddress,
  deliveryAddresses,
  setSelectedDeliveryAddress,
}: {
  setDimBackground: (value: boolean) => void;
  openExistingShippingAddress: boolean;
  setOpenExistingShippingAddress: (value: boolean) => void;
  deliveryAddresses: DeliveryAddressInterface[];
  setSelectedDeliveryAddress: (address: DeliveryAddressInterface) => void;
}) => {
  const handleClose = () => {
    setOpenExistingShippingAddress(false);
    setDimBackground(false);
  };

  return (
    <Modal
      theme={ModalTheme}
      show={openExistingShippingAddress}
      onClose={handleClose}
      size="lg"
      popup
    >
      <ModalHeader />
      <ModalBody>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Select existing delivery address
          </h3>
          <div className="flex flex-col gap-2">
            {deliveryAddresses.map((address: DeliveryAddressInterface) => (
              <div className="cursor-pointer " key={address._id}>
                <DeliveryAddress
                  address={address}
                  setSelectedDeliveryAddress={setSelectedDeliveryAddress}
                  handleClose={handleClose}
                />
              </div>
            ))}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ExistingShippingAddress;
