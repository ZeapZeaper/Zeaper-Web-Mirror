"use client";
import { use } from "react";
import DisplayCollections from "../DisplayCollections";

type ParamObj = {
  [key: string]: string | boolean | number;
};

const CollectionFilter = ({
  params,
}: {
  params: Promise<{ parameters: string }>;
}) => {
  const { parameters } = use(params);
  const getParams = () => {
    let inputParameters: string[];
    if (typeof parameters === "string") {
      inputParameters = parameters.split("&");
    } else if (Array.isArray(parameters)) {
      inputParameters = parameters;
    } else {
      return {};
    }

    if (inputParameters.length === 0) {
      return {};
    }
    const paramObj: ParamObj = {};
    // replace %3D with = and decodeURIComponent
    inputParameters = inputParameters.map((param) =>
      param.replace(/%3D/g, "=").replace(/%26/g, "&")
    );
   
    inputParameters.forEach((param) => {
      const [key, value] = param.split("=");
      if (key && value) {
        paramObj[key] = decodeURIComponent(value);
      }
    });
  
    return paramObj;
  };
  const paramsObj = getParams();


  return (
    <>
    
      <DisplayCollections paramObj={paramsObj} />
    </>
  );
};

export default CollectionFilter;
