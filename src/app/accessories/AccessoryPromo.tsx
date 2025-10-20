"use client";

import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import { useMemo } from "react";
import PromoSlider from "@/components/promo/PromoSlider";
import { PromoInterface } from "@/interface/interface";

const AccessoryPromo = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const permittedProductTypes = ["accessory"];
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
      promosQuery?.data?.data?.filter(
        (promo: PromoInterface) => promo.productsCount > 0
      ) || [],
    [promosQuery?.data?.data]
  );

  return (
    <>
      {promos.length > 0 && (
        <PromoSlider
          promos={promos}
          title="Accessory Sales"
          subTitle="Explore our latest sales and promotions on accessories."
        />
      )}
    </>
  );
};

export default AccessoryPromo;
