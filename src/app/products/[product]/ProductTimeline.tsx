import { bespokeTimeLine, readyMadeTimeLine } from "@/data/content";
import { ProductCategoryInterface } from "@/interface/interface";
import {

  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTitle,
} from "flowbite-react";
import { useState } from "react";
import { HiCalendar } from "react-icons/hi";

const timelineTheme = {
  root: {
    direction: {
      horizontal: "sm:flex",
      vertical: "relative border-l border-gray-200 dark:border-gray-700",
    },
  },
  item: {
    root: {
      horizontal: "relative mb-6 sm:mb-0",
      vertical: "mb-10 ml-6",
    },
    content: {
      root: {
        base: "",
        horizontal: "mt-3 sm:pr-8",
        vertical: "",
      },
      body: {
        base: "mb-4 text-base font-normal text-gray-500 dark:text-gray-400",
      },
      time: {
        base: "mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500",
      },
      title: {
        base: "text-lg font-semibold text-gray-900 dark:text-white",
      },
    },
    point: {
      horizontal: "flex items-center",
      line: "hidden h-0.5 w-full bg-gray-200 sm:flex dark:bg-gray-700",
      marker: {
        base: {
          horizontal:
            "absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700",
          vertical:
            "absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700",
        },
        icon: {
          base: "h-3 w-3 text-primary-600 dark:text-primary-300",
          wrapper:
            "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-lightGold ring-8 ring-white dark:bg-primary-900 dark:ring-gray-900",
        },
      },
      vertical: "",
    },
  },
};

const ProductTimeline = ({
  categories,
}: {
  categories: ProductCategoryInterface;
}) => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  const getTimeLine = () => {
    if (categories?.productGroup === "Bespoke") {
      return bespokeTimeLine;
    }
    return readyMadeTimeLine;
  };

  return (
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      data-inactive-classes="text-gray-500 dark:text-gray-400"
    >
      <h2 id="accordion-flush-heading-1">
        <button
          onClick={handleClick}
          type="button"
          className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="true"
          aria-controls="accordion-flush-body-1"
        >
          <span className="text-lg">Product Timeline</span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        className={`py-5 border-b border-gray-200 dark:border-gray-700 text-sm flex flex-col ${
          active ? "block" : "hidden"
        }`}
        aria-labelledby="accordion-flush-heading-1"
      >
        <Timeline theme={timelineTheme} className="bg-neutral-100 p-2">
          {getTimeLine().map((item, index) => (
            <TimelineItem key={index}>
              <TimelinePoint icon={HiCalendar} />
              <TimelineContent>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineBody>{item.description}</TimelineBody>
                {/* {item?.buttonLabel && (
                  <Button color="gray">
                    {item.buttonLabel}
                    <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                  </Button>
                )} */}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
};

export default ProductTimeline;
