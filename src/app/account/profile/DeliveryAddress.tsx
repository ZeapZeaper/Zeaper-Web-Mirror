import { ThemeContext } from "@/contexts/themeContext";
import { DeliveryAddressInterface } from "@/interface/interface";
import { List, ListItem } from "flowbite-react";
import { useContext, useState } from "react";
import { HiMailOpen, HiOutlineLocationMarker, HiPhone } from "react-icons/hi";
import { HiPencilSquare, HiTrash } from "react-icons/hi2";
import AddNewDeliveryAddress from "./AddNewDeliveryAddress";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import LoadingDots from "@/components/loading/LoadingDots";

const DeliveryAddress = ({
  address,
  setSelectedDeliveryAddress,
  handleClose,
}: {
  address: DeliveryAddressInterface;
  setSelectedDeliveryAddress?: (address: DeliveryAddressInterface) => void;
  handleClose?: () => void;
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const [addNewMode, setAddNewMode] = useState(false);
  const [setDefaultDeliveryAddress, setDefaultDeliveryAddressAtatus] =
    zeapApiSlice.useSetDefaultDeliveryAddressMutation();
  const [deleteDeliveryAddress, deleteDeliveryAddressStatus] =
    zeapApiSlice.useDeleteDeliveryAddressMutation();
  const isSetting = setDefaultDeliveryAddressAtatus.isLoading;
  const isDeleting = deleteDeliveryAddressStatus.isLoading;
  const handleSetDefault = () => {
    const payload = {
      address_id: address._id,
    };
    setDefaultDeliveryAddress({
      payload,
    });
  };
  const handleDelete = () => {
    const payload = {
      address_id: address._id,
    };
    deleteDeliveryAddress({
      payload,
    });
  };
  return (
    <div
      key={address._id}
      className="relative flex flex-col gap-2 p-4 border border-neutral-300 rounded-lg hover:border-primary bg-slate-100"
      onClick={() => {
        setSelectedDeliveryAddress?.(address);
        handleClose?.();
      }}
    >
      <div className="flex justify-between">
        <p className="font-medium text-md text-info dark:text-white font-semibold">
          {address.firstName} {address?.lastName}
        </p>
        {address.isDefault && (
          <span className="text-sm text-success font-semibold bg-success/10 px-2 py-1 rounded-full">
            Default
          </span>
        )}
        {isSetting && <LoadingDots />}
        {!isSetting && !address.isDefault && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleSetDefault();
            }}
            className="text-sm text-success font-semibold bg-success/10 px-2 py-1 rounded-full cursor-pointer hover:bg-success/20 transition-all duration-200"
          >
            Set as Default
          </span>
        )}
      </div>
      <List className="mb-6">
        <ListItem icon={() => <HiPhone className="text-info mr-2" />}>
          {address.phoneNumber}
        </ListItem>
        {address?.postCode && (
          <ListItem icon={() => <HiMailOpen className="text-info mr-2" />}>
            {address.postCode}
          </ListItem>
        )}
        <ListItem
          icon={() => <HiOutlineLocationMarker className="text-info mr-2" />}
        >
          {address.address}, {address.region}, {address.country}
        </ListItem>
      </List>
      <div className="absolute bottom-2 right-2 cursor-pointer flex gap-2">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setAddNewMode(!addNewMode);
            setDimBackground(!addNewMode);
          }}
        >
          <HiPencilSquare className="text-success text-xl  hover:text-primary" />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="text-danger text-xl hover:text-primary"
        >
          {isDeleting ? (
            <LoadingDots />
          ) : (
            <HiTrash className="text-danger text-xl hover:text-primary" />
          )}
        </div>
      </div>
      {addNewMode && (
        <AddNewDeliveryAddress
          setAddNewMode={setAddNewMode}
          addNewMode={addNewMode}
          setDimBackground={setDimBackground}
          selectedDeliveryAddress={address}
        />
      )}
    </div>
  );
};

export default DeliveryAddress;
