import { BodyMeasurementTemplateInterface } from "@/interface/interface";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { Badge } from "flowbite-react";
import { useState } from "react";

const MeasurementTemplate = ({
  template,
  showSelectButton = false,
  buttonLabel = "Select",
}: {
  template: BodyMeasurementTemplateInterface;
  showSelectButton?: boolean;
  buttonLabel?: string;
}) => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      data-inactive-classes="text-gray-500 dark:text-gray-400"
    >
      <h2 id="accordion-flush-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="true"
          aria-controls="accordion-flush-body-1"
        >
          <div className="flex items-center gap-1">
            <span className="text-lg font-semibold">
              {template.templateName} {template?.gender && `- ${capitalizeFirstLetter(template.gender)}`}
            </span>
            {showSelectButton && <Badge color="success">{buttonLabel}</Badge>}
          </div>
          <span
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleClick();
            }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
          >
            <svg
              data-accordion-icon
              className="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </span>
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        className={`py-5 border-b border-gray-200 dark:border-gray-700 text-sm flex flex-col  bg-white p-2  ${
          active ? "block" : "hidden"
        }`}
        aria-labelledby="accordion-flush-heading-1"
      >
        {template?.measurements.map((measurement) => (
          <div
            key={measurement.field}
            className="flex justify-between gap-2 text-gray-500 dark:text-gray-400"
          >
            <span className="">{measurement.field}</span>

            <span className="text-info font-semibold font-light">
              {measurement.value} {measurement.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeasurementTemplate;
