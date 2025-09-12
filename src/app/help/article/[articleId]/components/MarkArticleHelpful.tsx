import LoadingDots from "@/components/loading/LoadingDots";
import { HelpArticleInterface } from "@/interface/interface";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdDone } from "react-icons/md";

const MarkArticleHelpful = ({ article }: { article: HelpArticleInterface }) => {
  const articleId = article.articleId;
  const markedIsNotHelpful = article.markedIsNotHelpful || false;
  const markedIsHelpful = article.markedIsHelpful || false;
  const [isHelpful, setIsHelpful] = useState("");
  const [markHelpArticleHelpful, markHelpArticleHelpfulStatus] =
    zeapApiSlice.useMarkHelpArticleHelpfulMutation();
  const isLoading = markHelpArticleHelpfulStatus.isLoading;

  useEffect(() => {
    // Set initial state based on article properties
    if (markedIsHelpful) {
      setIsHelpful("yes");
    } else if (markedIsNotHelpful) {
      setIsHelpful("no");
    } else {
      setIsHelpful("");
    }
  }, [markedIsHelpful, markedIsNotHelpful]);

  const handleMarkHelpful = (value: "yes" | "no") => {
    if (!articleId) return;
    if (value === isHelpful) {
      // If the value is already set, do nothing
      return;
    }
    // Prepare the payload for the mutation
    const payload = {
      articleId,
      isHelpful: value,
    };
    markHelpArticleHelpful({ payload })
      .unwrap()
      .then(() => {
        // Update the state based on the response
        setIsHelpful(value);
      })
      .catch((error) => {
        console.error("Failed to mark article as helpful:", error);
      });
  };
  return (
    <div className="flex flex-col items-center p-4 bg-white justify-center  my-16">
      <p className="text-md lg:text-lg text-gray-500 mb-2">
        Was this article helpful?
      </p>
      <div className="flex items-center gap-2">
        <button
          className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-sm md:text-md lg:text-lg  ${
            isHelpful === "yes"
              ? "bg-success border-success text-white"
              : "border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-white hover:bg-success"
          }`}
          onClick={() => {
            handleMarkHelpful("yes");
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingDots />
          ) : (
            <>
              <MdDone className="text-lg" />
              Yes
            </>
          )}
        </button>
        <button
          className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-sm md:text-md lg:text-lg  ${
            isHelpful === "no"
              ? "bg-success border-success text-white"
              : "border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-white hover:bg-danger"
          }`}
          onClick={() => {
            handleMarkHelpful("no");
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingDots />
          ) : (
            <>
              <IoIosClose className="text-lg" />
              No
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MarkArticleHelpful;
