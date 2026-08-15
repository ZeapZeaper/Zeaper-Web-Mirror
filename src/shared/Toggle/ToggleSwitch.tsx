import React from "react";

type ToggleColor = "info" | "primary" | "success";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  color?: ToggleColor;
  className?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  color = "info",
  className = "",
}) => {
  const currentUnit = checked ? "CM" : "INCH";
  const otherUnit = checked ? "INCH" : "CM";

  const colors: Record<
    ToggleColor,
    {
      active: string;
      ring: string;
    }
  > = {
    info: {
      active: "bg-emerald-600",
      ring: "focus-visible:ring-emerald-500",
    },
    primary: {
      active: "bg-gray-900",
      ring: "focus-visible:ring-gray-900",
    },
    success: {
      active: "bg-green-600",
      ring: "focus-visible:ring-green-500",
    },
  };

  const styles = colors[color];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={`Currently showing measurements in ${currentUnit}. Switch to ${otherUnit}.`}
      onClick={onChange}
      className={`
        group inline-flex w-[180px] flex-col
        overflow-hidden rounded-lg
        border border-gray-200
        bg-white
        shadow-sm
        transition-all duration-200
        hover:border-gray-300
        hover:shadow
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-offset-2
        ${styles.ring}
        ${className}
      `}
    >
      {/* Top: Unit selector */}
      <span className="relative flex h-9 w-full items-center bg-gray-100 p-1">
        {/* Active indicator */}
        <span
          aria-hidden="true"
          className={`
            absolute top-1 bottom-1
            w-[calc(50%-4px)]
            rounded-md
            ${styles.active}
            transition-transform duration-200 ease-out
            ${checked ? "translate-x-full" : "translate-x-0"}
          `}
        />

        {/* INCH */}
        <span
          className={`
            relative z-10 flex flex-1
            items-center justify-center
            text-xs font-bold tracking-wide
            transition-colors duration-200
            ${
              !checked
                ? "text-white"
                : "text-amber-600 group-hover:text-amber-700"
            }
          `}
        >
          INCH
        </span>

        {/* CM */}
        <span
          className={`
            relative z-10 flex flex-1
            items-center justify-center
            text-xs font-bold tracking-wide
            transition-colors duration-200
            ${
              checked
                ? "text-white"
                : "text-emerald-600 group-hover:text-blue-700"
            }
          `}
        >
          CM
        </span>
      </span>

      {/* Bottom: Action */}
      <span
        className="
          flex h-8 w-full
          items-center justify-center
          border-t border-gray-200
          bg-white
          text-xs font-medium
          text-gray-400
          transition-colors
          group-hover:text-gray-600
        "
      >
        Switch to{" "}
        <span
          className={`
            ml-1 font-semibold
            ${
              otherUnit === "CM"
                ? "text-blue-600"
                : "text-amber-600"
            }
          `}
        >
          {otherUnit}
        </span>
      </span>
    </button>
  );
};

export default ToggleSwitch;
