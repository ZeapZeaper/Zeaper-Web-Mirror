import { useSelector } from "react-redux";
import { globalSelectors } from "../../../redux/services/global.slice";
import zeapApiSlice from "../../../redux/services/zeapApi.slice";
import { Dropdown, Rating, Avatar, Alert, Button } from "flowbite-react";
import {
  ProductInterface,
  ProductReviewInterface,
} from "../../../interface/interface";
import { useContext, useEffect, useState } from "react";
// import en from "javascript-time-ago/locale/en";
import NoProfilePic from "@/images/noProfilePic.png";
import ReactTimeAgo from "react-time-ago";
import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import { AuthContext } from "../../../contexts/authContext";
import AddReview from "./AddReview";
import Skeleton from "@/components/loading/Skeleton";
// import TimeAgo from "javascript-time-ago";
import { allStars } from "@/data/content";
import ImageMatchChart from "./ImageMatchChart";

// TimeAgo.addDefaultLocale(en);

const advanceRatingTheme = {
  base: "flex items-center justify-between w-full",
  label: "text-sm font-medium text-cyan-600 dark:text-cyan-500",
  progress: {
    base: "mx-4 h-5 w-3/4 rounded bg-grey7 dark:bg-gray-700",
    fill: "h-5 rounded bg-yellow-400",
    label: "text-sm font-medium text-cyan-600 dark:text-cyan-500 w-8",
  },
};

