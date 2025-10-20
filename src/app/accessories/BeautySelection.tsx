import FrangranceImage from "@/images/golden-fragrance.webp";
import HairCareImage from "@/images/golden-haircare.webp";
import MakeupImage from "@/images/golden-makeup.webp";
import SkinCareImage from "@/images/golden-skincare.webp";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Fragrance",
    image: FrangranceImage,
    href: "/collections/accessoryType=Fragrance?collectionTitle=OUR%20FRAGRANCE%20COLLECTIONS&productGroupPage=ACCESSORIES",
  },
  {
    id: 2,
    name: "Hair Care",
    image: HairCareImage,
    href: "/collections/accessoryType=Hair%20Care?collectionTitle=OUR%20HAIR%20CARE%20COLLECTIONS&productGroupPage=ACCESSORIES",
  },
  {
    id: 3,
    name: "Makeup",
    image: MakeupImage,
    href: "/collections/accessoryType=Makeup?collectionTitle=OUR%20MAKEUP%20COLLECTIONS&productGroupPage=ACCESSORIES",
  },
  {
    id: 4,
    name: "Skin Care",
    image: SkinCareImage,
    href: "/collections/accessoryType=Skin%20Care?collectionTitle=OUR%20SKIN%20CARE%20COLLECTIONS&productGroupPage=ACCESSORIES",
  },
];

const BeautySelection = () => {
  return (
    <div className="p-6 bg-[#F3EDE9]">
      <h2 className="text-2xl font-bold mb-4 px-2"> Our Beauty Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            href={category.href}
            key={category.id}
            className="bg-white rounded-lg shadow-xs overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <Image
              width={300}
              height={200}
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BeautySelection;
