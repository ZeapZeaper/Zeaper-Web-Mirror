import { AuthContext } from "@/contexts/authContext";
import { Alert } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { Dropdown, DropdownItem } from "flowbite-react";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import LoadingDots from "@/components/loading/LoadingDots";
import { displayDate } from "@/utils/helpers";

const dropDownTheme = {
  floating: {
    item: {
      container: "",
      base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-green-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
      icon: "mr-2 h-4 w-4",
    },
  },
  inlineWrapper:
    "flex items-center w-full justify-between p-2 rounded-lg bg-white border border-slate-300",
};
type TprefferedCurrency = "NGN" | "USD" | "GBP";

const MyOtherInfo = () => {
  const { user, setUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  const [bestOutfit, setBestOutfit] = useState("");
  const [bestColor, setBestColor] = useState("");
  const [prefferedCurrency, setPrefferedCurrency] =
    useState<TprefferedCurrency>(
      (user?.prefferedCurrency as TprefferedCurrency) || "NGN"
    );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [updateUser, UpdateUserStatus] = zeapApiSlice.useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setGender(user.gender);
      setDateOfBirth(user.dateOfBirth);
      setWeight(user.weight);
      setHeight(user.height);
      setShoeSize(user.shoeSize);
      setBestOutfit(user.bestOutfit);
      setBestColor(user.bestColor);
      setPrefferedCurrency(user.prefferedCurrency as TprefferedCurrency);
    }
  }, [user]);

  const handleSave = async () => {
    const payload = {
      _id: user?._id,
      gender,
      dateOfBirth,
      weight,
      height,
      shoeSize,
      bestOutfit,
      bestColor,
      prefferedCurrency,
    };
    updateUser({ payload })
      .then((data) => {
        const user = data?.data?.data;
        console.log("user isssss", user);
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
    <div className="flex flex-col bg-neutral-50 w-full p-4 rounded-md">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-2xl font-bold">My Other Info</h1>
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
        {editMode ? (
          <div className="flex flex-col gap-2 w-full">
            <Dropdown
              theme={dropDownTheme}
              label={prefferedCurrency || "Preferred Currency"}
              value={prefferedCurrency}
              inline
            >
              <DropdownItem
                onClick={() => {
                  setPrefferedCurrency("NGN");
                }}
              >
                NGN
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setPrefferedCurrency("USD");
                }}
              >
                USD
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setPrefferedCurrency("GBP");
                }}
              >
                GBP
              </DropdownItem>
            </Dropdown>
          </div>
        ) : (
          <div className="flex justify-between w-full my-2">
            <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
              <span className="text-sm font-bold text-info">
                Preferred Currency
              </span>
              <span className="text-sm text-slate-500">
                {user?.prefferedCurrency}
              </span>
            </div>
            <span className="text-sm text-slate-500">
              {!user?.prefferedCurrency && (
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
            <Dropdown
              label={gender || "Gender"}
              value={gender}
              theme={dropDownTheme}
              inline
            >
              <DropdownItem
                onClick={() => {
                  setGender("Male");
                }}
              >
                Male
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setGender("Female");
                }}
              >
                Female
              </DropdownItem>
            </Dropdown>
          </div>
        ) : (
          <div className="flex justify-between w-full my-2">
            <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
              <span className="text-sm font-bold text-info">Gender</span>
              <span className="text-sm text-slate-500">{user?.gender}</span>
            </div>
            <span className="text-sm text-slate-500">
              {!user?.gender && (
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
            <span className="text-sm font-bold">Date of Birth</span>
            <input
              type="date"
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={dateOfBirth}
              className="p-2 rounded-lg bg-white border border-slate-300"
            />
          </div>
        ) : (
          <div className="flex justify-between w-full my-2">
            <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
              <span className="text-sm font-bold text-info">Date of Birth</span>
              <span className="text-sm text-slate-500">
                {user?.dateOfBirth && displayDate(user?.dateOfBirth)}
              </span>
            </div>
            <span className="text-sm text-slate-500">
              {!user?.dateOfBirth && (
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
            <span className="text-sm font-bold">Weight</span>
            <input
              type="number"
              onChange={(e) => setWeight(e.target.value)}
              value={weight}
              className="p-2 rounded-lg bg-white border border-slate-300"
            />
          </div>
        ) : (
          <div className="flex justify-between w-full my-2">
            <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
              <span className="text-sm font-bold text-info">Weight</span>
              <span className="text-sm text-slate-500">
                {user?.weight && `${user?.weight}kg`}
              </span>
            </div>

            <span className="text-sm text-slate-500">
              {user?.weight && (
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
            <span className="text-sm font-bold">Height</span>
            <input
              type="number"
              onChange={(e) => setHeight(e.target.value)}
              value={height}
              className="p-2 rounded-lg bg-white border border-slate-300"
            />
          </div>
        ) : (
          <div className="flex justify-between w-full my-2">
            <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
              <span className="text-sm font-bold text-info">Height</span>
              <span className="text-sm text-slate-500">
                {user?.height && `${user?.height} inch`}
              </span>
            </div>
            <span className="text-sm text-slate-500">
              {!user?.height && (
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
            <span className="text-sm font-bold">Shoe Size</span>
            <input
              type="number"
              onChange={(e) => setShoeSize(e.target.value)}
              value={shoeSize}
              className="p-2 rounded-lg bg-white border border-slate-300"
            />
          </div>
        ) : (
          <div className="flex justify-between w-full my-2">
            <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
              <span className="text-sm font-bold text-info">Shoe Size</span>
              <span className="text-sm text-slate-500">
                {user?.shoeSize && `${user?.shoeSize}`}
              </span>
            </div>
            <span className="text-sm text-slate-500">
              {!user?.shoeSize && (
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
            <span className="text-sm font-bold">Best Outfit</span>
            <input
              type="text"
              onChange={(e) => setBestOutfit(e.target.value)}
              value={bestOutfit}
              className="p-2 rounded-lg bg-white border border-slate-300"
            />
          </div>
        ) : (
          <div className="flex justify-between w-full my-2">
            <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
              <span className="text-sm font-bold text-info">Best Outfit</span>
              <span className="text-sm text-slate-500">{user?.bestOutfit}</span>
            </div>
            <span className="text-sm text-slate-500">
              {!user?.bestOutfit && (
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
            <span className="text-sm font-bold">Best Color</span>
            <input
              type="text"
              onChange={(e) => setBestColor(e.target.value)}
              value={bestColor}
              className="p-2 rounded-lg bg-white border border-slate-300"
            />
          </div>
        ) : (
          <div className="flex justify-between w-full my-2">
            <div className="flex flex-col md:flex-row md:justify-between w-full my-2">
              <span className="text-sm font-bold text-info">Best Color</span>
              <span className="text-sm text-slate-500">{user?.bestColor}</span>
            </div>
            <span className="text-sm text-slate-500">
              {!user?.bestColor && (
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

export default MyOtherInfo;
