import {
  helpCenterCategoryOptions,
  helpCenterSubCategoryOptions,
} from "@/components/help/helpCenterStructure";
import { capitalizeFirstLetter } from "@/utils/helpers";
import Link from "next/link";

const HelpCenterNav = ({
  category,
  subCategory,
}: {
  category: string;
  subCategory: string;
}) => {
  const getCategoryLabel = (value: string) => {
    const categoryOption = helpCenterCategoryOptions.find(
      (option) => option.value === value
    );
    return categoryOption ? categoryOption.label : "";
  };
  return (
    <>
      {" "}
      <h2 className="text-lg font-semibold mb-4">
        {capitalizeFirstLetter(getCategoryLabel(category))}
      </h2>
      <div className="flex flex-col space-y-4">
        {helpCenterSubCategoryOptions
          .filter((sub) => sub.categories.includes(category))
          .map((sub) => (
            <Link
              href={`/help/article?category=${category}&subcategory=${sub.value}`}
              key={sub.value}
              className={`px-4 py-2 rounded-md cursor-pointer  transition-colors ${
                sub.value === subCategory
                  ? "bg-primary text-white "
                  : "bg-slate-200 text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {sub.label}
            </Link>
          ))}
      </div>
    </>
  );
};

export default HelpCenterNav;
