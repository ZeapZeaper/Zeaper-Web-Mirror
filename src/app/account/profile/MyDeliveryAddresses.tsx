import Skeleton from "@/components/loading/Skeleton";
import { AuthContext } from "@/contexts/authContext";
import { ThemeContext } from "@/contexts/themeContext";
import { DeliveryAddressInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import DeliveryAddress from "./DeliveryAddress";
import AddNewDeliveryAddress from "./AddNewDeliveryAddress";

const MyDeliveryAddresses = () => {
  const { setDimBackground } = useContext(ThemeContext);
  const [addNewMode, setAddNewMode] = useState(false);
  const token = useSelector(globalSelectors.selectAuthToken);
  const { user } = useContext(AuthContext);

  const user_id = user?._id;
  const getDeliveryAddressesQuery = zeapApiSlice.useGetDeliveryAddressesQuery(
    { user_id },
    { skip: !token || !user_id }
  );
  const isLoading = getDeliveryAddressesQuery.isLoading;

  const deliveryAddresses = getDeliveryAddressesQuery?.data?.data || [];

  return (
    <div className="flex flex-col bg-neutral-50 w-full p-1 rounded-md">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-2xl font-bold">My Delivery Addresses</h1>
        <span
          onClick={() => {
            setAddNewMode(!addNewMode);
            setDimBackground(!addNewMode);
          }}
          className={`text-sm text-slate-500 rounded-lg p-2  text-white cursor-pointer  transition-all duration-200 ${
            addNewMode
              ? "bg-danger hover:bg-danger/80"
              : "bg-secondary hover:bg-secondary/80"
          }`}
        >
          {addNewMode ? "Cancel" : "Add New"}
        </span>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center w-full h-32">
          <Skeleton />
        </div>
      )}
      {!isLoading && deliveryAddresses.length === 0 && (
        <div className="flex justify-center items-center w-full h-32">
          <p className="text-md text-info">No Delivery Addresses Found</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {deliveryAddresses.map((address: DeliveryAddressInterface) => (
          <DeliveryAddress address={address} key={address._id} />
        ))}
      </div>
      {addNewMode && (
        <AddNewDeliveryAddress
          setAddNewMode={setAddNewMode}
          addNewMode={addNewMode}
          setDimBackground={setDimBackground}
        />
      )}
    </div>
  );
};

export default MyDeliveryAddresses;
