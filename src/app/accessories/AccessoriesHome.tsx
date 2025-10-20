import Link from "next/link";
import React from "react";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";
import ImageAddress from "@/images/acce-home.jpg";

const AccessoriesHome = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[70vh] relative bg-[#F3EDE9]">
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4 animate-slide-right">
        <p className="text-xl lg:text-4xl text-primary font-semibold uppercase font-extrabold ">
          Zeaper Accessories
        </p>
        <p className="text-slate-700 font-extrabold">
          Discover the latest trends in accessories.
        </p>

        <Link
          href="/collections/productType=Accessory?productGroupPage=ACCESSORIES&subProductGroupPage=ALL&collectionTitle=All Accessories"
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg  transition-colors hover:animate-pulse uppercase inline-flex gap-2 items-center"
        >
          <BsFillEmojiHeartEyesFill className="text-lg" />
          Have a look
        </Link>
      </div>
      <div
        // slide-in animation
        className="animate-slide-left bg-cover bg-center"
        style={{
          backgroundImage: `url(${ImageAddress.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
};

export default AccessoriesHome;
