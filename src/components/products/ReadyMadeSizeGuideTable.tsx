import { ToggleSwitch, Dropdown, DropdownItem } from "flowbite-react";
const toggleTheme = {
  toggle: {
    base: "relative rounded-full after:absolute after:rounded-full after:border after:bg-white after:transition-all group-focus:ring-4",
    checked: {
      on: "after:translate-x-full after:border-transparent rtl:after:-translate-x-full",
      off: "bg-indigo-400 after:border-gray-300 dark:bg-gray-700",
    },
  },
};

interface DataInterface {
  Size?: string;
  Bust?: string;
  Waist?: string;
  Hips?: string;
  "Foot Length"?: string;
  Chest?: string;
  UK?: string;
  EU?: string;
  AUS?: string;

  "US/CAN"?: string;
}

const ReadyMadeSizeGuideTable = ({
  title,
  setTitle,
  setUnit,
  unit,
  tableData,
  gender,
  countryCode,
  setCountryCode,
}: {
  title: string;
  setTitle: (title: string) => void;
  setUnit: (unit: string) => void;
  unit: string;
  tableData: DataInterface[];
  gender: string;
  countryCode: string;
  setCountryCode: (countryCode: string) => void;
}) => {
  const options = [
    { name: "Top", value: "top" },
    { name: "Bottom", value: "bottom" },
    { name: "Footwear", value: "footwear" },
  ];
  const countryCodeOptions = [
    { name: "UK", value: "UK" },
    { name: "EU", value: "EU" },
    { name: "AUS", value: "AUS" },
    { name: "US/CAN", value: "US/CAN" },
  ];

  return (
    <div className="flex flex-col gap-8 p-1 md:px-4 py-4">
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
        <div className="grid grid-cols-3 gap-4 rounded-full border border-gray-300   cursor-pointer divider-x divider-gray-300 my-4">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => setTitle(option.value)}
              className={`flex items-center gap-2 cursor-pointer ${
                title === "top" && "rounded-s-full"
              } ${title === "footwear" && "rounded-e-full"} ${
                title === "bottom" && "rounded-full"
              }  px-4 py-2 text-center justify-center w-full ${
                title === option.value
                  ? "bg-primary text-white font-semibold"
                  : "text-gray-500 "
              }`}
            >
              {option.name}
            </div>
          ))}
        </div>
        {/* <hr className="text-sm font-semibold text-gray-500 dark:text-gray-400" /> */}
        <div className="flex gap-4 w-full md:w-fit items-center p-2 my-4">
          <span className="text-sm ">
            Switch to
          </span>
          <div className="flex items-center gap-4">
            <ToggleSwitch
              theme={toggleTheme}
              checked={unit === "cm"}
              onChange={() => setUnit(unit === "cm" ? "inch" : "cm")}
              label={unit === "cm" ? "CM" : "INCH"}
              color="info"
            />
          </div>
          <div className="flex md:hidden items-center gap-4">
            <Dropdown
              label={countryCode || "Select country code"}
              color={gender === "female" ? "pink" : "info"}
              size="xs"
            >
              {countryCodeOptions.map((option) => (
                <DropdownItem
                  key={option.value}
                  onClick={() => setCountryCode(option.value)}
                >
                  {option.name}
                </DropdownItem>
              ))}
            </Dropdown>
          </div>
        </div>
      </div>
      {tableData.length === 0 && (
        <div className="flex items-center justify-center w-full h-32">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            No data available
          </p>
        </div>
      )}
      {tableData.length > 0 && (
        <div className="relative overflow-x-auto h-[60rem] my-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr
                className={`  text-white ${
                  gender === "female" ? "bg-pink-500" : "bg-blue-500"
                }`}
              >
                {Object.keys(tableData[0]).map((key) => (
                  <th key={key} scope="col" className="px-6 py-3 uppercase ">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  {Object.values(row).map((value, index) => (
                    <td
                      key={index}
                      className={
                        "px-6 py-2 text-xs md:text-sm  text-gray-900 whitespace-nowrap dark:text-white " +
                        (index === 0
                          ? gender === "female"
                            ? "font-bold bg-pink-200"
                            : "font-bold bg-blue-200"
                          : "")
                      }
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReadyMadeSizeGuideTable;
