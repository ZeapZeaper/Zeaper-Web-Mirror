import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { getCurrencySmallSymbol, numberWithCommas } from "@/utils/helpers";
import { useState, type FC } from "react";
import { VscSymbolMethod } from "react-icons/vsc";
import { useSelector } from "react-redux";

interface Props {
  method: string;
  setMethod: (value: string) => void;
  country: string;
}
type DeliveryFeesType = {
  label: string;
  fee: number;
  method: string;
};

const DeliveryMethod: FC<Props> = ({ method, setMethod, country }) => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const getBasketDeliveryFeesQuery = zeapApiSlice.useGetBasketDeliveryFeesQuery(
    { country },
    { skip: !token || !country }
  );
  const currency = getBasketDeliveryFeesQuery?.data?.data?.currency || "NGN";
  const deliveryFees: DeliveryFeesType[] =
    getBasketDeliveryFeesQuery?.data?.data?.deliveryFees || [];
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-xl border border-neutral-300  `}>
      <div className="flex flex-col items-start p-6 sm:flex-row">
        <span className="hidden sm:block">
          <VscSymbolMethod className="text-3xl text-gold" />
        </span>

        <div className="flex w-full items-center justify-between">
          <div className="sm:ml-8">
            <span className="uppercase font-semibold">DELIVERY Method</span>
            <div className="mt-1 text-sm">
              <span className="">{method}</span>
            </div>
          </div>
          {country.toLowerCase() !== "nigeria" && (
            <ButtonPrimary
              className="border-2 border-gold bg-transparent text-gold cursor-pointer hover:bg-gold hover:text-white"
              textClassName="text-gold"
              sizeClass="px-4 py-2"
              onClick={() => setOpen(!open)}
            >
              {open ? "Close" : "Edit"}
            </ButtonPrimary>
          )}
        </div>
      </div>
      <div
        className={`space-y-4 border-t border-neutral-300 px-6 py-7 sm:space-y-6 ${
          open ? "block h-[15rem]" : "hidden"
        }`}
      >
        <div className="flex flex-col my-4">
          <p className="hidden md:block text-sm text-info mb-2">
            Check the expecetd delivery duration for each item under order
            sumary at the right side of the page.
          </p>
          <p className="md:hidden text-sm text-info mb-2">
            Check the expected delivery duration for each item under order
            summary at the top of the page.
          </p>
          {deliveryFees.map((option) => (
            <div key={option.method} className="mb-2 w-full h-full">
              <div className="flex justify-between items-center mb-2">
                <label className="flex items-center mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value={option.method}
                    checked={method === option.method}
                    onChange={() => setMethod(option.method)}
                    className="mr-2 h-4 w-4 text-gold border-neutral-300 focus:ring-gold"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
                {option.fee === 0 ? (
                  <span className="text-sm text-success">Free</span>
                ) : (
                  <span className="text-sm">
                    {getCurrencySmallSymbol(currency)}
                    {numberWithCommas(Number(option.fee))}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryMethod;
