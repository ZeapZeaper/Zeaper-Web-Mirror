import {
  BackwardIcon,
  HomeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import DisabledShopReason from "./DisabledShopReason";
const possibleReasons = [
  {
    title: "Shop is not yet approved",
    description:
      "You just recently created your shop and yet to complete your admission into Zeaper. If you have not been contacted by our team within 48 hours, please contact support.",
  },
  {
    title: "Shop is under review",
    description:
      "Your shop is currently under review. Please check back later.",
  },
  {
    title: "Policy violations",
    description:
      "Your shop has been disabled due to policy violations. Please contact support for more information.",
  },
];

function Content() {
  const router = useRouter();

  return (
    <>
      <div className="mb-4 mt-2 text-sm md:text-lg text-cyan-700 dark:text-cyan-800 w-[90vw]"></div>{" "}
      <div className="mb-4 mt-2 text-sm md:text-lg text-slate-700 bg-white p-4 rounded-lg ">
        <h1 className="text-lg font-bold">Possible Reasons</h1>

        {possibleReasons.map((reason, index) => (
          <DisabledShopReason
            key={index}
            title={reason.title}
            description={reason.description}
          />
        ))}
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

const DisabledShop = () => {
  return (
    <div>
      {/* build no Shop found page with intruction on what next */}
      <div className="flex items-center justify-center h-[calc(100vh-15rem)]">
        <div className="text-center">
          <Alert
            color="failure"
            icon={InformationCircleIcon}
            rounded
            withBorderAccent
            additionalContent={<Content />}
          >
            <h1 className="text-2xl font-bold">
              Your Shop is currently Disabled
            </h1>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default DisabledShop;
