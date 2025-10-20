import { AuthContext } from "@/contexts/authContext";
import { Alert } from "flowbite-react";
import React, { useContext, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { HiPlusCircle } from "react-icons/hi";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import CountrySelector from "@/shared/Select/CountrySelector";
import LoadingDots from "@/components/loading/LoadingDots";

const MyContactInfo = () => {
  const { user, setUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [address, setAddress] = useState(user?.address);
  const [region, setRegion] = useState(user?.region);
  const [country, setCountry] = useState(user?.country);

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [updateUser, UpdateUserStatus] = zeapApiSlice.useUpdateUserMutation();

  const validate = () => {
    if (!firstName) {
      setErrorMsg("First name is required");
      return false;
    }
    if (!lastName) {
      setErrorMsg("Last name is required");
      return false;
    }
    return true;
  };
  const handleSave = async () => {
    if (!validate()) {
      return;
    }
    const payload = {
      firstName,
      lastName,
      phoneNumber,
      address,
      region,
      country,
      _id: user?._id,
    };
    updateUser({ payload })
      .then((data) => {
        const user = data?.data?.data;
        if (user) {
          setUser(user);
          setEditMode(false);
        }
      })

      .catch((e) => {
        console.error(e.data);
      });
  };
  return (
    <div className="flex flex-col bg-neutral-50 w-full p-2 md:p-4 rounded-md w-full">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-2xl font-bold">My Contact Info</h1>
        <span
          onClick={() => setEditMode(!editMode)}
          className={`text-sm text-slate-500 rounded-lg p-2  text-white cursor-pointer  transition-all duration-200 ${
            editMode
              ? "bg-danger hover:bg-danger/80"
              : "bg-secondary hover:bg-secondary/80"
          }`}
        >
          {editMode ? "Cancel" : "Edit"}
        </span>
      </div>
      {errorMsg && (
        <Alert
          color="failure"
          className="mb-4"
          onDismiss={() => setErrorMsg("")}
        >
          <span>
            <span className="font-medium">Error!</span> {errorMsg}
          </span>
        </Alert>
      )}
      <div className="flex flex-col gap-4 divider-y divider-y-slate-800">
        {!editMode && (
          <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
            <span className="text-sm font-bold text-info">Email</span>
            <span className="text-sm text-slate-500">{user?.email}</span>
          </div>
        )}
        {editMode ? (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold">First Name</span>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
              className="p-2 rounded-lg bg-white border border-slate-300"
            />
          </div>
        ) : (
          <div className="flex justify-between w-full my-2">
            <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
              <span className="text-sm font-bold text-info">First Name</span>
              <span className="text-sm text-slate-500">{user?.firstName}</span>
            </div>
            <span className="text-sm text-slate-500">
              {!user?.firstName && (
                <HiPlusCircle
                  className="h-5 w-5 text-success"
                  onClick={() => {
                    setEditMode(true);
                  }}
                />
              )}
            </span>
          </div>
        )}

        {editMode ? (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold ">Last Name</span>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="p-2 rounded-lg bg-white border border-slate-300"
            />
          </div>
        ) : (
          <div className="flex justify-between w-full my-2">
            <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
              <span className="text-sm font-bold text-info">Last Name</span>
              <span className="text-sm text-slate-500">{user?.lastName}</span>
            </div>
            <span className="text-sm text-slate-500">
              {!user?.lastName && (
                <HiPlusCircle
                  className="h-5 w-5 text-success"
                  onClick={() => {
                    setEditMode(true);
                  }}
                />
              )}
            </span>
          </div>
        )}
        {editMode ? (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold">Phone Number</span>
            <PhoneInput
              defaultCountry="NG"
              value={phoneNumber}
              onChange={setPhoneNumber}
              className="p-2 rounded-lg bg-white border border-slate-300"
              international
              placeholder="Enter phone number"
              required
            />
          </div>
        ) : (
          <div className="flex justify-between w-full my-2">
            <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
              <span className="text-sm font-bold text-info">Phone Number</span>
              <span className="text-sm text-slate-500">
                {user?.phoneNumber}
              </span>
            </div>
            <span className="text-sm text-slate-500">
              {!user?.phoneNumber && (
                <HiPlusCircle
                  className="h-5 w-5 text-success"
                  onClick={() => {
                    setEditMode(true);
                  }}
                />
              )}
            </span>
          </div>
        )}
        {editMode ? (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold">Address</span>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="p-2 rounded-lg bg-white border border-slate-300"
            />
          </div>
        ) : (
          <div className="flex justify-between w-full my-2">
            <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
              <span className="text-sm font-bold text-info">Address</span>
              <span className="text-sm text-slate-500">{user?.address}</span>
            </div>
            <span className="text-sm text-slate-500">
              {!user?.address && (
                <HiPlusCircle
                  className="h-5 w-5 text-success"
                  onClick={() => {
                    setEditMode(true);
                  }}
                />
              )}
            </span>
          </div>
        )}
        {editMode && (
          <CountrySelector
            country={country || ""}
            setCountry={setCountry}
            region={region || ""}
            setRegion={setRegion}
          />
        )}
        {!editMode && (
          <div className="flex justify-between w-full my-2">
            <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
              <span className="text-sm font-bold text-info">Region</span>
              <span className="text-sm text-slate-500">{user?.region}</span>
            </div>
            <span className="text-sm text-slate-500">
              {!user?.region && (
                <HiPlusCircle
                  className="h-5 w-5 text-success"
                  onClick={() => {
                    setEditMode(true);
                  }}
                />
              )}
            </span>
          </div>
        )}
        {!editMode && (
          <div className="flex justify-between w-full my-2">
            <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
              <span className="text-sm font-bold text-info">Country</span>
              <span className="text-sm text-slate-500">{user?.country}</span>
            </div>
            <span className="text-sm text-slate-500">
              {!user?.country && (
                <HiPlusCircle
                  className="h-5 w-5 text-success"
                  onClick={() => {
                    setEditMode(true);
                  }}
                />
              )}
            </span>
          </div>
        )}
      </div>
      {editMode && (
        <div className="flex justify-end gap-4 w-full mt-4">
          <span
            onClick={() => {
              setEditMode(false);
            }}
            className="text-sm text-slate-500 rounded-lg p-2 bg-danger text-white cursor-pointer hover:bg-secondary/80 transition-all duration-200"
          >
            Cancel
          </span>
          <span
            onClick={handleSave}
            className="text-sm text-slate-500 rounded-lg p-2 bg-success text-white cursor-pointer hover:bg-success/80 transition-all duration-200"
          >
            {UpdateUserStatus.isLoading ? <LoadingDots /> : "Save"}
          </span>
        </div>
      )}
    </div>
  );
};

export default MyContactInfo;
