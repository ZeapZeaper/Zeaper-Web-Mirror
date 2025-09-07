"use client";
import zeapApiSlice from "../../../redux/services/zeapApi.slice";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Radio,
  Rating,
} from "flowbite-react";
import { ProductReviewInterface } from "../../../interface/interface";

import Loading from "@/components/loading/Loading";
import { ThemeContext } from "@/contexts/themeContext";
import LoadingDots from "@/components/loading/LoadingDots";

const modalTheme = {
  root: {
    base: "fixed inset-x-0-[20%] top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900/50 dark:bg-gray-900/80",
      off: "hidden",
    },
    sizes: {
      lg: "w-[100vw] md:max-w-xl ",
    },
  },
  content: {
    base: "relative  w-full md:p-4 md:h-auto",
    inner:
      "relative flex h-[100vh] md:h-full md:max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
};

const AddReview = ({
  open,
  close,
  productId,
  review,
}: {
  open: boolean;
  close: () => void;
  productId: string;
  review?: ProductReviewInterface;
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const [newReview, setNewReview] = useState<string>("");
  const [imageMatch, setImageMatch] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [displayName, setDisplayName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const getCanUserReviewQuery = zeapApiSlice.useGetCanUserReviewQuery(
    { productId },
    { skip: !productId || !!review }
  );
  const canUserReview = getCanUserReviewQuery?.data?.data;
  const canReview = canUserReview?.canReview || false;
  const denyReason = canUserReview?.denyReason || "";
  const orderId = canUserReview?.orderId || "";
  const isFulfilled = getCanUserReviewQuery?.status === "fulfilled";
  const [addReview, addReviewStatus] =
    zeapApiSlice.useCreateProductReviewMutation();
  const [updateReview, updateReviewStatus] =
    zeapApiSlice.useUpdateProductReviewMutation();
  const isLoading =
    addReviewStatus.isLoading ||
    getCanUserReviewQuery.isLoading ||
    updateReviewStatus.isLoading;

  useEffect(
    () => {
      setDimBackground(open);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open]
  );

  const validate = () => {
    if (!newReview) {
      setErrorMsg("Please write a review");
      return false;
    }
    if (!title) {
      setErrorMsg("Please enter a title");
      return false;
    }
    if (!rating || rating === 0) {
      setErrorMsg("Please rate the product");
      return false;
    }
    if (!displayName) {
      setErrorMsg("Please enter your name");
      return false;
    }
    if (displayName.length < 2) {
      setErrorMsg("Name must be at least 2 characters");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (review) {
      setNewReview(review.review);
      setTitle(review?.title);
      setRating(review.rating);
      setDisplayName(review.displayName);
    }
  }, [review]);

  const handleRating = () => {
    setErrorMsg("");
    if (!validate()) return;
    const payload = {
      productId: productId,
      orderId,
      review: newReview,
      title: title,
      rating: rating,
      displayName: displayName,
      imageMatch: imageMatch,
    };
    if (!review) {
      return addReview({ payload })
        .unwrap()
        .then(() => {
          setDimBackground(false);
          close();
        })
        .catch((err) => {
          setErrorMsg(err?.data?.error);
        });
    }
  };
  const handleUpdate = () => {
    setErrorMsg("");
    if (!validate()) return;
    const payload = {
      productId: productId,
      review_id: review?._id,
      review: newReview,
      title: title,
      rating: rating,
      displayName: displayName,
      imageMatch: imageMatch,
    };
    return updateReview({ payload })
      .unwrap()
      .then(() => {
        setDimBackground(false);
        close();
      })
      .catch((err) => {
        setErrorMsg(err?.data?.error);
      });
  };

  return (
    <Modal
      theme={modalTheme}
      show={open}
      size="lg"
      onClose={() => {
        setDimBackground(false);
        close();
      }}
    >
      <ModalHeader>{review ? "Edit Review" : "Add Review"}</ModalHeader>
      <ModalBody>
        {isLoading && <Loading />}
        {errorMsg && (
          <Alert color="failure" className="mb-4">
            {errorMsg}
          </Alert>
        )}
        {!canReview && isFulfilled && (
          <div className="flex flex-col items-center justify-center gap-4 p-4 bg-grey7">
            <Alert color="failure" className="mb-4">
              {denyReason}.
            </Alert>
          </div>
        )}
        {((canReview && isFulfilled) || review) && (
          <div className="flex flex-col gap-6">
            <div>
              <label htmlFor="rating" className="text-sm font-semibold">
                Ratings
              </label>
              <Rating className="cursor-pointer" size="md">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Rating.Star
                    key={star}
                    onClick={() => setRating(star)}
                    filled={rating >= star}
                  />
                ))}
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {rating} out of 5
                </p>
              </Rating>
            </div>
            <div>
              <label htmlFor="title" className="text-sm font-semibold">
                Title
              </label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your review a title"
                required
              />
            </div>
            <div>
              <label htmlFor="review" className="text-sm font-semibold">
                Review
              </label>
              <textarea
                className="w-full border rounded-md p-2"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Please write a short review for the product"
                required
              />
            </div>

            <div>
              <label htmlFor="imageMatch" className="text-sm font-semibold">
                Does the product image match the product?
              </label>
              <div className="flex items-center gap-4">
                <Radio
                  checked={imageMatch}
                  onChange={() => setImageMatch(true)}
                  color="success"
                />
                <label htmlFor="imageMatch" className="text-sm font-semibold">
                  Yes
                </label>
                <Radio
                  checked={!imageMatch}
                  onChange={() => setImageMatch(false)}
                  color="success"
                />
                <label htmlFor="imageMatch" className="text-sm font-semibold">
                  No
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="displayName" className="text-sm font-semibold">
                Submit review as
              </label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <Button
              color="success"
              onClick={review ? handleUpdate : handleRating}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingDots />
              ) : review ? (
                "Update Review"
              ) : (
                "Submit Review"
              )}
            </Button>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default AddReview;
