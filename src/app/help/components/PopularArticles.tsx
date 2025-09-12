import { useSelector } from "react-redux";
import Article from "./Article";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { helpCenterCategoryOptions } from "@/components/help/helpCenterStructure";
import { HelpArticleInterface } from "@/interface/interface";

const PopularArticles = ({ category }: { category: string }) => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const getPopularTopicsByCategoryQuery =
    zeapApiSlice.useGetPopularTopicsByCategoryQuery(
      { category },
      { skip: !token || !category }
    );

  const isFulfilled = getPopularTopicsByCategoryQuery.status === "fulfilled";
  const popularArticles = getPopularTopicsByCategoryQuery?.data?.data || [];
  const getCategoryLabel = (value: string) => {
    const categoryOption = helpCenterCategoryOptions.find(
      (option) => option.value === value
    );
    return categoryOption ? categoryOption.label : "";
  };
  return (
    <>
      {isFulfilled && popularArticles.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">
            Popular Articles for {getCategoryLabel(category)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularArticles.map((article: HelpArticleInterface) => (
              <Article key={article._id} article={article} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PopularArticles;
