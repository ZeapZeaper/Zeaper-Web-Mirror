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

const ChildrenLayout = ({
  hovered,
  setHovered,
  setIsOpen,
  slideAnimate,
}: {
  hovered: string;
  setHovered: (value: string) => void;
  setIsOpen: (value: boolean) => void;
  slideAnimate: "animate-slide-right" | "animate-slide-left" | "";
}) => {
  return (
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
  );
};

export default ChildrenLayout;
