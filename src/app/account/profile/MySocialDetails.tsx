import { AuthContext } from "@/contexts/authContext";
import { Alert } from "flowbite-react";
import React, { useContext, useState } from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { HiPlusCircle } from "react-icons/hi";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import LoadingDots from "@/components/loading/LoadingDots";

const MySocialDetails = () => {
  const { user, setUser } = useContext(AuthContext);
  const [social, setSocial] = useState<{
    facebook: string;
    instagram: string;
    twitter: string;
    tikTok: string;
  }>({
    facebook: user?.social?.facebook || "",
    instagram: user?.social?.instagram || "",
    twitter: user?.social?.twitter || "",
    tikTok: user?.social?.tikTok || "",
  });
  const [editMode, setEditMode] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [updateUser, UpdateUserStatus] = zeapApiSlice.useUpdateUserMutation();
  const handleSave = async () => {
    const payload = {
      _id: user?._id,
      social,
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
    <div className="flex flex-col bg-neutral-50 w-full p-4 rounded-md">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-2xl font-bold">My Socials</h1>
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
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold">Instagram</span>
            <input
              type="text"
              onChange={(e) =>
                setSocial({ ...social, instagram: e.target.value })
              }
              value={social.instagram}
              required
              className="p-2 rounded-lg bg-white border border-slate-300"
            />
          </div>
        ) : (
          <div className="flex justify-between w-full my-2 items-center">
            <div className="text-sm font-bold inline-flex items-center gap-2">
              <span className="text-sm font-bold  flex items-center p-1 rounded-full bg-white border border-slate-300">
                <FaSquareInstagram className="h-7 w-7 text-red-500" />
              </span>
              <div className="flex flex-col  w-full">
                <span className="w-full text-sm font-bold">
                  {user?.social?.instagram ? "Instagram" : "Add Instagram +"}
                </span>
                {user?.social?.instagram && (
                  <span className="text-sm text-slate-500">
                    {user?.social?.instagram}
                  </span>
                )}
              </div>
            </div>

            <span className="text-sm text-slate-500">
              {!user?.social?.instagram && (
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
            <span className="text-sm font-bold">Facebook</span>
            <input
              type="text"
              onChange={(e) =>
                setSocial({ ...social, facebook: e.target.value })
              }
              value={social.facebook}
              required
              className="p-2 rounded-lg bg-white border border-slate-300"
            />
          </div>
        ) : (
          <div className="flex justify-between w-full my-2 items-center">
            <div className="text-sm font-bold inline-flex items-center gap-2">
              <span className="text-sm font-bold  flex items-center p-1 rounded-full bg-white border border-slate-300">
                <FaFacebook className="h-7 w-7 text-blue-500" />
              </span>
              <div className="flex flex-col  w-full">
                <span className="w-full text-sm font-bold">
                  {user?.social?.facebook ? "Facebook" : "Add Facebook +"}
                </span>
                {user?.social?.facebook && (
                  <span className="text-sm text-slate-500">
                    {user?.social?.facebook}
                  </span>
                )}
              </div>
            </div>

            <span className="text-sm text-slate-500">
              {!user?.social?.facebook && (
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
            <span className="text-sm font-bold">Twitter</span>
            <input
              type="text"
              onChange={(e) =>
                setSocial({ ...social, twitter: e.target.value })
              }
              value={social.twitter}
              required
              className="p-2 rounded-lg bg-white border border-slate-300"
            />
          </div>
        ) : (
          <div className="flex justify-between w-full my-2 items-center">
            <div className="text-sm font-bold inline-flex items-center gap-2">
              <span className="text-sm font-bold  flex items-center p-1 rounded-full bg-white border border-slate-300">
                <FaTwitter className="h-7 w-7 text-blue-400" />
              </span>
              <div className="flex flex-col  w-full">
                <span className="w-full text-sm font-bold">
                  {user?.social?.twitter ? "Twitter" : "Add Twitter +"}
                </span>
                {user?.social?.twitter && (
                  <span className="text-sm text-slate-500">
                    {user?.social?.twitter}
                  </span>
                )}
              </div>
            </div>

            <span className="text-sm text-slate-500">
              {!user?.social?.twitter && (
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
            <span className="text-sm font-bold">tikTok</span>
            <input
              type="text"
              onChange={(e) => setSocial({ ...social, tikTok: e.target.value })}
              value={social.tikTok}
              required
              className="p-2 rounded-lg bg-white border border-slate-300"
            />
          </div>
        ) : (
          <div className="flex justify-between w-full my-2 items-center">
            <div className="text-sm font-bold inline-flex items-center gap-2">
              <span className="text-sm font-bold  flex items-center p-1 rounded-full bg-white border border-slate-300">
                <AiFillTikTok className="h-7 w-7 text-red-500" />
              </span>
              <div className="flex flex-col  w-full">
                <span className="w-full text-sm font-bold">
                  {user?.social?.tikTok ? "tikTok" : "Add tikTok +"}
                </span>
                {user?.social?.tikTok && (
                  <span className="text-sm text-slate-500">
                    {user?.social?.tikTok}
                  </span>
                )}
              </div>
            </div>

            <span className="text-sm text-slate-500">
              {!user?.social?.tikTok && (
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

export default MySocialDetails;
