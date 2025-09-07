import { BackwardIcon, HomeIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";

function Content() {
  const router = useRouter();
  return (
    <>
      <div className="mb-4 mt-2 text-sm md:text-lg text-cyan-700 dark:text-cyan-800">
        No product matching your search criteria. Please
        try again later 
      </div>
      <div className="flex">
        <button
          type="button"
          onClick={() => router.back()}
          className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs md:text-lg font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
        >
          <BackwardIcon className="-ml-0.5 mr-2 h-4 w-4" />
          Go Back
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mr-2 inline-flex items-center  rounded-lg border border-cyan-700 bg-transparent px-3 py-1.5 text-center text-xs md:text-lg font-medium text-cyan-700 hover:bg-cyan-800 hover:text-white focus:ring-4 focus:ring-cyan-300 dark:border-cyan-800 dark:text-cyan-800 dark:hover:text-white"
        >
          <HomeIcon className="-ml-0.5 mr-2 h-4 w-4" />
          Home
        </button>
      </div>
    </>
  );
}

const NoProduct = () => {
  return (
    <div>
      {/* build no product found page with intruction on what next */}
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Alert
            color="info"
            icon={InformationCircleIcon}
            rounded
            withBorderAccent
            additionalContent={<Content />}
          >
            <h1 className="text-2xl font-bold">No Product Found</h1>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default NoProduct;
