"use client";

import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";

import { useMemo } from "react";
import PromoSlider from "@/components/promo/PromoSlider";
import { PromoInterface } from "@/interface/interface";



const ReadyToWearPromo = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const permittedProductTypes = ["readyMadeCloth", "readyMadeShoe"];
  const promosQuery = zeapApiSlice.useGetPromosQuery(
    {
      permittedProductTypes,
    },
    {
      skip: !token,
    }
  );
  const promos = useMemo(
    () =>
      promosQuery?.data?.data?.filter((promo: PromoInterface) => promo.productsCount > 0) || [],
    [promosQuery?.data?.data]
  );

  return (
    <>
      {promos.length > 0 && (
        <PromoSlider
          promos={promos}
          title="Ready To Wear Sales"
          subTitle="Discover our latest sales on ready-to-wear collections"
        />
      )}
    </>
  );
};

export default ReadyToWearPromo;
