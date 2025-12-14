import Link from "next/link";
import ReadyToWearCategories from "./ReadyToWearCategories";
import ReadyToWearPromo from "./ReadyToWearPromo";
import Guarantee from "./Guarantee";
import ReadyToWearLatest from "./ReadyToWearLatest";

const backGroundVideoUrl =
  "/video/rtwHome.mov";

const ReadyToWearPage = () => {
  return (
    <>
      <Link
        href="/collections/sReadyMade=true?productGroupPage=ReadyToWear&collectionTitle=Ready to Wear Collections"
        className="relative flex h-screen  w-full items-center justify-center bg-black"
      >
        <video
          src={backGroundVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        <div className="relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Ready to Wear Fashion
          </h1>
          <p className="text-lg md:text-xl font-bold">
            Instant Chic. Zero Fuss
          </p>
          <button className="mt-6 bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors">
            Explore Our Latest Collections
          </button>
        </div>
      </Link>
      <ReadyToWearCategories />
      <Guarantee />
      <ReadyToWearPromo />
      <ReadyToWearLatest />
    </>
  );
};

export default ReadyToWearPage;
