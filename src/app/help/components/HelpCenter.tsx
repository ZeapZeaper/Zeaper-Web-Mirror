"use client";
import { useState } from "react";
import PopularArticles from "./PopularArticles";
import {
  helpCenterCategoryOptions,
  helpCenterSubCategoryOptions,
} from "@/components/help/helpCenterStructure";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const HelpCenter = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const [selectedCategory, setSelectedCategory] = useState(
    category || "customer"
  );
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 w-full justify-center mb-4">
          {helpCenterCategoryOptions.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === category.value
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        <PopularArticles category={selectedCategory} />
        <hr className="border-gray-300 dark:border-gray-700 my-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpCenterSubCategoryOptions
            .filter((sub) => sub.categories.includes(selectedCategory))
            .map((sub) => (
              <Link
                href={`/help/article?category=${selectedCategory}&subcategory=${sub.value}`}
                key={sub.value}
                className=" flex items-center gap-2 p-4 bg-white dark:bg-boxdark rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer transition-colors text-info"
              >
                {sub.icon}
                <span>{sub.label}</span>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default HelpCenter;
