import { helpCenterCategoryOptions } from "@/components/help/helpCenterStructure";
import { HelpArticleInterface } from "@/interface/interface";
import Link from "next/link";

const Article = ({ article }: { article: HelpArticleInterface }) => {
  const getCategoryLabel = (value: string) => {
    const categoryOption = helpCenterCategoryOptions.find(
      (option) => option.value === value
    );
    return categoryOption ? categoryOption.label : "";
  };
  return (
    <Link
      href={`/help/article/${article.articleId}?category=${article.category}&subcategory=${article.subCategory}`}
      className="inline-flex gap-2  bg-white text-sm md:text-md lg:text-lg text-gray-500 dark:bg-boxdark rounded-lg   dark:border-gray-700 dark:bg-gray-800  transition-colors cursor-pointer w-full hover:underline"
    >
      <span className=" mb-2">{getCategoryLabel(article.category)} :</span>
      <p>{article.title}</p>
    </Link>
  );
};

export default Article;
