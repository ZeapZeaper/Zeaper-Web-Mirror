"use client";
import HelpCenterNav from "@/app/help/components/HelpCenterNav";
import SearchHelpArticle from "@/app/help/components/SearchHelpArticle";
import Loading from "@/app/loading";
import BreadCrumb from "@/components/BreadCrumb";
import {
  helpCenterCategoryOptions,
  helpCenterSubCategoryOptions,
} from "@/components/help/helpCenterStructure";
import { HelpArticleInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { capitalizeFirstLetter, correctULTagFromQuill } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import MarkArticleHelpful from "./MarkArticleHelpful";
import NeedMoreHelp from "./NeedMoreHelp";
import RelatedArticles from "./RelatedArticles";

const HelpArticleContent = ({ articleId }: { articleId: string }) => {
  const token = useSelector(globalSelectors.selectAuthToken);

  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const subCategory = searchParams.get("subcategory") || "";

  const getHelpArticleQuery = zeapApiSlice.useGetHelpArticleQuery(
    {
      articleId,
    },
    { skip: !token || !articleId }
  );
  const isLoading = getHelpArticleQuery.isLoading;
  const article: HelpArticleInterface | undefined =
    getHelpArticleQuery?.data?.data || undefined;
  console.log("article", getHelpArticleQuery.status);
  const isFulfilled = getHelpArticleQuery.status === "fulfilled";
  const isRejected = getHelpArticleQuery.status === "rejected";

  const getCategoryLabel = (value: string) => {
    const categoryOption = helpCenterCategoryOptions.find(
      (option) => option.value === value
    );
    return categoryOption ? categoryOption.label : "";
  };
  const getSubCategoryLabel = (value: string) => {
    const subCategoryOption = helpCenterSubCategoryOptions.find(
      (option) => option.value === value
    );
    return subCategoryOption ? subCategoryOption.label : "";
  };

  const breadCrumbs = [
    {
      label: "Help Center",
      link: "/help",
    },
    {
      label: capitalizeFirstLetter(
        getCategoryLabel(category) || "Help Articles"
      ),
      link: `/help/article?category=${category}&subcategory=${subCategory}`,
    },
    {
      label: capitalizeFirstLetter(
        getSubCategoryLabel(subCategory) || "Help Articles"
      ),
      link: `/help/article?category=${category}&subcategory=${subCategory}`,
    },
  ];
  return (
    <>
      <SearchHelpArticle />
      <BreadCrumb breadCrumbs={breadCrumbs} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {/* There will be sideNav with sub category navigation but only for large screens */}
        {/* Then a list of fetched articles by the side */}
        <div className="hidden lg:block">
          <HelpCenterNav category={category} subCategory={subCategory} />
        </div>
        <div className="col-span-2">
          {isLoading ? (
            <div className="text-center py-8">
              <Loading />
            </div>
          ) : (
            <div className="space-y-4">
              {article && (
                <div className="p-4 bg-white dark:bg-boxdark rounded-lg shadow">
                  <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
                  <div className="text-gray-700 dark:text-gray-300">
                    <div
                      dangerouslySetInnerHTML={{ __html: correctULTagFromQuill(article.content) }}
                    />
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>
                      Category: {getCategoryLabel(article.category) || "N/A"}
                    </p>
                    <p>
                      Sub-category:{" "}
                      {getSubCategoryLabel(article.subCategory) || "N/A"}
                    </p>

                    {article && <MarkArticleHelpful article={article} />}
                    {article && <NeedMoreHelp />}
                  </div>
                </div>
              )}
              {(isRejected || isFulfilled) && !article && (
                <div className="text-center py-8">
                  <p className="text-md text-gray-500">
                    We couldn&apos;t find the article. Please check the URL or
                    return to the help center.
                  </p>
                </div>
              )}
            </div>
          )}
          {article && <RelatedArticles articleId={article.articleId} />}
        </div>
      </div>
    </>
  );
};

export default HelpArticleContent;
