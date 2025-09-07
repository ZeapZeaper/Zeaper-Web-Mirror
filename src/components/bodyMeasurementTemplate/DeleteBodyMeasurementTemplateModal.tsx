import { BodyMeasurementTemplateInterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useState } from "react";
import LoadingDots from "../loading/LoadingDots";

const DeleteBodyMeasurementTemplate = ({
  template,
}: {
  template: BodyMeasurementTemplateInterface;
}) => {
  const [deleteBodyMeasurementTemplate, deleteBodyMeasurementTemplateStatus] =
    zeapApiSlice.useDeleteBodyMeasurementTemplateMutation();
  const isLoading = deleteBodyMeasurementTemplateStatus.isLoading;
  const [openModal, setOpenModal] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleDeleteTemplate = () => {
    const payload = {
      template_id: template._id,
    };
    deleteBodyMeasurementTemplate({ payload })
      .unwrap()
      .then(() => {
        setServerError("");
        setOpenModal(false);
      })
      .catch((err) => {
        setServerError(err.data.error);
        setTimeout(() => {
          setServerError("");
        }, 5000);
      });
  };
  return (
    <div>
      {" "}
      <span
        onClick={() => {
          setOpenModal(true);
        }}
        data-testid="edit-template"
        role="button"
        aria-label="edit-template"
        className="text-red-700 p-2 h-fit items-center text-center bg-yellow-50 rounded-md text-sm cursor-pointer font-semibold"
      >
        {isLoading ? <LoadingDots /> : "Delete Template"}
      </span>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg flex gap-4 flex-col">
            <h2 className="text-lg font-semibold">Delete Template</h2>
            <p>
              Are you sure you want to delete this template -{" "}
              {template.templateName}?
            </p>
            {serverError && <p className="text-red-500">{serverError}</p>}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDeleteTemplate}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                {isLoading ? <LoadingDots /> : "Confirm Delete"}
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="bg-slate-300 text-gray-700 px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBodyMeasurementTemplate;
