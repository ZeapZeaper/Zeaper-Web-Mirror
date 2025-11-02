import { globalSelectors } from "@/redux/services/global.slice";
import { useSelector } from "react-redux";

import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Image from "next/image";
import { useState } from "react";

type DocKey =
  | "proof_of_identity"
  | "business_registration"
  | "business_address";
type ExistingDoc = {
  slug: DocKey;
  link?: string;
  label: string;
  filetype: "image" | "pdf";
};

const ShopDoc = ({ doc }: { doc: ExistingDoc }) => {
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
          onClick={handleClick}
          type="button"
          className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="true"
          aria-controls="accordion-flush-body-1"
        >
          <div className=" p-2">
            <span className="text-lg ">{doc.label}</span>
          </div>
          {!active ? (
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
          ) : (
            <svg
              data-accordion-icon
              className="w-3 h-3 shrink-0"
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
                d="M1 1l4 4 4-4"
              />
            </svg>
          )}
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        className={`py-5 border-b border-gray-200 dark:border-gray-700 text-sm flex flex-col ${
          active ? "block" : "hidden"
        }`}
        aria-labelledby="accordion-flush-heading-1"
      >
        {!doc.link && <div className="px-5 py-2">No document uploaded</div>}
        {doc.link && doc.filetype === "pdf" && (
          <div className="px-5 py-2">
            <a
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View PDF Document
            </a>
          </div>
        )}
        {doc.link && doc.filetype === "image" && (
          <div className="px-5 py-2">
            <Image
              src={doc.link}
              alt={doc.label}
              width={400}
              height={400}
              className="max-w-full h-auto border"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const OnboadingDocuments = ({ shopId }: { shopId: string }) => {
  const token = useSelector(globalSelectors.selectAuthToken);

  const getShopDocsQuery = zeapApiSlice.useGetShopOnboardingDocumentsQuery(
    { shopId },
    { skip: !shopId || !token }
  );
  const isLoading = getShopDocsQuery.isLoading;
  const existingDocs = getShopDocsQuery?.data?.data as
    | ExistingDoc[]
    | undefined;

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 text-black rounded-lg shadow sm:p-8 dark:bg-slate-800 dark:text-white dark:border-gray-700">
      <h5 className="text-xl font-bold text-primary">
        Identity & Shop Documents
      </h5>
      {isLoading && <div>Loading documents...</div>}
      {existingDocs && existingDocs?.length > 0 && (
        <ul className="mt-4">
          {existingDocs?.map((doc) => (
            <li key={doc.slug} className="mb-4">
              <ShopDoc doc={doc} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OnboadingDocuments;
