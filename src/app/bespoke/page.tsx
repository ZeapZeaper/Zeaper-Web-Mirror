import Link from "next/link";
import SectionBespoke from "../_home/SectionBespoke";
import BespokeLatest from "./BespokeLatest";
import BespokeOccassions from "./BespokeOccassions";
import BespokePromo from "./BespokePromo";
import BespokeSecondSection from "./BespokeSecondSection";
import BespokeShoes from "./BespokeShoes";
import MenCategory from "./MenCategory";
import WomenCategory from "./WomenCategory";

const backGroundVideoUrl = "/video/bespokeHome.mov";

// const backGroundVideoUrl =
//   "https://www.shutterstock.com/shutterstock/videos/1103850547/preview/stock-footage-african-american-tailor-drawing-sketches-in-workshop-preparing-model-and-design-to-craft-fashion.webm";

const BespokePage = () => {
  return (
    <>
      <Link
        href="/collections/isBespoke=true?productGroupPage=BESPOKE&collectionTitle=Bespoke Collections"
        className="relative flex h-screen  w-full items-center justify-center bg-black"
      >
        <video
          src={backGroundVideoUrl}
          // src="https://www.shutterstock.com/shutterstock/videos/1103850547/preview/stock-footage-african-american-tailor-drawing-sketches-in-workshop-preparing-model-and-design-to-craft-fashion.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        <div className="relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Bespoke Fashion
          </h1>
          <p className="text-lg md:text-xl font-bold">
            Crafting Unique Styles Just for You
          </p>
          <button className="mt-6 bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors">
            Explore Now
          </button>
        </div>
      </Link>

      <BespokeSecondSection />
      <MenCategory />
      <span className="p-4 bg-lightGold">
        <SectionBespoke />
      </span>
      <BespokePromo />
      <WomenCategory />
      <BespokeOccassions />
      <BespokeShoes />
      <BespokeLatest />
    </>
  );
};

export default BespokePage;
