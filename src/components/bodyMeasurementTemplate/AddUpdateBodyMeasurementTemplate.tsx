import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Alert, Modal } from "flowbite-react";
import { useSelector } from "react-redux";
import Loading from "../../app/products/loading";
import { useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LoadingDots from "../loading/LoadingDots";

type measurementField = {
  field: string;
  value: number;
};
const ModalTheme = {
  root: {
    base: "fixed inset-x-0-[20%] top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 ",
    show: {
      on: "flex bg-gray-900/50 dark:bg-gray-900/80",
      off: "hidden",
    },
    sizes: {
      lg: "w-[100vw] md:max-w-xl ",
    },
  },
  content: {
    base: "relative  w-full md:p-4 md:h-auto",
    inner:
      "relative flex h-[100vh]  flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
};

const AddUpdateBodyMeasurementTemplate = ({
  showModal,
  setShowModal,
  measurements,
  gender,
  callBack,
}: {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  measurements: measurementField[];
  gender: string;
  callBack: () => void;
}) => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const getBodyMeasurementTemplatesQuery =
    zeapApiSlice.useGetBodyMeasurementTemplatesQuery({}, { skip: !token });
  const templates = getBodyMeasurementTemplatesQuery?.data?.data;
  const [serverError, setServerError] = useState("");
  const [templateName, setTemplateName] = useState<string>("");
  const [addBodyMeasurementTemplate, addBodyMeasurementTemplateStatus] =
    zeapApiSlice.useAddBodyMeasurementTemplateMutation();
  const [updateBodyMeasurementTemplate, updateBodyMeasurementTemplateStatus] =
    zeapApiSlice.useUpdateBodyMeasurementTemplateMutation();
  const isLoading =
    getBodyMeasurementTemplatesQuery?.isLoading ||
    addBodyMeasurementTemplateStatus.isLoading ||
    updateBodyMeasurementTemplateStatus.isLoading;
  const handleClose = () => setShowModal(false);

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
      measurements,
    };
    addBodyMeasurementTemplate({ payload })
      .unwrap()
      .then(() => {
        setServerError("");
        callBack();
        setShowModal(false);
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
      measurements,
      gender
    };
    updateBodyMeasurementTemplate({ payload })
      .unwrap()
      .then(() => {
        setServerError("");
        callBack();
        setShowModal(false);
      })
      .catch((err) => {
        setServerError(err.data.error);
        setTimeout(() => {
          setServerError("");
        }, 5000);
      });
  };

  return (
    <Modal theme={ModalTheme} show={showModal} onClose={handleClose} size="lg">
      {" "}
      <Modal.Header title="Measurement Template" />
      <Modal.Body>
        {isLoading && <Loading />}{" "}
        {serverError && <Alert color="failure">{serverError}</Alert>}
        <div className="flex flex-col gap-4 p-4">
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
          <div>
            <ButtonPrimary
              className="border-2 border-gold bg-transparent text-gold"
              textClassName="text-gold"
              sizeClass="px-4 py-2"
              onClick={handleAddTemplate}
            >
              {isLoading ? <LoadingDots /> : "Save New Template"}
            </ButtonPrimary>
          </div>
        </div>
        {templates?.length > 0 && (
          <>
            <div className="text-center font-bold">OR</div>
            <div className="font-semibold">
              Choose an existing template to update
            </div>
            <div className="flex flex-col gap-2 p-4 ">
              {templates.map((template: { templateName: string }) => (
                <div
                  key={template.templateName}
                  className="flex items-center justify-between mt-2"
                >
                  <span>{template.templateName}</span>
                  <span
                    onClick={() => {
                      handleUpdateTemplate(template.templateName);
                    }}
                    className="flex p-2 items-center justify-center rounded-lg bg-lightSuccess  cursor-pointer hover:bg-success hover:text-white transition duration-200 ease-in-out"
                  >
                    Update
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddUpdateBodyMeasurementTemplate;
