import { AuthContext } from "@/contexts/authContext";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useContext, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";
import ReactCountryFlag from "react-country-flag";
import { Alert } from "flowbite-react";
import LoadingDots from "../loading/LoadingDots";

const currencyEnums = [
  {
    currency: "USD",
    label: "United States Dollar",
    symbol: "$",
    countryCode: "US",
  },
  {
    currency: "NGN",
    label: "Nigerian Naira",
    symbol: "₦",
    countryCode: "NG",
  },

  {
    currency: "GBP",
    label: "British Pound Sterling",
    symbol: "£",
    countryCode: "GB",
  },
];
type currencyType = "USD" | "NGN" | "GBP";

const MobileCurrencyPreference = () => {
  const { user, setUser } = useContext(AuthContext);
  const token = useSelector(globalSelectors.selectAuthToken);

  const [active, setActive] = useState(false);

  const prefferedCurrency = user?.prefferedCurrency;
  const [error, setError] = useState("");
  const preferedCountryCode =
    currencyEnums.find((currency) => currency.currency === prefferedCurrency)
      ?.countryCode || "NG";
  const [updateUser, UpdateUserStatus] = zeapApiSlice.useUpdateUserMutation();
  const isLoading = UpdateUserStatus.isLoading;
  const getAuthUserRecommendedCurrencyQuery =
    zeapApiSlice.useGetAuthUserRecommendedCurrencyQuery({}, { skip: !token });
  const recommendedCurrency = getAuthUserRecommendedCurrencyQuery?.data?.data;

  const recommendedCurrencyEnums = currencyEnums.find(
    (currency) => currency.currency === recommendedCurrency
  );

  const handleSave = async (curr: currencyType) => {
    const payload = {
      _id: user?._id,

      prefferedCurrency: curr,
    };
    updateUser({ payload })
      .then((data) => {
        const user = data?.data?.data;
        setUser(user);
      })

      .catch((e) => {
        console.error(e.data);
        setError(e.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };
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
          className="flex font-extrabold text-lg text-info items-center justify-between w-full py-5 px-2 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="true"
          aria-controls="accordion-flush-body-1"
        >
          <div>
            <span className="inline-flex items-center gap-2">
              {" "}
              <ReactCountryFlag countryCode={preferedCountryCode} className="p-2"/>
              Currency Preference
            </span>
          </div>
          {active ? <HiMinus /> : <HiPlus />}
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        className={`py-5 px-2 border-b border-gray-200 dark:border-gray-700 text-sm flex flex-col ${
          active ? "block" : "hidden"
        }`}
        aria-labelledby="accordion-flush-heading-1"
      >
        <div className="w-full text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-col items-center gap-2 w-full ">
            <div className="flex items-center justify-center mt-2 w-full">
              {isLoading ? (
                <LoadingDots />
              ) : (
                <p className="text-md text-center text-gray-500">
                  Select your preferred currency
                </p>
              )}
              {error && (
                <p className="text-md text-center text-red-500">{error}</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 w-full p-4">
              {currencyEnums.map((currency) => (
                <div
                  key={currency.currency}
                  onClick={() => handleSave(currency.currency as currencyType)}
                  className={`flex items-center  w-full gap-2 p-2 rounded-md cursor-pointer hover:bg-slate-100 border border-slate-200 ${
                    prefferedCurrency === currency.currency
                      ? "bg-green-100 border-slate-300"
                      : ""
                  }`}
                >
                  <div>
                    <ReactCountryFlag countryCode={currency?.countryCode} />
                  </div>
                  <div className="flex gap-1">
                    <span className="text-md text-gray-500">
                      {currency.currency}
                    </span>
                    <span className="text-md text-gray-500">
                      {currency.symbol}
                    </span>
                  </div>
                </div>
              ))}
              {recommendedCurrencyEnums && (
                <Alert color="info" className="col-span-3 mt-4">
                  <div className="flex gap-2">
                    <span className="text-md text-gray-500">
                      Recommended Currency based on your location:
                    </span>
                    <span className="text-md text-gray-500">
                      <ReactCountryFlag
                        countryCode={recommendedCurrencyEnums?.countryCode}
                      />
                    </span>
                    <span className="text-md text-gray-500">
                      {recommendedCurrencyEnums?.currency}
                    </span>
                    <span className="text-md text-gray-500">
                      {recommendedCurrencyEnums?.symbol}
                    </span>
                  </div>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCurrencyPreference;
