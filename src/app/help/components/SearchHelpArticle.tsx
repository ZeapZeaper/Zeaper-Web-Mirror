"use client";
import { useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";

import { IoSearch } from "react-icons/io5";
import Article from "./Article";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { HelpArticleInterface } from "@/interface/interface";
import Loading from "@/app/loading";

const SearchHelpArticle = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [filteredHelpArtices, setFilteredHelpArtices] = useState([]);

  const [input, setInput] = useState("");
  const getHelpArticlesQuery = zeapApiSlice.useGetHelpArticlesQuery(
    {},
    { skip: !token }
  );
  const isLoading = getHelpArticlesQuery.isLoading;
  const isFulfilled = getHelpArticlesQuery.status === "fulfilled";
  const helpArticles = useMemo(
    () => getHelpArticlesQuery?.data?.data || [],
    [getHelpArticlesQuery?.data?.data]
  );

  const escapeRegExp = (value: string) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  useEffect(() => {
    if (helpArticles?.length > 0) {
      // search only if input is not empty
      // search only in title, category, subCategory, and tags
      if (input) {
        const regex = new RegExp(escapeRegExp(input), "i");
        const filteredArticles = helpArticles.filter(
          (article: HelpArticleInterface) => {
            return (
              regex.test(article.title) ||
              regex.test(article.category) ||
              regex.test(article.subCategory) ||
              (article.tags &&
                article.tags.some((tag: string) => regex.test(tag)))
            );
          }
        );
        setFilteredHelpArtices(filteredArticles);
      } else {
        setFilteredHelpArtices([]);
      }
    }
  }, [input, helpArticles]);

  const clearInput = () => {
    setInput("");
    setFilteredHelpArtices([]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto mb-4">
      <div
        className={`flex flex-col items-center justify-center w-full max-w-md p-4 bg-white dark:bg-boxdark rounded-lg  ${
          input && filteredHelpArtices.length > 0 ? "shadow-lg" : ""
        }`}
      >
        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="Search help articles..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <IoSearch
            className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400"
            size={20}
          />
          {input && (
            <button
              onClick={clearInput}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              &times;
            </button>
          )}
        </div>
        {isLoading && <Loading />}
        {isFulfilled && (
          <div className="w-full max-h-[60vh] overflow-y-auto">
            {input &&
              filteredHelpArtices.length > 0 &&
              filteredHelpArtices.map((article: HelpArticleInterface) => (
                <div key={article._id}>
                  <Article article={article} />
                </div>
              ))}
          </div>
        )}
        {isFulfilled && input && filteredHelpArtices.length === 0 && (
          <p className="text-center text-gray-500 text-sm">
            No articles found for <span className="font-semibold">{input}</span>
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchHelpArticle;
