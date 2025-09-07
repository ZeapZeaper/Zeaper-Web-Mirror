import { ThemeContext } from "@/contexts/themeContext";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Modal, ModalHeader } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading";
import ReadyMadeSizeGuideTable from "./ReadyMadeSizeGuideTable";

const ModalTheme = {
  root: {
    base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-[70rem]",
    show: {
      on: "flex bg-gray-900/50 dark:bg-gray-900/80",
      off: "hidden",
    },
    sizes: {
      lg: "w-[100vw] md:max-w-4xl",
    },
  },
  content: {
    base: "fixed   w-full p:0 md:p-4 md:h-auto",
    inner:
      "relative flex h-[100vh] md:h-full md:max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
};
interface ReadyMadeSizeGuideInterface {
  top: {
    cm: [
      {
        Size?: string;
        Bust?: string;
        Waist?: string;
        Hips?: string;
        Chest?: string;
        UK: string;
        EU: string;
        AUS: string;
        "US/CAN": string;
      }
    ];
    inch: [
      {
        Size: string;
        Bust: string;
        Waist: string;
        Hips: string;
        Chest?: string;
        "US/CAN": string;
        UK: string;
        EU: string;
        AUS: string;
      }
    ];
  };
  bottom: {
    cm: [
      {
        Size: string;
        Bust: string;
        Waist: string;
        Hips: string;
        UK: string;
        EU: string;
        AUS: string;
        "US/CAN": string;
      }
    ];
    inch: [
      {
        Size: string;
        Bust: string;
        Waist: string;
        Hips: string;
        "US/CAN": string;
        UK: string;
        EU: string;
        AUS: string;
      }
    ];
  };
  footwear: {
    cm: [
      {
        Size: string;
        "Foot Length": string;
        UK: string;
        EU: string;
        AUS: string;
        "US/CAN": string;
      }
    ];
    inch: [
      {
        Size: string;
        "Foot Length": string;
        UK: string;
        EU: string;
        AUS: string;
        "US/CAN": string;
      }
    ];
  };
}
interface DataInterface {
  Size?: string;
  Bust?: string;
  Waist?: string;
  Hips?: string;
  Chest?: string;
  "Foot Length"?: string;
  UK?: string;
  EU?: string;
  AUS?: string;

  "US/CAN"?: string;
}
const ReadyMadeSizeGuideModal = ({
  openModal,
  setOpenModal,
  defaultUnit = "cm",
  defaultTitle = "top",
  defaultGender = "female",
}: {
  openModal: boolean;
  defaultUnit?: string;
  defaultTitle?: string;
  defaultGender?: string;
  setOpenModal: (open: boolean) => void;
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const token = useSelector(globalSelectors.selectAuthToken);
  const getReadyMadeSizeGuideQuery = zeapApiSlice.useGetReadyMadeSizeGuideQuery(
    {},
    { skip: !token }
  );
  const readyMadeSizeGuide = getReadyMadeSizeGuideQuery?.data?.data;
  const male: ReadyMadeSizeGuideInterface = readyMadeSizeGuide?.male;

  const female: ReadyMadeSizeGuideInterface = readyMadeSizeGuide?.female;
  const isLoading = getReadyMadeSizeGuideQuery?.isLoading;
  const [title, setTitle] = useState<string>(defaultTitle);

  const [unit, setUnit] = useState<string>(defaultUnit);
  const [gender, setGender] = useState(defaultGender);
  const [countryCode, setCountryCode] = useState<string>("UK");
  // const [activeTab, setActiveTab] = useState(0);

  function onCloseModal() {
    setDimBackground(false);
    setOpenModal(false);
  }
  useEffect(() => {
    if (openModal) {
      setDimBackground(true);
      // if (defaultGender === "female") {
      //   setActiveTab(0);
      // }
      // if (defaultGender === "male") {
      //   setActiveTab(1);
      // }
    }
    return () => {
      setDimBackground(false);
    };
  }, [openModal, setDimBackground, defaultGender]);
  const getTableData = () => {
    const selectedGenderData = gender === "female" ? female : male;

    if (!selectedGenderData) return [];

    const selectedTitleData =
      selectedGenderData[title as keyof typeof selectedGenderData];

    if (!selectedTitleData) return [];
    const selectedUnitData =
      unit === "cm" ? selectedTitleData.cm : selectedTitleData.inch;

    return selectedUnitData.map((item: DataInterface) => {
      const newObj: DataInterface = {};
      Object.keys(item).forEach((key) => {
        if (key === "Size") {
          newObj.Size = item[key];
        } else if (key === "Bust") {
          newObj.Bust = item[key];
        } else if (key === "Waist") {
          newObj.Waist = item[key];
        } else if (key === "Hips") {
          newObj.Hips = item[key];
        } else if (key === "Foot Length") {
        } else if (key === "Chest") {
          newObj.Chest = item[key];
        } else if (key === "Foot Length") {
          newObj["Foot Length"] = item[key];
        } else if (key === "UK") {
          newObj.UK = item[key];
        } else if (key === "EU") {
          newObj.EU = item[key];
        } else if (key === "AUS") {
          newObj.AUS = item[key];
        } else if (key === "US/CAN") {
          newObj["US/CAN"] = item[key];
        }
      });
      return newObj;
    });
  };
  const getTableDataWithCountryCode = () => {
    const selectedGenderData = gender === "female" ? female : male;

    if (!selectedGenderData) return [];

    const selectedTitleData =
      selectedGenderData[title as keyof typeof selectedGenderData];

    if (!selectedTitleData) return [];
    const selectedUnitData =
      unit === "cm" ? selectedTitleData.cm : selectedTitleData.inch;

    return selectedUnitData.map((item: DataInterface) => {
      const newObj: DataInterface = {};
      Object.keys(item).forEach((key) => {
        if (key === "Size") {
          newObj.Size = item[key];
        } else if (key === countryCode) {
          newObj[countryCode as keyof DataInterface] =
            item[key as keyof DataInterface];
        } else if (key === "Bust") {
          newObj.Bust = item[key];
        } else if (key === "Waist") {
          newObj.Waist = item[key];
        } else if (key === "Hips") {
          newObj.Hips = item[key];
        } else if (key === "Foot Length") {
        } else if (key === "Chest") {
          newObj.Chest = item[key];
        } else if (key === "Foot Length") {
          newObj["Foot Length"] = item[key];
        }
      });
      return newObj;
    });
  };

  return (
    <Modal
      theme={ModalTheme}
      show={openModal}
      size="lg"
      onClose={onCloseModal}
      popup
      position="top-center"
    >
      <ModalHeader>
        <span className="font-bold">Ready made size guide</span>
      </ModalHeader>
      <div className="w-full h-full flex flex-col gap-4 md:p-4">
        <div className="flex flex-col">
          {isLoading && <Loading />}

          {readyMadeSizeGuide && (
            <div className="overflow-x-auto">
              <ul className="grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow">
                <li
                  onClick={() => {
                    setGender("female");
                  }}
                  className={`me-2 cursor-pointer text-center ${
                    gender === "female" &&
                    "text-pink-500 border-green-500 border-b-2 active bg-pink-50"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center p-4   rounded-t-lg   group  
                    }`}
                  >
                    <svg
                      className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    Female
                  </span>
                </li>
                <li
                  className={`me-2 cursor-pointer text-center ${
                    gender === "male" &&
                    "text-blue-500 border-green-500 border-b-2 active bg-blue-50"
                  }`}
                  onClick={() => {
                    setGender("male");
                  }}
                >
                  <span
                    className={`inline-flex items-center justify-center p-4   rounded-t-lg   group  
                      }`}
                    aria-current="page"
                  >
                    <svg
                      className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    Male
                  </span>
                </li>
              </ul>
              {gender && readyMadeSizeGuide && (
                <div className="hidden md:flex flex-col gap-2">
                  <ReadyMadeSizeGuideTable
                    title={title}
                    setTitle={setTitle}
                    unit={unit}
                    setUnit={setUnit}
                    tableData={getTableData()}
                    gender={gender}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                  />
                </div>
              )}
              {gender && readyMadeSizeGuide && (
                <div className="flex md:hidden flex-col gap-2">
                  <ReadyMadeSizeGuideTable
                    title={title}
                    setTitle={setTitle}
                    unit={unit}
                    setUnit={setUnit}
                    tableData={getTableDataWithCountryCode()}
                    gender={gender}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ReadyMadeSizeGuideModal;
