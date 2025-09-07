import React from "react";
import { BsFillBasket2Fill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { GiReturnArrow } from "react-icons/gi";
import { FaList } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { MdPrivacyTip } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";

const helpCenterCategoryOptions = [
  {
    label: "Buying",
    value: "customer",
  },
  {
    label: "Selling",
    value: "vendor",
  },
  {
    label: "My Account",
    value: "account",
  },
];

const helpCenterSubCategoryOptions = [
  {
    label: "Before Ordering",
    value: "beforeOrdering",
    categories: ["customer"],
    icon: <BsFillBasket2Fill className="size-5 " />,
  },
  {
    label: "Checkout and Payment",
    value: "checkoutAndPayment",
    categories: ["customer"],
    icon: <MdPayments className="size-5" />,
  },
  {
    label: "Delivery and Shipping",
    value: "deliveryAndShipping",
    categories: ["customer", "vendor"],
    icon: <FaShippingFast className="size-5" />,
  },
  {
    label: "Cancellations, Returns and Refunds",
    value: "returnsAndRefunds",
    categories: ["customer"],
    icon: <GiReturnArrow className="size-5" />,
  },
  {
    label: "Authentication & Quality Control",
    value: "authentication",
    categories: ["customer", "vendor"],
    icon: <RiLockPasswordFill className="size-5" />,
  },
  {
    label: "My Listings",
    value: "myListings",
    categories: ["vendor"],
    icon: <FaList className="size-5" />,
  },
  {
    label: "Checkout/ Payment / Fees",
    value: "payments",
    categories: ["vendor", "customer", "account"],
    icon: <MdPayments className="size-5" />,
  },
  {
    label: "Seller Ratings & Badges",
    value: "ratings",
    categories: ["vendor"],
    icon: <FaRegStarHalfStroke className="size-5" />,
  },
  {
    label: "Login and Security",
    value: "loginAndSecurity",
    categories: ["account"],
    icon: <RiLockPasswordFill className="size-5" />,
  },
  {
    label: "Alerts & Notifications",
    value: "notifications",
    categories: ["account"],
    icon: <FaBell className="size-5" />,
  },
  {
    label: "Security & Privacy",
    value: "privacy",
    categories: ["account"],
    icon: <MdPrivacyTip className="size-5" />,
  },
  {
    label: "Account Support",
    value: "support",
    categories: ["account"],
    icon: <MdOutlineSupportAgent className="size-5" />,
  },
];

export { helpCenterCategoryOptions, helpCenterSubCategoryOptions };
export type HelpCenterCategory = {
  label: string;
  value: string;
};
// Ensure JSX.Element is recognized by importing React

export type HelpCenterSubCategory = {
  label: string;
  value: string;
  categories: string[];
  icon: React.ReactNode;
};
export type HelpCenterCategoryOptions = typeof helpCenterCategoryOptions;
export type HelpCenterSubCategoryOptions = typeof helpCenterSubCategoryOptions;
