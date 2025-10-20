import { useContext, useEffect, useState } from "react";
import NoPic from "@/images/noPhoto.png";

import { Alert, Button } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { AuthContext } from "@/contexts/authContext";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "@/app/loading";
import Image from "next/image";
import { HiCamera } from "react-icons/hi2";
 import MyContactInfo from "./MyContactInfo";
import MySocialDetails from "./MySocialDetails";
 import MyOtherInfo from "./MyOtherInfo";
import MyDeliveryAddresses from "./MyDeliveryAddresses";

const MyProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [updateUserProfilePic, updateUserProfilePicStatus] =
    zeapApiSlice.useUpdateUserProfilePicMutation();
  const isLoading = updateUserProfilePicStatus.isLoading;

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) {
      const MAX_FILE_SIZE = 1120; // 1MB

      const fileSizeKiloBytes = selectedFile?.size / 1024;

      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        setErrorMsg(
          "Selected file size is greater than 1MB. Please select a smaller file"
        );
        setTimeout(() => {
          setSelectedFile(undefined);
        }, 1000);
        return;
      }

      setErrorMsg("");
    }
  }, [selectedFile]);

  const save = () => {
    const form = new FormData();
    if (selectedFile) {
      form.append("file", selectedFile);
    }

    const payload = form;

    updateUserProfilePic({
      payload,
    })
      .unwrap()
      .then((data) => {
        const updatedUser = data?.data;
        setUser(updatedUser);

        setSelectedFile(undefined);
        setPreview(undefined);
        setErrorMsg("");
      })

      .catch((err) => {
        setErrorMsg(err?.data?.error);
      });
  };

  return (
    <div className="flex flex-col h-full w-full">
      {isLoading && <Loading />}
      {errorMsg && (
        <Alert color="failure" icon={HiInformationCircle} className="my-4">
          {errorMsg}
        </Alert>
      )}
      <div className=" h-screen md:px-4 pb-6  lg:pb-8 xl:pb-11.5 w-full">
        <div className="relative z-30 mx-auto -mt-22 h-30 w-full rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 md:max-w-44 ">
          <div className="relative drop-shadow-2 w-[10rem] justify-center mx-auto h-30 md:h-44">
            <Image
              src={preview || user?.imageUrl?.link || NoPic}
              alt="profile"
              width={0}
              height={0}
              sizes="100vw"
              className="w-60  md:h-full md:w-full rounded-full object-cover object-center"
            />
            {selectedFile && (
              <div className="absolute bottom-0 right-10 md:right-0 flex h-8.5 gap-2 items-center justify-center  text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2">
                <Button
                  onClick={() => save()}
                  size="xs"
                  className="bg-emerald-500 hover:bg-emerald-600 "
                >
                  Save
                </Button>
                <Button
                  size="xs"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    setSelectedFile(undefined);
                    setPreview(undefined);
                    setErrorMsg("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
            {!selectedFile && (
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-lightGold text-white p-4 hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                onClick={() => {
                  setErrorMsg("");
                }}
              >
                <HiCamera className="h-5 w-5 text-info" />
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                  accept="image/*"
                  onChange={(e) => {
                    setSelectedFile((e.target as HTMLInputElement).files?.[0]);
                  }}
                />
              </label>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4  md:grid-cols-2 md:gap-8 w-full mt-4 md:mt-2">
          <MyContactInfo />
          <MyOtherInfo />
          <MySocialDetails />
        </div>
        <div className="mt-4">
          <MyDeliveryAddresses />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
