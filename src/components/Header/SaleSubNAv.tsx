import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SaleSubNAv = ({
  hovered,
  setHovered,
  setIsOpen,
}: {
  hovered?: string;
  setHovered?: (label: string) => void;
  setIsOpen?: (value: boolean) => void;
}) => {
  const searchParams = useSearchParams();
  const productGroupPage = searchParams.get("productGroupPage") || "HOME";
  const getSalesLink = () => {
    if (productGroupPage === "READY TO WEAR") {
      return "/sales?productGroupPage=READY TO WEAR";
    } else if (productGroupPage === "BESPOKE") {
      return "/sales?productGroupPage=BESPOKE";
    } else {
      return "/sales";
    }
  };

  return (
    <Link
      href={getSalesLink()}
      onMouseEnter={() => {
        if (setHovered) setHovered("SALES");
      }}
      className={`text-xs font-bold text-gold transition-all duration-300 ease-in-out p-1 px-2 cursor-pointer ${
        hovered === "SALES" ? "bg-success text-white" : ""
      }`}
      onClick={() => {
        localStorage.setItem("selectedMenu", "SALES");
        localStorage.removeItem("selectedMenuChild");
        if (setIsOpen) setIsOpen(false);
      }}
    >
      SALES
    </Link>
  );
};

export default SaleSubNAv;
