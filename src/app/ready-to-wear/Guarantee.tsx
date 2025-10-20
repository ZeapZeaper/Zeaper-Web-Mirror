import React from "react";
import image from "@/images/zeap-text-logo.png";
import Image from "next/image";
import Link from "next/link";

const pageContent = {
  title: "Our Return Guarantee",
  description:
    "We stand behind our vendors and want you to be satisfied with your purchase.",

  cta: "Learn More",
};
const Guarantee = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 md:p-12 lg:p-16 xl:p-20 2xl:p-24">
      <div className="max-w-3xl text-center">
        <Image
          src={image}
          width={128}
          height={64}
          alt="Zeaper Logo"
          className="mx-auto mb-6 w-32 h-auto"
        />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          {pageContent.title}
        </h1>
        <p className="text-md md:text-lg text-gray-600 mb-4">
          {pageContent.description}
        </p>
        <p className="text-md md:text-lg text-gray-600 mb-6">
          If for any reason you are not satisfied, we offer a hassle-free
          <strong> Return and Refund Policy.</strong>
        </p>
        <Link
          href="help/article?category=customer&subcategory=returnsAndRefunds"
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/80 transition-colors"
        >
          {pageContent.cta}
        </Link>
      </div>
    </div>
  );
};

export default Guarantee;
