"use client";
import { useRouter } from "next/navigation";
import HelpCenter from "./components/HelpCenter";
import SearchHelpArticle from "./components/SearchHelpArticle";

const HelpCenterPage = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-8 mb-28">
      {" "}
      <div className="flex flex-col gap-4 mt-8">
        {/* Go Back */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mr-2 w-fit inline-flex items-center rounded-lg bg-secondary px-3 py-1.5 text-center text-xs md:text-lg font-medium text-white hover:bg-secondary/80 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900 mb-4"
        >
          <svg
            className="-ml-0.5 mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
          Go Back
        </button>
        {/* Title */}
        <div className="flex items-center justify-center ">
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">
            Welcome to the Help Center
          </p>
        </div>
        <SearchHelpArticle />
        <HelpCenter />
      </div>
    </div>
  );
};

export default HelpCenterPage;
