"use client";

import { Alert, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";
import { ExistingBodyMeasurements } from "../../../components/bodyMeasurementTemplate/ExistingBodyMeasurements";
import SliderDrawer from "@/components/slider/SliderDrawer";
import { ThemeContext } from "@/contexts/themeContext";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "../loading";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { AuthContext } from "@/contexts/authContext";
import AddUpdateBodyMeasurementTemplate from "@/components/bodyMeasurementTemplate/AddUpdateBodyMeasurementTemplate";
import { BodyMeasurementGuideInterface } from "@/interface/interface";
import BespokeBodyMeasurementGuide from "@/components/bodyMeasurementTemplate/BespokeBodyMeasurementGuide";

const ModalTheme = {
  root: {
    base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900/50 dark:bg-gray-900/80",
      off: "hidden",
    },
    sizes: {
      lg: "w-[100vw] md:max-w-lg",
    },
  },
  content: {
    base: "fixed  w-full md:p-4 md:h-auto",
    inner:
      "relative flex h-[100vh] md:h-full md:max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
};

type MeasurementInterface = {
  name: string;
  fields: string[];
};
type measurementField = {
  field: string;
  value: number;
};
interface bodyMeasurement {
  name: string;
  measurements: measurementField[];
}

interface BodyMeasurementGuideFieldsInterface {
  _id: string;
  field: string;
  imageUrl: {
    name: string;
    link: string;
  };
  description: string;
}

export function AddBodyMeasurementsSize({
  openModal,
  setOpenModal,
  productId,
  selectedMaterialColor,
  bodyMeasurements,
  setBodyMeasurements,
  sku,
  setIsOpen,
  mode = "add",
  _id,
  defaultBespokeInstruction = "",
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  productId: string;
  selectedMaterialColor?: string;
  bodyMeasurements: bodyMeasurement[];
  setBodyMeasurements: (bodyMeasurements: bodyMeasurement[]) => void;
  sku: string;
  setIsOpen?: (open: boolean) => void;
  mode?: "add" | "update";
  _id?: string;
  defaultBespokeInstruction?: string;
}) {
  const topDiveRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(AuthContext);
  const token = useSelector(globalSelectors.selectAuthToken);
  const { setDimBackground } = useContext(ThemeContext);

  const [openExistingBodyMeasurements, setOpenExistingBodyMeasurements] =
    useState(false);
  const [
    openUpdateBodyMeasurementTemplate,
    setOpenUpdateBodyMeasurementTemplate,
  ] = useState(false);
  const [bespokeInstruction, setBespokeInstruction] = useState(
    defaultBespokeInstruction
  );
  const [inputError, setInputError] = useState<{ [key: string]: string }>({});
  const [saveMeasurementFornextTime, setSaveMeasurementFornextTime] =
    useState(false);
  const [addToCart] = zeapApiSlice.useAddProductToCartMutation();
  const [updateCartItem] = zeapApiSlice.useUpdateCartItemMutation();

  const [serverError, setServerError] = useState("");

  const getProductBodyMeasurement =
    zeapApiSlice.useGetProductBodyMeasurementQuery(
      {
        productId,
      },
      { skip: !token || !productId }
    );

  const measurements =
    getProductBodyMeasurement?.data?.data?.measurements || [];
  const gender = getProductBodyMeasurement?.data?.data?.gender;
  const getBodyMeasurementGuideQuery =
    zeapApiSlice.useGetBodyMeasurementGuideQuery(
      {
        gender,
      },
      { skip: !token || !gender }
    );
  const bodyMeasurementGuide: BodyMeasurementGuideInterface[] =
    getBodyMeasurementGuideQuery.data?.data || [];
  const bodyMeasurementGuideFields: BodyMeasurementGuideFieldsInterface[] =
    bodyMeasurementGuide.map((item) => item?.fields).flat();

  useEffect(() => {
    if (openModal) {
      setDimBackground(true);
    } else {
      setDimBackground(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  useEffect(() => {
    if (
      serverError ||
      serverError !== "" ||
      Object.keys(inputError).length > 0
    ) {
      topDiveRef.current?.scrollIntoView({ block: "nearest" });
    }
  }, [serverError, inputError]);
  function onCloseModal() {
    setDimBackground(false);
    setOpenModal(false);
  }
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    measurements.forEach((measurement: MeasurementInterface) => {
      const { name, fields } = measurement;
      fields.forEach((field) => {
        const value = getInputValue(name, field);
        if (!value) {
          errors[`${name}-${field}`] = `${field} is required`;
        }
      });
    });
    setInputError(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    }
    setServerError("Please fill all required fields");
    setTimeout(() => {
      setServerError("");
    }, 5000);
    return false;
  };
  const handleAddToCart = () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    if (setIsOpen) {
      setIsOpen(true);
    }
    const payload: {
      productId: string;
      bespokeColor?: string;
      bodyMeasurements: bodyMeasurement[];
      bespokeInstruction: string;
      quantity: number;
      sku: string;
      _id?: string;
    } = {
      productId: productId?.toString(),
      bespokeColor: selectedMaterialColor,
      bodyMeasurements,
      bespokeInstruction,
      quantity: 1,
      sku: sku,
    };
    if (mode === "update" && _id) {
      payload._id = _id;
      return updateCartItem({ payload })
        .unwrap()
        .then(() => {
          setServerError("");
          onCloseModal();
        })
        .catch((err) => {
          setServerError(err.data.error);
          setTimeout(() => {
            setServerError("");
          }, 5000);
        });
    }
    addToCart({ payload })
      .unwrap()
      .then(() => {
        setServerError("");
        onCloseModal();
      })
      .catch((err) => {
        setServerError(err.data.error);

        setTimeout(() => {
          setServerError("");
        }, 5000);
      });
  };

  const getInputValue = (name: string, field: string) => {
    const found = bodyMeasurements.find(
      (item: bodyMeasurement) => item.name === name
    );
    if (found) {
      const measurement = found.measurements.find(
        (item: measurementField) =>
          item.field?.toLowerCase() === field.toLowerCase()
      );

      return measurement?.value;
    }
    return "";
  };

  const checkInputError = (name: string, field: string) => {
    return inputError[`${name}-${field}`];
  };

  const handleInputChange = (value: string, name: string, field: string) => {
    const currentBodyMeasurements = [...bodyMeasurements];
    const found = currentBodyMeasurements.find(
      (item: bodyMeasurement) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (found) {
      const measurement = found.measurements.find(
        (item: measurementField) =>
          item.field.toLowerCase() === field.toLowerCase()
      );
      if (measurement) {
        const newMeasurementObj = {
          ...measurement,
          value: Number(value) || 0,
        };
        const newMeasurements = [...found.measurements].filter(
          (item: measurementField) => item.field !== field
        );
        newMeasurements.push(newMeasurementObj);
        const updatedBodyMeasurement = {
          ...found,
          measurements: newMeasurements,
        };
        const index = currentBodyMeasurements.findIndex(
          (item: bodyMeasurement) => item.name === name
        );
        currentBodyMeasurements[index] = updatedBodyMeasurement;
      } else {
        found.measurements.push({ field, value: Number(value) });
      }
    } else {
      currentBodyMeasurements.push({
        name,
        measurements: [{ field, value: Number(value) }],
      });
    }

    setBodyMeasurements(currentBodyMeasurements);
  };
  const checkAllInputIsFilled = () => {
    let allFilled = true;
    measurements.forEach((measurement: MeasurementInterface) => {
      const { fields } = measurement;
      fields.forEach((field) => {
        const value = getInputValue(measurement.name, field);
        if (!value) {
          allFilled = false;
        }
      });
    });
    return allFilled;
  };

  return (
    <Modal
      theme={ModalTheme}
      show={openModal}
      size="lg"
      onClose={onCloseModal}
      popup
    >
      <ModalHeader />
      <ModalBody>
        <div className="space-y-6">
          <div className="flex flex-col gap-2" ref={topDiveRef}>
            <p className="text-lg font-medium font-semibold text-gray-900 dark:text-white">
              {mode === "update"
                ? "Update Body Measurements"
                : "Kindly provide us your measurements"}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span
              onClick={() => setOpenExistingBodyMeasurements(true)}
              className="text-green-700 p-2 items-center text-center bg-lightGold rounded-md text-sm cursor-pointer font-semibold"
            >
              Apply Existing Measurement
            </span>
            <span className="text-md items-center text-center font-semibold">
              OR
            </span>
            <span className="p-2 items-center text-center  rounded-md text-sm  font-semibold">
              Add New Measurement
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {getProductBodyMeasurement.isLoading && <Loading />}
            {serverError && <Alert color="failure">{serverError}</Alert>}
            {measurements?.length > 0 &&
              measurements.map((measurement: MeasurementInterface) => (
                <div
                  key={measurement.name}
                  className="flex flex-col gap-2 rounded-lg p-2 border border-slate-200 py-4"
                >
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {capitalizeFirstLetter(measurement.name)}
                  </span>
                  <div className="flex flex-col gap-1">
                    {measurement.fields.map((field: string) => (
                      <div key={field} className="flex flex-col gap-1">
                        <label
                          htmlFor={field}
                          className="text-sm text-slate-800 "
                        >
                          {field}*
                        </label>
                        <div className="flex m-2 ">
                          <input
                            type="number"
                            id={field}
                            name={`${measurement.name}-${field}`}
                            value={getInputValue(measurement.name, field) || ""}
                            onChange={(e) =>
                              handleInputChange(
                                e.target.value,
                                measurement.name,
                                field
                              )
                            }
                            className="rounded-none rounded-s-lg bg-slate-30 border border-slate-300 text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
                          />
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-slate-200 border border-e-0 border-slate-300 rounded-e-full">
                            inch
                          </span>
                        </div>
                        {checkInputError(measurement.name, field) &&
                          !getInputValue(measurement.name, field) && (
                            <span className="text-red-500 text-xs">
                              {checkInputError(measurement.name, field)}
                            </span>
                          )}
                        {bodyMeasurementGuideFields?.find(
                          (item) => item.field === field
                        ) && (
                          <BespokeBodyMeasurementGuide
                            gender={gender}
                            bodyMeasurementGuideField={
                              bodyMeasurementGuideFields?.find(
                                (item) => item.field === field
                              ) as BodyMeasurementGuideFieldsInterface
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            {measurements?.length > 0 && (
              <div className="flex flex-col gap-2 rounded-lg p-2 border border-slate-200 py-4 my-4">
                <label
                  htmlFor="bespokeInstruction"
                  className="text-sm font-semibold text-gray-500 dark:text-gray-400"
                >
                  Additional Instructions{" "}
                  <span className="text-xs font-normal"> (Optional)</span>
                </label>
                <textarea
                  id="bespokeInstruction"
                  name="bespokeInstruction"
                  value={bespokeInstruction || ""}
                  onChange={(e) => setBespokeInstruction(e.target.value)}
                  className="rounded-lg p-2 border border-slate-200 text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm"
                />
              </div>
            )}

            {measurements?.length > 0 && checkAllInputIsFilled() && (
              <div className="flex flex-col gap-1  mb-5">
                <div className="flex gap-2">
                  <label className={`inline-flex items-center cursor-pointer `}>
                    <input
                      className="peer sr-only"
                      type="checkbox"
                      id="saveMeasurementFornextTime"
                      name="saveMeasurementFornextTime"
                      checked={saveMeasurementFornextTime}
                      // disabled={!checkAllInputIsFilled()}
                      onChange={() => {
                        if (!saveMeasurementFornextTime) {
                          return setOpenUpdateBodyMeasurementTemplate(true);
                        }
                        setSaveMeasurementFornextTime(
                          !saveMeasurementFornextTime
                        );
                      }}
                    />

                    <div className="relative w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Save this measurement for next time (optional)
                    </span>
                  </label>
                </div>
                {user?.isGuest && (
                  <span className="text-info text-xs font-semibold">
                    We’ll hold your saved measurement templates for 30 days.
                    Sign in to keep as long as you want.
                  </span>
                )}
              </div>
            )}
            {measurements?.length > 0 && (
              <div
                onClick={handleAddToCart}
                className="flex justify-center bg-primary text-white p-2 rounded-lg cursor-pointer gap-2"
              >
                {mode === "update" ? "Update" : "Add to Cart"}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
        {openExistingBodyMeasurements && (
          <SliderDrawer direction="bottom">
            <ExistingBodyMeasurements
              openExistingBodyMeasurements={openExistingBodyMeasurements}
              setOpenExistingBodyMeasurements={setOpenExistingBodyMeasurements}
              setBodyMeasurements={setBodyMeasurements}
              measurements={measurements}
            />
          </SliderDrawer>
        )}
        {openUpdateBodyMeasurementTemplate && (
          <SliderDrawer direction="bottom">
            <AddUpdateBodyMeasurementTemplate
              gender={gender}
              showModal={openUpdateBodyMeasurementTemplate}
              setShowModal={setOpenUpdateBodyMeasurementTemplate}
              callBack={() => {
                setSaveMeasurementFornextTime(true);
                setOpenExistingBodyMeasurements(false);
              }}
              measurements={bodyMeasurements
                .map((item) => item.measurements)
                .flat()}
            />
          </SliderDrawer>
        )}
      </ModalBody>
    </Modal>
  );
}
