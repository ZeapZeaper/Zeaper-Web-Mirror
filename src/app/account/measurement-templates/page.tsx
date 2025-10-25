"use client";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import AccountNavBar from "@/components/account/AccountNavBar";
import Skeleton from "@/components/loading/Skeleton";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { BodyMeasurementTemplateInterface } from "@/interface/interface";
import MeasurementTemplate from "@/components/bodyMeasurementTemplate/MeasurementTemplate";
import { AddBodyMeasurementTemplate } from "@/components/bodyMeasurementTemplate/AddBodyMeasurementTemplate";
import DeleteBodyMeasurementTemplate from "@/components/bodyMeasurementTemplate/DeleteBodyMeasurementTemplateModal";

const MeasurementTemplatesPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const token = useSelector(globalSelectors.selectAuthToken);
  const getBodyMeasurementTemplatesQuery =
    zeapApiSlice.useGetBodyMeasurementTemplatesQuery({}, { skip: !token });
  const templates = getBodyMeasurementTemplatesQuery?.data?.data;
  const isLoading = getBodyMeasurementTemplatesQuery?.isLoading;
  const isFulfilled = getBodyMeasurementTemplatesQuery?.status === "fulfilled";

  const [openModal, setOpenModal] = useState(false);
  const [gender, setGender] = useState("female");
  const [template, setTemplate] = useState<BodyMeasurementTemplateInterface>();

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
          <div className="flex flex-col md:flex-row md:justify-between mb-4">
            <h1 className="text-2xl  font-bold sm:text-3xl lg:text-4xl mb-4">
              My Measurement Templates
            </h1>
            <div className="flex items-center gap-2">
              <span
                onClick={() => {
                  setGender("male");
                  setOpenModal(true);
                }}
                data-testid="add-new-template"
                role="button"
                aria-label="add-new-template"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setGender("male");
                    setTemplate(undefined);
                    setOpenModal(true);
                  }
                }}
                className="text-green-700 p-2 h-fit items-center text-center bg-blue-50 rounded-md text-sm cursor-pointer font-semibold"
              >
                Add New Male Template
              </span>
              <span
                onClick={() => {
                  setGender("female");
                  setTemplate(undefined);
                  setOpenModal(true);
                }}
                data-testid="add-new-template"
                role="button"
                aria-label="add-new-template"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setGender("female");
                    setOpenModal(true);
                  }
                }}
                className="text-green-700 p-2 h-fit items-center text-center bg-pink-50 rounded-md text-sm cursor-pointer font-semibold"
              >
                Add New Female Template
              </span>
            </div>
            {openModal && (
              <AddBodyMeasurementTemplate
                openModal={openModal}
                setOpenModal={setOpenModal}
                gender={gender}
                template={template}
              />
            )}
          </div>
          {isLoading && (
            <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4 2xl:grid-cols-5  ">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} />
              ))}
            </div>
          )}
          {templates?.length === 0 && isFulfilled && (
            <div className=" flex flex-col items-center justify-center gap-4 p-4 bg-grey7 my-16">
              <div className="flex flex-col items-center gap-1 text-info   rounded-lg">
                <span className="font-medium">
                  You have no measurement templates yet.
                </span>
              </div>
            </div>
          )}

          <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 ">
            {templates?.length > 0 &&
              templates.map((template: BodyMeasurementTemplateInterface) => (
                <div
                  key={template.templateName}
                  className={`flex flex-col gap-2 p-4  rounded-lg  w-full ${
                    template?.gender === "female" ? "bg-pink-50" : "bg-blue-50"
                  }`}
                >
                  <MeasurementTemplate
                    template={template}
                    showSelectButton={false}
                  />
                  <div className="flex gap-2 items-center">
                    <span
                      onClick={() => {
                        setTemplate(template);
                        setGender(template.gender);
                        setOpenModal(true);
                      }}
                      data-testid="edit-template"
                      role="button"
                      aria-label="edit-template"
                      className="text-green-700 p-2 h-fit items-center text-center bg-yellow-50 rounded-md text-sm cursor-pointer font-semibold"
                    >
                      Edit Template
                    </span>
                    <DeleteBodyMeasurementTemplate template={template} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementTemplatesPage;
