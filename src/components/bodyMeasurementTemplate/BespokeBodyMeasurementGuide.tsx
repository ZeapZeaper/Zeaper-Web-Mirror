import { Alert } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import {  HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

interface BodyMeasurementGuideFieldsInterface {
  _id: string;
  field: string;
  imageUrl: {
    name: string;
    link: string;
  };
  description: string;
}

const BespokeBodyMeasurementGuide = ({
  bodyMeasurementGuideField,
  gender = "female"
}: {
  bodyMeasurementGuideField: BodyMeasurementGuideFieldsInterface;
  gender?: string;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  return (
    <>
      <span
        onClick={() => {
          setShowGuide(!showGuide);
        }}
        role="button"
        aria-hidden="true"
        className={`inline-flex items-center gap-1 text-xs cursor-pointer font-medium text-gray-500 dark:text-gray-400   p-2 w-fit rounded-full  ${
          showGuide
            ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 "
            : "bg-green-50 text-green-700 hover:bg-green-100"
        }`}
      >
        {showGuide ? "Hide Measurement Guide" : "Show Measurement Guide"} {showGuide ? (
              <HiArrowSmUp  />
            ) : (
              <HiArrowSmDown />
            )}
      </span>

      {showGuide && (
        <div className={`p-4  ${gender === "female" ? "bg-pink-50" : "bg-blue-50"} `}>
          <div className="pb-9 pt-6">
            <div className="flex  gap-2 items-center justify-between">
              <h2 className="mb-3 text-md font-semibold text-info">
                {bodyMeasurementGuideField.field}
              </h2>
            </div>

            {bodyMeasurementGuideField.description ? (
              <p className="mb-4">{bodyMeasurementGuideField.description} </p>
            ) : (
              <Alert color="info" className="text-sm m-2 mb-4">
                No description available.
              </Alert>
            )}
            <div className="flex justify-between item-center">
              <div
                onClick={() => {
                  setOpenModal(true);
                }}
                className="text-xs cursor-pointer inline-flex items-center gap-1.5 rounded-md border border-solid border-green-700 bg-green-50 p-1 font-semibold text-green-800 shadow transition-colors hover:bg-green-900 hover:text-green-50 focus:bg-green-900 focus:text-green-50"
              >
                View Image Example
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="bg-white rounded-lg p-4 w-full max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold mb-4">
                {bodyMeasurementGuideField.field}
              </h2>
              <button
                onClick={() => setOpenModal(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <IoMdClose size={24} />
              </button>
            </div>

            <Image
              src={bodyMeasurementGuideField.imageUrl.link}
              alt={bodyMeasurementGuideField.imageUrl.name}
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BespokeBodyMeasurementGuide;
