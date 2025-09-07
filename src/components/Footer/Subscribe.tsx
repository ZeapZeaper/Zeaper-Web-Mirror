import React from "react";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";

const Subscribe = () => {
  return (
    <div className="space-y-5">
      <h1
        className="text-4xl font-semibold md:text-[80px]"
        style={{ lineHeight: "1em" }}
      >
        Newsletter
      </h1>
      <p className="w-[80%] text-sm text-neutral-200">
        Get the latest news about us. Never
        miss a single promotion or discount. 
      </p>

      <div className="flex items-center rounded-full border border-neutral-500">
        <Input
          type="text"
          sizeClass="h-12 px-4 py-3"
          rounded="rounded-none"
          className="border-transparent bg-transparent placeholder:text-sm
           placeholder:text-neutral-200 focus:border-transparent"
          placeholder="Your email"
        />
        <ButtonPrimary>SUBSCRIBE</ButtonPrimary>
      </div>
    </div>
  );
};

export default Subscribe;
