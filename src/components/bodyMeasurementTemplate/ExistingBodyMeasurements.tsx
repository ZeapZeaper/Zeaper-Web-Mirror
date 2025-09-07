"use client";

import { AuthContext } from "@/contexts/authContext";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../app/products/loading";
import MeasurementTemplate from "@/components/bodyMeasurementTemplate/MeasurementTemplate";
import { BodyMeasurementTemplateInterface } from "@/interface/interface";
import { SignInSignUpDrawer } from "@/authentication/SignInSignUpDrawer";

const drawerTheme = {
  root: {
    base: "fixed z-40 overflow-y-auto bg-neutral-50 p-4  dark:bg-gray-800 transition-all duration-300 ease-in-out",
    backdrop: "fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80",
    edge: "bottom-16",
    position: {
      bottom: {
        on: "bottom-0 h-screen  left-0   right-0 w-full md:left-[35%]  md:w-[35rem]  -translate-y-3/2 transition-all duration-500 ease-in-out",
        off: "bottom-0 left-0 right-0 w-full translate-y-full",
      },
    },
  },
  header: {
    inner: {
      closeButton:
        "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      closeIcon: "h-4 w-4",
      titleCloseIcon: "sr-only",
      titleIcon: "me-2.5 h-4 w-4",
      titleText:
        "mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400",
    },
  },
};

type measurementField = {
  field: string;
  value: number;
};
interface bodyMeasurement {
  name: string;
  measurements: measurementField[];
}
type MeasurementInterface = {
  name: string;
  fields: string[];
};

export function ExistingBodyMeasurements({
  openExistingBodyMeasurements,
  setOpenExistingBodyMeasurements,
  setBodyMeasurements,
  measurements,
}: // handleInputChange
{
  openExistingBodyMeasurements: boolean;
  setOpenExistingBodyMeasurements: (open: boolean) => void;
  setBodyMeasurements: (bodyMeasurements: bodyMeasurement[]) => void;
  measurements: MeasurementInterface[];
  // handleInputChange: (value:string,name: string, field: string) => void;
}) {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const token = useSelector(globalSelectors.selectAuthToken);
  const getBodyMeasurementTemplatesQuery =
    zeapApiSlice.useGetBodyMeasurementTemplatesQuery({}, { skip: !token });
  const templates = getBodyMeasurementTemplatesQuery?.data?.data;
  const isLoading = getBodyMeasurementTemplatesQuery?.isLoading;
  const isFulfilled = getBodyMeasurementTemplatesQuery?.status === "fulfilled";
  const handleClose = () => setOpenExistingBodyMeasurements(false);
  const handleSelect = (template: BodyMeasurementTemplateInterface) => {
    const newBodyMeasurements: bodyMeasurement[] = [];
    measurements.forEach((measurement: MeasurementInterface) => {
      const { name, fields } = measurement;
      const newObj: bodyMeasurement = {
        name: name,
        measurements: [],
      };
      fields.forEach((field: string) => {
        const value = template.measurements.find(
          (measurement) => measurement.field === field
        )?.value;
        if (value) {
          newObj.measurements.push({ field: field, value: value });
        }
      });
      newBodyMeasurements.push(newObj);
    });

    setBodyMeasurements(newBodyMeasurements);

    setOpenExistingBodyMeasurements(false);
  };

  return (
    <Drawer
      theme={drawerTheme}
      open={openExistingBodyMeasurements}
      onClose={handleClose}
      position="bottom"
    >
      <DrawerHeader title="Existing Measurements" />
      <DrawerItems className="flex flex-col gap-4 mt-10 min-h-[70vh] items-center w-full">
        {isLoading && <Loading />}
        {templates?.length === 0 && isFulfilled && (
          <div className=" flex flex-col items-center justify-center gap-4 p-4 bg-grey7 ">
            <div className="flex flex-col items-center gap-1 bg-blue-100 p-4  rounded-lg">
              <span className="font-medium">
                Your saved measurement templates list is empty.
              </span>
              <span className="font-medium text-success">
                Save your measurements to access them later.
              </span>
            </div>
          </div>
        )}
        {templates?.length === 0 && <hr className="my-4" />}
        {!user ||
          (user?.isGuest && (
            <div className="flex flex-col items-center justify-center  items-center gap-2 p-4 bg-grey7">
              <div className="flex flex-col items-center gap-1">
                <span className="font-medium text-warning">
                  We’ll hold your saved measurement templates for 30 days.
                </span>
                <span className="font-medium">
                  Sign in to to keep your measurement templates as long as you
                  want.
                </span>
              </div>

              <ButtonPrimary
                onClick={() => {
                  if (!user || user?.isGuest) {
                    return setIsOpen(true);
                  }
                  return;
                }}
              >
                Log In / Sign Up
              </ButtonPrimary>
            </div>
          ))}
        <div className="flex flex-col gap-4 p-4 w-full">
          {templates?.length > 0 &&
            templates.map((template: BodyMeasurementTemplateInterface) => (
              <div
                key={template.templateName}
                onClick={() => handleSelect(template)}
                className={`flex flex-col gap-2 p-4  rounded-lg  w-full cursor-pointer hover:bg-lightSuccess transition duration-200 ease-in-out ${
                  template?.gender === "female" ? "bg-pink-50" : "bg-blue-50"
                }`}
              >
                <MeasurementTemplate
                  template={template}
                  showSelectButton={true}
                />
              </div>
            ))}
        </div>
        {isOpen && (
          <Drawer
            theme={drawerTheme}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            position="bottom"
          >
            <DrawerHeader />
            <DrawerItems>
              <SignInSignUpDrawer callBack={handleClose} />{" "}
            </DrawerItems>
          </Drawer>
        )}
      </DrawerItems>
    </Drawer>
  );
}
