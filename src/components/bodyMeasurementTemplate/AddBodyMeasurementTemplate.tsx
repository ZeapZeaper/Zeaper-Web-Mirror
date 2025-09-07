"use client";

import {
  Alert,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/contexts/themeContext";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "../loading/Loading";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LoadingDots from "../loading/LoadingDots";
import {
  BodyMeasurementGuideInterface,
  BodyMeasurementTemplateInterface,
} from "@/interface/interface";
import BespokeBodyMeasurementGuide from "./BespokeBodyMeasurementGuide";

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

type measurementField = {
  field: string;
  value: number;
};
interface BodyMeasurementGuideFieldsInterface {
  _id: string;
  field: string;
  imageUrl: {
    name: string;
    link: string;
  };
  description: string;
}

export function AddBodyMeasurementTemplate({
  openModal,
  setOpenModal,
  gender,
  template,
}: {
  openModal: boolean;
  gender: string;
  setOpenModal: (open: boolean) => void;
  template?: BodyMeasurementTemplateInterface;
}) {
  const topDiveRef = useRef<HTMLDivElement>(null);
  const token = useSelector(globalSelectors.selectAuthToken);
  const { setDimBackground } = useContext(ThemeContext);
  const [measurementInputs, setMeasurementInputs] = useState<
    measurementField[]
  >([]);

  const [templateName, setTemplateName] = useState<string>("");

  const [addBodyMeasurementTemplate, addBodyMeasurementTemplateStatus] =
    zeapApiSlice.useAddBodyMeasurementTemplateMutation();
  const [updateBodyMeasurementTemplate, updateBodyMeasurementTemplateStatus] =
    zeapApiSlice.useUpdateBodyMeasurementTemplateMutation();
  const [serverError, setServerError] = useState("");
  const getBodyMeasurementTemplateDataQuery =
    zeapApiSlice.useGetBodyMeasurementTemplatesQuery({}, { skip: !token });
  const templates = getBodyMeasurementTemplateDataQuery?.data?.data;
  const getBodyMeasurementGuideFieldsQuery =
    zeapApiSlice.useGetBodyMeasurementGuideFieldsQuery(
      { gender },
      { skip: !token || !gender }
    );
  const bodyMeasurementTemplateFields: string[] =
    getBodyMeasurementGuideFieldsQuery?.data?.data
      ? [...getBodyMeasurementGuideFieldsQuery?.data?.data]
          .map((item) => item.field)
          .filter((item) => item !== "")
          .sort((a, b) => a.localeCompare(b))
      : [];
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

  function onCloseModal() {
    setDimBackground(false);
    setOpenModal(false);
  }
  useEffect(() => {
    if (openModal) {
      setDimBackground(true);
      topDiveRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    return () => {
      setDimBackground(false);
    };
  }, [openModal, setDimBackground]);

  useEffect(() => {
    if (serverError) {
      topDiveRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        setServerError("");
      }, 5000);
    }
  }, [serverError]);
  useEffect(() => {
    if (template) {
      setTemplateName(template.templateName);
      const templateMeasurements = template.measurements.map(
        (measurement: measurementField) => ({
          field: measurement.field,
          value: measurement.value,
        })
      );
      setMeasurementInputs(templateMeasurements);
    }
  }, [template]);

  const getInputValue = (field: string) => {
    const found = measurementInputs.find(
      (item: measurementField) => item.field === field
    );
    if (found) {
      return found.value;
    }
    return "";
  };

  const handleInputChange = (value: string, field: string) => {
    const currentBodyMeasurements = [...measurementInputs];
    const found = currentBodyMeasurements.find(
      (item: measurementField) => item.field === field
    );
    if (found) {
      found.value = Number(value);
    }
    if (!found) {
      currentBodyMeasurements.push({
        field,
        value: Number(value),
      });
    }
    setMeasurementInputs(currentBodyMeasurements);
  };

  const handleAddTemplate = () => {
    if (!templateName) {
      setServerError("Template name is required");
      return;
    }
    const templateExists = templates?.some(
      (template: { templateName: string }) =>
        template.templateName === templateName
    );
    if (templateExists) {
      setServerError("Template name already exists");
      return;
    }
    setServerError("");
    const payload = {
      templateName,
      measurements: measurementInputs,
      gender,
    };
    addBodyMeasurementTemplate({ payload })
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

  const handleUpdateTemplate = (name: string) => {
    const payload = {
      templateName: name,
      measurements: measurementInputs,
    };
    updateBodyMeasurementTemplate({ payload })
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
          <div className="flex justify-between gap-2" ref={topDiveRef}>
            <p className="text-lg font-medium font-semibold text-gray-900 dark:text-white">
              New Template
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {gender === "male" ? (
              <span className="text-green-700 p-2 items-center text-center bg-blue-50 rounded-md text-sm cursor-pointer font-semibold">
                Male Measurement Template
              </span>
            ) : (
              <span className="text-green-700 p-2 items-center text-center bg-pink-50 rounded-md text-sm cursor-pointer font-semibold">
                Female Measurement Template
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {getBodyMeasurementGuideFieldsQuery.isLoading && <Loading />}
            {serverError && <Alert color="failure">{serverError}</Alert>}

            <div className="flex flex-col gap-1">
              <label htmlFor="templateName" className="text-sm font-semibold">
                New Template Name
              </label>
              <input
                type="text"
                id="templateName"
                value={templateName || ""}
                onChange={(e) => setTemplateName(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter template name"
              />
            </div>

            {bodyMeasurementTemplateFields?.length > 0 &&
              bodyMeasurementTemplateFields.map((field: string) => (
                <div
                  key={field}
                  className="flex flex-col gap-2 rounded-lg p-2 border border-slate-200 py-4 my-6"
                >
                  <div className="flex flex-col gap-1">
                    <label htmlFor={field} className="text-sm text-slate-800 ">
                      {field}
                    </label>
                    <div className="flex m-2 ">
                      <input
                        type="number"
                        id={field}
                        name={field}
                        value={getInputValue(field) || ""}
                        onChange={(e) =>
                          handleInputChange(e.target.value, field)
                        }
                        className="rounded-none rounded-s-lg bg-slate-30 border border-slate-300 text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
                      />
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-slate-200 border border-e-0 border-slate-300 rounded-e-full">
                        inch
                      </span>
                    </div>
                  </div>
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
      </ModalBody>
      <ModalFooter className="bg-slate-900">
        {" "}
        <div>
          <ButtonPrimary
            className="border-2 border-gold bg-transparent text-green-100"
            textClassName="text-gold"
            sizeClass="px-4 py-2"
            onClick={() =>
              template
                ? handleUpdateTemplate(templateName)
                : handleAddTemplate()
            }
          >
            {addBodyMeasurementTemplateStatus?.isLoading ||
            updateBodyMeasurementTemplateStatus?.isLoading ? (
              <LoadingDots />
            ) : (
              "Save New Template"
            )}
          </ButtonPrimary>
        </div>
      </ModalFooter>
    </Modal>
  );
}
