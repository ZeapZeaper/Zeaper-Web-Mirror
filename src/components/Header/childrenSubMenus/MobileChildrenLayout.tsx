import AccessoryChildrenSubMenus from "./AccessoryChildrenSubMenus";
import BagsChildrenSubMenus from "./BagsChildrenSubMenus";
import BottomsChildrenSubMenus from "./BottomsChildrenSubMenus";
import BrandsChildrenSubMenus from "./BrandsChildrenSubMenus";
import ClothingChildrenSubMenus from "./ClothingChildrenSubMenus";
import DressesChildrenSubMenus from "./DressesChildrenSubMenus";
import JeansChildrenSubMenus from "./JeansChildrenSubMenus";
import KidsChildrenSubMenus from "./KidsChildrenSubMenus";
import MatchingSetsChildrenSubMenus from "./MatchingSetChildrenSubMenus";
import MenChildrenSubMenus from "./MenChildrenSubMenus";
import SalesChildrenSubMenus from "./SalesChildrenSubMenus";
import ShoeChildrenSubMenus from "./ShoesChildrenSubMenus";
import TopsChildrenSubMenus from "./TopsChildrenSubMenus";
import WeddingChildrenSubMenus from "./WeddingChildrenSubMenus";
import WomenChildrenSubMenus from "./WomenChildrenSubMenus";

const MobileChildrenLayout = ({
  hovered,
  setHovered,
  setIsVisable,
}: {
  hovered: string | undefined;
  setHovered: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsVisable: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const slideAnimate ="animate-slide-right";
  const setIsOpen = () => {
    setIsVisable(false);
    setHovered(undefined);
  };
  return (
    <div className="flex flex-col gap-4 w-[100vw]  mb-8 z-60  overflow-auto  ">
      
      {hovered && (
        <div
          className="inline-flex gap-2    transition-all duration-300 ease-in-out p-1 px-2 items-center cursor-pointer"
          onClick={() => setHovered(undefined)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 font-extrabold text-slate-900 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5l-6-6 6-6"
            />
          </svg>
          <span className="text-2xl font-extrabold text-slate-900">
            {hovered}
          </span>
        </div>
      )}
      <>
        {hovered === "WOMEN" && (
          <WomenChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
        {hovered === "MEN" && (
          <MenChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
        {hovered === "KIDS" && (
          <KidsChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
        {hovered === "BAGS" && (
          <BagsChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
        {hovered === "ACCESSORIES" && (
          <AccessoryChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
        {hovered === "DRESSES" && (
          <DressesChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
        {hovered === "CLOTHINGS" && (
          <ClothingChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
        {hovered === "SHOES" && (
          <ShoeChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
        {hovered === "WEDDINGS" && (
          <WeddingChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
        {hovered === "JEANS" && (
          <JeansChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
        {hovered === "TOPS" && (
          <TopsChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
        {hovered === "BOTTOMS" && (
          <BottomsChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
        {hovered === "MATCHING SETS" && (
          <MatchingSetsChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
        {hovered === "BRANDS" && (
          <BrandsChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
        {hovered === "SALES" && (
          <SalesChildrenSubMenus
            setHovered={setHovered}
            setIsOpen={setIsOpen}
            slideAnimate={slideAnimate}
          />
        )}
      </>
    </div>
  );
};

export default MobileChildrenLayout;
