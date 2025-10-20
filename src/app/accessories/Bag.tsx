import Link from "next/link";
import BackgroundImage from "@/images/golden-bag.jpg";

const Bag = () => {
  return (
    <div className="bg-[#F3EDE9] flex flex-col items-center justify-center h-[50vh]">
      <Link
        href="/collections/ageGroup=Adults/accessoryType=Bag?productGroupPage=ACCESSORIES&subProductGroupPage=BAGS&collectionTitle=ALL+BAGS"
        style={{
          backgroundImage: `url(${BackgroundImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="container group mx-auto  w-1/2 h-[40vh] bg-cover bg-center flex flex-col items-center justify-center text-white"
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center group-hover:bg-opacity-70 transition-all duration-300 ">
          <h2 className="text-3xl font-bold mb-4">
            Explore Our Bag Collection
          </h2>
          <p className="text-lg mb-6">
            Discover the perfect bag to complement your style.
          </p>
          <span className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/80 transition-colors">
            Shop Now
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Bag;
