"use client";
import Image from "next/image";
import BespokeWeddingImage from "@/images/wedding_dress_1.jpg";
import culturalEventImage from "@/images/ath6.webp";

import BespokeEveningImage from "@/images/Evening_bespoke.jpg";
import BespokeGalaEventImage from "@/images/bespoke_gala.webp";
import bespokeOfficeImage from "@/images/men_suit_1.webp";

import casualEventImage from "@/images/bespoke_casual.webp";
import { useState } from "react";
import Link from "next/link";

const heading = "Bespoke For Occasions";
const subHeading = "Tailored for every special moment";

const BespokeOccassionData = [
  {
    title: "Wedding Dresses",
    image: BespokeWeddingImage,
    description:
      "Elegant and custom-made wedding dresses for your special day.",
    cta: "Explore More",
    href: "/collections/isBespoke=true/productType=bespokeCloth/occasion=Wedding,Bridal,Bridesmaid,Bridal Shower,Bride?productGroupPage=BESPOKE&collectionTitle=Bespoke Wedding Dresses",
  },
  {
    title: "Evening Wear",
    image: BespokeEveningImage,
    description: "Sophisticated evening wear tailored to perfection.",
    cta: "Explore More",
    href: "/collections/isBespoke=true/productType=bespokeCloth/occasion=Evening?productGroupPage=BESPOKE&collectionTitle=Bespoke Evening Wear",
  },
  {
    title: "Gala Events",
    image: BespokeGalaEventImage,
    description: "Stunning gala attire designed to make you stand out.",
    cta: "Explore More",
    href: "/collections/isBespoke=true/productType=bespokeCloth/occasion=Gala,Party,Date?productGroupPage=BESPOKE&collectionTitle=Bespoke Gala Events",
  },
  {
    title: "Office Attire",
    image: bespokeOfficeImage,
    description:
      "Professional and stylish office wear for the modern workplace.",
    cta: "Explore More",
    href: "/collections/isBespoke=true/productType=bespokeCloth/occasion=Office,Work,Business,Corporate?productGroupPage=BESPOKE&collectionTitle=Bespoke Office Attire",
  },
  {
    title: "Cultural Events",
    image: culturalEventImage,
    description:
      "Traditional and contemporary outfits for cultural celebrations.",
    cta: "Explore More",
    href: "/collections/isBespoke=true/productType=bespokeCloth/occasion=Cultural?productGroupPage=BESPOKE&collectionTitle=Bespoke Cultural Events",
  },
  {
    title: "Casual",
    image: casualEventImage,
    description: "Comfortable and stylish casual wear for everyday occasions.",
    cta: "Explore More",
    href: "/collections/isBespoke=true/productType=bespokeCloth/occasion=Casual,Smart Casual?productGroupPage=BESPOKE&collectionTitle=Bespoke Casual Wear",
  },
];

const BespokeOccassions = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // use animation or transition effects if needed
  return (
    <>
      <div className="container py-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
          {heading}
        </h2>
        <p className="text-lg md:text-xl text-center mb-12">{subHeading}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BespokeOccassionData.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className={`relative group overflow-hidden rounded-lg lg:rounded-full shadow-lg transition-transform transform cursor-pointer ${
                hoveredIndex !== index
                  ? "scale-10 "
                  : "scale-105 ring-4 ring-primary"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-2xl lg:text-3xl font-semibold mb-2">
                  {item.title}
                </h3>
                <span
                  className={`${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  } hidden lg:block transition-opacity  transition-height duration-300 ease-in-out`}
                >
                  <p className="text-sm mb-4">{item.description}</p>
                  <span className="flex justify-center">
                    <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                      {item.cta}
                    </button>
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BespokeOccassions;
