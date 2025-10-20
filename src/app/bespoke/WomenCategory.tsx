import Image from "next/image";
import WomenBespokeBackImage from "@/images/women_background.jpg";
import Link from "next/link";

const WomenCategory = () => {
  return (
    <div
      className="relative flex h-screen  w-full items-center justify-center bg-black"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Image
        src={WomenBespokeBackImage}
        alt="Bespoke Fashion Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      <div className="relative z-10 text-white text-center bg-black bg-opacity-50 p-10 rounded-lg">
        <h3 className="text-2xl md:text-5xl font-bold mb-4">
          BESPOKE FOR WOMEN
        </h3>
        <p className="text-lg md:text-2xl">WOMEN WITH STYLE</p>
        <Link href="/collections/isBespoke=true/gender=Female?productGroupPage=BESPOKE&collectionTitle=ALL WOMEN'S BESPOKE COLLECTIONS">
          <button className="mt-6 bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors">
            Explore Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WomenCategory;
