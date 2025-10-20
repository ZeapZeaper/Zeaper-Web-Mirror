"use client";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import AccountNavBar from "@/components/account/AccountNavBar";
import Skeleton from "@/components/loading/Skeleton";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { HiTrash } from "react-icons/hi";
import NoPic from "@/images/noPhoto.png";
import { Alert } from "flowbite-react";
import ReactTimeAgo from "react-time-ago";
import Image from "next/image";
import LoadingDots from "@/components/loading/LoadingDots";
import MyRecommendedProducts from "@/components/products/MyRecommendedProducts";




const MeasurementTemplatesPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const token = useSelector(globalSelectors.selectAuthToken);
  const [error, setError] = useState<string>("");
  const getNotificationsQuery = zeapApiSlice.useGetNotificationsQuery(
    {},
    { skip: !token }
  );
  const notifications = getNotificationsQuery?.data?.data.notifications;
  const [deleteNotification, deleteNotificationStatus] =
    zeapApiSlice.useDeleteNotificationMutation();

  const isLoading = getNotificationsQuery?.isLoading;
  const isDeleting =
    deleteNotificationStatus.isLoading 
  const isFulfilled = getNotificationsQuery?.status === "fulfilled";

  const handleDelete = (notification_id: string) => {
    const payload = { notification_id };
    deleteNotification({ payload })
      .unwrap()
      .then(() => {})
      .catch((err) => {
        setError(err.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  useEffect(() => {
    if (user?.isGuest) {
      router.push("/account/login");
    }
  }, [user, router]);
  return (
    <div className="min-h-screen md:px-2 h-full overflow-auto ">
      <div className="grid  grid-cols-1 md:grid-cols-4 p-4 md:p-6 md:px-10">
        <div className="hidden md:col-span-1 md:block">
          <AccountNavBar />
        </div>
        <div className="col-span-1 md:col-span-3  w-full">
          <h1 className="text-2xl  font-bold sm:text-3xl lg:text-4xl mb-4">
            My Notifications
          </h1>

          {isLoading && (
            <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4 2xl:grid-cols-5  ">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} />
              ))}
            </div>
          )}
          {error && (
            <div className="p-4 mb-2">
              <Alert color="failure">Error - {error}</Alert>{" "}
            </div>
          )}
          {notifications?.length === 0 && isFulfilled && (
            <div className=" flex flex-col items-center justify-center gap-4 p-4 bg-grey7 my-16">
              <div className="flex flex-col items-center gap-1 text-info   rounded-lg">
                <span className="font-medium">
                  You have no notifications yet.
                </span>
              </div>
            </div>
          )}

         

          <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 ">
            {notifications?.map(
              (notification: {
                createdAt: Date;
                title: string;
                body: string;
                image: string;
                _id: string;
              }) => (
                <div
                  key={notification._id}
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                >
                  <div className="flex  gap-2">
                    <Image
                      width={24}
                      height={24}
                      src={notification?.image || NoPic}
                      alt="notification"
                      className="h-6 w-6 rounded-full"
                    />
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      {notification?.title}
                    </h5>
                  </div>
                  <p className="text-xs">{notification?.body}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-success">
                      {" "}
                      <ReactTimeAgo
                        date={notification?.createdAt}
                        locale="en-US"
                      />
                    </p>
                    <div
                      className="bg-lightDanger p-2 text-danger rounded-full cursor-pointer hover:bg-danger hover:text-white transition duration-200 ease-in-out"
                      onClick={() => {
                        handleDelete(notification._id);
                      }}
                    >
                      {isDeleting ? (
                        <LoadingDots />
                      ) : (
                        <HiTrash className="" />
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <MyRecommendedProducts />
    </div>
  );
};

export default MeasurementTemplatesPage;
