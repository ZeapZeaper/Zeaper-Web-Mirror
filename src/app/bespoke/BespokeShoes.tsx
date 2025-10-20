import Link from "next/link";

const BespokeData = {
  title: "Bespoke Shoes",
  description:
    "Custom-made shoes tailored to your specific needs and preferences.",
  BackGroundImage:
    "/asset/Shoes-Banner.jpg",
  // BackGroundImage:
  //   "https://www.zebel.co.uk/app/uploads/2024/11/Shoes-Banner-1920x650-1.jpg",

  features: [
    "Handcrafted with premium materials",
    "Personalized fit and design",
    "Wide range of styles available",
  ],
};

const BespokeShoes = () => {
  return (
    <div
      className="relative flex h-[60vh] w-full items-center justify-center bg-black"
      style={{
        backgroundImage: `url(${BespokeData.BackGroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-white text-center p-10 rounded-lg">
        <h3 className="text-2xl md:text-5xl font-bold mb-4">
          {BespokeData.title}
        </h3>
        <p className="text-lg md:text-2xl">{BespokeData.description}</p>
        <div className="mt-6 space-y-4 flex flex-col items-center">
          {BespokeData.features.map((feature, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-lg shadow-lg w-full max-w-md"
            >
              <p className="text-lg md:text-xl text-center">{feature}</p>
            </div>
          ))}
        </div>
        <Link href="/collections/isBespoke=true/productType=bespokeShoe?productGroupPage=BESPOKE&collectionTitle=Bespoke Shoes">
          <button className="mt-6 bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors">
            Explore Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BespokeShoes;