const ProductReview = ({
  product,
  setReviews,
  setAverageRating,
}: {
  product: ProductInterface;
  setReviews?: (reviews: ProductReviewInterface[]) => void;
  setAverageRating?: (rating: number) => void;
}) => {
  const { productId } = product;
  const { user } = useContext(AuthContext);
  const token = useSelector(globalSelectors.selectAuthToken);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [openReview, setOpenReview] = useState(false);
  const [errorMessages, setErrorMsg] = useState<{ error: string; id: string }>({
    error: "",
    id: "",
  });
  const sortingOptions = [
    { label: "Most Recent", value: "createdAt" },
    { label: "Highest Rating", value: "highestRating" },
    { label: "Lowest Rating", value: "lowestRating" },
    { label: "Most Likes", value: "mostLikes" },
    { label: "Most Dislikes", value: "mostDislikes" },
  ];
  const [sortedReviews, setSortedReviews] = useState<ProductReviewInterface[]>(
    []
  );
  const [maxShow, setMaxShow] = useState<number>(5);

  const reviewQuery = zeapApiSlice.useGetProductReviewsQuery(
    { productId },
    { skip: !token || !productId }
  );
  const reviews = reviewQuery?.data?.data?.reviews;
  const [likeReview, likeReviewStatus] =
    zeapApiSlice.useLikeProductReviewMutation();
  const [dislikeReview, dislikeReviewStatus] =
    zeapApiSlice.useDislikeProductReviewMutation();
  const isLoading =
    reviewQuery.isLoading ||
    likeReviewStatus.isLoading ||
    dislikeReviewStatus.isLoading;
  const averageRating = reviewQuery?.data?.data?.averageRating;
  const imageMatch = reviewQuery?.data?.data?.imageMatch;
  const yes = imageMatch?.true || 0;
  const no = imageMatch?.false || 0;

  useEffect(() => {
    if (reviews && setAverageRating && setReviews) {
      setReviews(reviews);
      setAverageRating(averageRating);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews, averageRating]);

  useEffect(() => {
    if (reviews?.length > 0) {
      if (sortBy === "createdAt") {
        return setSortedReviews(
          [...reviews]?.sort(
            (a: ProductReviewInterface, b: ProductReviewInterface) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      }
      if (sortBy === "highestRating") {
        return setSortedReviews(
          [...reviews]?.sort(
            (a: ProductReviewInterface, b: ProductReviewInterface) =>
              b.rating - a.rating
          )
        );
      }
      if (sortBy === "lowestRating") {
        return setSortedReviews(
          [...reviews]?.sort(
            (a: ProductReviewInterface, b: ProductReviewInterface) =>
              a.rating - b.rating
          )
        );
      }
      if (sortBy === "mostLikes") {
        return setSortedReviews(
          [...reviews]?.sort(
            (a: ProductReviewInterface, b: ProductReviewInterface) =>
              b.likes.value - a.likes.value
          )
        );
      }
      if (sortBy === "mostDislikes") {
        return setSortedReviews(
          [...reviews]?.sort(
            (a: ProductReviewInterface, b: ProductReviewInterface) =>
              b.dislikes.value - a.dislikes.value
          )
        );
      }
    }
  }, [sortBy, reviews]);

  const handleLike = (reviewId: string) => {
    const payload = { reviewId };
    likeReview({ payload })
      .unwrap()
      .then(() => {
        reviewQuery.refetch();
      })
      .catch((err) => {
        setErrorMsg({ error: err?.data?.error, id: reviewId });
        setTimeout(() => {
          setErrorMsg({ error: "", id: "" });
        }, 2000);
      });
  };
  const handleDislike = (reviewId: string) => {
    const payload = { reviewId };
    dislikeReview({ payload })
      .unwrap()
      .then(() => {
        reviewQuery.refetch();
      })
      .catch((err) => {
        setErrorMsg({ error: err?.data?.error, id: reviewId });
        setTimeout(() => {
          setErrorMsg({ error: "", id: "" });
        }, 2000);
      })
      .catch((err) => {
        setErrorMsg({ error: err?.data?.error, id: reviewId });
        setTimeout(() => {
          setErrorMsg({ error: "", id: "" });
        }, 2000);
      });
  };
  const checkIfUserLiked = (likes: { users: string[] }) => {
    return likes.users.includes(user?._id || "");
  };
  const checkIfUserDisliked = (dislikes: { users: string[] }) => {
    return dislikes.users.includes(user?._id || "");
  };

  const calcStarOccurrencePercentage = (star: number) => {
    const starCount = reviews?.filter(
      (review: ProductReviewInterface) => review.rating === star
    ).length;
    return (starCount / reviews?.length) * 100;
  };
  return (
    <div>
      {isLoading && <Skeleton />}
      {openReview && (
        <AddReview
          open={openReview}
          close={() => setOpenReview(false)}
          productId={product?.productId}
        />
      )}
      {reviews?.length === 0 && reviewQuery.status === "fulfilled" && (
        <Alert color="info" className="mb-4 w-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="text-md font-bold text-gray-500 dark:text-gray-400">
                No reviews yet
              </p>
              {user?.shopId !== product?.shopId ? (
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Be the first to review this product
              </p>) : (
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  You will see reviews for this product once customers start
                  reviewing it. 
                </p>
              )}
            </div>
            {user?.shopId !== product?.shopId && (
              <div>
                <Button
                  color="success"
                  onClick={() => setOpenReview(true)}
                  size="xs"
                >
                  Write Review
                </Button>
              </div>
            )}
          </div>
        </Alert>
      )}
      {reviews?.length > 0 && (
        <div className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col  w-full md:col-span-2">
              <div className="flex justify-between ">
                <Rating className="mb-2">
                  {allStars.map((star) => (
                    <Rating.Star key={star} filled={averageRating >= star} />
                  ))}

                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400 font-semibold">
                    {averageRating}/5
                  </p>
                </Rating>
                <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400 font-semibold">
                  {reviews?.length} {reviews?.length > 1 ? "Reviews" : "Review"}
                </p>
              </div>

              <div className="w-full flex flex-col gap-2">
                {allStars.map((star) => (
                  <Rating.Advanced
                    key={star}
                    theme={advanceRatingTheme}
                    percentFilled={calcStarOccurrencePercentage(star)}
                  >
                    <span className="flex">
                      <Rating>
                        <Rating.Star
                          filled={calcStarOccurrencePercentage(star) > 0}
                        />
                      </Rating>
                      <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {star}
                      </span>
                    </span>
                  </Rating.Advanced>
                ))}
              </div>
            </div>
            {imageMatch && typeof window !== undefined && (
              <div className="flex gap-2 md:col-span-2 md:justify-end md:max-w-md items-center w-full ">
                <div className="flex flex-col gap-2">
                  <ImageMatchChart
                    fillColors={["#D5B07B", "#AFE1AF"]}
                    labels={["Yes", "No"]}
                    data={[no, yes]}
                    totalLabel="Match"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-end mt-6">
              <Dropdown
                size="xs"
                color="primary"
                label={`Sort by ${
                  sortingOptions.find((option) => option.value === sortBy)
                    ?.label
                }`}
                value={sortBy}
              >
                {sortingOptions.map((option) => (
                  <Dropdown.Item
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    value={option.value}
                  >
                    {option.label}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <div className="flex flex-col gap-4">
              {sortedReviews
                .slice(0, maxShow)
                .map((review: ProductReviewInterface) => (
                  <div
                    key={review._id}
                    className="flex flex-col gap-2 p-4 bg-grey8 dark:bg-grey2 rounded-md rounded-md"
                  >
                    {errorMessages.id === review._id && (
                      <Alert color="failure" className="mb-4">
                        {errorMessages.error}
                      </Alert>
                    )}
                    <div className="flex justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar
                          img={review?.user?.imageUrl?.link || NoProfilePic.src}
                          alt={review?.user?.name}
                          size="sm"
                          rounded
                        />
                        <div className="flex flex-col">
                          <p className="text-xs ">{review?.displayName}</p>

                          <p className="text-sm text-slate-400 dark:text-gray-400">
                            <ReactTimeAgo date={new Date(review.createdAt)} />-{" "}
                            {new Date(review?.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Rating className="text-sm">
                          <Rating.Star filled={review.rating > 0} />
                        </Rating>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {review.rating}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                      {review?.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {review?.review}
                    </p>

                    <div className="flex gap-8">
                      <div
                        className={`flex items-center gap-2 ${
                          checkIfUserLiked(review.likes)
                            ? "pointer-events-none"
                            : ""
                        }`}
                        onClick={() => handleLike(review._id)}
                      >
                        <HiThumbUp
                          className={`${
                            checkIfUserLiked(review.likes)
                              ? "text-success"
                              : "text-green-300"
                          }`}
                        />
                        <p className="text-xs text-slate-400">
                          {review?.likes?.value}
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-2 ${
                          checkIfUserDisliked(review.dislikes)
                            ? "pointer-events-none"
                            : ""
                        }`}
                        onClick={() => handleDislike(review._id)}
                      >
                        <HiThumbDown
                          className={`${
                            checkIfUserDisliked(review.dislikes)
                              ? "text-danger"
                              : "text-red-300"
                          }`}
                        />
                        <p className="text-xs text-slate-400">
                          {review?.dislikes?.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {sortedReviews.length > maxShow && (
              <div className="flex justify-center">
                <Button
                  color="primary"
                  size="xs"
                  className="w-fit"
                  onClick={() => setMaxShow(maxShow + 5)}
                >
                  Show More
                </Button>
              </div>
            )}
            {maxShow > 5 && (
              <div className="flex justify-center">
                <Button
                  color="primary"
                  size="xs"
                  className="w-fit"
                  onClick={() => setMaxShow(maxShow - 5)}
                >
                  Show Less
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReview;
