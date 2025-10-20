import Image from "next/image";
import MenBespokeBackImage from "@/images/men_bespoke_background.webp";
import Link from "next/link";

const MenCategory = () => {
  return (
    <div
      className="relative flex h-screen  w-full items-center justify-center bg-black"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Image
        src={MenBespokeBackImage}
        alt="Bespoke Fashion Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      <div className="relative z-10 text-white text-center bg-black bg-opacity-50 p-10 rounded-lg">
        <h3 className="text-2xl md:text-5xl font-bold mb-4">
          BESPOKE FOR REAL MEN
        </h3>
        <p className="text-lg md:text-2xl">MEN WITH CLASS</p>
        <Link href="/collections/isBespoke=true/gender=Male?productGroupPage=BESPOKE&collectionTitle=ALL MEN'S BESPOKE COLLECTIONS">
          <button className="mt-6 bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors">
            Explore Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenCategory;
