import { HiDocumentAdd } from "react-icons/hi";

import { Button } from "flowbite-react";
import Link from "next/link";

const cardClass =
  "flex flex-col bg-neutral-100 p-4 border border-white rounded-lg cursor-pointer hover:bg-neutral-100 h-[112px]";

const AddNewProductOptions = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex text-md font-bold mt-6 mb-2 text-success">
        <HiDocumentAdd className="mr-2 h-5 w-5" />
        New Product
      </div>
      <span className="mb-4">Select the product type you want to add</span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          className={`${cardClass}`}
          href={`add-product/bespoke-cloth/`}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="bg-grey7 p-2 rounded-lg w-12 h-12 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#3461B9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.17736 9.03223C8.90312 12.6691 3.12493 17.3688 5.6574 20.563C7.05911 22.331 16.7295 22.6215 18.3615 20.563C20.8927 17.3705 15.1293 12.6763 18.8416 9.03223"
                    fill="#272B36"
                  />
                  <path
                    d="M5.17736 9.03223C8.90312 12.6691 3.12493 17.3688 5.6574 20.563C7.05911 22.331 16.7295 22.6215 18.3615 20.563C20.8927 17.3705 15.1293 12.6763 18.8416 9.03223"
                    stroke="#272B36"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.35531 13C4.08976 12.791 2.24317 11.3282 2.01008 9.23853C1.97692 8.9413 2.02708 8.64273 2.13808 8.36431C2.85289 6.57132 4.85232 3.53054 7.91642 2.04751C8.12532 1.9464 8.37469 2.01201 8.51635 2.19362C9.27591 3.1674 10.5845 4.6846 12 4.6846C13.4155 4.6846 14.7241 3.1674 15.4836 2.19362C15.6253 2.01201 15.8747 1.9464 16.0836 2.04751C19.1477 3.53054 21.1471 6.57132 21.8619 8.36431C21.9729 8.64273 22.0231 8.9413 21.9899 9.23853C21.7568 11.3282 19.9297 12.7881 17.6641 12.9972"
                    fill="#272B36"
                  />
                  <path
                    d="M6.35531 13C4.08976 12.791 2.24317 11.3282 2.01008 9.23853C1.97692 8.9413 2.02708 8.64273 2.13808 8.36431C2.85289 6.57132 4.85232 3.53054 7.91642 2.04751C8.12532 1.9464 8.37469 2.01201 8.51635 2.19362C9.27591 3.1674 10.5845 4.6846 12 4.6846C13.4155 4.6846 14.7241 3.1674 15.4836 2.19362C15.6253 2.01201 15.8747 1.9464 16.0836 2.04751C19.1477 3.53054 21.1471 6.57132 21.8619 8.36431C21.9729 8.64273 22.0231 8.9413 21.9899 9.23853C21.7568 11.3282 19.9297 12.7881 17.6641 12.9972"
                    stroke="#272B36"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold">Bespoke Clothes</span>
              <span className="text-[10px] md:text-[12px] text-danger">
                seller must be a tailor
              </span>
            </div>
            <Button size="sm" color="primary" className="h-fit ">
              {" "}
              Add
            </Button>
          </div>
        </Link>
        <Link
          className={`${cardClass}`}
          href={`add-product/bespoke-footwear/`}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="bg-grey7 p-2 rounded-lg w-12 h-12 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#3461B9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.1012 18H7.96299C5.02913 18 3.56221 18 2.66807 16.8828C0.97093 14.7623 2.9047 9.1238 4.07611 7C4.47324 9.4 8.56152 9.33333 10.0507 9C9.05852 7.00119 10.3831 6.33413 11.0453 6.00059L11.0465 6C14 9.5 20.3149 11.404 21.8624 15.2188C22.5309 16.8667 20.6262 18 19.1012 18Z"
                    fill="#3461B9"
                    stroke="#272B36"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 14C6.16467 15.4294 8.73097 15.8442 12.0217 14.8039C13.0188 14.4887 13.5174 14.3311 13.8281 14.3525C14.1389 14.3739 14.7729 14.6695 16.0408 15.2608C17.6243 15.9992 19.7971 16.4243 22 15.3583"
                    stroke="#272B36"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.5 9.5L15 8"
                    stroke="#272B36"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 11L17 9.5"
                    stroke="#272B36"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold">Bespoke Footwears</span>
              <span className="text-[10px] md:text-[12px] text-danger">
                seller must be a shoemaker
              </span>
            </div>
            <Button size="sm" color="primary" className="h-fit ">
              {" "}
              Add
            </Button>
          </div>
        </Link>
        <Link
          className={`${cardClass}`}
          href={`add-product/ready-made-footwear/`}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="bg-grey7 p-2 rounded-lg w-12 h-12 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#3461B9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.1012 18H7.96299C5.02913 18 3.56221 18 2.66807 16.8828C0.97093 14.7623 2.9047 9.1238 4.07611 7C4.47324 9.4 8.56152 9.33333 10.0507 9C9.05852 7.00119 10.3831 6.33413 11.0453 6.00059L11.0465 6C14 9.5 20.3149 11.404 21.8624 15.2188C22.5309 16.8667 20.6262 18 19.1012 18Z"
                    fill="#3461B9"
                    stroke="#272B36"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 14C6.16467 15.4294 8.73097 15.8442 12.0217 14.8039C13.0188 14.4887 13.5174 14.3311 13.8281 14.3525C14.1389 14.3739 14.7729 14.6695 16.0408 15.2608C17.6243 15.9992 19.7971 16.4243 22 15.3583"
                    stroke="#272B36"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.5 9.5L15 8"
                    stroke="#272B36"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 11L17 9.5"
                    stroke="#272B36"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold">Ready-Made Footwears</span>
            </div>
            <Button size="sm" color="primary" className="h-fit ">
              {" "}
              Add
            </Button>
          </div>
        </Link>
        <Link
          className={`${cardClass}`}
          href={`add-product/ready-made-cloth/`}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="bg-grey7 p-2 rounded-lg w-12 h-12 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#3461B9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.17736 9.03223C8.90312 12.6691 3.12493 17.3688 5.6574 20.563C7.05911 22.331 16.7295 22.6215 18.3615 20.563C20.8927 17.3705 15.1293 12.6763 18.8416 9.03223"
                    fill="#272B36"
                  />
                  <path
                    d="M5.17736 9.03223C8.90312 12.6691 3.12493 17.3688 5.6574 20.563C7.05911 22.331 16.7295 22.6215 18.3615 20.563C20.8927 17.3705 15.1293 12.6763 18.8416 9.03223"
                    stroke="#272B36"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.35531 13C4.08976 12.791 2.24317 11.3282 2.01008 9.23853C1.97692 8.9413 2.02708 8.64273 2.13808 8.36431C2.85289 6.57132 4.85232 3.53054 7.91642 2.04751C8.12532 1.9464 8.37469 2.01201 8.51635 2.19362C9.27591 3.1674 10.5845 4.6846 12 4.6846C13.4155 4.6846 14.7241 3.1674 15.4836 2.19362C15.6253 2.01201 15.8747 1.9464 16.0836 2.04751C19.1477 3.53054 21.1471 6.57132 21.8619 8.36431C21.9729 8.64273 22.0231 8.9413 21.9899 9.23853C21.7568 11.3282 19.9297 12.7881 17.6641 12.9972"
                    fill="#272B36"
                  />
                  <path
                    d="M6.35531 13C4.08976 12.791 2.24317 11.3282 2.01008 9.23853C1.97692 8.9413 2.02708 8.64273 2.13808 8.36431C2.85289 6.57132 4.85232 3.53054 7.91642 2.04751C8.12532 1.9464 8.37469 2.01201 8.51635 2.19362C9.27591 3.1674 10.5845 4.6846 12 4.6846C13.4155 4.6846 14.7241 3.1674 15.4836 2.19362C15.6253 2.01201 15.8747 1.9464 16.0836 2.04751C19.1477 3.53054 21.1471 6.57132 21.8619 8.36431C21.9729 8.64273 22.0231 8.9413 21.9899 9.23853C21.7568 11.3282 19.9297 12.7881 17.6641 12.9972"
                    stroke="#272B36"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold">Ready-Made Clothes</span>
            </div>
            <Button size="sm" color="primary" className="h-fit ">
              {" "}
              Add
            </Button>
          </div>
        </Link>

        <Link className={`${cardClass}`} href={`add-product/accessories/`}>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="bg-grey7 p-2 rounded-lg w-12 h-12 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#3461B9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z"
                    fill="#272B36"
                    stroke="#272B36"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M16 6L15.7276 4.91043C15.3931 3.5724 15.2258 2.90339 14.7499 2.49004C14.6973 2.44433 14.6423 2.40141 14.5852 2.36145C14.0688 2 13.3792 2 12 2C10.6208 2 9.93119 2 9.41476 2.36145C9.35765 2.40141 9.30268 2.44433 9.25006 2.49004C8.77415 2.90339 8.6069 3.5724 8.27239 4.91043L8 6"
                    fill="#272B36"
                  />
                  <path
                    d="M16 6L15.7276 4.91043C15.3931 3.5724 15.2258 2.90339 14.7499 2.49004C14.6973 2.44433 14.6423 2.40141 14.5852 2.36145C14.0688 2 13.3792 2 12 2C10.6208 2 9.93119 2 9.41476 2.36145C9.35765 2.40141 9.30268 2.44433 9.25006 2.49004C8.77415 2.90339 8.6069 3.5724 8.27239 4.91043L8 6"
                    stroke="#272B36"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 18L8.27239 19.0896C8.6069 20.4276 8.77415 21.0966 9.25006 21.51C9.30268 21.5557 9.35765 21.5986 9.41476 21.6386C9.93119 22 10.6208 22 12 22C13.3792 22 14.0688 22 14.5852 21.6386C14.6423 21.5986 14.6973 21.5557 14.7499 21.51C15.2258 21.0966 15.3931 20.4276 15.7276 19.0896L16 18"
                    fill="#272B36"
                  />
                  <path
                    d="M8 18L8.27239 19.0896C8.6069 20.4276 8.77415 21.0966 9.25006 21.51C9.30268 21.5557 9.35765 21.5986 9.41476 21.6386C9.93119 22 10.6208 22 12 22C13.3792 22 14.0688 22 14.5852 21.6386C14.6423 21.5986 14.6973 21.5557 14.7499 21.51C15.2258 21.0966 15.3931 20.4276 15.7276 19.0896L16 18"
                    stroke="#272B36"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 10V12.005L13 13"
                    stroke="#F8F9FE"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold">Accessories</span>
            </div>
            <Button size="sm" color="primary" className="h-fit ">
              {" "}
              Add
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AddNewProductOptions;
