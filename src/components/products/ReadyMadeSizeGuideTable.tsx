import { Dropdown, DropdownItem } from "flowbite-react";

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

interface Props {
  title: string;
  setTitle: (title: string) => void;
  setUnit: (unit: string) => void;
  unit: string;
  tableData: DataInterface[];
  gender: string;
  countryCode: string;
  setCountryCode: (code: string) => void;
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
}: Props) => {
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

  const highlightColor = gender === "female" ? "bg-pink-100" : "bg-blue-100";
  const headerColor = gender === "female" ? "bg-pink-500" : "bg-blue-500";

  return (
    <div className="flex flex-col gap-8 px-2 sm:px-4 py-4">
      {/* --- Header Controls --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Option Buttons */}
        <div className="grid grid-cols-3 w-full md:w-auto border border-gray-300 rounded-full overflow-hidden">
          {options.map((option) => {
            const isActive = title === option.value;
            return (
              <button
                key={option.value}
                onClick={() => setTitle(option.value)}
                className={`py-2 px-4 text-sm sm:text-base transition-colors ${
                  isActive
                    ? "bg-primary text-white font-semibold"
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {option.name}
              </button>
            );
          })}
        </div>

        {/* Unit & Country Controls */}

        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto">
          <div
            className="inline-flex items-center rounded-full border border-gray-300 bg-white p-1 shadow-sm"
            role="group"
            aria-label="Unit selector"
          >
            <button
              type="button"
              onClick={() => setUnit("cm")}
              className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${
                unit === "cm"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-pressed={unit === "cm"}
            >
              CM
            </button>
            <button
              type="button"
              onClick={() => setUnit("inch")}
              className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${
                unit === "inch"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-pressed={unit === "inch"}
            >
              INCH
            </button>
          </div>

          {/* Country dropdown (mobile only) */}
          <div className="md:hidden">
            <Dropdown
              label={countryCode || "Select code"}
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

      {/* --- Table Section --- */}
      {tableData.length === 0 ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            No data available
          </p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto overflow-y-auto max-h-[70vh] rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full min-w-[500px] text-sm text-left text-gray-600 dark:text-gray-400 border-collapse">
            {/* Header */}
            <thead>
              <tr
                className={`text-xs sm:text-sm text-white uppercase tracking-wider ${headerColor}`}
              >
                {Object.keys(tableData[0]).map((key) => (
                  <th
                    key={key}
                    scope="col"
                    className={`sticky top-0 z-10 px-3 py-2 sm:px-4 sm:py-3 font-semibold whitespace-nowrap ${headerColor}`}
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {Object.entries(row).map(([key, value], colIndex) => (
                    <td
                      key={key}
                      className={`px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-900 dark:text-white whitespace-nowrap ${
                        colIndex === 0 ? `font-bold ${highlightColor}` : ""
                      }`}
                    >
                      {value || "-"}
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
