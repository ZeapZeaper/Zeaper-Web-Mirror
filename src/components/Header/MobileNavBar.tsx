"use client";

import MobileSubProductPrimaryNav from "./MobileSubProductPrimaryNav";
import { useEffect,  useState } from "react";
import MobileChildrenLayout from "./childrenSubMenus/MobileChildrenLayout";

const MobileNavBar = ({
  isVisable,
  setIsVisable,
}: {
  isVisable: boolean;
  setIsVisable: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const topRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isVisable) {
      setHovered(undefined);
      // if (topRef.current) {
      //   console.log("scrolling to top");
      //   topRef?.current.scrollIntoView({ behavior: "smooth" });
      // }
    }
  }, [isVisable]);

  return (
    <div
      className={`bg-white  overflow-x-hidden  ${isVisable && "min-h-screen"} `}
    >
      {/* {isVisable && !hovered && (
        <div
          className={` w-[calc(100vw-2px)] overflow-x-hidden bg-white z-50 transition-transform duration-300 `}
        >
          <MobileSubProductPrimaryNav
            setIsVisable={setIsVisable}
            setHovered={setHovered}
          />
        </div>
      )} */}
      <div
        // ref={topRef}
        className={`w-[calc(100vw-2px)] overflow-x-hidden   transition-transform duration-300 ${
          isVisable && !hovered
            ? "translate-x-0 w-[calc(100vw-2px)] overflow-x-hidden  overflow-y-auto h-[100vh] no-scrollbar"
            : "-translate-x-full h-0  overflow-hidden"
        }`}
      >
        <MobileSubProductPrimaryNav
          setIsVisable={setIsVisable}
          setHovered={setHovered}
        />
      </div>
      {isVisable && (
        <div
          // slide in and out from right
          className={`  w-full  transition-transform duration-300 ${
            hovered && hovered !== undefined
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          <MobileChildrenLayout
            hovered={hovered}
            setHovered={setHovered}
            setIsVisable={setIsVisable}
          />
        </div>
      )}
    </div>
  );
};

export default MobileNavBar;
