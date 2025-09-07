import { checkIfHtml, correctULTagFromQuill } from "@/utils/helpers";
import React, { useEffect } from "react";

const ProductDescription = ({ description }: { description: string }) => {
  const descriptionHtmlRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  useEffect(() => {
    if (descriptionHtmlRef.current) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(
        correctULTagFromQuill(description),
        "text/html"
      );
      descriptionHtmlRef.current.innerHTML = doc.body.innerHTML;
    }
  }, [description]);

  return (
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      data-inactive-classes="text-gray-500 dark:text-gray-400"
    >
      <h2 id="accordion-flush-heading-1">
        <button
          onClick={handleClick}
          type="button"
          className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="true"
          aria-controls="accordion-flush-body-1"
        >
          <div className=" p-2">
            <span className="text-lg ">Product Description</span>
          </div>
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
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        className={`py-5 border-b border-gray-200 dark:border-gray-700 text-sm flex flex-col ${
          active ? "block" : "hidden"
        }`}
        aria-labelledby="accordion-flush-heading-1"
      >
        {checkIfHtml(description) ? (
          <div ref={descriptionHtmlRef} className="px-5 py-2"></div>
        ) : (
          <div className="px-5 py-2">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
