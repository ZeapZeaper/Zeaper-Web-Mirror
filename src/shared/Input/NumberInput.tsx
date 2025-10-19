import React, { useState, useRef, ChangeEvent, FocusEvent, useEffect } from "react";

interface NumberInputProps {
  id?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  allowDecimals?: boolean;
  prefix?: string;
  suffix?: string;
  step?: number; // increment/decrement step
  showArrows?: boolean; // optional up/down arrows
  useCommas?: boolean; // whether to format with commas
  className?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  value = "",
  onChange,
  placeholder = "",
  allowDecimals = true,
  prefix = "",
  suffix = "",
  step = 1,
  showArrows = false,
  useCommas = true,
  className = "",
  min,
  max,
  disabled = false,
}) => {
  const formatNumber = (val: string): string => {
    if (!val) return "";
    const parts = val.split(".");
    let intPart = parts[0].replace(/,/g, "");
    const decimalPart = parts[1];

    if (useCommas) {
      intPart = Number(intPart).toLocaleString();
    }

    return decimalPart !== undefined ? `${intPart}.${decimalPart}` : intPart;
  };
  const [internalValue, setInternalValue] = useState<string>(
    formatNumber(typeof value === "number" ? value.toString() : value)
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value === undefined || value === null || value === "") {
      setInternalValue("");
    } else {
      const formatted = formatNumber(
        typeof value === "number" ? value.toString() : value
      );
      setInternalValue(formatted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  const parseNumber = (val: string): number => {
    return Number(val.replace(/,/g, ""));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;

    if (prefix && rawValue.startsWith(prefix))
      rawValue = rawValue.slice(prefix.length);
    if (suffix && rawValue.endsWith(suffix))
      rawValue = rawValue.slice(0, -suffix.length);

    const regex = allowDecimals ? /[^\d.]/g : /[^\d]/g;
    const cleaned = rawValue.replace(regex, "");

    const formatted = formatNumber(cleaned);
    setInternalValue(formatted);
    if (onChange) onChange(formatted);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          inputRef.current.value.length;
      }
    }, 0);
  };
  const enforceLimits = (num: number): number => {
    if (min !== undefined && num < min) return min;
    if (max !== undefined && num > max) return max;
    return num;
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // remove dangling decimal
    if (allowDecimals && val.endsWith(".")) val = val.slice(0, -1);

    let num = parseNumber(val);
    num = enforceLimits(num); // enforce limits
    const formatted = formatNumber(num.toString());
    setInternalValue(formatted);
    if (onChange) onChange(formatted);
  };

  const changeByStep = (direction: "up" | "down") => {
    let num = parseNumber(internalValue) || 0;
    num = direction === "up" ? num + step : num - step;
    num = enforceLimits(num); // enforce limits
    const formatted = formatNumber(num.toString());
    setInternalValue(formatted);
    if (onChange) onChange(formatted);
  };

  return (
    <div
      id={id}
      className={`w-full max-w-xs mx-auto ${className} ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="relative flex border border-secondary rounded overflow-hidden focus-within:ring-1 focus-within:ring-secondary h-12">
        {prefix && (
          <span className="bg-gray-800 text-secondary px-3 py-2 flex items-center select-none">
            {prefix}
          </span>
        )}

        <input
          ref={inputRef}
          type="text"
          value={internalValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="flex-1 border-none text-dark placeholder-secondary focus:outline-none px-3 py-2 h-full dark:bg-secondary dark:text-dark"
        />

        {suffix && (
          <span className="bg-gray-800 text-secondary px-3 py-2 flex items-center select-none">
            {suffix}
          </span>
        )}

        {showArrows && (
          <div className="absolute right-0 top-0 flex flex-col h-full border-l border-secondary">
            <button
              type="button"
              onClick={() => changeByStep("up")}
              disabled={
                disabled ||
                (max !== undefined && parseNumber(internalValue) >= max)
              }
              className={`flex-1 px-2 hover:bg-gray-700 text-secondary flex items-center justify-center ${
                (disabled ||
                  (max !== undefined && parseNumber(internalValue) >= max)) &&
                "cursor-not-allowed opacity-50"
              }`}
            >
              ▲
            </button>
            <button
              type="button"
              onClick={() => changeByStep("down")}
              disabled={
                disabled ||
                (min !== undefined && parseNumber(internalValue) <= min)
              }
              className={`flex-1 px-2 hover:bg-gray-700 text-secondary flex items-center justify-center ${
                (disabled ||
                  (min !== undefined && parseNumber(internalValue) <= min)) &&
                "cursor-not-allowed opacity-50"
              }`}
            >
              ▼
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberInput;
