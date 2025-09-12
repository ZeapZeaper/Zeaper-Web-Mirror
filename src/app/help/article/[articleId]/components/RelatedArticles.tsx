"use client";
import Article from "@/app/help/components/Article";
import { HelpArticleInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

const RelatedArticles = ({ articleId }: { articleId: string }) => {
  const token = useSelector(globalSelectors.selectAuthToken);

  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const subCategory = searchParams.get("subcategory") || "";

  const getHelpArticlesQuery = zeapApiSlice.useGetHelpArticlesQuery(
    {
      category,
      subCategory,
    },
    { skip: !token || !category || !subCategory }
  );

  const helpArticles = getHelpArticlesQuery?.data?.data || [];
  const relatedArticles = helpArticles.filter(
    (article: HelpArticleInterface) => article.articleId !== articleId
  );
  return (
    <>
      {relatedArticles.length > 0 && (
        <div className="flex flex-col gap-4 my-6">
          <h2 className="text-lg font-semibold">Related Articles</h2>
          <div className="grid grid-cols-1  ">
            {relatedArticles.map((article: HelpArticleInterface) => (
              <Article key={article._id} article={article} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedArticles;
